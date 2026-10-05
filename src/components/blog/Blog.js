"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { categories, featuredPost, posts } from "@/data/blog";
import PostCard from "./PostCard/PostCard";
import styles from "./Blog.module.css";
import CtaPanel from "../ui/CtaPanel/CtaPanel";
import FeaturedPost from "./FeaturedPost/FeaturedPost";
import BlogFilters from "./BlogFilters/BlogFilters";
import BlogHero from "./BlogHero/BlogHero";

const EASE = [0.2, 0.7, 0.2, 1];
const PAGE_SIZE = 6;

export default function Blog() {
    const reduce = useReducedMotion();
    const [category, setCategory] = useState("All");
    const [visible, setVisible] = useState(PAGE_SIZE);

    const rest = useMemo(
        () => posts.filter((post) => post.slug !== featuredPost.slug),
        []
    );

    const filtered = useMemo(
        () => category === "All"
            ? rest
            : rest.filter((post) => post.category === category),
        [category, rest]
    );

    const shown = filtered.slice(0, visible);

    const chooseCategory = (next) => {
        setCategory(next);
        setVisible(PAGE_SIZE);
    };

    return (
        <>
            <BlogHero />
            <section className={styles.page} aria-labelledby="blog-title">
                <div className={` ${styles.inner}`}>
                    {/* <FeaturedPost post={featuredPost} /> */}

                    {/* <BlogFilters
                    categories={categories}
                    activeCategory={category}
                    onCategoryChange={chooseCategory}
                /> */}

                    <div className="ic_container">
                        {shown.length ? (
                            <motion.ul className={styles.grid} layout={!reduce}>
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {shown.map((post) => (
                                        <motion.li
                                            key={post.slug}
                                            layout={!reduce}
                                            initial={reduce ? false : { opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={
                                                reduce
                                                    ? { opacity: 0 }
                                                    : { opacity: 0, y: -8, scale: 0.98 }
                                            }
                                            transition={{ duration: 0.35, ease: EASE }}
                                        >
                                            <PostCard post={post} />
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </motion.ul>
                        ) : (
                            <div className={styles.empty}>
                                <h3>Nothing here yet</h3>
                                <p>No guides in this topic so far — try another one.</p>
                            </div>
                        )}

                        {visible < filtered.length && (
                            <div className={styles.more}>
                                <button
                                    type="button"
                                    className="ic_btn ic_btn_secondary ic_btn_lg"
                                    onClick={() => setVisible((value) => value + PAGE_SIZE)}
                                >
                                    Show {Math.min(PAGE_SIZE, filtered.length - visible)} more
                                </button>
                            </div>
                        )}
                    </div>

                    <CtaPanel
                        eyebrow="Have a project in mind?"
                        title="Let's make it happen."
                        description="Get in touch and let's discuss your next project."
                        button={{ label: "Contact us", href: "/contact" }}
                        secondary={{ label: "View our work", href: "/work" }}
                    />
                </div>
            </section>
        </>
    );
}





