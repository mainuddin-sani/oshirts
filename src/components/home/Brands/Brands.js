import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

import { brandLogos } from "@/data/home";
import styles from "./Brands.module.css";

function Track({ hidden = false }) {
  return (
    <ul
      className={styles.track}
      aria-hidden={hidden || undefined}
    >
      {Array.from({ length: 6 }).map((_, index) =>
        brandLogos.map((logo, logoIndex) => (
          <li
            key={`${index}-${logoIndex}`}
            className={styles.item}
          >
            <Image
              src={logo.src}
              alt={hidden ? "" : logo.alt}
              className={styles.logo}
              sizes="(max-width: 639px) 140px, 190px"
            />
          </li>
        ))
      )}
    </ul>
  );
}

export default function Brands() {
  return (
    <section
      className={styles.section}
      aria-label="Trusted by teams and brands"
    >
      <Reveal className="ic_container">
        <p className={styles.label}>
          Trusted by <strong>50,000+</strong> teams, schools,
          non-profits and brands
        </p>
      </Reveal>

      <Reveal
        delay={0.1}
        className={styles.marquee}
      >
        <div className={styles.rail}>
          <Track />
          <Track hidden />
        </div>
      </Reveal>
    </section>
  );
}



// import Reveal from "@/components/motion/Reveal";
// import { brands } from "@/data/home";
// import styles from "./Brands.module.css";

// function Track({ hidden = false }) {
//   return (
//     <ul className={styles.track} aria-hidden={hidden || undefined}>
//       {brands.map((b) => (
//         <li key={b.name} className={styles[b.style] || ""}>
//           {b.name}
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default function Brands() {
//   return (
//     <section className={styles.section} aria-label="Trusted by teams and brands">
//       <Reveal className="ic_container">
//         <p className={styles.label}>
//           Trusted by <strong>50,000+</strong> teams, schools, non-profits and brands
//         </p>
//       </Reveal>
//       <Reveal delay={0.1} className={styles.marquee}>
//         <div className={styles.rail}>
//           <Track />
//           <Track hidden />
//         </div>
//       </Reveal>
//     </section>
//   );
// }
