import type { Language } from "@/lib/i18n/translations";
import { getAllPostsMeta } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const posts = getAllPostsMeta(lang as Language);

  return <BlogList posts={posts} />;
}
