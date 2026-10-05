"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiCheck, FiEdit3, FiGrid, FiPenTool } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import { money, order, quantity } from "@/data/checkout";
import { useCheckout } from "./CheckoutContext";
import styles from "./Checkout.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

const largestRun = Math.max(...order.sizes.map((size) => size.qty));

export default function SummaryStep() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { update } = useCheckout();

  // "all" shows the four views as a contact sheet; any view id shows it large.
  const [view, setView] = useState("front");
  const active = order.views.find((entry) => entry.id === view);

  const handleContinue = () => {
    update({ reviewed: true });
    router.push("/checkout/instructions");
  };

  return (
    <>
      <Reveal className={styles.card}>
        <div className={styles.cardHead}>
          <h2>Review your product</h2>
          <p className={styles.cardNote}>Check every side before it goes to press.</p>
        </div>

        {/* ---------------- Viewer + facts ---------------- */}
        <div className={styles.review}>
          <div className={styles.viewer}>
            <div className={styles.viewTabs} role="group" aria-label="Product view">
              {order.views.map((entry) => (
                <button
                  type="button"
                  key={entry.id}
                  className={`${styles.viewTab} ${view === entry.id ? styles.viewTabActive : ""}`}
                  aria-pressed={view === entry.id}
                  onClick={() => setView(entry.id)}
                >
                  {entry.label}
                </button>
              ))}
              <button
                type="button"
                className={`${styles.viewTab} ${styles.viewTabAll} ${view === "all" ? styles.viewTabActive : ""}`}
                aria-pressed={view === "all"}
                onClick={() => setView("all")}
              >
                <FiGrid aria-hidden="true" />
                All
              </button>
            </div>

            <div className={styles.stage}>
              <AnimatePresence mode="wait" initial={false}>
                {view === "all" ? (
                  <motion.ul
                    key="all"
                    className={styles.sheet}
                    initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    {order.views.map((entry) => (
                      <li key={entry.id} className={styles.sheetCell}>
                        <button type="button" className={styles.sheetButton} onClick={() => setView(entry.id)}>
                          <Image
                            src={entry.image}
                            alt={`${order.name} in ${order.color}, ${entry.label.toLowerCase()} view`}
                            placeholder="blur"
                            sizes="(min-width: 1024px) 160px, 45vw"
                          />
                          <span className={styles.sheetLabel}>{entry.label}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                ) : (
                  <motion.figure
                    key={active.id}
                    className={styles.stageFigure}
                    initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <Image
                      src={active.image}
                      alt={`${order.name} in ${order.color}, ${active.label.toLowerCase()} view`}
                      placeholder="blur"
                      priority
                      sizes="(min-width: 1024px) 320px, 90vw"
                    />
                    <figcaption className={styles.stageCaption}>{active.label} view</figcaption>
                  </motion.figure>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className={styles.facts}>
            <span className={styles.brand}>{order.brand}</span>
            <h3 className={styles.productName}>{order.name}</h3>
            <p className={styles.productText}>{order.description}</p>

            <dl className={styles.specs}>
              <div className={styles.spec}>
                <dt>Colour</dt>
                <dd>
                  <span className={styles.swatch} style={{ background: order.colorHex }} aria-hidden="true" />
                  {order.color}
                </dd>
              </div>
              <div className={styles.spec}>
                <dt>Quantity</dt>
                <dd>{quantity} shirts</dd>
              </div>
              <div className={styles.spec}>
                <dt>Unit price</dt>
                <dd>{money(order.unitPrice)}</dd>
              </div>
              <div className={styles.spec}>
                <dt>Print method</dt>
                <dd>{order.prints[0].method}</dd>
              </div>
            </dl>

            <div className={styles.editRow}>
              <Link href={order.productHref} className="ic_btn ic_btn_secondary ic_btn_sm">
                <FiEdit3 aria-hidden="true" />
                Edit product
              </Link>
              <Link href={order.designHref} className="ic_btn ic_btn_secondary ic_btn_sm">
                <FiPenTool aria-hidden="true" />
                Edit design
              </Link>
            </div>
          </div>
        </div>

        {/* ---------------- Print + sizes ---------------- */}
        <div className={styles.reviewDetails}>
          <section aria-labelledby="print-details-title">
            <h4 id="print-details-title" className={styles.subTitle}>
              Print details
              <span>
                {order.prints.length} location{order.prints.length > 1 ? "s" : ""}
              </span>
            </h4>

            <ul className={styles.printList}>
              {order.prints.map((print) => (
                <li key={print.view} className={styles.printRow}>
                  <div className={styles.printHead}>
                    <span className={styles.printView}>{print.view}</span>
                    <span className={styles.printPrice}>{money(print.unitPrice)} / shirt</span>
                  </div>
                  <div className={styles.printMeta}>
                    <span>{print.method}</span>
                    <span className={styles.metaDot} aria-hidden="true" />
                    <span>{print.size}</span>
                    <span className={styles.metaDot} aria-hidden="true" />
                    <span className={styles.inks}>
                      {print.inks.map((ink, index) => (
                        <span
                          key={`${print.view}-${index}`}
                          className={styles.ink}
                          style={{ background: ink }}
                          aria-hidden="true"
                        />
                      ))}
                      {print.inks.length} ink{print.inks.length > 1 ? "s" : ""}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="size-run-title">
            <h4 id="size-run-title" className={styles.subTitle}>
              Size &amp; quantity
              <span>{quantity} total</span>
            </h4>

            <ul className={styles.sizes}>
              {order.sizes.map((size) => (
                <li key={size.label} className={styles.sizeRow}>
                  <span className={styles.sizeLabel}>{size.label}</span>
                  <span className={styles.sizeBar} aria-hidden="true">
                    <span
                      className={styles.sizeFill}
                      style={{ width: `${(size.qty / largestRun) * 100}%` }}
                    />
                  </span>
                  <span className={styles.sizeQty}>{size.qty}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <p className={styles.cardFoot}>
          <FiCheck aria-hidden="true" />
          Screens, setup and a specialist design review are included. Sizes are bagged separately.
        </p>
      </Reveal>

      <div className={styles.nav}>
        <p className={styles.navNote}>Shipping and payment come next.</p>
        <button type="button" className="ic_btn ic_btn_primary ic_btn_lg" onClick={handleContinue}>
          Continue to instructions
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
