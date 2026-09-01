"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { nav, site } from "@/data/home";
import Logo from "./Logo";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  // Smoothly scroll to in-page anchors ourselves: a single deliberate call,
  // unlike CSS `scroll-behavior:smooth`, which also smooths keyboard paging
  // and can misbehave under rapid repeats (see globals.css).
  const handleNavClick = (e, href) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.scrolled : ""}`}>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <div className={`ic_container ${styles.inner}`}>
        <Logo className={styles.logo} />

        <nav className={styles.nav} aria-label="Primary">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href={site.ctaSecondary.href} className={`ic_btn ic_btn_secondary ${styles.quote}`}>
            {site.ctaSecondary.label}
          </Link>
          <Link href={site.ctaPrimary.href} className="ic_btn ic_btn_primary">
            {site.ctaPrimary.label}
            <FiArrowRight aria-hidden="true" />
          </Link>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            className={styles.mobile}
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <nav aria-label="Mobile">
              <ul>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduce ? 0 : 0.04 * i + 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                        close();
                      }}
                    >
                      {item.label}
                      <FiArrowRight aria-hidden="true" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className={styles.mobileActions}>
              <Link href={site.ctaSecondary.href} className="ic_btn ic_btn_secondary" onClick={close}>
                {site.ctaSecondary.label}
              </Link>
              <Link href={site.ctaPrimary.href} className="ic_btn ic_btn_primary" onClick={close}>
                {site.ctaPrimary.label}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
