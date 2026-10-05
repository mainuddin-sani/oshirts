import Link from "next/link";
import Image from "next/image";
import styles from "./ProductCard.module.css";

/**
 * Reusable product card.
 *
 * product: { brand, name, description, price, image, colors }
 * swatches: map of color name -> hex, used for the colour dots.
 * titleAs: heading tag for the product name, so the card can sit at the
 * right level in whatever page section uses it.
 */
export default function ProductCard({
  product,
  href,
  swatches = {},
  maxColors = 4,
  quickViewLabel = "Quick view",
  sizes = "(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw",
  titleAs = "h2",
  className = "",
}) {
  if (!product) return null;

  const Title = titleAs;

  const colors = product.colors || [];
  const visibleColors = colors.slice(0, maxColors);
  const hiddenColors = colors.length - visibleColors.length;

  const classes = [styles.productCard, className].filter(Boolean).join(" ");

  return (
    <article className={classes}>
      <Link href={href} className={styles.imageWrap}>
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className={styles.productImage}
          fill
          sizes={sizes}
        />

        {quickViewLabel && (
          <span className={styles.quickView}>{quickViewLabel}</span>
        )}
      </Link>

      <div className={styles.productInfo}>
        {product.brand && (
          <span className={styles.brand}>{product.brand}</span>
        )}

        <Title className={styles.productName}>
          <Link href={href}>{product.name}</Link>
        </Title>

        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        <div className={styles.productBottom}>
          <div>
            <span className={styles.starting}>Starting at</span>

            <strong className={styles.price}>
              ${product.price.toFixed(2)}
            </strong>
          </div>

          {colors.length > 0 && (
            <div className={styles.colorList}>
              {visibleColors.map((color) => (
                <span
                  key={color}
                  className={styles.colorDot}
                  style={{ backgroundColor: swatches[color] }}
                  title={color}
                />
              ))}

              {hiddenColors > 0 && (
                <span className={styles.colorMore}>+{hiddenColors}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
