import Link from "next/link";
import { FiCheckCircle, FiMail } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import { site } from "@/data/home";
import LegalToc from "./LegalToc";
import styles from "./Legal.module.css";

const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

function Block({ block }) {
  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p>{block.text}</p>;
}

/** Shared frame for legal documents: heading, key points, sticky contents and the sections. */
export default function LegalPage({ doc }) {
  return (
    <section className={styles.page} aria-labelledby="legal-title">
      <div className={`ic_container ${styles.inner}`}>
        <Reveal className={styles.head}>
          <span className="ic_eyebrow">{doc.eyebrow}</span>
          <h1 id="legal-title">{doc.title}</h1>
          <p className={`ic_lead ${styles.lead}`}>{doc.intro}</p>
          <p className={styles.updated}>
            Last updated <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
          </p>
        </Reveal>

        <div className={styles.layout}>
          <aside className={styles.side}>
            <LegalToc sections={doc.sections} />
          </aside>

          <article className={styles.article}>
            {doc.summary?.length ? (
              <Reveal className={styles.summary}>
                <h2 className={styles.summaryTitle}>The short version</h2>
                <ul className={styles.summaryList}>
                  {doc.summary.map((point) => (
                    <li key={point}>
                      <FiCheckCircle aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className={styles.summaryNote}>
                  This summary is for convenience. The full terms below are what applies.
                </p>
              </Reveal>
            ) : null}

            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} className={styles.section}>
                <h2>{section.title}</h2>
                {section.blocks.map((block, index) => (
                  <Block key={`${section.id}-${index}`} block={block} />
                ))}
              </section>
            ))}

            <div className={styles.foot}>
              <div>
                <h3>Still have a question?</h3>
                <p>A person answers, not a form — usually within one business hour.</p>
              </div>
              <div className={styles.footActions}>
                <a href={`mailto:${site.email}`} className="ic_btn ic_btn_primary">
                  <FiMail aria-hidden="true" />
                  {site.email}
                </a>
                <Link href="/contact" className="ic_btn ic_btn_secondary">
                  Contact us
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
