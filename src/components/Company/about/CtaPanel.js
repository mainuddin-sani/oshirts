import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import styles from "./About.module.css";

/** Closing call to action shared by the company pages. */
export default function CtaPanel({ title, text, primary, secondary }) {
  return (
    <Reveal className={styles.cta}>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}

      <div className={styles.ctaActions}>
        {/* {primary ? (
          <Link href={primary.href} className="ic_btn ic_btn_primary ic_btn_lg">
            {primary.label}
            <FiArrowRight aria-hidden="true" />
          </Link>
        ) : null} */}

        {secondary ? (
          <Link href={secondary.href} className="ic_btn ic_btn_secondary ic_btn_lg">
            {secondary.label}
          </Link>
        ) : null}
      </div>
    </Reveal>
  );
}
