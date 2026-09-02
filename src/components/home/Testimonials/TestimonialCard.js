import React from 'react';
import Stars from "@/components/ui/Stars";
import styles from "./Testimonials.module.css"

const TestimonialCard = ({
    testimonial,
    featured = false,
}) => {
    return (

        <div
            className={`${styles.card} ${featured
                ? styles.featuredCard
                : styles.standardCard
                }`}
        >
            {/* Card Header */}

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
                            d="M10 1.75 l2.03 1.32 2.4-.02 .75 2.28 1.94 1.4 -.75 2.28 .75 2.28 -1.94 1.4 -.75 2.28 -2.4-.02 L10 18.25 l-2.03-1.32 -2.4.02 -.75-2.28 -1.94-1.4 .75-2.28 -.75-2.28 1.94-1.4 .75-2.28 2.4.02 L10 1.75z"
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


            {/* Quote */}

            <blockquote className={styles.quote}>
                <span
                    className={styles.quoteMark}
                    aria-hidden="true"
                >
                    “
                </span>

                <p>{testimonial.quote}</p>
            </blockquote>


            {/* Author */}

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
        </div>

    );
};

export default TestimonialCard;