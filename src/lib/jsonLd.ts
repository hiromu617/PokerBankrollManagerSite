import type { Language } from "@/lib/i18n/translations";
import { getTranslations } from "@/lib/i18n/translations";
import {
  APP_STORE_URL,
  ORGANIZATION,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

export function websiteLd(lang: Language) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORGANIZATION.name,
    url: `${SITE_URL}/${lang}`,
    inLanguage: lang,
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
  };
}

export function softwareApplicationLd(lang: Language) {
  const t = getTranslations(lang);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: ORGANIZATION.name,
    operatingSystem: "iOS",
    applicationCategory: "FinanceApplication",
    url: `${SITE_URL}/${lang}`,
    image: ORGANIZATION.logo,
    description: t.seo.siteDescription,
    inLanguage: lang,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: APP_STORE_URL,
    },
  };
}

export type ArticleLdInput = {
  title: string;
  description: string;
  date?: string;
  image?: string;
  url: string;
};

export function articleLd(input: ArticleLdInput, lang: Language) {
  const image = input.image
    ? absoluteUrl(input.image)
    : ORGANIZATION.logo;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image,
    inLanguage: lang,
    ...(input.date && {
      datePublished: input.date,
      dateModified: input.date,
    }),
    author: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
      logo: {
        "@type": "ImageObject",
        url: ORGANIZATION.logo,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
  };
}

export function breadcrumbLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
