import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import styles from "./CtaPanel.module.css";
import { section } from "framer-motion/client";

/**
 * Centred call-to-action panel in the homepage's dark-panel language.
 * Everything is configurable; only `title` and `button` are required.
 *
 * <CtaPanel
 *   eyebrow="Ready when you are"
 *   title="Start with a blank."
 *   description="Free design review on every order."
 *   button={{ label: "Start designing", href: "/design" }}
 *   secondary={{ label: "Get a quote", href: "/quote" }}
 * />
 */
export default function CtaPanel({
  eyebrow,
  title,
  description,
  button,
  secondary,
  id = "cta-panel-title",
  className = "",
}) {
  return (
    <section className="ic_section_space_top">
      <div className={`${styles.section} ${className}`} aria-labelledby={id}>
        <div className="ic_container">
          <Reveal variant="scale" className={`ic_theme_dark ${styles.panel}`}>
            {eyebrow ? <span className="ic_eyebrow">{eyebrow}</span> : null}
            <h2 id={id}>{title}</h2>
            {description ? <p className="ic_lead">{description}</p> : null}

            <div className={styles.actions}>
              <Link href={button.href} className="ic_btn ic_btn_primary ic_btn_lg">
                {button.label}
                <FiArrowRight aria-hidden="true" />
              </Link>
              {secondary ? (
                <Link href={secondary.href} className="ic_btn ic_btn_secondary ic_btn_lg">
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
