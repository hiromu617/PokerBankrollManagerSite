import type { Language } from "@/lib/i18n/translations";
import { getAllSlugs, getPost } from "@/lib/blog";
import BlogPostContent from "@/components/BlogPostContent";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
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
