"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./blogfilters.module.css";

export default function BlogFilters({
    categories,
    activeCategory,
    onCategoryChange,
}) {
    const reduce = useReducedMotion();

    return (
        <div
            className={styles.filters}
            role="group"
            aria-label="Filter guides by topic"
        >
            {categories.map((item) => {
                const isActive = item === activeCategory;

                return (
                    <button
                        type="button"
                        key={item}
                        aria-pressed={isActive}
                        className={`${styles.filter} ${isActive ? styles.filterActive : ""
                            }`}
                        onClick={() => onCategoryChange(item)}
                    >
                        {isActive && (
                            <motion.span
                                layoutId="blog-filter-pill"
                                className={styles.filterPill}
                                aria-hidden="true"
                                transition={
                                    reduce
                                        ? { duration: 0 }
                                        : {
                                            type: "spring",
                                            stiffness: 480,
                                            damping: 40,
                                        }
                                }
                            />
                        )}

                        <span className={styles.filterLabel}>
                            {item}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

