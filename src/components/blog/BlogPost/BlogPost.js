import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight, FiClock, FiMessageCircle } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";
import CtaPanel from "@/components/ui/CtaPanel/CtaPanel";
import { formatPostDate, posts, relatedPosts } from "@/data/blog";
import PostCard from "../PostCard/PostCard";
import ShareBar from "./ShareBar";
import TableOfContents from "./TableOfContents";
import styles from "./blogpost.module.css";
import heroImage from "@/assets/images/img.webp";

/** Stable anchor id for a heading, so the contents list can link to it. */
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Renders one body block from a post. */
function Block({ block }) {
  if (block.type === "h2") return <h2 id={slugify(block.text)}>{block.text}</h2>;

  if (block.type === "quote") {
    return (
      <blockquote className={styles.pullQuote}>
        <p>{block.text}</p>
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p>{block.text}</p>;
}

/** Previous / next card in the article footer. */
function NeighbourLink({ post, direction }) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${styles.neighbour} ${isNext ? styles.neighbourNext : ""}`}
    >
      <span className={styles.neighbourLabel}>
        {isNext ? (
          <>
            Next guide <FiArrowRight aria-hidden="true" />
          </>
        ) : (
          <>
            <FiArrowLeft aria-hidden="true" /> Previous guide
          </>
        )}
      </span>
      <span className={styles.neighbourTitle}>{post.title}</span>
      <span className={styles.neighbourMeta}>
        {post.category}
        <span className={styles.metaDot} aria-hidden="true" />
        {post.readTime} min read
      </span>
    </Link>
  );
}

export default function BlogPost({ post }) {
  const related = relatedPosts(post.slug);
  const headings = post.body
    .filter((block) => block.type === "h2")
    .map((block) => ({ id: slugify(block.text), text: block.text }));

  // Posts are ordered newest first, so the next index is the older guide.
  const index = posts.findIndex((item) => item.slug === post.slug);
  const newer = index > 0 ? posts[index - 1] : null;
  const older = index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <div className="ic_section_space_bottom">

      <article className={styles.page}>
        {/* ---------- Header ---------- */}
        <header className={styles.head}>
          <div className={`ic_container ${styles.headInner}`}>
            <Reveal className={styles.headContent}>
              <Link href="/blog" className={styles.backLink}>
                <FiArrowLeft aria-hidden="true" />
                All guides
              </Link>

              <p className={styles.metaLine}>
                <span className={styles.metaTopic}>{post.category}</span>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span className={styles.metaDot} aria-hidden="true" />
                <span className={styles.metaRead}>
                  <FiClock aria-hidden="true" />
                  {post.readTime} min read
                </span>
              </p>

              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.lead}>{post.excerpt}</p>


            </Reveal>
          </div>
        </header>

        {/* ---------- Hero ---------- */}
        <div className="ic_container">
          <Reveal as="figure" className={styles.hero} variant="image">
            <Image
              src={heroImage}
              alt={post.imageAlt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1320px) 1240px, calc(100vw - 80px)"
              className={styles.heroImage}
            />
          </Reveal>
        </div>

        {/* ---------- Body ---------- */}
        <div className={`ic_container ${styles.body}`}>
          <Reveal as="div" className={styles.prose}>
            {post.body.map((block, i) => (
              <Block key={`${block.type}-${i}`} block={block} />
            ))}
          </Reveal>

          <aside className={styles.rail} aria-label="Article tools">
            <div className={styles.railSticky}>
              {headings.length ? <TableOfContents items={headings} /> : null}

              <div className={styles.railBlock}>
                <p className={styles.railLabel}>Share this guide</p>
                <ShareBar title={post.title} />
              </div>

              <Link href="/contact" className={styles.railCta}>
                <span className={styles.railCtaIcon} aria-hidden="true">
                  <FiMessageCircle />
                </span>
                <span>
                  <span className={styles.railCtaTitle}>Not sure it applies to your job?</span>
                  <span className={styles.railCtaText}>
                    Ask a specialist — file review is free and takes under a day.
                  </span>
                </span>
                <FiArrowRight className={styles.railCtaArrow} aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>


        {/* ---------- Related ---------- */}
        {related.length ? (
          <section className={`ic_container ${styles.related}`} aria-labelledby="related-title">
            <Reveal className={styles.relatedHead}>
              <div>
                <span className="ic_eyebrow">Keep reading</span>
                <h2 id="related-title">More from the print floor</h2>
              </div>
              <Link href="/blog" className="ic_link">
                All guides
                <FiArrowRight aria-hidden="true" />
              </Link>
            </Reveal>

            <ul className={styles.grid}>
              {related.map((item, i) => (
                <Reveal as="li" key={item.slug} delay={i * 0.06}>
                  <PostCard post={item} />
                </Reveal>
              ))}
            </ul>
          </section>
        ) : null}

        <CtaPanel
          eyebrow="Ready when you are"
          title="Send us the file before you commit."
          description="A free artwork review on every order — we flag anything that will not print before it costs you a reprint."
          button={{ label: "Start designing", href: "/products/t-shirts" }}
          secondary={{ label: "Talk to a specialist", href: "/contact" }}
          id="post-cta-title"
        />
      </article>
    </div>
  );
}
