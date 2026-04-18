import type { Metadata } from "next";
import { LANGUAGES } from "@/lib/i18n/config";
import type { Language } from "@/lib/i18n/translations";
import { getTranslations } from "@/lib/i18n/translations";
import { LanguageProvider } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import HtmlLangSetter from "@/components/HtmlLangSetter";
import JsonLd from "@/components/JsonLd";
import { buildAlternates, buildOpenGraphLocales, ORGANIZATION } from "@/lib/seo";
import { softwareApplicationLd, websiteLd } from "@/lib/jsonLd";

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

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
    title: ORGANIZATION.name,
    description: t.seo.siteDescription,
    alternates: buildAlternates((l) => `/${l}`, language),
    openGraph: {
      title: ORGANIZATION.name,
      description: t.seo.siteDescription,
      url: `/${language}`,
      siteName: ORGANIZATION.name,
      locale: ogLocales.locale,
      alternateLocale: ogLocales.alternateLocale,
      type: "website",
      images: [
        {
          url: "/appicon.png",
          width: 1024,
          height: 1024,
          alt: ORGANIZATION.name,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: ORGANIZATION.name,
      description: t.seo.siteDescription,
      images: ["/appicon.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = lang as Language;

  return (
    <LanguageProvider lang={language}>
      <HtmlLangSetter lang={language} />
      <JsonLd data={[websiteLd(language), softwareApplicationLd(language)]} />
      <LanguageSwitcher />
      {children}
    </LanguageProvider>
  );
}
