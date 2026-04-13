import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/translations";
import { getAllFaqSlugs, getFaq } from "@/lib/faq";
import FaqContent from "@/components/FaqContent";
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
  const item = getFaq(slug, lang as Language);

  if (!item) return {};

  return {
    title: `${item.title} - Poker Bankroll Manager`,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      type: "article",
      ...(item.date && { publishedTime: item.date }),
      ...(item.thumbnail && {
        images: [{ url: item.thumbnail, width: 1200, height: 630 }],
      }),
    },
  };
}

export default async function FaqItemPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const item = getFaq(slug, lang as Language);

  if (!item) notFound();

  return <FaqContent item={item} />;
}
