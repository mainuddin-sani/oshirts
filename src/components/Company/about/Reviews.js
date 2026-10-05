import Reveal from "@/components/motion/Reveal";
import Stars from "@/components/ui/Stars";
import { ourReviews } from "@/data/about";
import { testimonials } from "@/data/home";
import PageHead from "./PageHead";
import CtaPanel from "./CtaPanel";
import styles from "./About.module.css";

export default function Reviews() {
  return (
    <>
      <PageHead eyebrow={ourReviews.eyebrow} title={ourReviews.title} lead={ourReviews.lead} />

      <Reveal className={styles.panel}>
        <div className={styles.ratingSummary}>
          <div className={styles.ratingScore}>
            <div className={styles.ratingValue}>{testimonials.rating}</div>
            <Stars rating={testimonials.rating} size={16} />
            <p className={styles.ratingCount}>{testimonials.count} verified reviews</p>
          </div>

          <div className={styles.bars}>
            {ourReviews.breakdown.map(({ stars, share }) => (
              <div key={stars} className={styles.bar}>
                <span>{stars} star</span>
                <span className={styles.barTrack}>
                  <span className={styles.barFill} style={{ width: `${share}%` }} />
                </span>
                <span className={styles.barValue}>{share}%</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal as="dl" className={styles.statGrid} delay={0.06}>
        {ourReviews.highlights.map((item) => (
          <div key={item.label} className={styles.stat}>
            <dt className={styles.statValue}>{item.value}</dt>
            <dd className={styles.statLabel}>{item.label}</dd>
          </div>
        ))}
      </Reveal>

      <Reveal as="figure" className={`${styles.reviewCard} ${styles.featured}`}>
        <Stars rating={testimonials.featured.rating} size={15} />
        <blockquote>{testimonials.featured.quote}</blockquote>
        <figcaption className={styles.reviewMeta}>
          <strong>{testimonials.featured.name}</strong>
          <span>{testimonials.featured.role}</span>
        </figcaption>
      </Reveal>

      <section>
        <Reveal as="h2" className={styles.sectionTitle}>
          Recent reviews
        </Reveal>
        <ul className={styles.cards}>
          {testimonials.items.map((item, i) => (
            <Reveal as="li" key={item.name} className={styles.reviewCard} delay={i * 0.06}>
              <Stars rating={item.rating} size={14} />
              <blockquote>{item.quote}</blockquote>
              <div className={styles.reviewMeta}>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <CtaPanel
        title="Read them, then judge us on your own order."
        text="Every order carries the same free design review and reprint guarantee that these reviews are talking about."
        primary={{ label: "Start designing", href: "/design" }}
        secondary={{ label: "Get a quote", href: "/quote" }}
      />
    </>
  );
}
