"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import { countries, deliveryOptions, money, states } from "@/data/checkout";
import { useCheckout } from "./CheckoutContext";
import useDeliveryEstimates from "./useDeliveryEstimates";
import styles from "./Checkout.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^[\d\s()+.-]{10,20}$/;
const ZIP_PATTERN = /^\d{5}(-\d{4})?$|^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

export default function ShippingStep() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { shipping, delivery, update } = useCheckout();

  const [billingSame, setBillingSame] = useState(shipping?.billingSame ?? true);
  const [selected, setSelected] = useState(delivery || "standard");

  const estimates = useDeliveryEstimates();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    // Billing rules must stop applying once the "same address" switch hides
    // those fields, so fields unregister as they unmount.
    shouldUnregister: true,
    defaultValues: {
      email: shipping?.email || "",
      phone: shipping?.phone || "",
      fullName: shipping?.fullName || "",
      company: shipping?.company || "",
      address1: shipping?.address1 || "",
      address2: shipping?.address2 || "",
      city: shipping?.city || "",
      state: shipping?.state || "",
      zip: shipping?.zip || "",
      country: shipping?.country || countries[0],
      billingName: shipping?.billingName || "",
      billingAddress1: shipping?.billingAddress1 || "",
      billingCity: shipping?.billingCity || "",
      billingState: shipping?.billingState || "",
      billingZip: shipping?.billingZip || "",
    },
  });

  const onSubmit = (values) => {
    update({ shipping: { ...values, billingSame }, delivery: selected });
    router.push("/checkout/payment");
  };

  const chooseDelivery = (id) => {
    setSelected(id);
    update({ delivery: id });
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

  const addressFields = (prefix = "") => {
    const name = (field) => (prefix ? `${prefix}${field[0].toUpperCase()}${field.slice(1)}` : field);

    return (
      <>
        <div className={fieldClass(name("address1"))}>
          <label htmlFor={name("address1")}>Street address</label>
          <div className={`${styles.control} ${styles.hasIcon}`}>
            <FiMapPin className={styles.leadIcon} aria-hidden="true" />
            <input
              id={name("address1")}
              type="text"
              autoComplete={prefix ? "billing address-line1" : "shipping address-line1"}
              placeholder="1200 Press Avenue"
              aria-invalid={errors[name("address1")] ? "true" : "false"}
              {...register(name("address1"), { required: "Street address is required" })}
            />
          </div>
          {errorMessage(name("address1"))}
        </div>

        <div className={styles.row3}>
          <div className={fieldClass(name("city"))}>
            <label htmlFor={name("city")}>City</label>
            <div className={styles.control}>
              <input
                id={name("city")}
                type="text"
                autoComplete={prefix ? "billing address-level2" : "shipping address-level2"}
                placeholder="Austin"
                aria-invalid={errors[name("city")] ? "true" : "false"}
                {...register(name("city"), { required: "City is required" })}
              />
            </div>
            {errorMessage(name("city"))}
          </div>

          <div className={fieldClass(name("state"))}>
            <label htmlFor={name("state")}>State</label>
            <div className={styles.control}>
              <select
                id={name("state")}
                autoComplete={prefix ? "billing address-level1" : "shipping address-level1"}
                aria-invalid={errors[name("state")] ? "true" : "false"}
                {...register(name("state"), { required: "Required" })}
              >
                <option value="">Select</option>
                {states.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <FiChevronDown className={styles.selectIcon} aria-hidden="true" />
            </div>
            {errorMessage(name("state"))}
          </div>

          <div className={fieldClass(name("zip"))}>
            <label htmlFor={name("zip")}>ZIP</label>
            <div className={styles.control}>
              <input
                id={name("zip")}
                type="text"
                inputMode="numeric"
                autoComplete={prefix ? "billing postal-code" : "shipping postal-code"}
                placeholder="78701"
                aria-invalid={errors[name("zip")] ? "true" : "false"}
                {...register(name("zip"), {
                  required: "Required",
                  pattern: { value: ZIP_PATTERN, message: "Enter a valid postal code" },
                })}
              />
            </div>
            {errorMessage(name("zip"))}
          </div>
        </div>
      </>
    );
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ---------------- Contact ---------------- */}
      <Reveal className={styles.card}>
        <div className={styles.cardHead}>
          <h2>Contact</h2>
          <p className={styles.cardNote}>Proofs and tracking updates go here.</p>
        </div>

        <div className={`${styles.form} ${styles.row2}`}>
          <div className={fieldClass("email")}>
            <label htmlFor="email">Email</label>
            <div className={`${styles.control} ${styles.hasIcon}`}>
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
            </div>
            {errorMessage("email")}
          </div>

          <div className={fieldClass("phone")}>
            <label htmlFor="phone">Phone</label>
            <div className={`${styles.control} ${styles.hasIcon}`}>
              <FiPhone className={styles.leadIcon} aria-hidden="true" />
              <input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(512) 555-0142"
                aria-invalid={errors.phone ? "true" : "false"}
                {...register("phone", {
                  required: "Phone is required",
                  pattern: { value: PHONE_PATTERN, message: "Enter a valid phone number" },
                })}
              />
            </div>
            {errorMessage("phone")}
          </div>
        </div>
      </Reveal>

      {/* ---------------- Shipping address ---------------- */}
      <Reveal className={styles.card} delay={0.06}>
        <div className={styles.cardHead}>
          <h2>Shipping address</h2>
          <p className={styles.cardNote}>We ship the full run to one address.</p>
        </div>

        <div className={styles.form}>
          <div className={styles.row2}>
            <div className={fieldClass("fullName")}>
              <label htmlFor="fullName">Full name</label>
              <div className={`${styles.control} ${styles.hasIcon}`}>
                <FiUser className={styles.leadIcon} aria-hidden="true" />
                <input
                  id="fullName"
                  type="text"
                  autoComplete="shipping name"
                  placeholder="Dana Whitfield"
                  aria-invalid={errors.fullName ? "true" : "false"}
                  {...register("fullName", { required: "Full name is required" })}
                />
              </div>
              {errorMessage("fullName")}
            </div>

            <div className={styles.field}>
              <label htmlFor="company">
                Company <span className={styles.optional}>Optional</span>
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
          </div>

          {addressFields()}

          <div className={styles.row2}>
            <div className={styles.field}>
              <label htmlFor="address2">
                Suite, floor or dock <span className={styles.optional}>Optional</span>
              </label>
              <div className={styles.control}>
                <input
                  id="address2"
                  type="text"
                  autoComplete="shipping address-line2"
                  placeholder="Suite 300"
                  {...register("address2")}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="country">Country</label>
              <div className={styles.control}>
                <select id="country" autoComplete="shipping country-name" {...register("country")}>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <FiChevronDown className={styles.selectIcon} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className={styles.switchRow}>
            <span className={styles.switchText}>
              Billing address is the same
              <span>Turn off to bill a different address or department.</span>
            </span>
            <button
              type="button"
              className={`${styles.switch} ${billingSame ? styles.switchOn : ""}`}
              onClick={() => setBillingSame((value) => !value)}
              role="switch"
              aria-checked={billingSame}
              aria-label="Billing address is the same as shipping"
            />
          </div>

          <AnimatePresence initial={false}>
            {!billingSame ? (
              <motion.div
                className={`${styles.form} ${styles.collapse}`}
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <div className={fieldClass("billingName")}>
                  <label htmlFor="billingName">Billing name</label>
                  <div className={`${styles.control} ${styles.hasIcon}`}>
                    <FiUser className={styles.leadIcon} aria-hidden="true" />
                    <input
                      id="billingName"
                      type="text"
                      autoComplete="billing name"
                      placeholder="Accounts payable"
                      aria-invalid={errors.billingName ? "true" : "false"}
                      {...register("billingName", { required: "Billing name is required" })}
                    />
                  </div>
                  {errorMessage("billingName")}
                </div>

                {addressFields("billing")}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </Reveal>

      {/* ---------------- Delivery speed ---------------- */}
      <Reveal className={styles.card} delay={0.12}>
        <div className={styles.cardHead}>
          <h2>Delivery speed</h2>
          <p className={styles.cardNote}>Dates include printing and transit.</p>
        </div>

        <div className={styles.options} role="radiogroup" aria-label="Delivery speed">
          {deliveryOptions.map(({ id, icon: Icon, label, price, businessDays, text, badge }) => {
            const isActive = selected === id;

            return (
              <label key={id} className={`${styles.option} ${isActive ? styles.optionActive : ""}`}>
                <input
                  type="radio"
                  name="delivery"
                  value={id}
                  checked={isActive}
                  onChange={() => chooseDelivery(id)}
                />
                <span className={styles.optionIcon}>
                  <Icon size={18} aria-hidden="true" />
                </span>

                <span className={styles.optionMain}>
                  <span className={styles.optionTop}>
                    <span className={styles.optionLabel}>{label}</span>
                    {badge ? <span className={styles.optionBadge}>{badge}</span> : null}
                  </span>
                  <span className={styles.optionText}>{text}</span>
                  <span className={styles.optionEta}>
                    <FiCheck size={13} aria-hidden="true" />
                    {estimates ? estimates[id] : `${businessDays[0]}–${businessDays[1]} business days`}
                  </span>
                </span>

                <span className={styles.optionSide}>
                  <span className={`${styles.optionPrice} ${price === 0 ? styles.optionFree : ""}`}>
                    {price === 0 ? "Free" : money(price)}
                  </span>
                  <span className={styles.optionTick} aria-hidden="true">
                    <FiCheck />
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </Reveal>

      <div className={styles.nav}>
        <Link href="/checkout/instructions" className="ic_btn ic_btn_secondary ic_btn_lg">
          <FiArrowLeft aria-hidden="true" />
          Back
        </Link>
        <button type="submit" className="ic_btn ic_btn_primary ic_btn_lg">
          Continue to payment
          <FiArrowRight aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
