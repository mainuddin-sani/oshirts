"use client";

import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { steps } from "@/data/checkout";
import styles from "./step.module.css";

/**
 * Minimal horizontal stepper: Summary → Instructions → Shipping → Payment.
 * Small numbered badges with labels beside them, joined by thin connector
 * lines. Completed steps link back so a customer can correct something
 * without losing what they entered.
 */
export default function CheckoutSteps({ activeId, completed = {} }) {
  const activeIndex = steps.findIndex((step) => step.id === activeId);

  return (
    <nav className={styles.steps} aria-label="Checkout progress">
      <ol className={styles.stepsList}>
        {steps.map((step, index) => {
          const isActive = step.id === activeId;
          const isDone = index < activeIndex || (completed[step.id] && !isActive);
          const canRevisit = isDone && completed[step.id];

          const inner = (
            <>
              <span className={styles.stepIndex} aria-hidden="true">
                {isDone ? <FiCheck /> : index + 1}
              </span>
              <span className={styles.stepLabel}>{step.label}</span>
            </>
          );

          return (
            <li
              key={step.id}
              className={[
                styles.step,
                isActive && styles.stepActive,
                isDone && styles.stepDone,
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive ? "step" : undefined}
            >
              {canRevisit ? (
                <Link href={step.href} className={styles.stepLink}>
                  {inner}
                  <span className="ic_sr_only">
                    {step.label} — completed, go back to edit
                  </span>
                </Link>
              ) : (
                <span className={styles.stepLink}>{inner}</span>
              )}

              {index < steps.length - 1 ? (
                <span className={styles.connector} aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
