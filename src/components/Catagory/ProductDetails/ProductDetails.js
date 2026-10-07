"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import Slider from "react-slick";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FiArrowLeft,
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEdit3,
  FiHeart,
} from "react-icons/fi";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Stars from "@/components/ui/Stars";
import Reveal from "@/components/motion/Reveal";
import "slick-carousel/slick/slick.css";
import styles from "./ProductDetails.module.css";
import img1 from "@/assets/images/custom-sweatshirts.png";
import img2 from "@/assets/images/custom-sweatshirts.png";
import RelatedProduct from "./RelatedProduct";

const product = {
  brand: "Hanes",
  name: "50/50 Hooded Sweatshirt",
  slug: "hanes-50-50-hooded-sweatshirt",
  studioStyleId: "hanes-hooded-sweatshirt", // matches a style id in DesignStudio/designStudioData.js
  tagline: "Premium blank sweatshirt",

  category: {
    label: "Hoodies",
    href: "/sweats-sweatshirts/hoodies",
  },

  rating: {
    value: 4.5,
    reviews: 515,
  },

  description:
    "A comfortable and durable 50/50 hooded sweatshirt designed for custom printing and everyday wear.",

  images: [img1, img2, img1, img2, img1, img2, img1, img2],

  delivery: {
    title: "Free delivery",
    description: "Order today and get your shirts by September 18",
    included: true,
  },

  colors: [
    { name: "Black", value: "#111111" },
    { name: "White", value: "#ece917" },
    { name: "Sport Grey", value: "#0d3cbe" },
    { name: "Navy", value: "#07a028" },
    { name: "Red", value: "#fd251d" },
  ],

  sizes: ["S", "M", "L", "XL"],

  pricing: {
    currency: "$",
    minimumQuantity: 24,

    tiers: [
      { quantity: 24, label: "24 units", price: 21.33 },
      { quantity: 48, label: "48 units", price: 20.25 },
      { quantity: 96, label: "96 units", price: 19.81 },
      { quantity: 288, label: "288+ units", price: 19.23, featured: true },
    ],
  },

  specifications: {
    material: "7.8 oz 50% cotton, 50% polyester",
    weight: "7.8 oz",
    sizes: "S - XL",
    fit: "Adult unisex",
  },

  features: [
    "Double-needle stitching throughout",
    "Pouch pocket",
    "1x1 athletic ribbed cuffs",
    "Spandex waistband",
    "Double-lined hood",
    "Drawstring hood",
  ],

  customization: {
    description:
      "Customize this hoodie with your own artwork, logo, text, or design. Perfect for teams, businesses, events, schools, organizations, and personal projects.",

    options: [
      "Custom front printing",
      "Custom back printing",
      "Multiple color options",
      "Professional design support",
    ],
  },

  sizing: {
    description:
      "Available from Small through XL. Sizing can vary slightly by color and production batch.",
    guideLabel: "View complete sizing guide",
  },

  guarantees: [
    { type: "shield", label: "Free setup" },
    { type: "truck", label: "Free shipping" },
    { type: "check", label: "Low price guarantee" },
  ],

  cta: {
    label: "Start Designing",
    hint: "Free setup and a proof before we print",
  },
};

const { currency, minimumQuantity, tiers } = product.pricing;
const basePrice = tiers[0].price;
const bestPrice = tiers.at(-1).price;
const lastImage = product.images.length - 1;
const thumbsToShow = Math.min(4, product.images.length);
const breadcrumbItems = [
  { label: product.category.label, href: product.category.href },
  { label: product.name },
];

const specCards = [
  { label: "Material", value: product.specifications.material },
  { label: "Weight", value: product.specifications.weight },
  { label: "Size range", value: product.specifications.sizes },
  { label: "Fit", value: product.specifications.fit },
];

const money = (value) => `${currency}${value.toFixed(2)}`;
const savingsPercent = (price) => Math.round((1 - price / basePrice) * 100);
const maxSaving = savingsPercent(bestPrice);
const pad = (value) => String(value).padStart(2, "0");

/* Renders false on the server, true once mounted on the client. */
const subscribeToNothing = () => () => {};
const onClient = () => true;
const onServer = () => false;

export default function ProductDetails() {
  const reduce = useReducedMotion();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const { category, productDetails } = useParams();

  // Hand the chosen style/color/quantity to the design studio route.
  const designQuery = new URLSearchParams({
    style: product.studioStyleId,
    color: selectedColor,
    qty: String(minimumQuantity),
  });
  const designHref = `/products/${category}/${productDetails}/design?${designQuery}`;
  const [openDetail, setOpenDetail] = useState("features");
  const [favorite, setFavorite] = useState(false);
  const [mainSlider, setMainSlider] = useState(null);
  const [thumbSlider, setThumbSlider] = useState(null);
  const carouselReady = useSyncExternalStore(
    subscribeToNothing,
    onClient,
    onServer,
  );

  const mainSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    fade: true,
    speed: reduce ? 0 : 450,
    cssEase: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    adaptiveHeight: false,
    asNavFor: thumbSlider || undefined,
    beforeChange: (_, next) => setActiveImage(next),
  };

  const thumbSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: reduce ? 0 : 380,
    cssEase: "cubic-bezier(0.2, 0.7, 0.2, 1)",
    slidesToShow: thumbsToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    asNavFor: mainSlider || undefined,
  };

  const renderThumb = (image, index) => {
    const active = activeImage === index;

    return (
      <button
        type="button"
        className={`${styles.thumb} ${active ? styles.thumbActive : ""}`}
        onClick={() => {
          mainSlider?.slickGoTo(index);
          thumbSlider?.slickGoTo(index);
        }}
        aria-label={`View image ${index + 1}`}
        aria-current={active}
      >
        <Image src={image} alt="" fill sizes="160px" />
      </button>
    );
  };

  const details = [
    {
      id: "features",
      title: "Features & construction",
      content: (
        <ul className={styles.featureList}>
          {product.features.map((feature) => (
            <li key={feature}>
              <FiCheck size={15} aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "printing",
      title: "Printing & customization",
      content: (
        <>
          <p>{product.customization.description}</p>

          <ul className={styles.featureList}>
            {product.customization.options.map((option) => (
              <li key={option}>
                <FiCheck size={15} aria-hidden="true" />
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: "sizing",
      title: "Sizing guide",
      content: (
        <>
          <p>{product.sizing.description}</p>

          <div className={styles.sizeScale} aria-hidden="true">
            {product.sizes.map((size) => (
              <span key={size}>{size}</span>
            ))}
          </div>

          {/* <button type="button" className={styles.inlineLink}>
                        {product.sizing.guideLabel}
                    </button> */}
        </>
      ),
    },
  ];

  return (
    <section className={styles.page}>
      <div className="ic_container">
        {/* TOP BAR */}
        <div className={styles.topBar}>
          <Breadcrumb
            items={breadcrumbItems}
            separator="/"
            className={styles.breadcrumb}
          />

          <Link href={product.category.href} className={styles.backLink}>
            <FiArrowLeft size={14} aria-hidden="true" />
            <span>Back to {product.category.label.toLowerCase()}</span>
          </Link>
        </div>

        {/* HERO */}
        <section className={styles.hero}>
          {/* ---------- GALLERY ---------- */}

          <div className={styles.gallery}>
            <div className={styles.stage}>
              {carouselReady ? (
                <Slider
                  ref={setMainSlider}
                  className={styles.slider}
                  {...mainSettings}
                >
                  {product.images.map((image, index) => (
                    <div key={index} className={styles.mainSlide}>
                      <div className={styles.slide}>
                        <Image
                          src={image}
                          alt={`${product.brand} ${product.name} — view ${index + 1}`}
                          className={styles.slideImage}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 1024px) 100vw, 620px"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className={styles.slide}>
                  <Image
                    src={product.images[0]}
                    alt={`${product.brand} ${product.name}`}
                    className={styles.slideImage}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 620px"
                  />
                </div>
              )}

              <button
                type="button"
                className={`${styles.stageNav} ${styles.stagePrev}`}
                onClick={() => mainSlider?.slickPrev()}
                disabled={activeImage === 0}
                aria-label="Previous image"
              >
                <FiChevronLeft size={18} aria-hidden="true" />
              </button>

              <button
                type="button"
                className={`${styles.stageNav} ${styles.stageNext}`}
                onClick={() => mainSlider?.slickNext()}
                disabled={activeImage === lastImage}
                aria-label="Next image"
              >
                <FiChevronRight size={18} aria-hidden="true" />
              </button>

              <div className={styles.counter}>
                <strong>{pad(activeImage + 1)}</strong>
                <span>/</span>
                {pad(product.images.length)}
              </div>

              <button
                type="button"
                className={`${styles.favorite} ${favorite ? styles.favoriteOn : ""}`}
                onClick={() => setFavorite((current) => !current)}
                aria-pressed={favorite}
                aria-label={
                  favorite ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                <FiHeart
                  size={17}
                  fill={favorite ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              </button>
            </div>

            {carouselReady ? (
              <div className={styles.thumbViewport}>
                <Slider
                  ref={setThumbSlider}
                  className={styles.thumbSlider}
                  {...thumbSettings}
                >
                  {product.images.map((image, index) => (
                    <div key={index} className={styles.thumbSlide}>
                      {renderThumb(image, index)}
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className={styles.thumbRow}>
                {product.images.slice(0, thumbsToShow).map((image, index) => (
                  <div key={index}>{renderThumb(image, index)}</div>
                ))}
              </div>
            )}
          </div>

          {/* ---------- BUY PANEL ---------- */}

          <aside className={styles.panel}>
            <div>
              {/* <div className={styles.identity}>
                                <span className={styles.brand}>{product.brand}</span>
                                <span className={styles.tagline}>{product.tagline}</span>
                            </div> */}

              <div className={styles.rating}>
                <Stars rating={product.rating.value} size={14} />
                <strong>{product.rating.value}</strong>
                <span>{product.rating.reviews} reviews</span>
              </div>
            </div>

            <h1 className={styles.title}>{product.name}</h1>

            <p className={styles.lede}>{product.description}</p>

            {/* <ul className={styles.facts}>
                            {quickFacts.map((fact) => (
                                <li key={fact} className={styles.fact}>
                                    <span aria-hidden="true" />
                                    {fact}
                                </li>
                            ))}
                        </ul> */}

            {/* PRICE */}

            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <div>
                  <span className={styles.priceLabel}>Starting at</span>

                  <div className={styles.priceLine}>
                    <strong className={styles.priceValue}>
                      {money(basePrice)}
                    </strong>
                    <span className={styles.priceUnit}>/ item</span>
                  </div>
                </div>

                {maxSaving > 0 && (
                  <span className={styles.saving}>Up to {maxSaving}% off</span>
                )}
              </div>

              <p className={styles.priceNote}>
                Volume pricing starts at{" "}
                <strong>{minimumQuantity} units</strong> — all in, with free
                setup and shipping.
              </p>

              <div className={styles.tierTable}>
                {tiers.map((tier) => {
                  const save = savingsPercent(tier.price);

                  return (
                    <div
                      key={tier.quantity}
                      className={`${styles.tierCell} ${tier.featured ? styles.tierFeatured : ""}`}
                    >
                      <span className={styles.tierQty}>
                        {tier.label}

                        {tier.featured && (
                          <em className={styles.bestBadge}>Best</em>
                        )}
                      </span>

                      <strong className={styles.tierPrice}>
                        {money(tier.price)}
                      </strong>

                      {/* <span className={styles.tierSave}>
                                                {save > 0 ? `Save ${save}%` : "Base price"}
                                            </span> */}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* COLOR */}

            <div className={styles.optionBlock}>
              <div className={styles.optionHeader}>
                <span className={styles.optionLabel}>Color</span>
                <span className={styles.optionValue}>{selectedColor}</span>
              </div>

              <div
                className={styles.swatchRow}
                role="radiogroup"
                aria-label="Color"
              >
                {product.colors.map((color) => (
                  <button
                    type="button"
                    key={color.name}
                    role="radio"
                    aria-checked={selectedColor === color.name}
                    className={`${styles.swatch} ${selectedColor === color.name ? styles.swatchActive : ""}`}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  >
                    <span style={{ backgroundColor: color.value }} />
                    <span className="ic_sr_only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE */}

            <div className={styles.optionBlock}>
              <div className={styles.optionHeader}>
                <span className={styles.optionLabel}>Size</span>

                {/* <button
                                    type="button"
                                    className={styles.sizeGuide}
                                    onClick={openSizingGuide}
                                >
                                    Size guide
                                </button> */}
              </div>

              <div
                className={styles.sizeRow}
                role="radiogroup"
                aria-label="Size"
              >
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    role="radio"
                    aria-checked={selectedSize === size}
                    className={`${styles.size} ${selectedSize === size ? styles.sizeActive : ""}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}

            <div className={styles.actions}>
              <Link
                href={designHref}
                className={`${styles.designButton} ic_btn ic_btn_primary ic_btn_lg`}
              >
                <FiEdit3 size={17} aria-hidden="true" />
                <span>{product.cta.label}</span>
              </Link>

              {/* <p className={styles.actionHint}>
                                <FiCheck size={14} aria-hidden="true" />
                                {product.cta.hint}
                            </p> */}
            </div>

            {/* ASSURANCE */}

            {/* <div className={styles.assurance}>
                            <div className={styles.delivery}>
                                <span className={styles.deliveryIcon}>
                                    <FiTruck size={17} aria-hidden="true" />
                                </span>

                                <span className={styles.deliveryText}>
                                    <strong>{product.delivery.title}</strong>
                                    <span>{product.delivery.description}</span>
                                </span>

                                {product.delivery.included && (
                                    <FiCheck
                                        size={16}
                                        className={styles.deliveryCheck}
                                        aria-hidden="true"
                                    />
                                )}
                            </div>
                        </div> */}
          </aside>
        </section>

        {/* SPECIFICATIONS */}
        <Reveal as="section" className="ic_section_space_top">
          <div className={styles.sectionHead}>
            <div>
              {/* <span className="ic_eyebrow">Specifications</span> */}
              <h2>Product information</h2>
            </div>

            {/* <p>
                            Built for printing — heavyweight, colour-fast and consistent
                            batch to batch.
                        </p> */}
          </div>

          <div className={styles.specGrid}>
            {specCards.map((spec) => (
              <div className={styles.specCard} key={spec.label}>
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </div>
            ))}
          </div>

          <div className={styles.accordion}>
            {details.map((detail) => {
              const isOpen = openDetail === detail.id;

              return (
                <div key={detail.id} className={styles.accordionItem}>
                  <h3 className={styles.accordionHeading}>
                    <button
                      type="button"
                      className={styles.accordionButton}
                      onClick={() => setOpenDetail(isOpen ? "" : detail.id)}
                      aria-expanded={isOpen}
                      aria-controls={`panel-${detail.id}`}
                    >
                      <span>{detail.title}</span>

                      <span
                        className={`${styles.accordionIcon} ${isOpen ? styles.accordionIconOpen : ""}`}
                        aria-hidden="true"
                      >
                        <FiChevronDown size={17} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`panel-${detail.id}`}
                        className={styles.accordionPanel}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          reduce
                            ? { opacity: 0, transition: { duration: 0 } }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: 0.32,
                          ease: [0.2, 0.7, 0.2, 1],
                        }}
                      >
                        <div className={styles.accordionInner}>
                          {detail.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
