import Image from "next/image";
import { topicOf } from "@/data/blog";
import styles from "./postCover.module.css";

/**
 * Cover for a post: a quiet topic-toned field with the garment centred in
 * it, the way a studio shoots product on seamless paper. Decorative — the
 * title carries the meaning, so the image is hidden from assistive tech.
 */
export default function PostCover({ post, priority = false, sizes }) {
  const { tone } = topicOf(post.category);

  return (
    <div className={`${styles.cover} ${styles[`tone_${tone}`]}`}>
      <Image
        src={post.image}
        alt=""
        aria-hidden="true"
        placeholder="blur"
        priority={priority}
        sizes={sizes}
        className={styles.coverArt}
      />
    </div>
  );
}
