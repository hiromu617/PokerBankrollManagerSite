import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/translations";
import { getTranslations } from "@/lib/i18n/translations";
import { getAllSlugs, getPost } from "@/lib/blog";
import BlogPostContent from "@/components/BlogPostContent";
import JsonLd from "@/components/JsonLd";
import {
  buildAlternates,
  buildOpenGraphLocales,
  SITE_URL,
} from "@/lib/seo";
import { articleLd, breadcrumbLd } from "@/lib/jsonLd";
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
  const language = lang as Language;
  const post = getPost(slug, language);

  if (!post) return {};

  const ogLocales = buildOpenGraphLocales(language);
  const hasThumb = Boolean(post.thumbnail);

  return {
    title: post.title,
    description: post.description,
    alternates: buildAlternates((l) => `/${l}/blog/${slug}`, language),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/${language}/blog/${slug}`,
      locale: ogLocales.locale,
      alternateLocale: ogLocales.alternateLocale,
      publishedTime: post.date,
      ...(hasThumb && {
        images: [{ url: post.thumbnail!, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: hasThumb ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      images: [hasThumb ? post.thumbnail! : "/appicon.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const language = lang as Language;
  const post = getPost(slug, language);

  if (!post) notFound();

  const t = getTranslations(language);
  const postUrl = `${SITE_URL}/${language}/blog/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          articleLd(
            {
              title: post.title,
              description: post.description,
              date: post.date,
              image: post.thumbnail,
              url: postUrl,
            },
            language,
          ),
          breadcrumbLd([
            { name: "Home", url: `${SITE_URL}/${language}` },
            { name: t.blog.heading, url: `${SITE_URL}/${language}/blog` },
            { name: post.title, url: postUrl },
          ]),
        ]}
      />
      <BlogPostContent post={post} />
    </>
  );
}
