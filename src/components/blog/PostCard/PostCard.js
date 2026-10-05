import Link from "next/link";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { formatPostDate } from "@/data/blog";
import PostCover from "../PostCover/PostCover";
import styles from "./PostCard.module.css";

/** Post card used by the listing grid and the article's related row. */
export default function PostCard({ post, priority = false }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.cardMedia}>
        <PostCover
          post={post}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 641px) 50vw, 92vw"
        />
        <span className={styles.chip}>{post.category}</span>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.cardFoot}>
          <span className={styles.cardMeta}>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className={styles.metaDot} aria-hidden="true" />
            <FiClock aria-hidden="true" />
            {post.readTime} min
          </span>
          <span className={styles.cardArrow} aria-hidden="true">
            <FiArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}



// import Link from "next/link";
// import { FiArrowRight } from "react-icons/fi";
// import { formatPostDate } from "@/data/blog";
// import PostCover from "./PostCover";
// import styles from "./Blog.module.css";

// /** Post card used by both the listing grid and the related row.. */
// export default function PostCard({ post, priority = false }) {
//   return (
//     <Link href={`/blog/${post.slug}`} className={styles.card}>
//       <PostCover
//         post={post}
//         priority={priority}
//         sizes="(min-width: 1024px) 33vw, (min-width: 641px) 50vw, 92vw"
//       />

//       <div className={styles.cardBody}>
//         <p className={styles.metaLine}>
//           <span className={styles.metaTopic}>{post.category}</span>
//           <span className={styles.metaDot} aria-hidden="true" />
//           <time dateTime={post.date}>{formatPostDate(post.date)}</time>
//           <span className={styles.metaDot} aria-hidden="true" />
//           {post.readTime} min read
//         </p>

//         <h3 className={styles.cardTitle}>{post.title}</h3>
//         <p className={styles.excerpt}>{post.excerpt}</p>

//         <span className={styles.cardLink}>
//           Read guide
//           <FiArrowRight aria-hidden="true" />
//         </span>
//       </div>
//     </Link>
//   );
// }
