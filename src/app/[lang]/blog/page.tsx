import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/translations";
import { getTranslations } from "@/lib/i18n/translations";
import { getAllPostsMeta } from "@/lib/blog";
import { buildAlternates, buildOpenGraphLocales } from "@/lib/seo";
import BlogList from "@/components/BlogList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const language = lang as Language;
  const t = getTranslations(language);
  const ogLocales = buildOpenGraphLocales(language);

  return {
    title: t.blog.heading,
    description: t.seo.blogDescription,
    alternates: buildAlternates((l) => `/${l}/blog`, language),
    openGraph: {
      title: t.blog.heading,
      description: t.seo.blogDescription,
      url: `/${language}/blog`,
      type: "website",
      locale: ogLocales.locale,
      alternateLocale: ogLocales.alternateLocale,
      images: [{ url: "/appicon.png", width: 1024, height: 1024 }],
    },
    twitter: {
      card: "summary",
      title: t.blog.heading,
      description: t.seo.blogDescription,
      images: ["/appicon.png"],
    },
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
