import Reveal from "@/components/motion/Reveal";
import styles from "./SectionHeading.module.css"

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className = "",
}) {
  const Heading = as;
  const classes = [
    styles.ic_section_head,
    align === "center" && styles.ic_section_head_center,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Reveal className={classes}>
      {eyebrow ? (
        <span className={styles.ic_eyebrow}>{eyebrow}</span>
      ) : null}

      <Heading>{title}</Heading>

      {description ? (
        <p className={styles.ic_lead}>{description}</p>
      ) : null}
    </Reveal>
  );
}
