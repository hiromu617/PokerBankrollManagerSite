import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/translations";
import { getTranslations } from "@/lib/i18n/translations";
import { getAllFaqSlugs, getFaq } from "@/lib/faq";
import FaqContent from "@/components/FaqContent";
import JsonLd from "@/components/JsonLd";
import {
  buildAlternates,
  buildOpenGraphLocales,
  SITE_URL,
} from "@/lib/seo";
import { articleLd, breadcrumbLd } from "@/lib/jsonLd";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllFaqSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const language = lang as Language;
  const item = getFaq(slug, language);

  if (!item) return {};

  const ogLocales = buildOpenGraphLocales(language);
  const hasThumb = Boolean(item.thumbnail);

  return {
    title: item.title,
    description: item.description,
    alternates: buildAlternates((l) => `/${l}/faq/${slug}`, language),
    openGraph: {
      title: item.title,
      description: item.description,
      type: "article",
      url: `/${language}/faq/${slug}`,
      locale: ogLocales.locale,
      alternateLocale: ogLocales.alternateLocale,
      ...(item.date && { publishedTime: item.date }),
      ...(hasThumb && {
        images: [{ url: item.thumbnail!, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: hasThumb ? "summary_large_image" : "summary",
      title: item.title,
      description: item.description,
      images: [hasThumb ? item.thumbnail! : "/appicon.png"],
    },
  };
}

export default async function FaqItemPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const language = lang as Language;
  const item = getFaq(slug, language);

  if (!item) notFound();

  const t = getTranslations(language);
  const itemUrl = `${SITE_URL}/${language}/faq/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          articleLd(
            {
              title: item.title,
              description: item.description,
              date: item.date,
              image: item.thumbnail,
              url: itemUrl,
            },
            language,
          ),
          breadcrumbLd([
            { name: "Home", url: `${SITE_URL}/${language}` },
            { name: t.faq.heading, url: `${SITE_URL}/${language}/faq` },
            { name: item.title, url: itemUrl },
          ]),
        ]}
      />
      <FaqContent item={item} />
    </>
  );
}
