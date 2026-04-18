import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/translations";
import { getTranslations } from "@/lib/i18n/translations";
import { getAllFaqMeta } from "@/lib/faq";
import { buildAlternates, buildOpenGraphLocales } from "@/lib/seo";
import FaqList from "@/components/FaqList";

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
    title: t.faq.heading,
    description: t.seo.faqDescription,
    alternates: buildAlternates((l) => `/${l}/faq`, language),
    openGraph: {
      title: t.faq.heading,
      description: t.seo.faqDescription,
      url: `/${language}/faq`,
      type: "website",
      locale: ogLocales.locale,
      alternateLocale: ogLocales.alternateLocale,
      images: [{ url: "/appicon.png", width: 1024, height: 1024 }],
    },
    twitter: {
      card: "summary",
      title: t.faq.heading,
      description: t.seo.faqDescription,
      images: ["/appicon.png"],
    },
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
