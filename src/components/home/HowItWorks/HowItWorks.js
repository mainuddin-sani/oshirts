import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { steps, site } from "@/data/home";
import styles from "./HowItWorks.module.css";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="ic_section_space" aria-labelledby="how-title">
      <div className="ic_container">
        <SectionHeading
          eyebrow="How it works"
          title={<span id="how-title">From blank to boxed in three steps.</span>}
          description="No design skills, no minimums for DTG, and a specialist checking your artwork before it prints."
          align="center"
        />

        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.12} className={styles.step}>
              <div className={styles.stage}>
                <span className={styles.number}>{step.number}</span>
                <Image src={step.image} alt={step.imageAlt} sizes="(min-width: 1024px) 26vw, 80vw" />
                <span className={styles.stageIcon}>
                  <step.icon size={18} aria-hidden="true" />
                </span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className={styles.ctas} delay={0.2}>
          <Link href={site.ctaPrimary.href} className="ic_btn ic_btn_primary ic_btn_lg">
            {site.ctaPrimary.label}
            <FiArrowRight aria-hidden="true" />
          </Link>
          <Link href="#faq" className="ic_link">
            Talk to a print specialist first
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
