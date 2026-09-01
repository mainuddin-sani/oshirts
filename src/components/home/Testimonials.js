import Reveal from "@/components/motion/Reveal";
import Stars from "@/components/ui/Stars";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/home";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const { featured, items, rating, count } = testimonials;

  return (
    <section className={`ic_section_space ${styles.section}`} aria-labelledby="reviews-title">
      <div className="ic_container">
        <SectionHeading
          eyebrow="Reviews"
          title={<span id="reviews-title">Rated 4.9 by the people who wear them.</span>}
          align="center"
        />

        <div className={styles.grid}>
          <Reveal as="figure" className={styles.featured}>
            <span className={styles.mark} aria-hidden="true">
              &ldquo;
            </span>
            <blockquote>
              <p>{featured.quote}</p>
            </blockquote>
            <figcaption>
              <Stars rating={featured.rating} size={15} />
              <strong>{featured.name}</strong>
              <span>{featured.role}</span>
            </figcaption>
            <div className={styles.rating}>
              <span className={styles.ratingValue}>{rating}</span>
              <div>
                <Stars rating={rating} size={13} />
                <small>{count} verified reviews</small>
              </div>
            </div>
          </Reveal>

          <ul className={styles.list}>
            {items.map((t, i) => (
              <Reveal as="li" key={t.name} delay={0.1 + i * 0.08} className={styles.item}>
                <figure>
                  <Stars rating={t.rating} size={13} />
                  <blockquote>
                    <p>{t.quote}</p>
                  </blockquote>
                  <figcaption>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
