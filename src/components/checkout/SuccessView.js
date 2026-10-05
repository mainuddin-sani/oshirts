"use client";

import Link from "next/link";
import { FiArrowRight, FiCheckCircle, FiMail, FiPackage, FiPenTool, FiPrinter } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import { findDelivery, money, order, quantity } from "@/data/checkout";
import { useCheckout } from "./CheckoutContext";
import useDeliveryEstimates from "./useDeliveryEstimates";
import styles from "./Checkout.module.css";

const TIMELINE = [
  {
    icon: FiPenTool,
    title: "Proof within one business day",
    text: "A print specialist reviews your artwork and emails a proof to approve.",
  },
  {
    icon: FiPrinter,
    title: "Printing starts on approval",
    text: "Nothing goes to press — and nothing is charged — until you sign off.",
  },
  {
    icon: FiPackage,
    title: "Tracking on dispatch",
    text: "The full run ships together with live tracking to your inbox.",
  },
];

export default function SuccessView() {
  const { placedOrder, hydrated, reset } = useCheckout();
  const estimates = useDeliveryEstimates();

  const delivery = findDelivery(placedOrder?.deliveryId);
  const eta = estimates?.[delivery.id];

  if (!hydrated) return null;

  if (!placedOrder) {
    return (
      <div className={styles.success}>
        <h1>No recent order</h1>
        <p className={styles.successLead}>
          We could not find an order in this session. If you just placed one, the confirmation is in your
          inbox — otherwise pick up where you left off.
        </p>
        <div className={styles.successActions}>
          <Link href="/checkout/summary" className="ic_btn ic_btn_primary ic_btn_lg">
            Back to checkout
            <FiArrowRight aria-hidden="true" />
          </Link>
          <Link href="/" className="ic_btn ic_btn_secondary ic_btn_lg">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Reveal className={styles.success}>
      <span className={styles.successIcon}>
        <FiCheckCircle aria-hidden="true" />
      </span>

      <h1>Order confirmed</h1>
      <p className={styles.successLead}>
        Thanks{placedOrder.name ? `, ${placedOrder.name.split(" ")[0]}` : ""} — your order is in the queue. A
        confirmation is on its way to <strong>{placedOrder.email || "your inbox"}</strong>.
      </p>

      <div className={styles.orderMeta}>
        <div className={styles.orderMetaGrid}>
          <div className={styles.orderMetaItem}>
            <span className={styles.metaLabel}>Order number</span>
            <span className={styles.orderNumber}>{placedOrder.id}</span>
          </div>
          <div className={styles.orderMetaItem}>
            <span className={styles.metaLabel}>Total paid</span>
            <span className={styles.metaValue}>{money(placedOrder.total)}</span>
          </div>
          <div className={styles.orderMetaItem}>
            <span className={styles.metaLabel}>Order</span>
            <span className={styles.metaValue}>
              {quantity} × {order.name}
            </span>
          </div>
          <div className={styles.orderMetaItem}>
            <span className={styles.metaLabel}>{delivery.label} delivery</span>
            <span className={styles.metaValue}>
              {eta || `${delivery.businessDays[0]}–${delivery.businessDays[1]} business days`}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.timeline}>
        {TIMELINE.map(({ icon: Icon, title, text }) => (
          <div key={title} className={styles.timelineItem}>
            <span className={styles.timelineIcon}>
              <Icon size={18} aria-hidden="true" />
            </span>
            <div>
              <h5>{title}</h5>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.successActions}>
        <Link href="/login" className="ic_btn ic_btn_primary ic_btn_lg">
          Track this order
          <FiArrowRight aria-hidden="true" />
        </Link>
        <Link href="/" className="ic_btn ic_btn_secondary ic_btn_lg" onClick={reset}>
          Start a new order
        </Link>
      </div>

      <p className={`${styles.hint} ${styles.hintRow}`}>
        <FiMail aria-hidden="true" />
        Questions? Reply to the confirmation email and it lands with the specialist handling your job.
      </p>
    </Reveal>
  );
}
