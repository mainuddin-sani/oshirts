"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiPlus, FiMessageCircle, FiMail } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import { faqs, site } from "@/data/home";
import styles from "./Faq.module.css";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className={`ic_section_space ${styles.section}`} aria-labelledby="faq-title">
      <div className={`ic_container ${styles.grid}`}>
        <Reveal className={styles.aside}>
          <span className="ic_eyebrow">FAQ</span>
          <h2 id="faq-title">Questions we get before the first order.</h2>
          <p>Straight answers on minimums, turnaround, files and what happens if something goes wrong.</p>

          {/* <div className={styles.contact}>
            <h6>Still have a question?</h6>
            <Link href="#chat" className={styles.contactLink}>
              <FiMessageCircle aria-hidden="true" /> Chat with a specialist
            </Link>
            <a href={`mailto:${site.email}`} className={styles.contactLink}>
              <FiMail aria-hidden="true" /> {site.email}
            </a>
          </div> */}
        </Reveal>

        <Reveal as="ul" className={styles.list} delay={0.1}>
          {faqs.map((item, i) => {
            const open = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <li key={item.q} className={`${styles.item} ${open ? styles.open : ""}`}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    className={styles.trigger}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.plus} aria-hidden="true">
                      <FiPlus />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={styles.panel}
                      initial={reduce ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { height: "auto", opacity: 1, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
