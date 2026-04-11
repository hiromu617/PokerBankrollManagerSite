import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/translations";
import { getAllSlugs, getPost } from "@/lib/blog";
import BlogPostContent from "@/components/BlogPostContent";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPost(slug, lang as Language);

  if (!post) return {};

  return {
    title: `${post.title} - Poker Bankroll Manager`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      ...(post.thumbnail && {
        images: [{ url: post.thumbnail, width: 1200, height: 630 }],
      }),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = getPost(slug, lang as Language);

  if (!post) notFound();

  return <BlogPostContent post={post} />;
}
