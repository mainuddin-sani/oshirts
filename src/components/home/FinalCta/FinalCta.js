import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import { images, site } from "@/data/home";
import styles from "./FinalCta.module.css";

export default function FinalCta() {
  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <div className="ic_container">
        <Reveal variant="scale" className={`ic_theme_dark ${styles.panel}`}>
          <div className={styles.copy}>
            <span className="ic_eyebrow">Ready when you are</span>
            <h2 id="cta-title">Start with a blank. End with something people ask about.</h2>
            <p className="ic_lead">
              Free design review, free shipping, and a low price guarantee on every order. It takes about four minutes
              to get a quote.
            </p>

            <div className={styles.ic_cta_top}>
              <div className={styles.ctas}>
                <Link href={site.ctaPrimary.href} className="ic_btn ic_btn_primary ic_btn_lg">
                  {site.ctaPrimary.label}
                  <FiArrowRight aria-hidden="true" />
                </Link>
                <Link href={site.ctaSecondary.href} className="ic_btn ic_btn_secondary ic_btn_lg">
                  {site.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className={styles.visual} aria-hidden="true">
              <Image src={images.printWhiteGarage} alt="" sizes="(min-width: 1024px) 34vw, 60vw" />
            </div>

            <div className={styles.ic_cta_bottom}>
              <div className={styles.ctas}>
                <Link href={site.ctaPrimary.href} className="ic_btn ic_btn_primary ic_btn_lg">
                  {site.ctaPrimary.label}
                  <FiArrowRight aria-hidden="true" />
                </Link>
                <Link href={site.ctaSecondary.href} className="ic_btn ic_btn_secondary ic_btn_lg">
                  {site.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
