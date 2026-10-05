"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import { formatPostDate } from "@/data/blog";
import PostCover from "../PostCover/PostCover";
import styles from "./featuredPost.module.css";

export default function FeaturedPost({ post }) {
    return (
        <Reveal>
            <div className="ic_section_space_bottom">
                <Link href={`/blog/${post.slug}`} className={styles.featured}>
                    <div className={styles.featuredMedia}>
                        <PostCover
                            post={post}
                            priority
                            sizes="(min-width: 900px) 50vw, 92vw"
                        />
                    </div>

                    <div className={styles.featuredBody}>
                        <p className={styles.metaLine}>
                            <span className={styles.metaTopic}>Featured</span>

                            <span
                                className={styles.metaDot}
                                aria-hidden="true"
                            />

                            {post.category}
                        </p>

                        <h2>{post.title}</h2>

                        <p className={styles.featuredExcerpt}>
                            {post.excerpt}
                        </p>

                        <div className={styles.featuredFoot}>
                            <p className={styles.metaLine}>
                                <time dateTime={post.date}>
                                    {formatPostDate(post.date)}
                                </time>

                                <span
                                    className={styles.metaDot}
                                    aria-hidden="true"
                                />

                                {post.readTime} min read
                            </p>

                            <span className={styles.cardLink}>
                                Read the guide
                                <FiArrowRight aria-hidden="true" />
                            </span>
                        </div>
                    </div>
                </Link>
            </div>
        </Reveal>
    );
}
