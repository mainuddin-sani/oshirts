import Reveal from "@/components/motion/Reveal";
import { benefits } from "@/data/home";
import styles from "./TrustBar.module.css";

export default function TrustBar() {
  return (
    <section className={`${styles.section} ic_section_space_top`} aria-label="Why customers choose us">
      <div className="ic_container">
        <ul className={styles.list}>
          {benefits.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.07} className={styles.item}>
              <span className={styles.icon}>
                <Icon size={20} aria-hidden="true" />
              </span>
              <div>
                <h5>{title}</h5>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
