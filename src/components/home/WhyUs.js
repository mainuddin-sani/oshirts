import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import { whyUs, site } from "@/data/home";
import styles from "./WhyUs.module.css";

export default function WhyUs() {
  return (
    <section className={`ic_theme_dark ic_section_space ${styles.section}`} aria-labelledby="why-title">
      <div className={`ic_container ${styles.grid}`}>
        <div className={styles.aside}>
          <Reveal>
            <span className="ic_eyebrow">Why ooShirts</span>
            <h2 id="why-title">Why teams switch to us — and don&apos;t switch back.</h2>
            <p className="ic_lead">
              Printing shirts is easy. Printing them on time, in the right colour, at a price that doesn&apos;t change at
              checkout — that&apos;s the part we obsess over.
            </p>
            <Link href={site.ctaSecondary.href} className="ic_btn ic_btn_primary">
              {site.ctaSecondary.label}
              <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>

          <dl className={styles.stats}>
            {whyUs.stats.map((s, i) => (
              <Reveal as="div" key={s.label} delay={0.1 + i * 0.06}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <ol className={styles.reasons}>
          {whyUs.reasons.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className={styles.reason}>
              <span className={styles.index}>0{i + 1}</span>
              <span className={styles.reasonIcon}>
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
