import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/translations";
import { getTranslations } from "@/lib/i18n/translations";
import { getAllFaqMeta } from "@/lib/faq";
import FaqList from "@/components/FaqList";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = getTranslations(lang as Language);

  return {
    title: `${t.faq.heading} - Poker Bankroll Manager`,
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const items = getAllFaqMeta(lang as Language);

  return <FaqList items={items} />;
}
