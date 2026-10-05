"use client";

import { useEffect, useState } from "react";
import styles from "./Legal.module.css";

/**
 * "On this page" navigation. Tracks which section is in view so the current
 * item stays highlighted while the reader scrolls.
 */
export default function LegalToc({ sections }) {
  const [current, setCurrent] = useState(sections[0]?.id);

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);

    if (!headings.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setCurrent(visible[0].target.id);
      },
      // Fire when a heading crosses the upper third of the viewport.
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className={styles.toc} aria-label="On this page">
      <p className={styles.tocTitle}>On this page</p>
      <ol className={styles.tocList}>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`${styles.tocLink} ${current === section.id ? styles.tocLinkActive : ""}`}
              aria-current={current === section.id ? "location" : undefined}
            >
              {section.title.replace(/^\d+\.\s*/, "")}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
