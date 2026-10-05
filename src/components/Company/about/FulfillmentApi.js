import Reveal from "@/components/motion/Reveal";
import { fulfillmentApi } from "@/data/about";
import PageHead from "./PageHead";
import CtaPanel from "./CtaPanel";
import styles from "./About.module.css";

export default function FulfillmentApi() {
  return (
    <>
      <PageHead
        eyebrow={fulfillmentApi.eyebrow}
        title={fulfillmentApi.title}
        lead={fulfillmentApi.lead}
      />

      <ul className={styles.cards}>
        {fulfillmentApi.features.map(({ icon: Icon, title, text }, i) => (
          <Reveal as="li" key={title} className={styles.card} delay={i * 0.06}>
            <span className={styles.cardIcon}>
              <Icon size={18} aria-hidden="true" />
            </span>
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal className={styles.code}>
        <div className={styles.codeHead}>Create an order</div>
        <pre>
          <code>{fulfillmentApi.sample}</code>
        </pre>
      </Reveal>

      <Reveal className={styles.panel}>
        <h2 className={styles.sectionTitle}>Core endpoints</h2>
        <ul>
          {fulfillmentApi.endpoints.map(({ method, path, text }) => (
            <li key={path} className={styles.endpoint}>
              <span className={styles.method}>{method}</span>
              <code className={styles.path}>{path}</code>
              <span className={styles.endpointText}>{text}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <CtaPanel
        title="Get a sandbox key and build against it today."
        text="Sandbox mirrors production, including proofs and webhook events, so nothing surprises you on launch day."
        primary={{ label: "Request API access", href: "/about/contact" }}
        secondary={{ label: "Talk to an engineer", href: "/about/contact" }}
      />
    </>
  );
}
