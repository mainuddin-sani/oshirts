"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiMenu, FiX, FiArrowRight, FiChevronDown } from "react-icons/fi";
import { nav, productsMenu, site } from "@/data/home";
import Logo from "./Logo";
import styles from "./Header.module.css";

const slugify = (label) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const reduce = useReducedMotion();

  const megaTriggerRef = useRef(null);
  const megaPanelRef = useRef(null);
  const closeTimer = useRef(null);
  const suppressFocusOpen = useRef(false);

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

  useEffect(() => {
    if (!megaOpen) return undefined;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setMegaOpen(false);
      // Refocusing the trigger below fires its own onFocus handler, which
      // would immediately reopen the menu — swallow that one focus event.
      suppressFocusOpen.current = true;
      megaTriggerRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  useEffect(() => () => closeTimer.current && clearTimeout(closeTimer.current), []);

  const openMega = () => {
    if (suppressFocusOpen.current) {
      suppressFocusOpen.current = false;
      return;
    }
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const closeMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(false);
  };

  // Close the mega menu only if focus is leaving both the trigger and the
  // panel — not when it's just moving from one to the other.
  const handleMegaBlur = (e) => {
    const next = e.relatedTarget;
    if (next && (megaTriggerRef.current?.contains(next) || megaPanelRef.current?.contains(next))) {
      return;
    }
    scheduleCloseMega();
  };

  const close = () => {
    setOpen(false);
    setMobileProductsOpen(false);
  };

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
      <div className={`ic_container ${styles.inner}`}>
        <Logo className={styles.logo} />

        <nav className={styles.nav} aria-label="Primary">
          <ul>
            {nav.map((item) =>
              item.mega ? (
                <li
                  key={item.href}
                  className={styles.navMegaItem}
                  onMouseEnter={openMega}
                  onMouseLeave={scheduleCloseMega}
                >
                  <Link
                    ref={megaTriggerRef}
                    href={item.href}
                    className={styles.navMegaTrigger}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      closeMega();
                    }}
                    onFocus={openMega}
                    onBlur={handleMegaBlur}
                    aria-haspopup="true"
                    aria-expanded={megaOpen}
                    aria-controls="products-mega-menu"
                  >
                    {item.label}
                    <FiChevronDown aria-hidden="true" className={styles.chevron} />
                  </Link>

                  <AnimatePresence>
                    {megaOpen ? (
                      <motion.div
                        id="products-mega-menu"
                        ref={megaPanelRef}
                        className={styles.megaPanel}
                        role="region"
                        aria-label="Products menu"
                        onMouseEnter={openMega}
                        onMouseLeave={scheduleCloseMega}
                        onBlur={handleMegaBlur}
                        initial={reduce ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
                      >
                        <div className={styles.megaGrid}>
                          {productsMenu.map((col) => (
                            <div key={col.slug} className={styles.megaCol}>
                              <div className={styles.megaColHead}>
                                <Link href={`/products/${col.slug}`} onClick={closeMega}>
                                  {col.title}
                                </Link>
                              </div>
                              <ul>
                                {col.items.map((label) => (
                                  <li key={label}>
                                    <Link href={`/products/${col.slug}/${slugify(label)}`} onClick={closeMega}>
                                      {label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <Link href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
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
          <div>
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
                {nav.map((item, i) =>
                  item.mega ? (
                    <motion.li
                      key={item.href}
                      className={styles.mobileMegaItem}
                      initial={reduce ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: reduce ? 0 : 0.04 * i + 0.05, duration: 0.25 }}
                    >
                      <div className={styles.mobileMegaRow}>
                        <Link
                          href={item.href}
                          className={styles.mobileMegaLabel}
                          onClick={(e) => {
                            handleNavClick(e, item.href);
                            close();
                          }}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className={styles.mobileMegaToggle}
                          aria-expanded={mobileProductsOpen}
                          aria-controls="mobile-products-panel"
                          aria-label={
                            mobileProductsOpen ? "Collapse product categories" : "Expand product categories"
                          }
                          onClick={() => setMobileProductsOpen((v) => !v)}
                        >
                          <FiChevronDown
                            aria-hidden="true"
                            className={`${styles.chevron} ${mobileProductsOpen ? styles.chevronOpen : ""}`}
                          />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {mobileProductsOpen ? (
                          <motion.div
                            id="mobile-products-panel"
                            className={styles.mobileMegaPanel}
                            initial={reduce ? false : { height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                          >
                            {productsMenu.map((col) => (
                              <div key={col.slug} className={styles.mobileMegaCol}>
                                <Link
                                  href={`/products/${col.slug}`}
                                  className={styles.mobileMegaColTitle}
                                  onClick={close}
                                >
                                  {col.title}
                                </Link>
                                <ul>
                                  {col.items.map((label) => (
                                    <li key={label}>
                                      <Link
                                        href={`/products/${col.slug}/${slugify(label)}`}
                                        className={styles.mobileMegaSubLink}
                                        onClick={close}
                                      >
                                        {label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.li>
                  ) : (
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
                  )
                )}
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
