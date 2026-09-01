import Link from "next/link";
import { site } from "@/data/home";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={className} aria-label={`${site.name} home`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <rect width="34" height="34" rx="9" fill="var(--ic-ink)" />
        <circle cx="12.5" cy="17" r="5.25" stroke="#fff" strokeWidth="2.5" />
        <circle cx="21.5" cy="17" r="5.25" stroke="var(--ic-accent)" strokeWidth="2.5" />
      </svg>
      <span>
        oo<strong>Shirts</strong>
      </span>
    </Link>
  );
}
