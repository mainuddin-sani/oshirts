"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Card, InputNumber, Tag, Tooltip, Typography } from "antd";

import { MIN_QUANTITY, categoryLabel, colorSwatches, findStyle } from "./designStudioData";
import ChangeShirtModal from "./ChangeShirtModal";

import panelStyles from "./ToolPanel.module.css";
import styles from "./ChooseShirtPanel.module.css";

const { Text } = Typography;

export default function ChooseShirtPanel({ garment, onChange }) {
  const [modalOpen, setModalOpen] = useState(false);
  const style = findStyle(garment.styleId);

  const handleApply = (styleId, color) => {
    onChange({ styleId, color });
    setModalOpen(false);
  };

  return (
    <div className={panelStyles.panel}>
      <div className={panelStyles.panelHeader}>Choose Shirt</div>

      <div className={panelStyles.panelBody}>
        <Card size="small">
          <div className={styles.current}>
            <div className={styles.thumb}>
              <Image src={style.image} alt={`${style.brand} ${style.name}`} fill sizes="70px" />
            </div>
            <div className={styles.info}>
              <Tag>{categoryLabel(style.category)}</Tag>
              <strong>
                {style.brand} {style.name}
              </strong>
            </div>
          </div>
        </Card>

        <Button block onClick={() => setModalOpen(true)}>
          Change Shirt
        </Button>

        <div>
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            Choose Color
          </Text>
          <div className={styles.colorGrid}>
            {style.colors.map((color) => (
              <Tooltip title={color} key={color}>
                <button
                  type="button"
                  className={`${styles.colorSwatch} ${garment.color === color ? styles.colorSwatchActive : ""}`}
                  style={{ backgroundColor: colorSwatches[color] }}
                  onClick={() => onChange({ color })}
                  aria-label={color}
                />
              </Tooltip>
            ))}
          </div>
        </div>

        <div>
          <Text strong style={{ display: "block", marginBottom: 8 }}>
            Quantity
          </Text>
          <InputNumber
            min={MIN_QUANTITY}
            precision={0}
            value={garment.quantity}
            onChange={(value) => onChange({ quantity: value ?? MIN_QUANTITY })}
            style={{ width: "100%" }}
          />
          <Text type="secondary" style={{ fontSize: 12 }}>
            Minimum order {MIN_QUANTITY}
          </Text>
        </div>
      </div>

      {modalOpen ? (
        <ChangeShirtModal garment={garment} onApply={handleApply} onClose={() => setModalOpen(false)} />
      ) : null}
    </div>
  );
}
