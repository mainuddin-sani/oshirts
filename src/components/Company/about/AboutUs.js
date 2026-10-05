import Reveal from "@/components/motion/Reveal";
import { aboutUs } from "@/data/about";
import PageHead from "./PageHead";
import CtaPanel from "./CtaPanel";
import styles from "./About.module.css";

export default function AboutUs() {
  return (
    <>
      <PageHead eyebrow={aboutUs.eyebrow} title={aboutUs.title} lead={aboutUs.lead} />

      {/* <Reveal as="dl" className={styles.statGrid}>
        {aboutUs.stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <dt className={styles.statValue}>{stat.value}</dt>
            <dd className={styles.statLabel}>{stat.label}</dd>
          </div>
        ))}
      </Reveal> */}

      <Reveal className={styles.prose}>
        <h2 className={styles.sectionTitle}>How we work</h2>
        {aboutUs.story.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </Reveal>

      <section>
        <Reveal as="h2" className={styles.sectionTitle}>
          What we hold ourselves to
        </Reveal>
        <ul className={styles.cards}>
          {aboutUs.values.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} className={styles.card} delay={i * 0.06}>
              <span className={styles.cardIcon}>
                <Icon size={18} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className={styles.panel}>
        <h2 className={styles.sectionTitle}>Sixteen years, briefly</h2>
        <ol className={styles.timeline}>
          {aboutUs.timeline.map(({ year, title, text }) => (
            <li key={year} className={styles.tItem}>
              <span className={styles.tDot} aria-hidden="true" />
              <div>
                <span className={styles.tYear}>{year}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <CtaPanel
        title="Come see what your artwork looks like on a real shirt."
        text="Start a design, or send us the artwork you already have — a specialist checks it free, whatever you decide to do next."
        primary={{ label: "Start designing", href: "/design" }}
        secondary={{ label: "Talk to us", href: "/about/contact" }}
      />
    </>
  );
}
