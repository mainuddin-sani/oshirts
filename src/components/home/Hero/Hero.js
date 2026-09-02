"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiTruck, FiTag } from "react-icons/fi";
import { hero, images, site } from "@/data/home";
import styles from "./Hero.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

export default function Hero() {
  const reduce = useReducedMotion();
  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`ic_container ${styles.grid}`}>
        <div className={styles.copy}>
          <motion.span className="ic_eyebrow" {...fadeUp(0)}>
            {hero.eyebrow}
          </motion.span>

          <motion.h1 id="hero-title" {...fadeUp(0.08)}>
            {hero.title.map((line, i) => (
              <span key={line} className={i === hero.title.length - 1 ? styles.accentLine : undefined}>
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p className={`ic_lead ${styles.lead}`} {...fadeUp(0.18)}>
            {hero.description}
          </motion.p>

          <motion.div className={styles.ctas} {...fadeUp(0.26)}>
            <Link href={site.ctaPrimary.href} className="ic_btn ic_btn_primary ic_btn_lg">
              {site.ctaPrimary.label}
              <FiArrowRight aria-hidden="true" />
            </Link>
            <Link href={site.ctaSecondary.href} className="ic_btn ic_btn_secondary ic_btn_lg">
              {site.ctaSecondary.label}
            </Link>
          </motion.div>

          <motion.dl className={styles.proof} {...fadeUp(0.36)}>
            {hero.proof.map((item) => (
              <div key={item.label}>
                <dt>{item.value}</dt>
                <dd>{item.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className={styles.visual}>
          <motion.div
            className={styles.stage}
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            <Image
              src={images.printBlackMountain}
              alt="Black premium T-shirt printed with a full-colour mountain adventure graphic"
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 46vw, 92vw"
              className={styles.mainImage}
            />
          </motion.div>

          <motion.div
            className={styles.secondary}
            initial={reduce ? false : { opacity: 0, y: 30, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            <Image
              src={images.printCreamMountain}
              alt="Cream T-shirt with the same mountain graphic, shown as an alternate colourway"
              sizes="(min-width: 1024px) 18vw, 40vw"
            />
          </motion.div>

          <motion.div
            className={`${styles.chip} ${styles.chipPrice}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
          >
            <span className={styles.chipIcon}>
              <FiTag aria-hidden="true" />
            </span>
            <span>
              <strong>{hero.chips[0].label}</strong>
              <small>{hero.chips[0].sub}</small>
            </span>
          </motion.div>

          <motion.div
            className={`${styles.chip} ${styles.chipShip}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE }}
          >
            <span className={styles.chipIcon}>
              <FiTruck aria-hidden="true" />
            </span>
            <span>
              <strong>{hero.chips[1].label}</strong>
              <small>{hero.chips[1].sub}</small>
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
