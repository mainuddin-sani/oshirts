"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { FiLock } from "react-icons/fi";
import { steps } from "@/data/checkout";
import { useCheckout } from "./CheckoutContext";
import CheckoutSteps from "./CheckoutSteps/CheckoutSteps";
import OrderSummary from "./OrderSummary";
import styles from "./Checkout.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

const COPY = {
  summary: {
    title: "Review your order",
    hint: "Confirm the product, print and size run before we move on.",
  },
  instructions: {
    title: "Print instructions",
    hint: "Anything the press team should know, plus artwork if you have it.",
  },
  shipping: {
    title: "Shipping details",
    hint: "Where the run is going, and how fast it needs to get there.",
  },
  payment: {
    title: "Payment",
    hint: "Nothing is charged until you approve the proof.",
  },
};

/**
 * Frame shared by the four checkout steps: heading, progress rail and the
 * sticky order summary. The confirmation page opts out of all of it.
 */
export default function CheckoutShell({ children }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const { completed } = useCheckout();

  const activeIndex = steps.findIndex((step) => pathname?.startsWith(step.href));
  const activeId = steps[activeIndex]?.id;

  if (!activeId) {
    return (
      <section className={styles.page}>
        <div className="ic_container">{children}</div>
      </section>
    );
  }

  const copy = COPY[activeId];

  return (
    <section className={styles.page}>
      <div className="ic_container">
        <header className={styles.head}>
          <div>
            <p className={styles.headStep}>
              Step {activeIndex + 1} of {steps.length}
            </p>
            <h1>{copy.title}</h1>
            <p className={styles.headHint}>{copy.hint}</p>
          </div>

          <span className={styles.secure}>
            <FiLock size={14} aria-hidden="true" />
            Secure checkout
          </span>
        </header>

        <CheckoutSteps activeId={activeId} completed={completed} />

        <div className={styles.grid}>
          {/* Keyed on the step so each one eases in on arrival. */}
          <motion.div
            key={activeId}
            className={styles.main}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {children}
          </motion.div>

          <aside className={styles.rail} aria-label="Order summary">
            <OrderSummary />
          </aside>
        </div>
      </div>
    </section>
  );
}
