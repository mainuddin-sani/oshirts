"use client";

import { useState } from "react";
import { Button, Tooltip } from "antd";
import Link from "next/link";
import { GiTShirt } from "react-icons/gi";
import { FiArrowLeft, FiImage, FiLayers, FiSave, FiShoppingCart, FiType } from "react-icons/fi";

import {
  VIEWS,
  createGarment,
  createImageElement,
  createTextElement,
  findStyle,
  reorderElements,
} from "./designStudioData";
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

const emptyByView = () => Object.fromEntries(VIEWS.map((view) => [view.id, []]));

export default function DesignStudio({ initialStyleId, initialColor, initialQuantity, backHref }) {
  const [activeTool, setActiveTool] = useState("shirt");
  const [garment, setGarment] = useState(() =>
    createGarment({
      styleId: initialStyleId || "classic-cotton-tee",
      color: initialColor || "White",
      quantity: initialQuantity,
    })
  );
  const [activeView, setActiveView] = useState("front");
  const [designByView, setDesignByView] = useState(emptyByView);
  const [historyByView, setHistoryByView] = useState(emptyByView);
  const [selectedId, setSelectedId] = useState(null);

  const style = findStyle(garment.styleId);
  const elements = designByView[activeView];
  const history = historyByView[activeView];

  const setElements = (updater) => {
    setDesignByView((current) => ({
      ...current,
      [activeView]: typeof updater === "function" ? updater(current[activeView]) : updater,
    }));
  };

  const commit = (snapshot) => {
    setHistoryByView((current) => ({ ...current, [activeView]: [...current[activeView], snapshot] }));
  };

  const updateGarment = (patch) => setGarment((current) => ({ ...current, ...patch }));

  const addText = () => {
    commit(elements);
    const el = createTextElement();
    setElements((current) => [...current, el]);
    setSelectedId(el.id);
  };

  const addImage = ({ src, naturalWidth, naturalHeight }) => {
    commit(elements);
    const el = createImageElement({ src, naturalWidth, naturalHeight });
    setElements((current) => [...current, el]);
    setSelectedId(el.id);
  };

  const updateSelected = (patch, { record = false } = {}) => {
    if (!selectedId) return;
    if (record) commit(elements);
    setElements((current) => current.map((el) => (el.id === selectedId ? { ...el, ...patch } : el)));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setDesignByView((current) => ({ ...current, [activeView]: previous }));
    setHistoryByView((current) => ({ ...current, [activeView]: current[activeView].slice(0, -1) }));
    setSelectedId(null);
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
    commit(elements);
    setElements((current) => current.filter((el) => el.id !== id));
    setSelectedId((current) => (current === id ? null : current));
  };

  const handleReorder = (id, action) => {
    commit(elements);
    setElements((current) => reorderElements(current, id, action));
  };

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
    setSelectedId(null);
  };

  const handleToolChange = (toolId) => {
    setActiveTool(toolId);
    if (toolId !== "text" && toolId !== "upload" && toolId !== "clipart") setSelectedId(null);
  };

  return (
    <AntdProvider>
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

          <Tooltip title="Coming soon">
            <Button disabled icon={<FiSave size={16} />}>
              <span className={styles.btnLabel}>Save Design</span>
            </Button>
          </Tooltip>

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
          onSelect={setSelectedId}
          onDragStart={() => commit(elements)}
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
            onUndo={handleUndo}
            canUndo={history.length > 0}
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
