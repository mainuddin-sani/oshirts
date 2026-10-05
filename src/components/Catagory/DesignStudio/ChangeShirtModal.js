"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Modal, Select, Tag, Tooltip, Typography } from "antd";

import {
  STYLE_CATEGORIES,
  categoryLabel,
  colorSwatches,
  findStyle,
  garmentImage,
  shirtStyles,
} from "./designStudioData";

import styles from "./ChangeShirtModal.module.css";

const { Text, Title, Paragraph } = Typography;

/** Mounted only while open (see ChooseShirtPanel), so its draft state always
 * starts fresh from the garment that was active when it was opened. */
export default function ChangeShirtModal({ garment, onApply, onClose }) {
  const [category, setCategory] = useState("all");
  const [draftStyleId, setDraftStyleId] = useState(garment.styleId);
  const [draftColor, setDraftColor] = useState(garment.color);

  const draftStyle = findStyle(draftStyleId);
  const visibleStyles = shirtStyles.filter((option) => category === "all" || option.category === category);

  const selectStyle = (styleId) => {
    const next = findStyle(styleId);
    setDraftStyleId(styleId);
    setDraftColor(next.colors[0]);
  };

  return (
    <Modal
      open
      centered
      width={900}
      onCancel={onClose}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>Select a Category</span>
          <Select
            value={category}
            onChange={setCategory}
            style={{ minWidth: 180 }}
            aria-label="Filter by category"
            options={STYLE_CATEGORIES.map((entry) => ({ value: entry.id, label: entry.label }))}
          />
        </div>
      }
      footer={
        <Button type="primary" onClick={() => onApply(draftStyleId, draftColor)}>
          Use this Shirt
        </Button>
      }
    >
      <div className={styles.body}>
        <div className={styles.styleList} role="listbox" aria-label="Available shirt styles">
          {visibleStyles.map((option) => (
            <button
              type="button"
              key={option.id}
              role="option"
              aria-selected={option.id === draftStyleId}
              className={`${styles.styleCard} ${option.id === draftStyleId ? styles.styleCardActive : ""}`}
              onClick={() => selectStyle(option.id)}
            >
              <div className={styles.styleCardThumb}>
                <Image src={option.image} alt="" fill sizes="120px" />
              </div>
              <span>
                {option.brand} {option.name}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.detail}>
          <div className={styles.detailThumb}>
            <Image
              src={garmentImage(draftStyleId, draftColor)}
              alt={`${draftStyle.brand} ${draftStyle.name} in ${draftColor}`}
              fill
              sizes="(min-width: 700px) 260px, 60vw"
            />
          </div>

          <div className={styles.detailInfo}>
            <Tag>{categoryLabel(draftStyle.category)}</Tag>
            <Title level={4} style={{ margin: "8px 0" }}>
              {draftStyle.brand} {draftStyle.name}
            </Title>

            <Text strong>Product Description</Text>
            <Paragraph type="secondary">{draftStyle.description}</Paragraph>

            <Text strong style={{ display: "block", marginBottom: 8 }}>
              Choose Color
            </Text>
            <div className={styles.colorGrid}>
              {draftStyle.colors.map((color) => (
                <Tooltip title={color} key={color}>
                  <button
                    type="button"
                    className={`${styles.colorSwatch} ${draftColor === color ? styles.colorSwatchActive : ""}`}
                    style={{ backgroundColor: colorSwatches[color] }}
                    onClick={() => setDraftColor(color)}
                    aria-label={color}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
