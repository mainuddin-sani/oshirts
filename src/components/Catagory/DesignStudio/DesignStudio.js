"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Button, Tooltip, message } from "antd";
import Link from "next/link";
import { GiTShirt } from "react-icons/gi";
import {
  FiArrowLeft,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiImage,
  FiLayers,
  FiSave,
  FiShoppingCart,
  FiType,
} from "react-icons/fi";

import {
  VIEWS,
  createGarment,
  createImageElement,
  createTextElement,
  findStyle,
  reorderElements,
} from "./designStudioData";
import { emptyByView, loadDesign, saveDesign } from "./designStorage";
import DesignCanvas from "./DesignCanvas";
import ChooseShirtPanel from "./ChooseShirtPanel";
import AddTextPanel from "./AddTextPanel";
import UploadImagePanel from "./UploadImagePanel";

import ClipartPanel from "./ClipartPanel";
import AntdProvider from "./AntdProvider";
import styles from "./DesignStudio.module.css";

const TOOLS = [
  { id: "shirt", label: "Choose Shirt", Icon: GiTShirt },
  { id: "text", label: "Add Text", Icon: FiType },
  { id: "upload", label: "Upload Image", Icon: FiImage },
  { id: "clipart", label: "Add Clipart", Icon: FiLayers },
];

/** Which tool panel edits a given element. */
const toolForElement = (el) => (el.type === "text" ? "text" : el.origin === "clipart" ? "clipart" : "upload");

const subscribeToNothing = () => () => {};
const onClient = () => true;
const onServer = () => false;

/** Saved designs live in localStorage, which only exists in the browser. After
 * hydration the studio is remounted once (via key) so it can start from the
 * saved design without a server/client markup mismatch. */
export default function DesignStudio(props) {
  const hydrated = useSyncExternalStore(subscribeToNothing, onClient, onServer);
  const storedDesign = useMemo(() => (hydrated ? loadDesign(props.backHref) : null), [hydrated, props.backHref]);

  return <DesignStudioApp key={hydrated ? "client" : "server"} {...props} storedDesign={storedDesign} />;
}

function DesignStudioApp({ initialStyleId, initialColor, initialQuantity, backHref, storedDesign }) {
  const [activeTool, setActiveTool] = useState("shirt");
  // The last saved (or freshly opened) garment/design; any later change differs from it by reference.
  const [baseline, setBaseline] = useState(() => storedDesign || ({
    garment: createGarment({
      styleId: initialStyleId || "classic-cotton-tee",
      color: initialColor || "White",
      quantity: initialQuantity,
    }),
    designByView: emptyByView(),
  }));
  const [garment, setGarment] = useState(baseline.garment);
  const [activeView, setActiveView] = useState("front");
  const [designByView, setDesignByView] = useState(baseline.designByView);
  // One undo/redo history for the whole design (every view and the shirt), as snapshots.
  const [history, setHistory] = useState({ past: [], future: [] });
  const [selectedId, setSelectedId] = useState(null);
  const [messageApi, messageContext] = message.useMessage();

  const style = findStyle(garment.styleId);
  const elements = designByView[activeView];
  const isDirty = baseline.garment !== garment || baseline.designByView !== designByView;

  const setElements = (updater) => {
    setDesignByView((current) => ({
      ...current,
      [activeView]: typeof updater === "function" ? updater(current[activeView]) : updater,
    }));
  };

  // Call right before a change so it can be undone; a new change drops any redo steps.
  const commit = () => {
    setHistory((current) => ({ past: [...current.past, { garment, designByView }], future: [] }));
  };

  const updateGarment = (patch) => {
    commit();
    setGarment((current) => ({ ...current, ...patch }));
  };

  // Adding text/images/clipart is deliberately not an undo step.
  const addText = () => {
    const el = createTextElement();
    setElements((current) => [...current, el]);
    setSelectedId(el.id);
  };

  const addImage = ({ src, naturalWidth, naturalHeight, origin = "upload" }) => {
    const el = createImageElement({ src, naturalWidth, naturalHeight, origin });
    setElements((current) => [...current, el]);
    setSelectedId(el.id);
  };

  const updateSelected = (patch, { record = false } = {}) => {
    if (!selectedId) return;
    if (record) commit();
    setElements((current) => current.map((el) => (el.id === selectedId ? { ...el, ...patch } : el)));
  };

  // Undo/redo roll back edits to elements that existed at that point, but keep
  // anything added afterwards, since adding isn't an undo step.
  const restore = (snapshot) => {
    setGarment(snapshot.garment);
    setDesignByView((current) =>
      Object.fromEntries(
        VIEWS.map(({ id }) => {
          const restored = snapshot.designByView[id];
          const restoredIds = new Set(restored.map((el) => el.id));
          return [id, [...restored, ...current[id].filter((el) => !restoredIds.has(el.id))]];
        })
      )
    );
    setSelectedId(null);
  };

  const handleUndo = () => {
    const previous = history.past.at(-1);
    if (!previous) return;
    setHistory({ past: history.past.slice(0, -1), future: [...history.future, { garment, designByView }] });
    restore(previous);
  };

  const handleRedo = () => {
    const next = history.future.at(-1);
    if (!next) return;
    setHistory({ past: [...history.past, { garment, designByView }], future: history.future.slice(0, -1) });
    restore(next);
  };

  const handleSave = () => {
    try {
      saveDesign(backHref, { garment, designByView });
      setBaseline({ garment, designByView });
      messageApi.success("Design saved");
    } catch {
      messageApi.error("Couldn't save the design — the browser storage is full or unavailable.");
    }
  };

  const handleDragMove = (id, x, y) => {
    setElements((current) => current.map((el) => (el.id === id ? { ...el, x, y } : el)));
  };

  const handleRotate = (id, rotation) => {
    setElements((current) => current.map((el) => (el.id === id ? { ...el, rotation } : el)));
  };

  const handleResize = (id, patch) => {
    setElements((current) => current.map((el) => (el.id === id ? { ...el, ...patch } : el)));
  };

  const handleDelete = (id) => {
    commit();
    setElements((current) => current.filter((el) => el.id !== id));
    setSelectedId((current) => (current === id ? null : current));
  };

  const handleReorder = (id, action) => {
    commit();
    setElements((current) => reorderElements(current, id, action));
  };

  // Ctrl/Cmd+Z undo, Ctrl/Cmd+Shift+Z or Ctrl+Y redo. Left alone while typing in
  // a field, so the browser's own text undo still works there.
  useEffect(() => {
    const handleKey = (event) => {
      if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key === "z" && !event.shiftKey) {
        event.preventDefault();
        handleUndo();
      } else if ((key === "z" && event.shiftKey) || key === "y") {
        event.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // Warn before leaving the page with unsaved changes.
  useEffect(() => {
    if (!isDirty) return undefined;
    const warn = (event) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
    setSelectedId(null);
  };

  const handleToolChange = (toolId) => {
    setActiveTool(toolId);
    const selectedElement = elements.find((el) => el.id === selectedId);
    if (!selectedElement || toolForElement(selectedElement) !== toolId) setSelectedId(null);
  };

  // Selecting something on the canvas opens the tool that edits it.
  const handleCanvasSelect = (id) => {
    setSelectedId(id);
    const element = elements.find((el) => el.id === id);
    if (element) setActiveTool(toolForElement(element));
  };

  return (
    <AntdProvider>
    {messageContext}
    <div className={styles.app}>
      <header className={styles.topBar}>
        {backHref ? (
          <Link href={backHref} className={styles.backLink} aria-label="Back to product">
            <FiArrowLeft size={18} />
          </Link>
        ) : null}

        <nav className={styles.tools} aria-label="Design tools">
          {TOOLS.map(({ id, label, Icon }) => (
            <Button
              key={id}
              type={activeTool === id ? "primary" : "text"}
              icon={<Icon size={18} />}
              onClick={() => handleToolChange(id)}
              aria-pressed={activeTool === id}
            >
              {label}
            </Button>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.priceBox}>
            <strong>${style.price.toFixed(2)}</strong>
            <span>per shirt ({garment.quantity})</span>
          </div>

          <Tooltip title="Undo">
            <Button icon={<FiCornerUpLeft size={16} />} onClick={handleUndo} disabled={history.past.length === 0} aria-label="Undo" />
          </Tooltip>

          <Tooltip title="Redo">
            <Button icon={<FiCornerUpRight size={16} />} onClick={handleRedo} disabled={history.future.length === 0} aria-label="Redo" />
          </Tooltip>

          <Button icon={<FiSave size={16} />} onClick={handleSave} disabled={!isDirty}>
            <span className={styles.btnLabel}>{isDirty ? "Save Design" : "Saved"}</span>
          </Button>

          <Tooltip title="Coming soon">
            <Button type="primary" disabled icon={<FiShoppingCart size={16} />}>
              <span className={styles.btnLabel}>Quote &amp; Buy</span>
            </Button>
          </Tooltip>
        </div>
      </header>

      <div className={styles.stage}>
        <DesignCanvas
          styleId={garment.styleId}
          styleBrand={style.brand}
          styleName={style.name}
          color={garment.color}
          views={VIEWS}
          activeView={activeView}
          onViewChange={handleViewChange}
          elements={elements}
          selectedId={selectedId}
          onSelect={handleCanvasSelect}
          onDragStart={() => commit()}
          onDragMove={handleDragMove}
          onRotate={handleRotate}
          onResize={handleResize}
          onDelete={handleDelete}
          onReorder={handleReorder}
        />

        {activeTool === "shirt" ? <ChooseShirtPanel garment={garment} onChange={updateGarment} /> : null}

        {activeTool === "text" ? (
          <AddTextPanel
            elements={elements}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onAdd={addText}
            onUpdate={updateSelected}
          />
        ) : null}

        {activeTool === "upload" ? (
          <UploadImagePanel
            elements={elements}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onAdd={addImage}
            onUpdate={updateSelected}
            onDelete={handleDelete}
          />
        ) : null}

        {activeTool === "clipart" ? <ClipartPanel onAdd={addImage} /> : null}
      </div>
    </div>
    </AntdProvider>
  );
}
