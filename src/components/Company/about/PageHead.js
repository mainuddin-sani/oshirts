import Reveal from "@/components/motion/Reveal";
import styles from "./About.module.css";

/** Shared heading block for every page in the company section. */
export default function PageHead({ eyebrow, title, lead }) {
  return (
    <Reveal className={styles.head}>
      {/* <span className="ic_eyebrow">{eyebrow}</span> */}
      <h1>{title}</h1>
      {lead ? <p className={`ic_lead ${styles.lead}`}>{lead}</p> : null}
    </Reveal>
  );
}
