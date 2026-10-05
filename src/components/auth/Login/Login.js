"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiShield,
} from "react-icons/fi";
import { FaStar, FaGoogle, FaApple } from "react-icons/fa";
import { login } from "@/data/auth";
import styles from "./Login.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export default function Login() {
  const reduce = useReducedMotion();
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [signedIn, setSignedIn] = useState(null);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  // A field only earns its green tick once the user has actually been in it
  // and left it clean — never on a freshly loaded, empty form.
  const isValid = (name) =>
    Boolean((touchedFields[name] || dirtyFields[name]) && !errors[name] && getValues(name));

  const fieldClass = (name) =>
    [styles.field, errors[name] && styles.fieldError, isValid(name) && styles.fieldValid]
      .filter(Boolean)
      .join(" ");

  const onSubmit = async (values) => {
    clearErrors("root");
    try {
      // No auth backend in the project yet — the simulated round trip keeps the
      // pending, rejected and success states wired up for the real call.
      await new Promise((resolve) => setTimeout(resolve, 1100));
      setSignedIn({ email: values.email });
    } catch {
      setError("root", {
        type: "server",
        message: "That email and password do not match. Try again or reset your password.",
      });
    }
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

  const { orderPreview } = login;

  return (
    <section className={styles.page} aria-labelledby="login-title">
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={`ic_container ${styles.grid}`}>
        {/* ---------------- Form panel ---------------- */}
        <motion.div className={styles.panel} {...fadeUp(0)}>
          <AnimatePresence mode="wait" initial={false}>
            {signedIn ? (
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
                <h2>You are signed in.</h2>
                <p>
                  Welcome back, <strong>{signedIn.email}</strong>. Your saved designs and order history
                  are ready in the dashboard.
                </p>
                <div className={styles.successActions}>
                  <Link href="/design" className="ic_btn ic_btn_primary ic_btn_lg">
                    Go to dashboard
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    className="ic_btn ic_btn_secondary ic_btn_lg"
                    onClick={() => setSignedIn(null)}
                  >
                    Use another account
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
                  <h1 id="login-title">Sign in</h1>
                  <p>
                    New here?{" "}
                    <Link href="/signup" className="ic_link">
                      Create an account
                    </Link>
                  </p>
                </header>

                <div className={styles.socials}>
                  <button type="button" className={styles.social}>
                    <FaGoogle aria-hidden="true" />
                    Continue with Google
                  </button>
                  <button type="button" className={styles.social}>
                    <FaApple aria-hidden="true" />
                    Continue with Apple
                  </button>
                </div>

                <div className={styles.divider}>
                  <span>or use your email</span>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                  <AnimatePresence initial={false}>
                    {errors.root ? (
                      <motion.div
                        className={styles.banner}
                        role="alert"
                        initial={reduce ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: EASE }}
                      >
                        <FiAlertCircle aria-hidden="true" />
                        <span>{errors.root.message}</span>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <div className={fieldClass("email")}>
                    <label htmlFor="email">Email</label>
                    <div className={styles.control}>
                      <FiMail className={styles.leadIcon} aria-hidden="true" />
                      <input
                        id="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        autoFocus
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

                  <div className={fieldClass("password")}>
                    <div className={styles.labelRow}>
                      <label htmlFor="password">Password</label>
                      <Link href="/forgot-password" className={styles.forgot}>
                        Forgot password?
                      </Link>
                    </div>
                    <div className={styles.control}>
                      <FiLock className={styles.leadIcon} aria-hidden="true" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        aria-invalid={errors.password ? "true" : "false"}
                        onKeyUp={(e) => setCapsLock(e.getModifierState?.("CapsLock") ?? false)}
                        onBlur={() => setCapsLock(false)}
                        {...register("password", {
                          required: "Password is required",
                          minLength: { value: 8, message: "Use at least 8 characters" },
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

                    <AnimatePresence initial={false}>
                      {capsLock && !errors.password ? (
                        <motion.p
                          className={styles.hint}
                          initial={reduce ? false : { opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                          transition={{ duration: 0.18, ease: EASE }}
                        >
                          <FiAlertCircle aria-hidden="true" />
                          Caps Lock is on.
                        </motion.p>
                      ) : null}
                    </AnimatePresence>

                    {errorMessage("password")}
                  </div>

                  <div className={styles.check}>
                    <label htmlFor="remember">
                      <input id="remember" type="checkbox" {...register("remember")} />
                      <span className={styles.box} aria-hidden="true">
                        <FiCheck />
                      </span>
                      <span className={styles.checkText}>Keep me signed in on this device</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`ic_btn ic_btn_primary ic_btn_lg ${styles.submit}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner} aria-hidden="true" />
                        Signing you in…
                      </>
                    ) : (
                      <>
                        Sign in
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
