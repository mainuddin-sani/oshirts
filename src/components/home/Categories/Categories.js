import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { categories } from "@/data/home";

import styles from "./Categories.module.css";

export default function Categories() {
  const featured = categories.filter((category) => category.featured);
  const rest = categories.filter((category) => !category.featured);

  return (
    <section
      id="products"
      className={`ic_section_space ${styles.section}`}
      aria-labelledby="products-title"
    >
      <div className="ic_container">

        {/* ================================================
            SECTION HEADER
        ================================================= */}

        <div className={`${styles.head} ic_section_heading_space`}>
          <SectionHeading
            eyebrow="Our products"
            title={
              <span id="products-title">
                Find the right style for your design.
              </span>
            }
            description="Choose a category to explore available styles, colours and sizes."
          />

          <Reveal
            delay={0.1}
            className={styles.headLink}
          >
            <Link
              href="/products"
              className="ic_link"
            >
              Browse all styles
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* ================================================
            CATEGORY GRID
        ================================================= */}

        <div className={styles.grid}>

          {/* ==============================================
              FEATURED CATEGORIES
          =============================================== */}

          {featured.map((category, index) => (
            <Reveal
              as="article"
              key={category.slug}
              delay={index * 0.08}
              className={styles.feature}
              data-tone={category.tone}
            >
              <Link
                href={`/products/${category.slug}`}
                className={styles.featureLink}
                aria-label={`Explore ${category.name}`}
              >

                {/* Featured copy */}

                <div className={styles.featureCopy}>

                  {category.label && (
                    <span className={styles.label}>
                      {category.label}
                    </span>
                  )}

                  <div className={styles.featureContent}>

                    <div className={styles.featureInfo}>
                      <h3>{category.name}</h3>

                      {category.blurb && (
                        <p>{category.blurb}</p>
                      )}
                    </div>

                    <span className={styles.featureCta}>
                      <span>Explore</span>

                      <span
                        className={styles.arrow}
                        aria-hidden="true"
                      >
                        <FiArrowUpRight />
                      </span>
                    </span>

                  </div>
                </div>

                {/* Featured product image */}

                <div className={styles.featureImage}>
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 30vw, 80vw"
                  />
                </div>

              </Link>
            </Reveal>
          ))}

          {/* ==============================================
              STANDARD CATEGORIES
          =============================================== */}

          {rest.map((category, index) => (
            <Reveal
              as="article"
              key={category.slug}
              delay={0.16 + index * 0.05}
              className={styles.tile}
            >
              <Link
                href={`/products/${category.slug}`}
                className={styles.tileLink}
                aria-label={`Explore ${category.name}`}
              >

                {/* Product image */}

                <div className={styles.tileImage}>
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 50vw"
                  />
                </div>

                {/* Category name */}

                <div className={styles.tileContent}>
                  <h4>{category.name}</h4>

                  <span
                    className={styles.tileArrow}
                    aria-hidden="true"
                  >
                    <FiArrowUpRight />
                  </span>
                </div>

              </Link>
            </Reveal>
          ))}

        </div>

        {/* ================================================
            PRIMARY CTA
        ================================================= */}

        <Reveal
          delay={0.15}
          className={styles.catalogLink}
        >
          <Link
            href="/design"
            className="ic_btn ic_btn_primary ic_btn_lg"
          >
            Start designing
            <FiArrowUpRight aria-hidden="true" />
          </Link>
        </Reveal>

      </div>
    </section>
  );
}




