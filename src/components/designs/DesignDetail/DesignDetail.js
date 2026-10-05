import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiEdit3,
  FiHash,
  FiLayers,
  FiPackage,
  FiShoppingCart,
} from "react-icons/fi";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Reveal from "@/components/motion/Reveal";
import DesignPreview from "./DesignPreview";
import ShareDesign from "./ShareDesign";
import styles from "./DesignDetail.module.css";

export default function DesignDetail({ design }) {
  const { status } = design;

  // Coming from the results grid, the address rides along so "back" returns
  // to the list already populated rather than an empty form.
  const backHref = `/saved-designs?email=${encodeURIComponent(design.email)}`;

  return (
    <section className={styles.page} aria-labelledby="design-title">
      <div className={styles.bgGrid} aria-hidden="true" />

      <div className={`ic_container ${styles.inner}`}>
        {/* ---------------- Head ---------------- */}
        <div className={styles.head}>
          <Breadcrumb
            className={styles.crumbs}
            items={[
              { label: "Home", href: "/" },
              { label: "Saved designs", href: backHref },
              { label: design.name },
            ]}
          />

          <Link href={backHref} className={styles.backLink}>
            <FiArrowLeft aria-hidden="true" />
            All saved designs
          </Link>
        </div>

        {/* ---------------- Main ---------------- */}
        <div className={styles.main}>
          <Reveal className={styles.previewCol} variant="image">
            <DesignPreview
              views={design.views}
              alt={design.thumbnailAlt}
              printedViews={design.printedViews}
            />
          </Reveal>

          <Reveal as="div" className={styles.infoCol} delay={0.06}>
            <span className={`${styles.pill} ${styles[`pill_${status.tone}`]}`}>
              <status.icon aria-hidden="true" />
              {status.label}
            </span>

            <h1 id="design-title" className={styles.title}>
              {design.name}
            </h1>

            <p className={styles.statusText}>{status.text}</p>

            {/* Four facts */}
            <dl className={styles.facts}>
              <div className={styles.fact}>
                <dt>
                  <FiHash aria-hidden="true" />
                  Design ID
                </dt>
                <dd className={styles.factMono}>{design.id}</dd>
              </div>
              <div className={styles.fact}>
                <dt>
                  <FiCalendar aria-hidden="true" />
                  Last saved
                </dt>
                <dd>
                  <time dateTime={design.savedAt}>{design.savedLabel}</time>
                </dd>
              </div>
              <div className={styles.fact}>
                <dt>
                  <FiEdit3 aria-hidden="true" />
                  Created
                </dt>
                <dd>
                  <time dateTime={design.createdAt}>{design.createdLabel}</time>
                </dd>
              </div>
              <div className={styles.fact}>
                <dt>
                  <FiLayers aria-hidden="true" />
                  Quantity
                </dt>
                <dd className={styles.factStrong}>
                  {design.quantity ? `${design.quantity} shirts` : "Not set yet"}
                </dd>
              </div>
            </dl>

            {/* Actions */}
            <div className={styles.actions}>
              <Link href={design.designHref} className="ic_btn ic_btn_primary ic_btn_lg">
                <FiEdit3 aria-hidden="true" />
                Edit design
              </Link>

              {status.canCheckout ? (
                <Link href="/checkout/summary" className="ic_btn ic_btn_secondary ic_btn_lg">
                  <FiShoppingCart aria-hidden="true" />
                  Checkout
                </Link>
              ) : null}

              {design.orderHref ? (
                <Link href={design.orderHref} className="ic_btn ic_btn_secondary ic_btn_lg">
                  <FiPackage aria-hidden="true" />
                  Track order {design.orderNumber}
                </Link>
              ) : null}
            </div>

            {!status.canCheckout && !design.orderHref ? (
              <p className={styles.actionNote}>
                Add a size run in the studio to price this design up and unlock checkout.
              </p>
            ) : null}

            <ShareDesign designName={design.name} designId={design.id} />
          </Reveal>
        </div>

        {/* ---------------- Details ---------------- */}
        <div className={styles.details}>
          {/* Garment */}
          <Reveal className={styles.card}>
            <div className={styles.cardHead}>
              <h2>Garment</h2>
              <Link href={design.productHref} className="ic_link">
                View product
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>

            <p className={styles.garmentName}>
              {design.style.brand} {design.style.name}
            </p>
            <p className={styles.garmentText}>{design.style.description}</p>

            <dl className={styles.rows}>
              <div className={styles.row}>
                <dt>Colour</dt>
                <dd className={styles.rowColor}>
                  <span
                    className={styles.swatch}
                    style={{ backgroundColor: design.colorHex }}
                    aria-hidden="true"
                  />
                  {design.color}
                </dd>
              </div>
              <div className={styles.row}>
                <dt>Blank price</dt>
                <dd>${design.style.price.toFixed(2)} each</dd>
              </div>
              {design.note ? (
                <div className={styles.row}>
                  <dt>Note</dt>
                  <dd>{design.note}</dd>
                </div>
              ) : null}
            </dl>
          </Reveal>

          {/* Print locations */}
          <Reveal className={styles.card} delay={0.06}>
            <div className={styles.cardHead}>
              <h2>Print locations</h2>
              <span className={styles.cardNote}>
                {design.prints.length} {design.prints.length === 1 ? "placement" : "placements"}
              </span>
            </div>

            <ul className={styles.prints}>
              {design.prints.map((print) => (
                <li key={`${print.view}-${print.size}`} className={styles.print}>
                  <span className={styles.printView}>{print.view}</span>
                  <span className={styles.printMeta}>
                    {print.method} · {print.size}
                  </span>
                  <span className={styles.inks}>
                    {print.inks.map((ink) => (
                      <span
                        key={ink}
                        className={styles.ink}
                        style={{ backgroundColor: ink }}
                        title={ink}
                      />
                    ))}
                    <span className={styles.inkCount}>
                      {print.inks.length} {print.inks.length === 1 ? "ink" : "inks"}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Sizes + estimate */}
          <Reveal className={styles.card} delay={0.12}>
            <div className={styles.cardHead}>
              <h2>Size run</h2>
              {design.quantity ? (
                <span className={styles.cardNote}>{design.quantity} total</span>
              ) : null}
            </div>

            {design.sizes.length ? (
              <>
                <ul className={styles.sizes}>
                  {design.sizes.map((size) => (
                    <li key={size.label} className={styles.size}>
                      <span className={styles.sizeLabel}>{size.label}</span>
                      <span className={styles.sizeQty}>{size.qty}</span>
                    </li>
                  ))}
                </ul>

                {design.pricing ? (
                  <dl className={styles.rows}>
                    <div className={styles.row}>
                      <dt>Garments</dt>
                      <dd>{design.pricing.garments}</dd>
                    </div>
                    <div className={styles.row}>
                      <dt>Printing</dt>
                      <dd>{design.pricing.printing}</dd>
                    </div>
                    <div className={`${styles.row} ${styles.rowTotal}`}>
                      <dt>Estimate</dt>
                      <dd>
                        {design.pricing.subtotal}
                        <span className={styles.perShirt}>{design.pricing.perShirt} per shirt</span>
                      </dd>
                    </div>
                  </dl>
                ) : null}

                <p className={styles.estimateNote}>
                  Indicative only — shipping, tax and volume discounts are applied at checkout.
                </p>
              </>
            ) : (
              <div className={styles.noSizes}>
                <p>No sizes on this design yet.</p>
                <Link href={design.designHref} className="ic_btn ic_btn_secondary ic_btn_sm">
                  Add sizes
                  <FiArrowRight aria-hidden="true" />
                </Link>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
