import type { Language } from "@/lib/i18n/translations";
import { getAllPostsMeta } from "@/lib/blog";
import HomePage from "@/components/HomePage";

export default async function LangHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const posts = getAllPostsMeta(lang as Language).slice(0, 3);
  return <HomePage recentPosts={posts} />;
}
