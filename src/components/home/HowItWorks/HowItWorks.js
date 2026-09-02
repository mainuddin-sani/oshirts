import {
  FiDollarSign,
  FiAward,
  FiMessageCircle,
} from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import styles from "./HowItWorks.module.css";

const promises = [
  {
    eyebrow: "Low price",
    title: "Low Price Guarantee",
    text: "ooShirts.com was founded by a high school student in 2007 with an investment of just $2000. Our goal was to offer t-shirt printing that's actually affordable to school groups, nonprofits, families, and small businesses in the US. If you find a lower price online, simply send it to us and we'll match the price.",
    icon: FiDollarSign,
  },
  {
    eyebrow: "Quality shirts",
    title: "Amazing Print Quality",
    text: "High quality printing comes from years of printing experience, use of top-notch inks, and an unwavering commitment to producing well made t-shirt designs. We guarantee our prints will last wash after wash, and that our garments will come free of material defects -- or we'll redo your order from scratch.",
    icon: FiAward,
  },
  {
    eyebrow: "Rave-worthy service",
    title: "Rave-worthy Service",
    text: "Our support staff is available 7 days a week over the phone, email, and live chat. We welcome questions of all kind - design your own t-shirt to explanations about the types of custom shirts you can order to any fun or off-topic question of your choice. Either way, we're here to help.",
    icon: FiMessageCircle,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="our-promise"
      className="ic_section_space"
      aria-labelledby="promise-title"
    >
      <div className="ic_container">
        <SectionHeading
          eyebrow="Our Promise"
          title={
            <span id="promise-title">
              Great custom printing, without the compromise.
            </span>
          }
          description="Affordable pricing, exceptional print quality, and real people ready to help. That's the ooShirts promise."
          align="center"
        />

        <div className={styles.promiseGrid}>
          {promises.map((promise, i) => {
            const Icon = promise.icon;

            return (
              <Reveal
                as="article"
                key={promise.title}
                className={styles.promise}
                delay={0.1 + i * 0.1}
              >
                <span className={styles.icon}>
                  {/* <Icon className={styles.ic_icon_size} aria-hidden="true" /> */}
                  <Icon className={styles.ic_icon_size} />
                </span>

                <div className={styles.content}>
                  <span className={styles.eyebrow}>
                    {promise.eyebrow}
                  </span>

                  <h3>{promise.title}</h3>

                  <p>{promise.text}</p>
                </div>

                <span className={styles.accent} aria-hidden="true" />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
