"use client";

import Slider from "react-slick";

import Reveal from "@/components/motion/Reveal";
import Stars from "@/components/ui/Stars";
import SectionHeading from "@/components/ui/SectionHeading";

import { testimonials } from "@/data/home";

import styles from "./Testimonials.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


/* =========================================================
   Carousel Arrow
   ========================================================= */

function Arrow({ className, onClick, direction }) {
  const isPrevious = direction === "prev";

  return (
    <button
      type="button"
      className={`${className || ""} ${styles.arrow} ${isPrevious ? styles.prev : styles.next
        }`}
      onClick={onClick}
      aria-label={
        isPrevious
          ? "Previous testimonial"
          : "Next testimonial"
      }
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={
            isPrevious
              ? "M15 18L9 12L15 6"
              : "M9 18L15 12L9 6"
          }
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}


/* =========================================================
   Testimonial Card
   ========================================================= */

function TestimonialCard({
  testimonial,
  featured = false,
}) {
  return (
    <article
      className={`${styles.card} ${featured
        ? styles.featuredCard
        : styles.standardCard
        }`}
    >
      {/* ---------- Card Header ---------- */}

      <div className={styles.cardHeader}>
        <Stars
          rating={testimonial.rating}
          size={14}
        />

        <span className={styles.verified}>
          <svg
            viewBox="0 0 20 20"
            width="14"
            height="14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="
                M10 1.75
                l2.03 1.32
                2.4-.02
                .75 2.28
                1.94 1.4
                -.75 2.28
                .75 2.28
                -1.94 1.4
                -.75 2.28
                -2.4-.02
                L10 18.25
                l-2.03-1.32
                -2.4.02
                -.75-2.28
                -1.94-1.4
                .75-2.28
                -.75-2.28
                1.94-1.4
                .75-2.28
                2.4.02
                L10 1.75z
              "
              fill="currentColor"
              opacity="0.12"
            />

            <path
              d="M7.2 10.2l1.7 1.7 3.9-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Verified
        </span>
      </div>


      {/* ---------- Quote ---------- */}

      <blockquote className={styles.quote}>
        <span
          className={styles.quoteMark}
          aria-hidden="true"
        >
          “
        </span>

        <p>{testimonial.quote}</p>
      </blockquote>


      {/* ---------- Author ---------- */}

      <div className={styles.cardFooter}>
        <div
          className={styles.avatar}
          aria-hidden="true"
        >
          {testimonial.name.charAt(0)}
        </div>

        <div className={styles.author}>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.role}</span>
        </div>
      </div>
    </article>
  );
}


/* =========================================================
   Testimonials Section
   ========================================================= */

export default function Testimonials() {
  const {
    featured,
    items,
    rating,
    count,
  } = testimonials;


  /* ---------------------------------------------------------
     Prepare all testimonials
     --------------------------------------------------------- */

  const allTestimonials = [
    {
      ...featured,
      featured: true,
    },

    ...items.map((item) => ({
      ...item,
      featured: false,
    })),
  ];


  /* ---------------------------------------------------------
     Slider Settings
     --------------------------------------------------------- */

  const sliderSettings = {
    dots: true,
    arrows: true,

    infinite: true,

    speed: 700,
    cssEase:
      "cubic-bezier(0.2, 0.7, 0.2, 1)",

    slidesToShow: 3,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 5500,

    pauseOnHover: true,
    pauseOnFocus: true,

    swipeToSlide: true,
    draggable: true,

    adaptiveHeight: false,

    prevArrow: (
      <Arrow direction="prev" />
    ),

    nextArrow: (
      <Arrow direction="next" />
    ),

    responsive: [
      {
        breakpoint: 1180,

        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 720,

        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,

          arrows: false,

          autoplaySpeed: 4800,
        },
      },
    ],
  };


  /* ---------------------------------------------------------
     Render
     --------------------------------------------------------- */

  return (
    <section
      className={`ic_section_space ic_container ${styles.section}`}
      aria-labelledby="reviews-title"
    >
      <div className="ic_container">

        {/* ===================================================
            Section Heading
            =================================================== */}

        <SectionHeading
          eyebrow="Reviews"
          title={
            <span id="reviews-title">
              Rated 4.9 by the people who wear them.
            </span>
          }
          align="center"
        />


        {/* ===================================================
            Trust Bar
            =================================================== */}

        <div className={styles.trustBar}>

          {/* Rating */}

          <div className={styles.trustRating}>
            <strong>{rating}</strong>

            <div>
              <Stars
                rating={rating}
                size={15}
              />

              <span>Excellent</span>
            </div>
          </div>


          {/* Divider */}

          <div
            className={styles.trustDivider}
            aria-hidden="true"
          />


          {/* Reviews */}

          <div className={styles.trustReviews}>
            <span className={styles.reviewCount}>
              {count}
            </span>

            <span>
              verified customer reviews
            </span>
          </div>


          {/* Badge */}

          <div className={styles.trustBadge}>
            <span
              className={styles.badgeDot}
              aria-hidden="true"
            />

            Loved by teams
          </div>

        </div>


        {/* ===================================================
            Carousel
            =================================================== */}

        <div className={styles.carousel}>
          <Slider {...sliderSettings}>
            {allTestimonials.map(
              (testimonial, index) => (
                <div
                  className={styles.slide}
                  key={`${testimonial.name}-${index}`}
                >
                  <Reveal
                    as="div"
                    delay={0.05 + index * 0.04}
                    className={styles.slideInner}
                  >
                    <TestimonialCard
                      testimonial={testimonial}
                      featured={
                        testimonial.featured
                      }
                    />
                  </Reveal>
                </div>
              )
            )}
          </Slider>
        </div>


        {/* ===================================================
            Mobile Swipe Hint
            =================================================== */}

        <div
          className={styles.carouselHint}
          aria-hidden="true"
        >
          <span>Swipe to explore</span>

          <span className={styles.hintLine}>
            <span />
          </span>
        </div>

      </div>
    </section>
  );
}




// import Reveal from "@/components/motion/Reveal";
// import Stars from "@/components/ui/Stars";
// import SectionHeading from "@/components/ui/SectionHeading";
// import { testimonials } from "@/data/home";
// import styles from "./Testimonials.module.css";

// export default function Testimonials() {
//   const { featured, items, rating, count } = testimonials;

//   return (
//     <section className={`ic_section_space ${styles.section}`} aria-labelledby="reviews-title">
//       <div className="ic_container">
//         <SectionHeading
//           eyebrow="Reviews"
//           title={<span id="reviews-title">Rated 4.9 by the people who wear them.</span>}
//           align="center"
//         />

//         <div className={styles.grid}>
//           <Reveal as="figure" className={styles.featured}>
//             <span className={styles.mark} aria-hidden="true">
//               &ldquo;
//             </span>
//             <blockquote>
//               <p>{featured.quote}</p>
//             </blockquote>
//             <figcaption>
//               <Stars rating={featured.rating} size={15} />
//               <strong>{featured.name}</strong>
//               <span>{featured.role}</span>
//             </figcaption>
//             <div className={styles.rating}>
//               <span className={styles.ratingValue}>{rating}</span>
//               <div>
//                 <Stars rating={rating} size={13} />
//                 <small>{count} verified reviews</small>
//               </div>
//             </div>
//           </Reveal>

//           <ul className={styles.list}>
//             {items.map((t, i) => (
//               <Reveal as="li" key={t.name} delay={0.1 + i * 0.08} className={styles.item}>
//                 <figure>
//                   <Stars rating={t.rating} size={13} />
//                   <blockquote>
//                     <p>{t.quote}</p>
//                   </blockquote>
//                   <figcaption>
//                     <strong>{t.name}</strong>
//                     <span>{t.role}</span>
//                   </figcaption>
//                 </figure>
//               </Reveal>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }
