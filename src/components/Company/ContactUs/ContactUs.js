"use client";

import { useForm } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiAlertCircle, FiArrowUpRight, FiCheckCircle, FiChevronDown, FiSend } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import { contactUs } from "@/data/about";
import PageHead from "../about/PageHead";
import styles from "./ContactUs.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export default function ContactUs() {
  const reduce = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: { name: "", email: "", company: "", topic: contactUs.topics[0], message: "" },
  });

  const onSubmit = async () => {
    // Stands in for the support inbox endpoint.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset(undefined, { keepIsSubmitSuccessful: true });
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
    <>
      <PageHead eyebrow={contactUs.eyebrow} title={contactUs.title} lead={contactUs.lead} />

      {/* <ul className={styles.cards}>
        {contactUs.channels.map(({ icon: Icon, title, value, href, text }, i) => (
          <Reveal as="li" key={title} className={styles.channelCard} delay={i * 0.06}>
            <span className={styles.cardIcon}>
              <Icon size={18} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <a href={href} className={styles.channelValue}>
              {value}
            </a>
            <span className={styles.channelText}>{text}</span>
          </Reveal>
        ))}
      </ul> */}

      <ul className={styles.channels}>
        {contactUs.channels.map(({ icon: Icon, title, value, href, text }, i) => (
          <Reveal as="li" key={title} delay={i * 0.06}>
            <a href={href} className={styles.channel}>
              <span className={styles.channelIcon}>
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className={styles.channelBody}>
                <span className={styles.channelTitle}>{title}</span>
                <span className={styles.channelValue}>{value}</span>
                <span className={styles.channelText}>{text}</span>
              </span>
              <FiArrowUpRight className={styles.channelArrow} aria-hidden="true" />
            </a>
          </Reveal>
        ))}
      </ul>

      <Reveal className={styles.panel}>
        <h2 className={styles.sectionTitle}>Send us a message</h2>

        {isSubmitSuccessful ? (
          <p className={styles.formDone} role="status">
            <FiCheckCircle aria-hidden="true" />
            <span>
              <strong>Message received.</strong>
              A specialist will reply by email within one business hour. If it is urgent, calling gets you
              an answer faster.
            </span>
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.formRow}>
              <div className={fieldClass("name")}>
                <label htmlFor="name">Your name</label>
                <div className={styles.control}>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Dana Whitfield"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("name", {
                      required: "Name is required",
                      minLength: { value: 2, message: "Use at least 2 characters" },
                    })}
                  />
                </div>
                {errorMessage("name")}
              </div>

              <div className={fieldClass("email")}>
                <label htmlFor="email">Email</label>
                <div className={styles.control}>
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
                </div>
                {errorMessage("email")}
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="company">
                  Company or team<span className={styles.optional}>Optional</span>
                </label>
                <div className={styles.control}>
                  <input
                    id="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Summit Robotics"
                    {...register("company")}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="topic">What is it about?</label>
                <div className={styles.control}>
                  <select id="topic" {...register("topic")}>
                    {contactUs.topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className={styles.selectIcon} aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className={fieldClass("message")}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className={styles.textarea}
                placeholder="Quantities, deadline, artwork you already have — whatever helps us answer properly."
                aria-invalid={errors.message ? "true" : "false"}
                {...register("message", {
                  required: "Tell us a little about what you need",
                  minLength: { value: 10, message: "A sentence or two is plenty" },
                })}
              />
              {errorMessage("message")}
            </div>

            <button type="submit" className="ic_btn ic_btn_primary ic_btn_lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  <FiSend aria-hidden="true" />
                  Send message
                </>
              )}
            </button>
          </form>
        )}
      </Reveal>

      <section>
        <Reveal as="h2" className={styles.sectionTitle}>
          Where we are
        </Reveal>
        <ul className={styles.cards}>
          {contactUs.offices.map(({ city, lines, note }, i) => (
            <Reveal as="li" key={city} className={styles.office} delay={i * 0.06}>
              <h4>{city}</h4>
              <p>
                {lines.map((line) => (
                  <span key={line} className={styles.officeLine}>
                    {line}
                  </span>
                ))}
              </p>
              <p className={styles.officeNote}>{note}</p>
            </Reveal>
          ))}
        </ul>
      </section>

    </>
  );
}
