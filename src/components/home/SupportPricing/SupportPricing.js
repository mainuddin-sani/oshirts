import Link from "next/link";
import {
  FiCheck,
  FiArrowRight,
  FiArrowUpRight,
  FiMessageCircle,
  FiLayers,
  FiPenTool,
  FiUsers,
} from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { support, site } from "@/data/home";
import styles from "./SupportPricing.module.css";

export default function SupportPricing() {
  return (
    <section
      id="support"
      className="ic_section_space"
      aria-labelledby="support-section-title"
    >
      <div className="ic_container">
        <SectionHeading
          eyebrow="Expert support"
          title={
            <span id="support-section-title">
              Great prints start with the right advice.
            </span>
          }
          description="Not sure which print method, garment or artwork setup is right for your project? Our team is here to make the process simple from first idea to final print."
          align="center"
        />

        <div className={styles.grid}>
          <Reveal
            as="article"
            className={styles.features}
            aria-labelledby="features-title"
          >
            <div className={styles.featuresIntro}>
              <span className="ic_eyebrow">Why print with us</span>

              <h3 id="features-title">
                Professional printing without the guesswork.
              </h3>

              <p>
                From a single team order to a full campaign, you get practical
                guidance and a careful quality check before anything goes to
                print.
              </p>
            </div>

            <div className={styles.featureGrid}>
              <div className={styles.feature}>
                <span className={styles.featureIcon}>
                  <FiPenTool aria-hidden="true" />
                </span>

                <div>
                  <strong>Artwork checked</strong>
                  <span>
                    We review resolution, colours and placement before printing.
                  </span>
                </div>
              </div>

              <div className={styles.feature}>
                <span className={styles.featureIcon}>
                  <FiLayers aria-hidden="true" />
                </span>

                <div>
                  <strong>Right print method</strong>
                  <span>
                    Get clear advice on screen print, DTG and other options.
                  </span>
                </div>
              </div>

              <div className={styles.feature}>
                <span className={styles.featureIcon}>
                  <FiUsers aria-hidden="true" />
                </span>

                <div>
                  <strong>Built for teams</strong>
                  <span>
                    We help with sizing, quantities and getting everyone
                    print-ready.
                  </span>
                </div>
              </div>

              <div className={styles.feature}>
                <span className={styles.featureIcon}>
                  <FiMessageCircle aria-hidden="true" />
                </span>

                <div>
                  <strong>Real human support</strong>
                  <span>
                    Talk to someone who understands apparel printing.
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.featureFooter}>
              <div className={styles.checkList}>
                <span>
                  <FiCheck aria-hidden="true" />
                  No confusing print jargon
                </span>

                <span>
                  <FiCheck aria-hidden="true" />
                  Clear recommendations
                </span>

                <span>
                  <FiCheck aria-hidden="true" />
                  Quality checked before production
                </span>
              </div>

              <Link
                href={site.ctaSecondary.href}
                className="ic_btn ic_btn_primary"
              >
                Start your order
                <FiArrowRight aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal
            as="aside"
            delay={0.12}
            className={`ic_theme_dark ${styles.support}`}
            aria-labelledby="support-title"
          >
            <div>
              <span className="ic_eyebrow">Need a hand?</span>

              <h3 id="support-title">
                Talk to someone who prints shirts for a living.
              </h3>

              <p>
                Have a question about your artwork, garment or print method?
                Reach out and we&apos;ll help you figure it out.
              </p>
            </div>

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
                    {action}
                    <FiArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>

            <div className={styles.reviewNote}>
              <span className={styles.reviewCheck}>
                <FiCheck aria-hidden="true" />
              </span>

              <div className={styles.ic_botton_review}>
                <strong>Free artwork review</strong>
                <span>
                  Every order gets a professional check before anything prints.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}