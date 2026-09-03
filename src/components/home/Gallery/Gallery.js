import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { gallery } from "@/data/home";
import styles from "./Gallery.module.css";

export default function Gallery() {
  return (
    <section id="gallery" className="ic_section_space" aria-labelledby="gallery-title">
      <div className="ic_container">
        <div className={`${styles.head} ic_section_heading_space`}>
          <SectionHeading
            eyebrow="Customer gallery"
            title={<span id="gallery-title">Real orders, straight off the press.</span>}
            description="Teams, brands and events who trusted us with their artwork — and let us show it off."
          />
        </div>

        <ul className={styles.grid}>
          {gallery.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              variant="image"
              delay={(i % 3) * 0.08}
              amount={0.2}
              className={`${styles.item} ${item.size ? styles[item.size] : ""}`}
              data-tone={item.tone}
            >
              <figure>
                <div className={styles.media}>
                  <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 30vw, 50vw" />
                </div>
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.meta}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
