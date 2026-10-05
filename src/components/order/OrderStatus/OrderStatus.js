"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowRight,
  FiHash,
  FiHeadphones,
  FiMapPin,
  FiPackage,
  FiRotateCcw,
  FiSearch,
} from "react-icons/fi";
import { lookupOrder, sampleLookup } from "@/data/orderStatus";
import { site } from "@/data/home";
import styles from "./OrderStatus.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

const ORDER_PATTERN = /^(OS-?)?\d{4,8}$/i;
const ZIP_PATTERN = /^\d{5}$/;

export default function OrderStatus() {
  const reduce = useReducedMotion();
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { number: "", zip: "" },
  });

  const onSubmit = async (values) => {
    setResult(null);
    setNotFound(false);

    // Stands in for the tracking API call.
    await new Promise((resolve) => setTimeout(resolve, 900));

    const found = lookupOrder(values.number, values.zip);
    if (found) setResult(found);
    else setNotFound(true);
  };

  const startOver = () => {
    setResult(null);
    setNotFound(false);
    reset();
  };

  const fieldClass = (name) => `${styles.field} ${errors[name] ? styles.fieldError : ""}`;

  const errorMessage = (name) => (
    <AnimatePresence initial={false}>
      {errors[name] ? (
        <motion.p
          className={styles.error}
          role="alert"
          initial={reduce ? false : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: EASE }}
        >
          <FiAlertCircle aria-hidden="true" />
          {errors[name].message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );

  return (
    <section className={styles.page} aria-labelledby="order-status-title">
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={`ic_container ${styles.inner}`}>
        {/* ---------------- Lookup ---------------- */}
        <div className={styles.lookup}>
          <span className="ic_eyebrow">Order tracking</span>
          <h1 id="order-status-title">Check your order status</h1>
          <p className={`ic_lead ${styles.lead}`}>
            Enter the order number from your confirmation email and the billing ZIP code used at checkout.
            No account needed.
          </p>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.row}>
              <div className={fieldClass("number")}>
                <label htmlFor="number">Order number</label>
                <div className={styles.control}>
                  <FiHash className={styles.leadIcon} aria-hidden="true" />
                  <input
                    id="number"
                    type="text"
                    autoComplete="off"
                    placeholder="OS-48219"
                    aria-invalid={errors.number ? "true" : "false"}
                    {...register("number", {
                      required: "Order number is required",
                      pattern: { value: ORDER_PATTERN, message: "Looks like OS-48219" },
                    })}
                  />
                </div>
                {errorMessage("number")}
              </div>

              <div className={fieldClass("zip")}>
                <label htmlFor="zip">Billing ZIP code</label>
                <div className={styles.control}>
                  <FiMapPin className={styles.leadIcon} aria-hidden="true" />
                  <input
                    id="zip"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="78701"
                    maxLength={5}
                    aria-invalid={errors.zip ? "true" : "false"}
                    {...register("zip", {
                      required: "ZIP code is required",
                      pattern: { value: ZIP_PATTERN, message: "Enter a 5-digit ZIP" },
                    })}
                  />
                </div>
                {errorMessage("zip")}
              </div>
            </div>

            <button
              type="submit"
              className={`ic_btn ic_btn_primary ic_btn_lg ${styles.submit}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Checking…
                </>
              ) : (
                <>
                  <FiSearch aria-hidden="true" />
                  Check status
                </>
              )}
            </button>

            <p className={styles.sample}>
              Just looking around? Try <strong>{sampleLookup.number}</strong> with ZIP{" "}
              <strong>{sampleLookup.zip}</strong>.
            </p>
          </form>
        </div>

        {/* ---------------- Result ---------------- */}
        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {notFound ? (
              <motion.div
                key="not-found"
                className={styles.notFound}
                role="alert"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <span className={styles.notFoundIcon}>
                  <FiAlertCircle aria-hidden="true" />
                </span>
                <div>
                  <h2>We could not find that order</h2>
                  <p>
                    Check the order number against your confirmation email, and make sure the ZIP is the
                    billing one rather than the shipping one. Orders placed in the last hour can take a few
                    minutes to appear.
                  </p>
                  <div className={styles.notFoundActions}>
                    <button type="button" className="ic_btn ic_btn_secondary" onClick={startOver}>
                      <FiRotateCcw aria-hidden="true" />
                      Try again
                    </button>
                    <a href={`mailto:${site.email}`} className="ic_btn ic_btn_secondary">
                      <FiHeadphones aria-hidden="true" />
                      Contact support
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : null}

            {result ? (
              <motion.div
                key={result.number}
                className={styles.result}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {/* Status hero */}
                <div className={styles.hero}>
                  <div className={styles.heroTop}>
                    <div>
                      <span className={styles.heroLabel}>Order {result.number}</span>
                      <h2 className={styles.heroStatus}>{result.status}</h2>
                      <p className={styles.heroText}>{result.statusText}</p>
                    </div>

                    <span className={`${styles.pill} ${styles[`pill_${result.tone}`]}`}>
                      <span className={styles.pillDot} aria-hidden="true" />
                      {result.isComplete ? "Complete" : "On track"}
                    </span>
                  </div>

                  <div className={styles.progress}>
                    <div className={styles.progressTrack}>
                      <motion.span
                        className={styles.progressFill}
                        initial={reduce ? false : { width: 0 }}
                        animate={{ width: `${result.progress}%` }}
                        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                      />
                    </div>
                    <span className={styles.progressValue}>{result.progress}% complete</span>
                  </div>
                </div>

                {/* Four facts */}
                <dl className={styles.facts}>
                  <div className={styles.fact}>
                    <dt>Order number</dt>
                    <dd className={styles.factMono}>{result.number}</dd>
                  </div>
                  <div className={styles.fact}>
                    <dt>Order date</dt>
                    <dd>{result.orderDate}</dd>
                  </div>
                  <div className={styles.fact}>
                    <dt>Current status</dt>
                    <dd>{result.status}</dd>
                  </div>
                  <div className={styles.fact}>
                    <dt>{result.estimatedLabel}</dt>
                    <dd className={styles.factStrong}>{result.estimated}</dd>
                  </div>
                </dl>

                {/* Timeline */}
                <div className={styles.card}>
                  <div className={styles.cardHead}>
                    <h3>Progress</h3>
                    <p className={styles.cardNote}>{result.delivery} delivery</p>
                  </div>

                  <ol className={styles.timeline}>
                    {result.timeline.map(({ id, label, text, date, state, icon: Icon }, index) => (
                      <motion.li
                        key={id}
                        className={`${styles.node} ${styles[`node_${state}`]}`}
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 + index * 0.08, ease: EASE }}
                        aria-current={state === "current" ? "step" : undefined}
                      >
                        <span className={styles.nodeIcon}>
                          <Icon size={17} aria-hidden="true" />
                        </span>
                        <span className={styles.nodeText}>
                          <span className={styles.nodeLabel}>{label}</span>
                          <span className={styles.nodeDate}>{date}</span>
                          <span className={styles.nodeHint}>{text}</span>
                        </span>
                      </motion.li>
                    ))}
                  </ol>
                </div>

                {/* Order details */}
                <div className={styles.card}>
                  <div className={styles.cardHead}>
                    <h3>Order details</h3>
                    <p className={styles.cardNote}>Total {result.total}</p>
                  </div>

                  <div className={styles.item}>
                    <div className={styles.itemThumb}>
                      <Image src={result.item.image} alt="" width={64} height={64} />
                    </div>
                    <div className={styles.itemText}>
                      <span className={styles.itemName}>{result.item.name}</span>
                      <span className={styles.itemMeta}>
                        {result.item.brand} · {result.item.color} · {result.item.quantity} shirts
                      </span>
                    </div>
                  </div>

                  <dl className={styles.detailList}>
                    <div>
                      <dt>Shipping to</dt>
                      <dd>{result.shipTo}</dd>
                    </div>
                    <div>
                      <dt>Tracking number</dt>
                      <dd className={result.tracking ? styles.factMono : undefined}>
                        {result.tracking || "Available once the order ships"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className={styles.resultActions}>
                  <a href={`mailto:${site.email}`} className="ic_btn ic_btn_primary ic_btn_lg">
                    <FiHeadphones aria-hidden="true" />
                    Ask about this order
                  </a>
                  <button type="button" className="ic_btn ic_btn_secondary ic_btn_lg" onClick={startOver}>
                    Check another order
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* ---------------- Help ---------------- */}
        {!result ? (
          <div className={styles.help}>
            <span className={styles.helpIcon}>
              <FiPackage size={18} aria-hidden="true" />
            </span>
            <p>
              Can&apos;t find your order number? It is in the subject line of your confirmation email, or{" "}
              <Link href="/login" className="ic_link">
                sign in
              </Link>{" "}
              to see every order on your account.
            </p>
            <Link href="/login" className={styles.helpLink}>
              Sign in
              <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
