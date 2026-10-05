"use client";

import { useMemo, useState } from "react";
import { Empty, Input, Tabs, Tooltip } from "antd";

import panelStyles from "./ToolPanel.module.css";
import styles from "./ClipartPanel.module.css";

const svg = (body) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">${body}</svg>`
  )}`;

const CLIPART = [
  { id: "star", name: "Star", category: "shapes", body: '<polygon points="50,6 63,38 97,38 69,58 80,92 50,72 20,92 31,58 3,38 37,38" fill="#f5b301"/>' },
  { id: "heart", name: "Heart", category: "shapes", body: '<path d="M50 90 C10 60 5 30 25 18 C38 10 48 18 50 28 C52 18 62 10 75 18 C95 30 90 60 50 90Z" fill="#e0245e"/>' },
  { id: "circle", name: "Circle", category: "shapes", body: '<circle cx="50" cy="50" r="44" fill="#2f6fed"/>' },
  { id: "diamond", name: "Diamond", category: "shapes", body: '<polygon points="50,5 95,50 50,95 5,50" fill="#12b886"/>' },
  { id: "bolt", name: "Lightning", category: "symbols", body: '<polygon points="58,4 20,56 46,56 38,96 80,40 54,40" fill="#fab005"/>' },
  { id: "peace", name: "Peace", category: "symbols", body: '<g fill="none" stroke="#111" stroke-width="6"><circle cx="50" cy="50" r="42"/><path d="M50 8V92M50 50L20 80M50 50L80 80"/></g>' },
  { id: "crown", name: "Crown", category: "symbols", body: '<path d="M10 78 L16 30 L36 52 L50 22 L64 52 L84 30 L90 78Z" fill="#f5b301" stroke="#b07d00" stroke-width="3"/>' },
  { id: "smile", name: "Smile", category: "symbols", body: '<circle cx="50" cy="50" r="44" fill="#ffd43b"/><circle cx="36" cy="40" r="5" fill="#111"/><circle cx="64" cy="40" r="5" fill="#111"/><path d="M28 60 Q50 82 72 60" fill="none" stroke="#111" stroke-width="5" stroke-linecap="round"/>' },
].map((item) => ({ ...item, src: svg(item.body) }));

const TABS = [
  { key: "all", label: "All" },
  { key: "shapes", label: "Shapes" },
  { key: "symbols", label: "Symbols" },
];

export default function ClipartPanel({ onAdd }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(
    () =>
      CLIPART.filter(
        (item) =>
          (category === "all" || item.category === category) &&
          item.name.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [category, query]
  );

  return (
    <div className={panelStyles.panel}>
      <div className={panelStyles.panelHeader}>Add Clipart</div>

      <div className={panelStyles.panelBody}>
        <Input.Search allowClear placeholder="Search clipart" value={query} onChange={(event) => setQuery(event.target.value)} />

        <Tabs size="small" activeKey={category} onChange={setCategory} items={TABS} />

        {visible.length > 0 ? (
          <div className={styles.grid}>
            {visible.map((item) => (
              <Tooltip title={item.name} key={item.id}>
                <button
                  type="button"
                  className={styles.item}
                  onClick={() => onAdd({ src: item.src, naturalWidth: 200, naturalHeight: 200 })}
                  aria-label={`Add ${item.name}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- inline SVG data URL */}
                  <img src={item.src} alt="" />
                </button>
              </Tooltip>
            ))}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No clipart found" />
        )}
      </div>
    </div>
  );
}
