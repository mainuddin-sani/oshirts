import { Fragment } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import styles from "./Breadcrumb.module.css";

/**
 * Reusable breadcrumb trail.
 *
 * items: [{ label, href }] — the last item is rendered as the current page.
 * separator: node placed between items (defaults to a chevron icon).
 */
export default function Breadcrumb({
  items = [],
  separator,
  label = "Breadcrumb",
  className = "",
}) {
  if (!items.length) return null;

  const divider = separator ?? <FiChevronRight />;

  const classes = [styles.breadcrumb, className].filter(Boolean).join(" ");

  return (
    <nav className={classes} aria-label={label}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <Fragment key={item.href || item.label}>
            {index > 0 && (
              <span className={styles.separator} aria-hidden="true">
                {divider}
              </span>
            )}

            {item.href && !isLast ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
