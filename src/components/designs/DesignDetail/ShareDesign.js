"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { FiCheck, FiLink, FiMail } from "react-icons/fi";
import styles from "./DesignDetail.module.css";

// The page URL only exists in the browser; the server render gets an empty string.
const noop = () => () => {};
const usePageUrl = () =>
  useSyncExternalStore(
    noop,
    () => window.location.href,
    () => ""
  );

/** Copy-link button plus an email hand-off, for sharing a saved design. */
export default function ShareDesign({ designName, designId }) {
  const url = usePageUrl();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); fail quietly.
    }
  };

  const mailto = `mailto:?subject=${encodeURIComponent(
    `Design ${designId} — ${designName}`
  )}&body=${encodeURIComponent(`Here is the saved design "${designName}" (${designId}):\n\n${url}`)}`;

  return (
    <div className={styles.share}>
      <button
        type="button"
        onClick={copy}
        className={`${styles.shareBtn} ${copied ? styles.shareCopied : ""}`}
      >
        {copied ? <FiCheck aria-hidden="true" /> : <FiLink aria-hidden="true" />}
        {copied ? "Link copied" : "Copy link"}
      </button>

      <a href={mailto} className={styles.shareBtn}>
        <FiMail aria-hidden="true" />
        Email this design
      </a>

      <span className="ic_sr_only" role="status" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
