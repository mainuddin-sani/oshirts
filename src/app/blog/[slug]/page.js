import { notFound } from "next/navigation";
import BlogPost from "@/components/blog/BlogPost/BlogPost";
import { findPost, posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) return { title: "Article not found — Shirts" };

  return {
    title: `${post.title} — Shirts`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) notFound();

  return <BlogPost post={post} />;
}
