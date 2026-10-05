import Reveal from "@/components/motion/Reveal";
import { teechipStores } from "@/data/about";
import PageHead from "./PageHead";
import CtaPanel from "./CtaPanel";
import styles from "./About.module.css";

export default function TeeChipStores() {
  return (
    <>
      <PageHead
        eyebrow={teechipStores.eyebrow}
        title={teechipStores.title}
        lead={teechipStores.lead}
      />

      <section>
        <Reveal as="h2" className={styles.sectionTitle}>
          How a store works
        </Reveal>
        <ol className={styles.steps}>
          {teechipStores.steps.map(({ title, text }, i) => (
            <Reveal as="li" key={title} className={styles.step} delay={i * 0.06}>
              <span className={styles.stepIndex}>{i + 1}</span>
              <div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <ul className={styles.cards}>
        {teechipStores.features.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} className={styles.card} delay={i * 0.06}>
            <span className={styles.cardIcon}>
              <Icon size={18} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal className={styles.panel}>
        <h2 className={styles.sectionTitle}>Common questions</h2>
        <div className={styles.faq}>
          {teechipStores.faqs.map(({ q, a }) => (
            <div key={q} className={styles.faqItem}>
              <h4>{q}</h4>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <CtaPanel
        title="Open a store and sell your first shirt this week."
        text="No listing fees, no minimums and no stock sitting in your spare room. You design and share; we print, pack and pay out."
        primary={{ label: "Open a store", href: "/signup" }}
        secondary={{ label: "See the catalogue", href: "/products/t-shirts" }}
      />
    </>
  );
}
