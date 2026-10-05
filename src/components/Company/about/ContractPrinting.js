import Reveal from "@/components/motion/Reveal";
import { contractPrinting } from "@/data/about";
import PageHead from "./PageHead";
import CtaPanel from "./CtaPanel";
import styles from "./About.module.css";

export default function ContractPrinting() {
  return (
    <>
      <PageHead
        eyebrow={contractPrinting.eyebrow}
        title={contractPrinting.title}
        lead={contractPrinting.lead}
      />

      <ul className={styles.cards}>
        {contractPrinting.capabilities.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} className={styles.card} delay={i * 0.06}>
            <span className={styles.cardIcon}>
              <Icon size={18} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </ul>

      <section>
        <Reveal as="h2" className={styles.sectionTitle}>
          How a programme runs
        </Reveal>
        <ol className={styles.steps}>
          {contractPrinting.process.map(({ title, text }, i) => (
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

      <CtaPanel
        title="Send us a spec and we will come back with a schedule."
        text="Most contract quotes go out the same day, including a strike-off date and reserved press capacity."
        primary={{ label: "Request a quote", href: "/quote" }}
        secondary={{ label: "Contact the team", href: "/about/contact" }}
      />
    </>
  );
}
