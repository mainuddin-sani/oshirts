import Link from "next/link";
import { FiCheck, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { pricing, support, site } from "@/data/home";
import styles from "./SupportPricing.module.css";

export default function SupportPricing() {
  return (
    <section id="pricing" className="ic_section_space" aria-labelledby="pricing-title">
      <div className="ic_container">
        <SectionHeading
          eyebrow="Pricing & support"
          title={<span id="pricing-title">Transparent pricing. Human help.</span>}
          description="Every price includes setup, a professional artwork check and free ground shipping. The only thing that changes the number is how many you need."
        />

        <div className={styles.grid}>
          <Reveal as="article" className={styles.pricing} aria-labelledby="tiers-title">
            <header className={styles.pricingHead}>
              <div>
                <h3 id="tiers-title">Per-shirt pricing</h3>
                <p>Classic tee · 1-colour front print</p>
              </div>
              <span className={styles.badge}>No setup fees</span>
            </header>

            <ul className={styles.tiers}>
              {pricing.tiers.map((tier, i) => (
                <li key={tier.qty} className={i === 1 ? styles.popular : ""}>
                  <span className={styles.qty}>
                    {tier.qty} <small>shirts</small>
                  </span>
                  <span className={styles.note}>{tier.note}</span>
                  <span className={styles.tierPrice}>{tier.price}</span>
                </li>
              ))}
            </ul>

            <ul className={styles.includes}>
              {pricing.includes.map((item) => (
                <li key={item}>
                  <FiCheck aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <Link href={site.ctaSecondary.href} className="ic_btn ic_btn_primary">
              Get an instant quote
              <FiArrowRight aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal as="aside" delay={0.12} className={`ic_theme_dark ${styles.support}`} aria-labelledby="support-title">
            <span className="ic_eyebrow">Expert help</span>
            <h3 id="support-title">Talk to someone who prints shirts for a living.</h3>
            <p>Sizing for a whole team, choosing between screen print and DTG, fixing a low-res logo — we do this all day.</p>

            <ul className={styles.channels}>
              {support.map(({ icon: Icon, title, text, action, href }) => (
                <li key={title}>
                  <span className={styles.channelIcon}>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                  <a href={href} className={styles.channelAction}>
                    {action} <FiArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <p className={styles.reviewNote}>
              <strong>Free design review</strong> on every order — a specialist checks resolution, colours and
              placement before anything prints.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
