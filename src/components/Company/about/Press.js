import Reveal from "@/components/motion/Reveal";
import { FiDownload } from "react-icons/fi";
import { press } from "@/data/about";
import PageHead from "./PageHead";
import CtaPanel from "./CtaPanel";
import styles from "./About.module.css";

export default function Press() {
  return (
    <>
      <PageHead eyebrow={press.eyebrow} title={press.title} lead={press.lead} />

      <Reveal className={styles.panel}>
        <h2 className={styles.sectionTitle}>Company facts</h2>
        <dl className={styles.rows}>
          {press.facts.map(({ label, value }) => (
            <div key={label} className={styles.row}>
              <dt className={styles.rowLabel}>{label}</dt>
              <dd className={styles.rowValue}>{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <section>
        <Reveal as="h2" className={styles.sectionTitle}>
          Press kit
        </Reveal>
        <ul className={styles.cards}>
          {press.kit.map(({ title, text }, i) => (
            <Reveal as="li" key={title} className={styles.card} delay={i * 0.06}>
              <span className={styles.cardIcon}>
                <FiDownload size={18} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <Reveal className={styles.panel}>
        <h2 className={styles.sectionTitle}>Recent coverage</h2>
        <ul className={styles.coverage}>
          {press.coverage.map(({ outlet, title, date }) => (
            <li key={title} className={styles.coverageItem}>
              <span className={styles.coverageOutlet}>{outlet}</span>
              <span className={styles.coverageTitle}>{title}</span>
              <span className={styles.coverageDate}>{date}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <CtaPanel
        title="Writing about us? The press desk answers same day."
        text={`Interviews, facility visits, product photography and fact checks — reach ${press.contact.email} and a person replies, not an autoresponder.`}
        primary={{ label: "Email the press desk", href: `mailto:${press.contact.email}` }}
        secondary={{ label: "General contact", href: "/about/contact" }}
      />
    </>
  );
}
