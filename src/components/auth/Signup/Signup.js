"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiBriefcase,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import { FaStar, FaGoogle, FaApple } from "react-icons/fa";
import { signup } from "@/data/auth";
import styles from "./Signup.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const NAME_PATTERN = /^[\p{L}][\p{L}'\- ]*$/u;

const STRENGTH_LABELS = ["Too short", "Weak", "Fair", "Strong", "Excellent"];

/** 0–4 score shared by the meter bars and the hint copy below them. */
function scorePassword(value = "") {
  if (value.length < 8) return 0;
  let score = 1;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value) || value.length >= 14) score += 1;
  return Math.min(score, 4);
}

export default function Signup() {
  const reduce = useReducedMotion();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      password: "",
      confirmPassword: "",
      terms: false,
      updates: true,
    },
  });

  const passwordValue = useWatch({ control, name: "password" });
  const strength = scorePassword(passwordValue);

  // A field only earns its green tick once the user has actually been in it
  // and left it clean — never on a freshly loaded, empty form.
  const isValid = (name) =>
    Boolean((touchedFields[name] || dirtyFields[name]) && !errors[name] && getValues(name));

  const fieldClass = (name) =>
    [styles.field, errors[name] && styles.fieldError, isValid(name) && styles.fieldValid]
      .filter(Boolean)
      .join(" ");

  const onSubmit = async (values) => {
    // No auth backend in the project yet — the simulated round trip keeps the
    // pending and success states wired up for the real call.
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setSubmitted({ firstName: values.firstName, email: values.email });
    reset();
  };

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay, ease: EASE },
      };

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
    <section className={styles.page} aria-labelledby="signup-title">
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={`ic_container ${styles.grid}`}>

        {/* ---------------- Form panel ---------------- */}
        <motion.div className={styles.panel} {...fadeUp(0.1)}>
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="success"
                className={styles.success}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <span className={styles.successIcon}>
                  <FiCheckCircle aria-hidden="true" />
                </span>
                <h2>Welcome aboard, {submitted.firstName}.</h2>
                <p>
                  We sent a confirmation link to <strong>{submitted.email}</strong>. Confirm it and your
                  dashboard, saved designs and reorder history are ready to go.
                </p>
                <div className={styles.successActions}>
                  <Link href="/design" className="ic_btn ic_btn_primary ic_btn_lg">
                    Start designing
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    className="ic_btn ic_btn_secondary ic_btn_lg"
                    onClick={() => setSubmitted(null)}
                  >
                    Create another account
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <header className={styles.panelHead}>
                  <h2>Create your account</h2>
                  <p>
                    Already have one?{" "}
                    <Link href="/login" className="ic_link">
                      Sign in
                    </Link>
                  </p>
                </header>

                <div className={styles.socials}>
                  <button type="button" className={styles.social}>
                    <FaGoogle aria-hidden="true" />
                    Sign up with Google
                  </button>
                  <button type="button" className={styles.social}>
                    <FaApple aria-hidden="true" />
                    Sign up with Apple
                  </button>
                </div>

                <div className={styles.divider}>
                  <span>or use your email</span>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className={styles.row}>
                    <div className={fieldClass("firstName")}>
                      <label htmlFor="firstName">First name</label>
                      <div className={styles.control}>
                        <FiUser className={styles.leadIcon} aria-hidden="true" />
                        <input
                          id="firstName"
                          type="text"
                          autoComplete="given-name"
                          placeholder="Dana"
                          aria-invalid={errors.firstName ? "true" : "false"}
                          {...register("firstName", {
                            required: "First name is required",
                            minLength: { value: 2, message: "Use at least 2 characters" },
                            pattern: { value: NAME_PATTERN, message: "Letters, hyphens and apostrophes only" },
                          })}
                        />
                        {isValid("firstName") ? (
                          <FiCheck className={styles.validIcon} aria-hidden="true" />
                        ) : null}
                      </div>
                      {errorMessage("firstName")}
                    </div>

                    <div className={fieldClass("lastName")}>
                      <label htmlFor="lastName">Last name</label>
                      <div className={styles.control}>
                        <FiUser className={styles.leadIcon} aria-hidden="true" />
                        <input
                          id="lastName"
                          type="text"
                          autoComplete="family-name"
                          placeholder="Whitfield"
                          aria-invalid={errors.lastName ? "true" : "false"}
                          {...register("lastName", {
                            required: "Last name is required",
                            minLength: { value: 2, message: "Use at least 2 characters" },
                            pattern: { value: NAME_PATTERN, message: "Letters, hyphens and apostrophes only" },
                          })}
                        />
                        {isValid("lastName") ? (
                          <FiCheck className={styles.validIcon} aria-hidden="true" />
                        ) : null}
                      </div>
                      {errorMessage("lastName")}
                    </div>
                  </div>

                  <div className={fieldClass("email")}>
                    <label htmlFor="email">Work email</label>
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
                          required: "Email is required",
                          pattern: { value: EMAIL_PATTERN, message: "Enter a valid email address" },
                        })}
                      />
                      {isValid("email") ? <FiCheck className={styles.validIcon} aria-hidden="true" /> : null}
                    </div>
                    {errorMessage("email")}
                  </div>

                  <div className={fieldClass("company")}>
                    <label htmlFor="company">
                      Company or team <span className={styles.optional}>Optional</span>
                    </label>
                    <div className={styles.control}>
                      <FiBriefcase className={styles.leadIcon} aria-hidden="true" />
                      <input
                        id="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Summit Robotics"
                        aria-invalid={errors.company ? "true" : "false"}
                        {...register("company", {
                          maxLength: { value: 60, message: "Keep it under 60 characters" },
                        })}
                      />
                    </div>
                    {errorMessage("company")}
                  </div>

                  <div className={fieldClass("password")}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.control}>
                      <FiLock className={styles.leadIcon} aria-hidden="true" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="At least 8 characters"
                        aria-invalid={errors.password ? "true" : "false"}
                        aria-describedby="password-strength"
                        {...register("password", {
                          required: "Password is required",
                          minLength: { value: 8, message: "Use at least 8 characters" },
                          validate: {
                            hasLetter: (v) => /[A-Za-z]/.test(v) || "Include at least one letter",
                            hasNumber: (v) => /\d/.test(v) || "Include at least one number",
                          },
                        })}
                      />
                      <button
                        type="button"
                        className={styles.reveal}
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                      </button>
                    </div>

                    <div
                      id="password-strength"
                      className={`${styles.strength} ${styles[`strength${strength}`]}`}
                    >
                      <div className={styles.strengthBars} aria-hidden="true">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <span key={i} className={i < strength ? styles.strengthOn : ""} />
                        ))}
                      </div>
                      <span className={styles.strengthLabel} aria-live="polite">
                        {passwordValue
                          ? STRENGTH_LABELS[strength]
                          : "8+ characters, one letter and one number"}
                      </span>
                    </div>

                    {errorMessage("password")}
                  </div>

                  <div className={fieldClass("confirmPassword")}>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <div className={styles.control}>
                      <FiLock className={styles.leadIcon} aria-hidden="true" />
                      <input
                        id="confirmPassword"
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (v) => v === getValues("password") || "Passwords do not match",
                        })}
                      />
                      <button
                        type="button"
                        className={styles.reveal}
                        onClick={() => setShowConfirm((v) => !v)}
                        aria-label={showConfirm ? "Hide password" : "Show password"}
                      >
                        {showConfirm ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                      </button>
                    </div>
                    {errorMessage("confirmPassword")}
                  </div>

                  <div className={styles.checks}>
                    <div className={`${styles.check} ${errors.terms ? styles.checkError : ""}`}>
                      <label htmlFor="terms">
                        <input
                          id="terms"
                          type="checkbox"
                          aria-invalid={errors.terms ? "true" : "false"}
                          {...register("terms", { required: "Please accept the terms to continue" })}
                        />
                        <span className={styles.box} aria-hidden="true">
                          <FiCheck />
                        </span>
                        <span className={styles.checkText}>
                          I agree to the{" "}
                          <Link href="/terms" className="ic_link">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="ic_link">
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>
                      {errorMessage("terms")}
                    </div>

                    <div className={styles.check}>
                      <label htmlFor="updates">
                        <input id="updates" type="checkbox" {...register("updates")} />
                        <span className={styles.box} aria-hidden="true">
                          <FiCheck />
                        </span>
                        <span className={styles.checkText}>
                          Email me print deals and new blanks. No more than twice a month.
                        </span>
                      </label>
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
                        Creating your account…
                      </>
                    ) : (
                      <>
                        Create account
                        <FiArrowRight aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className={styles.assurance}>
                    <FiShield aria-hidden="true" />
                    Secured with 256-bit encryption. We never sell your data.
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
