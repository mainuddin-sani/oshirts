"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronDown } from "react-icons/fi";
import {
  assurances,
  findDelivery,
  money,
  order,
  quantity,
} from "@/data/checkout";
import { useCheckout } from "./CheckoutContext";
import styles from "./Checkout.module.css";

/**
 * Live order total, shared by every step. On desktop it sits in the sticky
 * rail; below 1024px it collapses to a tappable total bar above the step.
 */
export default function OrderSummary() {
  const { totals, delivery } = useCheckout();
  const [open, setOpen] = useState(false);

  const deliveryOption = findDelivery(delivery);
  const printCount = order.prints.length;

  return (
    <section className={styles.summary} aria-labelledby="order-summary-title">
      <button
        type="button"
        className={styles.summaryHead}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="order-summary-body"
      >
        <span className={styles.summaryHeadText}>
          <h2 id="order-summary-title">Order summary</h2>
          <span className={styles.summaryHeadMeta}>{quantity} shirts · {printCount} print locations</span>
        </span>
        <span className={styles.summaryHeadTotal}>
          {money(totals.total)}
          <FiChevronDown
            aria-hidden="true"
            className={`${styles.summaryChevron} ${open ? styles.summaryChevronOpen : ""}`}
          />
        </span>
      </button>

      <div
        id="order-summary-body"
        className={`${styles.summaryBody} ${open ? styles.summaryBodyOpen : ""}`}
      >
        <div className={styles.summaryItem}>
          <div className={styles.summaryThumb}>
            <Image src={order.frontImage} alt="" width={64} height={64} />
          </div>
          <div className={styles.summaryItemText}>
            <span className={styles.summaryItemName}>{order.name}</span>
            <span className={styles.summaryItemMeta}>
              {order.brand} · {order.color} · {printCount} print{printCount > 1 ? "s" : ""}
            </span>
            <span className={styles.summaryQty}>{quantity} shirts</span>
          </div>
        </div>

        <div className={styles.breakdown}>
          <p className={styles.line}>
            <span>
              Garments
              <span className={styles.lineSub}> · {money(order.unitPrice)} each</span>
            </span>
            <span>{money(totals.garments)}</span>
          </p>

          <p className={styles.line}>
            <span>
              Printing
              <span className={styles.lineSub}> · {printCount} locations</span>
            </span>
            <span>{money(totals.printing)}</span>
          </p>

          <p className={`${styles.line} ${styles.lineFree}`}>
            <span>Setup &amp; design review</span>
            <span>Free</span>
          </p>

          {totals.discount > 0 ? (
            <p className={`${styles.line} ${styles.lineDiscount}`}>
              <span>Volume discount · {Math.round(totals.discountRate * 100)}%</span>
              <span>−{money(totals.discount)}</span>
            </p>
          ) : null}

          <p className={styles.line}>
            <span>Subtotal</span>
            <span>{money(totals.subtotal)}</span>
          </p>

          <p className={`${styles.line} ${totals.shipping === 0 ? styles.lineFree : ""}`}>
            <span>Shipping · {deliveryOption.label}</span>
            <span>{totals.shipping === 0 ? "Free" : money(totals.shipping)}</span>
          </p>

          <p className={styles.line}>
            <span>Estimated tax</span>
            <span>{money(totals.tax)}</span>
          </p>

          <p className={`${styles.line} ${styles.lineTotal}`}>
            <span>Total</span>
            <span>{money(totals.total)}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
