"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { FiCheck, FiFacebook, FiLink, FiLinkedin, FiTwitter } from "react-icons/fi";
import styles from "./blogpost.module.css";

const NETWORKS = [
  {
    label: "Share on X",
    Icon: FiTwitter,
    href: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: "Share on LinkedIn",
    Icon: FiLinkedin,
    href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: "Share on Facebook",
    Icon: FiFacebook,
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
];

// The page URL only exists in the browser; the server render gets an empty string.
const noop = () => () => {};
const usePageUrl = () =>
  useSyncExternalStore(
    noop,
    () => window.location.href,
    () => ""
  );

/** Copy-link button plus the usual share targets. Reads the URL on the client so it works on any host. */
export default function ShareBar({ title }) {
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

  return (
    <div className={styles.share}>
      <button
        type="button"
        onClick={copy}
        className={`${styles.shareBtn} ${copied ? styles.shareCopied : ""}`}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Copied" : "Copy link"}
      >
        {copied ? <FiCheck aria-hidden="true" /> : <FiLink aria-hidden="true" />}
      </button>

      {NETWORKS.map(({ label, Icon, href }) => (
        <a
          key={label}
          href={href(url, title)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.shareBtn}
          aria-label={label}
          title={label}
        >
          <Icon aria-hidden="true" />
        </a>
      ))}

      <span className={styles.shareStatus} role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
