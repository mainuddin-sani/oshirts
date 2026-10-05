"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./DesignDetail.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

/**
 * Large mockup with the front/back switcher under it. Views come resolved
 * from the design record, so this only owns which one is showing.
 */
export default function DesignPreview({ views, alt, printedViews = [] }) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(views[0]?.id);

  const active = views.find((view) => view.id === activeId) || views[0];

  return (
    <div className={styles.preview}>
      <figure className={styles.stage}>
        <motion.div
          key={active.id}
          className={styles.stageInner}
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <Image
            src={active.image}
            alt={`${alt} — ${active.label.toLowerCase()} view`}
            className={styles.stageImage}
            fill
            preload
            sizes="(min-width: 1024px) 560px, 92vw"
          />
        </motion.div>
      </figure>

      <div className={styles.views} role="tablist" aria-label="Garment views">
        {views.map((view) => {
          const isActive = view.id === active.id;
          const isPrinted = printedViews.includes(view.label);

          return (
            <button
              key={view.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.view} ${isActive ? styles.viewActive : ""}`}
              onClick={() => setActiveId(view.id)}
            >
              <span className={styles.viewThumb}>
                <Image src={view.image} alt="" fill sizes="72px" />
              </span>
              <span className={styles.viewLabel}>
                {view.label}
                {isPrinted ? <span className={styles.viewDot} aria-label="Has artwork" /> : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
