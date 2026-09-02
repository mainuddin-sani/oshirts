import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { categories } from "@/data/home";
import styles from "./Categories.module.css";

export default function Categories() {
  const featured = categories.filter((c) => c.featured);
  const rest = categories.filter((c) => !c.featured);

  return (
    <section id="products" className={`ic_section_space ${styles.section}`} aria-labelledby="products-title">
      <div className="ic_container">
        <div className={styles.head}>
          <SectionHeading
            eyebrow="Products"
            title={<span id="products-title">Every blank you need, one place to print it.</span>}
            description="Curated from brands we've printed on millions of times. Pick a category to see live pricing by quantity."
          />
          <Reveal delay={0.1} className={styles.headLink}>
            <Link href="/products" className="ic_link">
              Browse all 240+ styles <FiArrowUpRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {featured.map((cat, i) => (
            <Reveal as="article" key={cat.slug} delay={i * 0.08} className={styles.feature} data-tone={cat.tone}>
              <Link href={`/products/${cat.slug}`} className={styles.featureLink}>
                <div className={styles.featureCopy}>
                  <span className={styles.price}>{cat.price}</span>
                  <h3>{cat.name}</h3>
                  <p>{cat.blurb}</p>
                  <span className={styles.arrow} aria-hidden="true">
                    <FiArrowUpRight />
                  </span>
                </div>
                <div className={styles.featureImage}>
                  <Image src={cat.image} alt={cat.imageAlt} placeholder="blur" sizes="(min-width: 1024px) 30vw, 70vw" />
                </div>
              </Link>
            </Reveal>
          ))}

          {rest.map(({ slug, name, price, icon: Icon }, i) => (
            <Reveal as="article" key={slug} delay={0.16 + i * 0.05} className={styles.tile}>
              <Link href={`/products/${slug}`} className={styles.tileLink}>
                <span className={styles.tileIcon}>
                  <Icon size={30} aria-hidden="true" />
                </span>
                <h4>{name}</h4>
                <span className={styles.price}>{price}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
