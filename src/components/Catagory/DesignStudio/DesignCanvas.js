"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  FiChevronDown,
  FiChevronUp,
  FiChevronsDown,
  FiChevronsUp,
  FiLayers,
  FiMaximize2,
  FiRotateCw,
  FiX,
} from "react-icons/fi";

import {
  MAX_ARC,
  MAX_IMAGE_SIZE,
  MAX_TEXT_SIZE,
  MIN_IMAGE_SIZE,
  MIN_TEXT_SIZE,
  PRINT_AREAS,
  findFont,
  garmentImage,
} from "./designStudioData";
import GarmentViewIcon from "./GarmentViewIcon";

import styles from "./DesignCanvas.module.css";

const LAYER_ACTIONS = [
  { action: "front", label: "Bring to Front", Icon: FiChevronsUp },
  { action: "back", label: "Send Back", Icon: FiChevronsDown },
  { action: "forward", label: "Bring Forward", Icon: FiChevronUp },
  { action: "backward", label: "Send Backward", Icon: FiChevronDown },
];

/** Curved-text preview, rendered via an SVG textPath. Only used for
 * single-line text — arc is disabled for multi-line (see AddTextPanel). */
function ArcText({ element, font }) {
  const radius = 260 - (element.arc / MAX_ARC) * 200;
  const pathId = `arc-${element.id}`;

  return (
    <svg width="260" height="140" viewBox="0 0 260 140" style={{ overflow: "visible" }} aria-hidden="true">
      <path id={pathId} d={`M 10 120 A ${radius} ${radius} 0 0 1 250 120`} fill="none" />
      <text
        style={{
          fontFamily: font.family,
          fontSize: element.size,
          letterSpacing: element.spacing,
          paintOrder: "stroke fill",
        }}
        fill={element.color}
        stroke={element.outlineEnabled ? element.outlineColor : "none"}
        strokeWidth={element.outlineWidth}
      >
        <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
          {element.text}
        </textPath>
      </text>
    </svg>
  );
}

export default function DesignCanvas({
  styleId,
  styleBrand,
  styleName,
  color,
  views,
  activeView,
  onViewChange,
  elements,
  selectedId,
  onSelect,
  onDragStart,
  onDragMove,
  onRotate,
  onResize,
  onDelete,
  onReorder,
}) {
  const canvasRef = useRef(null);
  const dragRef = useRef(null);
  const gestureRef = useRef(null);
  // The window listeners below are attached once, so they read the latest
  // handlers through this ref; otherwise they keep editing the first view.
  const handlersRef = useRef({});
  useEffect(() => {
    handlersRef.current = { onDragMove, onRotate, onResize };
  });
  const [layerMenuId, setLayerMenuId] = useState(null);

  const selectElement = (id) => {
    setLayerMenuId(null);
    onSelect(id);
  };

  const beginDrag = (event, el) => {
    event.stopPropagation();
    selectElement(el.id);
    onDragStart();

    dragRef.current = {
      id: el.id,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: el.x,
      startY: el.y,
    };
  };

  const beginRotate = (event, el) => {
    event.stopPropagation();
    selectElement(el.id);
    onDragStart();

    const rect = event.currentTarget.parentElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle = (Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180) / Math.PI;

    gestureRef.current = {
      mode: "rotate",
      id: el.id,
      centerX,
      centerY,
      startAngle,
      startRotation: el.rotation || 0,
    };
  };

  const beginResize = (event, el) => {
    event.stopPropagation();
    selectElement(el.id);
    onDragStart();

    const rect = event.currentTarget.parentElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startDistance = Math.max(Math.hypot(event.clientX - centerX, event.clientY - centerY), 1);

    gestureRef.current = {
      mode: "resize",
      id: el.id,
      elType: el.type,
      centerX,
      centerY,
      startDistance,
      startSize: el.type === "image" ? el.width : el.size,
      ratio: el.type === "image" ? el.naturalHeight / el.naturalWidth : null,
    };
  };

  useEffect(() => {
    const handleMove = (event) => {
      const { onDragMove, onRotate, onResize } = handlersRef.current;
      const drag = dragRef.current;
      const canvas = canvasRef.current;

      if (drag && canvas) {
        const rect = canvas.getBoundingClientRect();
        const deltaX = ((event.clientX - drag.startClientX) / rect.width) * 100;
        const deltaY = ((event.clientY - drag.startClientY) / rect.height) * 100;
        const nextX = Math.min(94, Math.max(6, drag.startX + deltaX));
        const nextY = Math.min(94, Math.max(6, drag.startY + deltaY));

        onDragMove(drag.id, nextX, nextY);
      }

      const gesture = gestureRef.current;
      if (!gesture) return;

      if (gesture.mode === "rotate") {
        const angle = (Math.atan2(event.clientY - gesture.centerY, event.clientX - gesture.centerX) * 180) / Math.PI;
        onRotate(gesture.id, Math.round(gesture.startRotation + (angle - gesture.startAngle)));
      } else if (gesture.mode === "resize") {
        const distance = Math.hypot(event.clientX - gesture.centerX, event.clientY - gesture.centerY);
        const scale = distance / gesture.startDistance;

        if (gesture.elType === "image") {
          // Width and height scale together from the image's own aspect
          // ratio, so dragging the corner never distorts it.
          const width = Math.min(MAX_IMAGE_SIZE, Math.max(MIN_IMAGE_SIZE, Math.round(gesture.startSize * scale)));
          const height = Math.round(width * gesture.ratio);
          onResize(gesture.id, { width, height });
        } else {
          const size = Math.min(MAX_TEXT_SIZE, Math.max(MIN_TEXT_SIZE, Math.round(gesture.startSize * scale)));
          onResize(gesture.id, { size });
        }
      }
    };

    const handleUp = () => {
      dragRef.current = null;
      gestureRef.current = null;
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, []);

  const image = garmentImage(styleId, color, activeView);
  const printArea = PRINT_AREAS[activeView];
  const activeViewLabel = views.find((v) => v.id === activeView)?.label;

  return (
    <div className={styles.wrap}>
      <div
        className={styles.canvas}
        ref={canvasRef}
        onPointerDown={(event) => {
          if (event.target === canvasRef.current) selectElement(null);
        }}
      >
        <div className={styles.garmentFrame}>
          <Image
            key={typeof image === "string" ? image : image?.src || activeView}
            src={image}
            alt={`${styleBrand} ${styleName} in ${color}, ${views.find((v) => v.id === activeView)?.label} view`}
            fill
            priority
            sizes="(min-width: 900px) 60vw, 92vw"
            className={styles.garment}
          />
        </div>

        <div
          className={styles.printArea}
          style={{
            top: `${printArea.top}%`,
            left: `${printArea.left}%`,
            width: `${printArea.boxWidth}%`,
            height: `${printArea.boxHeight}%`,
          }}
        >
          <span className={styles.printAreaLabel}>
            {activeViewLabel}
            <small>
              Print area {printArea.width}&quot; by {printArea.height}&quot;
            </small>
          </span>

          {elements.map((el) => {
            const isImage = el.type === "image";
            const font = isImage ? null : findFont(el.fontId);
            const canArc = !isImage && el.arc > 0 && !el.text.includes("\n");
            const isSelected = selectedId === el.id;

            return (
              <div
                key={el.id}
                className={`${styles.element} ${isSelected ? styles.elementActive : ""}`}
                style={{
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  transform: `translate(-50%, -50%) rotate(${el.rotation || 0}deg)`,
                }}
                onPointerDown={(event) => beginDrag(event, el)}
              >
                {isImage ? (
                  // eslint-disable-next-line @next/next/no-img-element -- user-uploaded data URL, not a static asset
                  <img
                    src={el.src}
                    alt=""
                    draggable={false}
                    style={{
                      width: el.width,
                      height: el.height,
                      maxWidth: "none",
                    }}
                  />
                ) : canArc ? (
                  <ArcText element={el} font={font} />
                ) : (
                  <div
                    className={styles.textContent}
                    style={{
                      fontFamily: font.family,
                      fontSize: el.size,
                      color: el.color,
                      letterSpacing: el.spacing,
                      textAlign: el.align,
                      WebkitTextStroke: el.outlineEnabled ? `${el.outlineWidth}px ${el.outlineColor}` : undefined,
                      paintOrder: el.outlineEnabled ? "stroke fill" : undefined,
                    }}
                  >
                    {el.text}
                  </div>
                )}

                {isSelected ? (
                  <>
                    <button
                      type="button"
                      className={`${styles.handle} ${styles.handleDelete}`}
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={() => onDelete(el.id)}
                      aria-label="Delete"
                      title="Delete"
                    >
                      <FiX size={12} />
                    </button>

                    <button
                      type="button"
                      className={`${styles.handle} ${styles.handleRotate}`}
                      onPointerDown={(event) => beginRotate(event, el)}
                      aria-label="Rotate"
                      title="Rotate"
                    >
                      <FiRotateCw size={12} />
                    </button>

                    <button
                      type="button"
                      className={`${styles.handle} ${styles.handleLayers}`}
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={() => setLayerMenuId((open) => (open === el.id ? null : el.id))}
                      aria-label="Layer order"
                      title="Layer order"
                    >
                      <FiLayers size={12} />
                    </button>

                    <button
                      type="button"
                      className={`${styles.handle} ${styles.handleResize}`}
                      onPointerDown={(event) => beginResize(event, el)}
                      aria-label="Resize"
                      title="Resize"
                    >
                      <FiMaximize2 size={12} />
                    </button>

                    {layerMenuId === el.id ? (
                      <div className={styles.layerMenu} onPointerDown={(event) => event.stopPropagation()}>
                        {LAYER_ACTIONS.map(({ action, label, Icon }) => (
                          <button
                            type="button"
                            key={action}
                            onClick={() => {
                              onReorder(el.id, action);
                              setLayerMenuId(null);
                            }}
                          >
                            <Icon size={14} />
                            {label}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.viewSwitcher} role="tablist" aria-label="Garment view">
        {views.map((view) => (
          <button
            type="button"
            key={view.id}
            role="tab"
            aria-selected={activeView === view.id}
            className={`${styles.viewButton} ${activeView === view.id ? styles.viewButtonActive : ""}`}
            onClick={() => onViewChange(view.id)}
          >
            <span className={styles.viewThumb}>
              <GarmentViewIcon viewId={view.id} />
            </span>
            {view.label}
          </button>
        ))}
      </div>
    </div>
  );
}
