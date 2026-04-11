import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/translations";
import { getTranslations } from "@/lib/i18n/translations";
import { getAllPostsMeta } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslations(lang as Language);

  return {
    title: `${t.blog.heading} - Poker Bankroll Manager`,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const posts = getAllPostsMeta(lang as Language);

  return <BlogList posts={posts} />;
}
