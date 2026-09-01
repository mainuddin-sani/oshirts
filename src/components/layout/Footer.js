import Link from "next/link";
import { FiInstagram, FiFacebook, FiLinkedin, FiYoutube } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcApplePay } from "react-icons/fa";
import { footer, site } from "@/data/home";
import Logo from "./Logo";
import styles from "./Footer.module.css";

const socials = [
  { label: "Instagram", icon: FiInstagram, href: "#" },
  { label: "Facebook", icon: FiFacebook, href: "#" },
  { label: "LinkedIn", icon: FiLinkedin, href: "#" },
  { label: "YouTube", icon: FiYoutube, href: "#" },
];

const payments = [FaCcVisa, FaCcMastercard, FaCcAmex, FaCcPaypal, FaCcApplePay];

export default function Footer() {
  return (
    <footer className={`ic_theme_dark ${styles.footer}`}>
      <div className="ic_container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo className={styles.logo} />
            <p>{footer.blurb}</p>
            <ul className={styles.socials} aria-label="Social media">
              {socials.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a href={href} aria-label={label}>
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} className={styles.col} aria-label={col.title}>
              <h6>{col.title}</h6>
              <ul>
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#">{link}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className={styles.legal}>
            {footer.legal.map((item) => (
              <li key={item}>
                <Link href="#">{item}</Link>
              </li>
            ))}
          </ul>
          <ul className={styles.payments} aria-label="Accepted payment methods">
            {payments.map((Icon, i) => (
              <li key={i}>
                <Icon size={30} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
