"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiChevronRight, FiClock, FiMail, FiPhone } from "react-icons/fi";
import { aboutNav } from "@/data/about";
import { site } from "@/data/home";
import styles from "./About.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

/**
 * Frame for every page in the company section: a sticky sidebar on desktop
 * that becomes a swipeable rail of pills under the header on smaller screens.
 */
export default function AboutShell({ children }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const listRef = useRef(null);
  const activeRef = useRef(null);

  // On the horizontal rail the active pill can sit off-screen; bring it into
  // view without ever moving the page itself. A no-op on desktop, where the
  // list is not scrollable.
  useEffect(() => {
    const list = listRef.current;
    const active = activeRef.current;
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;

    const listBox = list.getBoundingClientRect();
    const itemBox = active.getBoundingClientRect();
    const delta = itemBox.left - listBox.left - (listBox.width - itemBox.width) / 2;

    list.scrollBy({ left: delta, behavior: reduce ? "auto" : "smooth" });
  }, [pathname, reduce]);

  return (
    <section className={styles.page}>
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={`ic_container ${styles.grid}`}>
        <aside className={styles.sidebar}>
          <nav className={styles.navCard} aria-label="Company">
            <div className={styles.navHead}>
              <span className={styles.navTitle}>Company</span>
              <span className={styles.navRule} aria-hidden="true" />
            </div>

            <ul className={styles.navList} ref={listRef}>
              {aboutNav.map(({ label, href, icon: Icon }) => {
                const isActive = pathname === href;

                return (
                  <li key={href} ref={isActive ? activeRef : null}>
                    <Link
                      href={href}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {/* Shared layout id: the highlight glides from the old
                          item to the new one instead of blinking across. */}
                      {isActive ? (
                        <motion.span
                          layoutId="about-nav-highlight"
                          className={styles.navHighlight}
                          aria-hidden="true"
                          transition={
                            reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 38 }
                          }
                        />
                      ) : null}

                      <span className={styles.navIcon}>
                        <Icon size={15} aria-hidden="true" />
                      </span>
                      <span className={styles.navLabel}>{label}</span>
                      {/* <FiChevronRight className={styles.navChevron} aria-hidden="true" /> */}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* <motion.div
            className={styles.help}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <div className={styles.helpGlow} aria-hidden="true" />

            <span className={styles.helpEyebrow}>Support</span>
            <h4>Talk to a print specialist</h4>
            <p>Real people on the phone and email — replies average under 12 minutes.</p>

            <a href={`tel:${site.phone.replace(/[^0-9]/g, "")}`} className={styles.helpPhone}>
              <span className={styles.helpPhoneIcon}>
                <FiPhone size={15} aria-hidden="true" />
              </span>
              {site.phone}
              <FiArrowRight className={styles.helpArrow} aria-hidden="true" />
            </a>

            <div className={styles.helpMeta}>
              <a href={`mailto:${site.email}`} className={styles.helpMetaLink}>
                <FiMail size={13} aria-hidden="true" />
                {site.email}
              </a>
              <span className={styles.helpMetaLine}>
                <FiClock size={13} aria-hidden="true" />
                {site.hours}
              </span>
            </div>
          </motion.div> */}
        </aside>

        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
