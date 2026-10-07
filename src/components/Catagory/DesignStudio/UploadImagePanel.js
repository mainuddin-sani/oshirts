"use client";

import { useState } from "react";
import { Alert, Button, Slider, Tooltip, Typography, Upload } from "antd";
import { FiTrash2, FiUploadCloud } from "react-icons/fi";

import {
  MAX_IMAGE_SIZE,
  MIN_IMAGE_SIZE,
  UPLOAD_ALLOWED_EXTENSIONS,
  UPLOAD_MAX_FILE_SIZE_MB,
  UPLOAD_PREVIEWABLE_TYPES,
} from "./designStudioData";

import panelStyles from "./ToolPanel.module.css";
import styles from "./UploadImagePanel.module.css";

const { Text } = Typography;

const clampImageSize = (value) => Math.round(Math.min(MAX_IMAGE_SIZE, Math.max(MIN_IMAGE_SIZE, value)));

export default function UploadImagePanel({ elements, selectedId, onSelect, onAdd, onUpdate, onDelete }) {
  const [error, setError] = useState("");

  const images = elements.filter((el) => el.type === "image" && el.origin !== "clipart");
  const selected = images.find((el) => el.id === selectedId) || null;

  const handleFile = (file) => {
    if (file.size > UPLOAD_MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`"${file.name}" is larger than ${UPLOAD_MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    if (!UPLOAD_PREVIEWABLE_TYPES.includes(file.type)) {
      setError(
        `"${file.name}" can't be shown in the browser preview. Upload a GIF, JPG, PNG, BMP, or SVG for the on-screen design.`
      );
      return;
    }

    setError("");

    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result;
      const img = new window.Image();
      img.onload = () => {
        onAdd({ src, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Snapshots history once at the start of a slider drag, so the whole drag undoes as one step.
  const record = () => onUpdate({}, { record: true });

  return (
    <div className={panelStyles.panel}>
      <div className={panelStyles.panelHeader}>Upload Image</div>

      <div className={panelStyles.panelBody}>
        <Upload.Dragger
          className={styles.uploader}
          accept={UPLOAD_ALLOWED_EXTENSIONS.map((ext) => `.${ext}`).join(",")}
          multiple={false}
          showUploadList={false}
          beforeUpload={(file) => {
            handleFile(file);
            return false; // handled locally, never POSTed
          }}
        >
          <div className={styles.icon}>
            <FiUploadCloud size={32} />
          </div>
          <p className={styles.title}>Drag and drop your image in this box</p>
          <p className={styles.hint}>or click here to upload</p>
          <p className={styles.hint}>Maximum filesize: {UPLOAD_MAX_FILE_SIZE_MB}MB.</p>
          <p className={styles.hint}>Allowed file types: {UPLOAD_ALLOWED_EXTENSIONS.join(", ")}.</p>
        </Upload.Dragger>

        {error ? <Alert type="error" showIcon closable={{ onClose: () => setError("") }} title={error} /> : null}

        {images.length > 0 ? (
          <ul className={styles.list}>
            {images.map((el, index) => (
              <li key={el.id}>
                <button
                  type="button"
                  className={`${styles.item} ${el.id === selectedId ? styles.itemActive : ""}`}
                  onClick={() => onSelect(el.id)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- small thumbnail of a user-uploaded data URL */}
                  <img src={el.src} alt="" className={styles.thumb} />
                  Image {index + 1}
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {selected ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Text strong>Size</Text>
              <Tooltip title="Delete image">
                <Button
                  danger
                  type="text"
                  size="small"
                  icon={<FiTrash2 size={14} />}
                  onClick={() => onDelete(selected.id)}
                  aria-label="Delete image"
                />
              </Tooltip>
            </div>

            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Width ({Math.round(selected.width)}px)
              </Text>
              <div onPointerDown={record}>
                <Slider
                  min={MIN_IMAGE_SIZE}
                  max={MAX_IMAGE_SIZE}
                  value={selected.width}
                  onChange={(width) => {
                    const height = clampImageSize(width * (selected.naturalHeight / selected.naturalWidth));
                    onUpdate({ width, height });
                  }}
                />
              </div>
            </div>

            <div>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Height ({Math.round(selected.height)}px)
              </Text>
              <div onPointerDown={record}>
                <Slider
                  min={MIN_IMAGE_SIZE}
                  max={MAX_IMAGE_SIZE}
                  value={selected.height}
                  onChange={(height) => {
                    const width = clampImageSize(height * (selected.naturalWidth / selected.naturalHeight));
                    onUpdate({ width, height });
                  }}
                />
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
