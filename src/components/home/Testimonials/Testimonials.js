"use client";

import Slider from "react-slick";
import Stars from "@/components/ui/Stars";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/home";
import styles from "./Testimonials.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "./TestimonialCard";




function Arrow({ className, onClick, direction }) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      className={`${className || ""} ${styles.arrow} ${isPrev ? styles.prev : styles.next
        }`}
      onClick={onClick}
      aria-label={
        isPrev
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
            isPrev
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


export default function Testimonials() {
  const { featured, items, rating, count } = testimonials;

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



  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 700,
    cssEase: "cubic-bezier(0.2, 0.7, 0.2, 1)",
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


  return (
    <section
      className={`ic_section_space ${styles.section}`}
      aria-labelledby="reviews-title"
    >
      <div className={`ic_container ${styles.container}`}>

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


          <div
            className={styles.trustDivider}
            aria-hidden="true"
          />


          <div className={styles.trustReviews}>
            <span className={styles.reviewCount}>
              {count}
            </span>

            <span>
              verified customer reviews
            </span>
          </div>


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

                  <TestimonialCard
                    testimonial={testimonial}
                    featured={
                      testimonial.featured
                    }
                  />
                </div>
              )
            )}

          </Slider>

        </div>


        {/* ===================================================
            Mobile Hint
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
