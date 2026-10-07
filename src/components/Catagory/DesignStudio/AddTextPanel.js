"use client";

import { Alert, Button, Checkbox, ColorPicker, Empty, Input, Segmented, Select, Slider, Typography } from "antd";
import { FiAlignCenter, FiAlignLeft, FiAlignRight, FiPlus } from "react-icons/fi";

import {
  MAX_ARC,
  MAX_OUTLINE_WIDTH,
  MAX_TEXT_SIZE,
  MIN_OUTLINE_WIDTH,
  MIN_TEXT_SIZE,
  TEXT_FONTS,
} from "./designStudioData";

import panelStyles from "./ToolPanel.module.css";

const { Text } = Typography;

const ALIGN_OPTIONS = [
  { value: "left", icon: <FiAlignLeft aria-label="Align left" /> },
  { value: "center", icon: <FiAlignCenter aria-label="Align center" /> },
  { value: "right", icon: <FiAlignRight aria-label="Align right" /> },
];

/** Snapshots history once at the start of a drag, so a whole drag undoes as one step. */
function RecordSlider({ onRecord, ...props }) {
  return (
    <div onPointerDown={onRecord}>
      <Slider {...props} />
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 4 }}>
        {label}
      </Text>
      {children}
    </div>
  );
}

export default function AddTextPanel({ elements, selectedId, onSelect, onAdd, onUpdate }) {
  const textElements = elements.filter((el) => el.type === "text");
  const selected = textElements.find((el) => el.id === selectedId) || null;
  const isMultiLine = selected ? selected.text.includes("\n") : false;

  return (
    <div className={panelStyles.panel}>
      <div className={panelStyles.panelHeader}>Add Text</div>

      <div className={panelStyles.panelBody}>
        {textElements.length > 0 ? (
          <Select
            value={selected?.id}
            placeholder="Select a text layer"
            onChange={onSelect}
            options={textElements.map((el, index) => ({
              value: el.id,
              label: el.text.split("\n")[0] || `Text ${index + 1}`,
            }))}
          />
        ) : null}

        <Button block icon={<FiPlus size={16} />} onClick={onAdd}>
          Add Text
        </Button>

        {selected ? (
          <>
            <Field label="Text">
              <Input.TextArea
                rows={2}
                value={selected.text}
                onFocus={() => onUpdate({}, { record: true })}
                onChange={(event) => onUpdate({ text: event.target.value })}
              />
            </Field>

            <Field label="Font">
              <Select
                style={{ width: "100%" }}
                value={selected.fontId}
                onChange={(fontId) => onUpdate({ fontId }, { record: true })}
                options={TEXT_FONTS.map((font) => ({
                  value: font.id,
                  label: <span style={{ fontFamily: font.family }}>{font.label}</span>,
                }))}
              />
            </Field>

            <Field label={`Size (${selected.size}px)`}>
              <RecordSlider onRecord={() => onUpdate({}, { record: true })}
                min={MIN_TEXT_SIZE}
                max={MAX_TEXT_SIZE}
                value={selected.size}
                onChange={(size) => onUpdate({ size })}
              />
            </Field>

            <Field label="Color">
              <ColorPicker
                showText
                value={selected.color}
                onChangeComplete={(color) => onUpdate({ color: color.toHexString() }, { record: true })}
              />
            </Field>

            <Checkbox
              checked={selected.outlineEnabled}
              onChange={(event) => onUpdate({ outlineEnabled: event.target.checked }, { record: true })}
            >
              Outline
            </Checkbox>

            {selected.outlineEnabled ? (
              <>
                <Field label="Outline color">
                  <ColorPicker
                    showText
                    value={selected.outlineColor}
                    onChangeComplete={(color) => onUpdate({ outlineColor: color.toHexString() }, { record: true })}
                  />
                </Field>
                <Field label={`Outline width (${selected.outlineWidth}px)`}>
                  <RecordSlider onRecord={() => onUpdate({}, { record: true })}
                    min={MIN_OUTLINE_WIDTH}
                    max={MAX_OUTLINE_WIDTH}
                    value={selected.outlineWidth}
                    onChange={(outlineWidth) => onUpdate({ outlineWidth })}
                  />
                </Field>
              </>
            ) : null}

            <Field label="Alignment">
              <Segmented
                block
                value={selected.align}
                options={ALIGN_OPTIONS}
                onChange={(align) => onUpdate({ align }, { record: true })}
              />
            </Field>

            <Field label={`Spacing (${selected.spacing}px)`}>
              <RecordSlider onRecord={() => onUpdate({}, { record: true })} min={0} max={10} value={selected.spacing} onChange={(spacing) => onUpdate({ spacing })} />
            </Field>

            <Field label="Arc">
              <RecordSlider onRecord={() => onUpdate({}, { record: true })} min={0} max={MAX_ARC} value={selected.arc} disabled={isMultiLine} onChange={(arc) => onUpdate({ arc })} />
              {isMultiLine ? <Alert type="warning" showIcon title="Text arc is not available for multi-line text." /> : null}
            </Field>
          </>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'Click "Add Text" to place text on the shirt.'} />
        )}
      </div>
    </div>
  );
}
