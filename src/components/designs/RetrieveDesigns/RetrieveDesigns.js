"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowRight,
  FiFolder,
  FiHeadphones,
  FiMail,
  FiPenTool,
  FiRotateCcw,
  FiSearch,
} from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import SavedDesignCard from "@/components/designs/SavedDesignCard/SavedDesignCard";
import { lookupDesigns, relativeSavedDate, sampleEmail } from "@/data/savedDesigns";
import { site } from "@/data/home";
import styles from "./RetrieveDesigns.module.css";

const EASE = [0.2, 0.7, 0.2, 1];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

/* Placeholders shown while the lookup runs, so the grid has shape before it
   has content rather than collapsing to nothing. */
const SKELETONS = [0, 1, 2];

export default function RetrieveDesigns({ initialEmail = "" }) {
  const reduce = useReducedMotion();

  // null = nothing searched yet. Otherwise { email, designs } where designs
  // is null for an unknown address and [] for an account with none saved.
  const [result, setResult] = useState(null);
  // Opening the page with ?email= goes straight into the loading state, so the
  // first paint already shows the lookup running rather than an idle form.
  const [searching, setSearching] = useState(Boolean(initialEmail));

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { email: initialEmail },
  });

  const runLookup = async (email) => {
    setSearching(true);
    setResult(null);

    // Stands in for the saved-designs API call.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setResult({ email: email.trim(), designs: lookupDesigns(email) });
    setSearching(false);
  };

  const onSubmit = ({ email }) => runLookup(email);

  // Arriving back from a design detail page carries the address in the URL, so
  // the results the visitor already had are restored rather than retyped. The
  // form input is already filled from defaultValues.
  useEffect(() => {
    if (!initialEmail) return undefined;

    const timer = setTimeout(() => {
      setResult({ email: initialEmail.trim(), designs: lookupDesigns(initialEmail) });
      setSearching(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [initialEmail]);

  const startOver = () => {
    setResult(null);
    reset({ email: "" });
  };

  const tryExample = () => {
    setValue("email", sampleEmail, { shouldValidate: true });
    runLookup(sampleEmail);
  };

  const designs = result?.designs;
  const busy = searching || isSubmitting;

  return (
    <section className={styles.page} aria-labelledby="retrieve-title">
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={`ic_container ${styles.inner}`}>
        {/* ---------------- Lookup ---------------- */}
        <Reveal className={styles.lookup}>
          <span className="ic_eyebrow">Saved designs</span>
          <h1 id="retrieve-title">Pick up where you left off</h1>
          <p className={`ic_lead ${styles.lead}`}>
            Every design you save in the studio is kept against your email address. Enter it below and we
            will pull them all back up — no account or password needed.
          </p>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={`${styles.field} ${errors.email ? styles.fieldError : ""}`}>
              <label htmlFor="email">Email address</label>
              <div className={styles.control}>
                <FiMail className={styles.leadIcon} aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: "Email address is required",
                    pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" },
                  })}
                />
              </div>

              <AnimatePresence initial={false}>
                {errors.email ? (
                  <motion.p
                    className={styles.error}
                    role="alert"
                    initial={reduce ? false : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: EASE }}
                  >
                    <FiAlertCircle aria-hidden="true" />
                    {errors.email.message}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              className={`ic_btn ic_btn_primary ic_btn_lg ${styles.submit}`}
              disabled={busy}
            >
              {busy ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Retrieving…
                </>
              ) : (
                <>
                  <FiSearch aria-hidden="true" />
                  Retrieve designs
                </>
              )}
            </button>

            <p className={styles.sample}>
              Just looking around? Try{" "}
              <button type="button" className={styles.sampleLink} onClick={tryExample}>
                {sampleEmail}
              </button>
              .
            </p>
          </form>
        </Reveal>

        {/* ---------------- Results ---------------- */}
        <div aria-live="polite" aria-busy={busy}>
          <AnimatePresence mode="wait">
            {/* Loading */}
            {busy ? (
              <motion.div
                key="loading"
                className={styles.results}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
              >
                <p className={styles.srOnlyStatus}>Retrieving your saved designs…</p>
                <ul className={styles.grid}>
                  {SKELETONS.map((key) => (
                    <li key={key} className={styles.skeleton} aria-hidden="true">
                      <span className={styles.skeletonMedia} />
                      <span className={styles.skeletonLines}>
                        <span className={styles.skeletonLine} />
                        <span className={`${styles.skeletonLine} ${styles.skeletonLineShort}`} />
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}

            {/* Unknown address */}
            {!busy && result && designs === null ? (
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
                  <h2>No designs saved to that address</h2>
                  <p>
                    We have nothing filed under <strong>{result.email}</strong>. Designs are saved against
                    the address you used in the studio, so it may be a work address or a personal one.
                    Check the spelling, or start something new — it only takes a minute.
                  </p>
                  <div className={styles.notFoundActions}>
                    <button type="button" className="ic_btn ic_btn_secondary" onClick={startOver}>
                      <FiRotateCcw aria-hidden="true" />
                      Try another email
                    </button>
                    <Link href="/products/t-shirts" className="ic_btn ic_btn_secondary">
                      <FiPenTool aria-hidden="true" />
                      Start a new design
                    </Link>
                    <a href={`mailto:${site.email}`} className="ic_btn ic_btn_secondary">
                      <FiHeadphones aria-hidden="true" />
                      Contact support
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : null}

            {/* Account with nothing saved */}
            {!busy && designs?.length === 0 ? (
              <motion.div
                key="empty"
                className={styles.empty}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <span className={styles.emptyIcon}>
                  <FiFolder aria-hidden="true" />
                </span>
                <h2>Nothing saved yet</h2>
                <p>
                  <strong>{result.email}</strong> has an account with us, but no designs saved against it.
                  Anything you build in the studio is kept here automatically — you do not have to finish it
                  first.
                </p>
                <div className={styles.emptyActions}>
                  <Link href="/products/t-shirts" className="ic_btn ic_btn_primary ic_btn_lg">
                    <FiPenTool aria-hidden="true" />
                    Start designing
                  </Link>
                  <button type="button" className="ic_btn ic_btn_secondary ic_btn_lg" onClick={startOver}>
                    Try another email
                  </button>
                </div>
              </motion.div>
            ) : null}

            {/* Results */}
            {!busy && designs?.length ? (
              <motion.div
                key={result.email}
                className={styles.results}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className={styles.resultsHead}>
                  <div>
                    <h2 className={styles.resultsTitle}>
                      {designs.length} saved {designs.length === 1 ? "design" : "designs"}
                    </h2>
                    <p className={styles.resultsMeta}>
                      Filed under <strong>{result.email}</strong>
                      <span className={styles.metaDot} aria-hidden="true" />
                      Most recent {relativeSavedDate(designs[0].savedAt).toLowerCase()}
                    </p>
                  </div>

                  <button type="button" className="ic_btn ic_btn_secondary ic_btn_sm" onClick={startOver}>
                    <FiRotateCcw aria-hidden="true" />
                    Different email
                  </button>
                </div>

                <ul className={styles.grid}>
                  {designs.map((design, i) => (
                    <motion.li
                      key={design.id}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: reduce ? 0 : 0.05 * i, ease: EASE }}
                    >
                      <SavedDesignCard design={design} priority={i < 3} />
                    </motion.li>
                  ))}
                </ul>

                <div className={styles.resultsFoot}>
                  <p>
                    Designs are kept for 12 months from the day you last opened them. Need one restored after
                    that? <Link href="/contact" className="ic_link">Ask a specialist</Link>.
                  </p>
                  <Link href="/products/t-shirts" className={styles.footLink}>
                    Start a new design
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* ---------------- Help ---------------- */}
        {!result && !busy ? (
          <Reveal className={styles.help} delay={0.08}>
            <span className={styles.helpIcon}>
              <FiFolder size={18} aria-hidden="true" />
            </span>
            <p>
              Saved a design while signed in?{" "}
              <Link href="/login" className="ic_link">
                Sign in
              </Link>{" "}
              to see everything on your account, including past orders.
            </p>
            <Link href="/login" className={styles.helpLink}>
              Sign in
              <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
