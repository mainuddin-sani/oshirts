"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheck,
  FiCreditCard,
  FiLock,
  FiUser,
} from "react-icons/fi";
import {
  FaCcAmex,
  FaCcApplePay,
  FaCcDiscover,
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
} from "react-icons/fa";
import Reveal from "@/components/motion/Reveal";
import { findDelivery, money, newOrderReference, quantity } from "@/data/checkout";
import { useCheckout } from "./CheckoutContext";
import styles from "./Checkout.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

const METHODS = [
  { id: "card", label: "Card", icon: FiCreditCard },
  { id: "paypal", label: "PayPal", icon: FaCcPaypal },
  { id: "applepay", label: "Apple Pay", icon: FaCcApplePay },
];

const BRANDS = [
  { id: "visa", icon: FaCcVisa, test: /^4/ },
  { id: "mastercard", icon: FaCcMastercard, test: /^(5[1-5]|2[2-7])/ },
  { id: "amex", icon: FaCcAmex, test: /^3[47]/ },
  { id: "discover", icon: FaCcDiscover, test: /^6/ },
];

const digitsOnly = (value) => value.replace(/\D/g, "");

const formatCardNumber = (value) =>
  digitsOnly(value).slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

const formatExpiry = (value) => {
  const digits = digitsOnly(value).slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

/** Luhn checksum — catches mistyped card numbers before a gateway does. */
function passesLuhn(value) {
  const digits = digitsOnly(value);
  let sum = 0;
  let double = false;

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = Number(digits[i]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }

  return digits.length >= 15 && sum % 10 === 0;
}

function expiryIsFuture(value) {
  const [month, year] = value.split("/").map((part) => Number(part));
  if (!month || month < 1 || month > 12 || !year) return false;

  const now = new Date();
  const expiry = new Date(2000 + year, month, 0, 23, 59, 59);
  return expiry >= now;
}

export default function PaymentStep() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const { totals, delivery, shipping, update } = useCheckout();

  const [method, setMethod] = useState("card");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    // Card rules must stop applying when a wallet is chosen and the card
    // fields leave the DOM, so fields unregister as they unmount.
    shouldUnregister: true,
    defaultValues: { cardName: "", cardNumber: "", expiry: "", cvc: "", terms: false },
  });

  const cardNumber = useWatch({ control, name: "cardNumber" }) || "";
  const brand = BRANDS.find((entry) => entry.test.test(digitsOnly(cardNumber)));
  const BrandIcon = brand?.icon;

  const isCard = method === "card";

  const onSubmit = async (values) => {
    // No payment gateway is wired up — this stands in for the tokenise +
    // charge round trip. Card details stay in this form and are never stored.
    await new Promise((resolve) => setTimeout(resolve, 1400));

    update({
      placedOrder: {
        ...newOrderReference(),
        email: shipping?.email || "",
        method: isCard ? "Card" : METHODS.find((entry) => entry.id === method)?.label,
        deliveryId: delivery,
        total: totals.total,
        name: values.cardName || shipping?.fullName || "",
      },
    });

    router.push("/checkout/success");
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

  // Format as the customer types, then hand the value on to the form state.
  const masked = (name, formatter, rules) => {
    const { onChange, ...rest } = register(name, rules);
    return {
      ...rest,
      onChange: (event) => {
        event.target.value = formatter(event.target.value);
        return onChange(event);
      },
    };
  };

  return (
    <form className={styles.main} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Reveal className={styles.card}>
        <div className={styles.cardHead}>
          <h2>Payment method</h2>
          <p className={styles.cardNote}>Charged only after you approve the proof.</p>
        </div>

        <div className={styles.methods} role="radiogroup" aria-label="Payment method">
          {METHODS.map(({ id, label, icon: Icon }) => (
            <label key={id} className={`${styles.method} ${method === id ? styles.methodActive : ""}`}>
              <input
                type="radio"
                name="method"
                value={id}
                checked={method === id}
                onChange={() => setMethod(id)}
                className="ic_sr_only"
              />
              <Icon aria-hidden="true" />
              {label}
            </label>
          ))}
        </div>

        {isCard ? (
          <div className={styles.form}>
            <div className={fieldClass("cardName")}>
              <label htmlFor="cardName">Name on card</label>
              <div className={`${styles.control} ${styles.hasIcon}`}>
                <FiUser className={styles.leadIcon} aria-hidden="true" />
                <input
                  id="cardName"
                  type="text"
                  autoComplete="cc-name"
                  placeholder="Dana Whitfield"
                  aria-invalid={errors.cardName ? "true" : "false"}
                  {...register("cardName", {
                    required: "Name on card is required",
                    minLength: { value: 2, message: "Use at least 2 characters" },
                  })}
                />
              </div>
              {errorMessage("cardName")}
            </div>

            <div className={fieldClass("cardNumber")}>
              <label htmlFor="cardNumber">Card number</label>
              <div className={`${styles.control} ${styles.hasIcon}`}>
                <FiCreditCard className={styles.leadIcon} aria-hidden="true" />
                <input
                  id="cardNumber"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="4242 4242 4242 4242"
                  aria-invalid={errors.cardNumber ? "true" : "false"}
                  {...masked("cardNumber", formatCardNumber, {
                    required: "Card number is required",
                    validate: (value) => passesLuhn(value) || "Check the card number and try again",
                  })}
                />
                {BrandIcon ? (
                  <span className={styles.cardBrand} aria-hidden="true">
                    <BrandIcon />
                  </span>
                ) : null}
              </div>
              {errorMessage("cardNumber")}
            </div>

            <div className={styles.row2}>
              <div className={fieldClass("expiry")}>
                <label htmlFor="expiry">Expiry</label>
                <div className={styles.control}>
                  <input
                    id="expiry"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    placeholder="MM/YY"
                    aria-invalid={errors.expiry ? "true" : "false"}
                    {...masked("expiry", formatExpiry, {
                      required: "Expiry is required",
                      validate: (value) => expiryIsFuture(value) || "Enter a valid future date",
                    })}
                  />
                </div>
                {errorMessage("expiry")}
              </div>

              <div className={fieldClass("cvc")}>
                <label htmlFor="cvc">
                  Security code <span className={styles.optional}>CVC</span>
                </label>
                <div className={`${styles.control} ${styles.hasIcon}`}>
                  <FiLock className={styles.leadIcon} aria-hidden="true" />
                  <input
                    id="cvc"
                    type="text"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    placeholder="123"
                    aria-invalid={errors.cvc ? "true" : "false"}
                    {...masked("cvc", (value) => digitsOnly(value).slice(0, 4), {
                      required: "Security code is required",
                      minLength: { value: 3, message: "3 or 4 digits" },
                    })}
                  />
                </div>
                {errorMessage("cvc")}
              </div>
            </div>
          </div>
        ) : (
          <p className={styles.methodNote}>
            <FiLock aria-hidden="true" />
            You will be redirected to {METHODS.find((entry) => entry.id === method)?.label} to approve this
            order, then brought straight back here.
          </p>
        )}

        <div className={`${styles.secureNote} ${styles.stackTopLg}`}>
          <FiLock aria-hidden="true" />
          <span>
            <strong>Secured with 256-bit TLS encryption</strong>
            Card details go straight to our PCI-compliant processor — they are never stored on our servers.
          </span>
        </div>
      </Reveal>

      <Reveal className={styles.card} delay={0.06}>
        <div className={styles.cardHead}>
          <h2>Confirm and pay</h2>
          <p className={styles.cardNote}>
            {quantity} shirts · {findDelivery(delivery).label} delivery
          </p>
        </div>

        <div className={styles.breakdown}>
          <p className={styles.line}>
            <span>Subtotal</span>
            <span>{money(totals.subtotal)}</span>
          </p>
          <p className={`${styles.line} ${totals.shipping === 0 ? styles.lineFree : ""}`}>
            <span>Shipping</span>
            <span>{totals.shipping === 0 ? "Free" : money(totals.shipping)}</span>
          </p>
          <p className={styles.line}>
            <span>Estimated tax</span>
            <span>{money(totals.tax)}</span>
          </p>
          <p className={`${styles.line} ${styles.lineTotal}`}>
            <span>Total due today</span>
            <span>{money(totals.total)}</span>
          </p>
        </div>

        <div
          className={`${styles.check} ${styles.stackTopLg} ${errors.terms ? styles.checkError : ""}`}
        >
          <label htmlFor="terms">
            <input
              id="terms"
              type="checkbox"
              aria-invalid={errors.terms ? "true" : "false"}
              {...register("terms", { required: "Please accept the terms to place your order" })}
            />
            <span className={styles.box} aria-hidden="true">
              <FiCheck />
            </span>
            <span className={styles.checkText}>
              I agree to the{" "}
              <Link href="/terms" className="ic_link">
                Terms of Service
              </Link>
              ,{" "}
              <Link href="/privacy" className="ic_link">
                Privacy Policy
              </Link>{" "}
              and confirm the artwork and size run above are correct.
            </span>
          </label>
          {errorMessage("terms")}
        </div>
      </Reveal>

      <div className={styles.nav}>
        <Link href="/checkout/shipping" className="ic_btn ic_btn_secondary ic_btn_lg">
          <FiArrowLeft aria-hidden="true" />
          Back
        </Link>
        <button type="submit" className="ic_btn ic_btn_primary ic_btn_lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className={styles.spinner} aria-hidden="true" />
              Placing your order…
            </>
          ) : (
            <>
              <FiLock aria-hidden="true" />
              Place order · {money(totals.total)}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
