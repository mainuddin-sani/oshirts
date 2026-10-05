"use client";

import { useEffect, useState } from "react";
import styles from "./blogpost.module.css";

/**
 * "In this guide" list built from the article's h2 anchors. The heading
 * nearest the top of the viewport is marked as current while you scroll.
 */
export default function TableOfContents({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!headings.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the heading that most recently crossed the reading line.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className={styles.toc} aria-label="In this guide">
      <p className={styles.railLabel}>In this guide</p>
      <ol className={styles.tocList}>
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${styles.tocLink} ${active === item.id ? styles.tocActive : ""}`}
              aria-current={active === item.id ? "location" : undefined}
            >
              <span className={styles.tocIndex}>{String(i + 1).padStart(2, "0")}</span>
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
