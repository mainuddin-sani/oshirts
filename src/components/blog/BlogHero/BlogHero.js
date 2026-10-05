"use client";

import { motion, useReducedMotion } from "framer-motion";
import { blogIntro } from "@/data/blog";
import styles from "./blogHero.module.css";

const EASE = [0.2, 0.7, 0.2, 1];

export default function BlogHero() {
  const reduce = useReducedMotion();

  return (
    <section className={`ic_theme_dark ${styles.hero}`} aria-labelledby="blog-hero-title">
      <div className="ic_container">
        <div className={styles.inner}>
          <motion.div
            className={styles.content}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="ic_eyebrow">{blogIntro.eyebrow}</span>

            <h2 id="blog-hero-title">{blogIntro.title}</h2>

            <p className="ic_lead">{blogIntro.lead}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
