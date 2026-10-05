import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiClock, FiLayers } from "react-icons/fi";
import styles from "./SavedDesignCard.module.css";

/**
 * One saved design in the results grid. The whole card is the link; the
 * status pill and meta line sit on top of it.
 *
 * design: a record resolved by lookupDesigns / findDesign.
 */
export default function SavedDesignCard({ design, priority = false }) {
  if (!design) return null;

  const { status } = design;

  return (
    <article className={styles.card}>
      <Link href={`/saved-designs/${design.id}`} className={styles.media}>
        <Image
          src={design.thumbnail}
          alt={design.thumbnailAlt}
          className={styles.image}
          fill
          preload={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 641px) 50vw, 92vw"
        />

        <span className={`${styles.pill} ${styles[`pill_${status.tone}`]}`}>
          <status.icon aria-hidden="true" />
          {status.label}
        </span>
      </Link>

      <div className={styles.body}>
        <span className={styles.id}>{design.id}</span>

        <h3 className={styles.title}>
          <Link href={`/saved-designs/${design.id}`}>{design.name}</Link>
        </h3>

        <p className={styles.garment}>
          <span className={styles.swatch} style={{ backgroundColor: design.colorHex }} aria-hidden="true" />
          {design.style.brand} {design.style.name} · {design.color}
        </p>

        <div className={styles.foot}>
          <span className={styles.meta}>
            <FiClock aria-hidden="true" />
            <time dateTime={design.savedAt}>{design.savedLabel}</time>
            <span className={styles.dot} aria-hidden="true" />
            <FiLayers aria-hidden="true" />
            {design.quantity ? `${design.quantity} shirts` : "No sizes yet"}
          </span>

          <span className={styles.arrow} aria-hidden="true">
            <FiArrowRight />
          </span>
        </div>
      </div>
    </article>
  );
}
