import type { Metadata } from "next";
import { LANGUAGES } from "@/lib/i18n/config";
import type { Language } from "@/lib/i18n/translations";

export const SITE_URL = "https://pokerbankrollmanager.app";

export const ORGANIZATION = {
  name: "Poker Bankroll Manager",
  url: SITE_URL,
  logo: `${SITE_URL}/appicon.png`,
} as const;

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/poker-bankroll-manager/id6758828195";

export const OG_LOCALE_MAP: Record<Language, string> = {
  ja: "ja_JP",
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  de: "de_DE",
  pt: "pt_BR",
  "zh-CN": "zh_CN",
  "zh-TW": "zh_TW",
  ko: "ko_KR",
};

export function buildAlternates(
  pathFor: (lang: Language) => string,
  currentLang: Language,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const lang of LANGUAGES) {
    languages[lang] = pathFor(lang);
  }
  languages["x-default"] = pathFor("en");

  return {
    canonical: pathFor(currentLang),
    languages,
  };
}

export function buildOpenGraphLocales(currentLang: Language): {
  locale: string;
  alternateLocale: string[];
} {
  return {
    locale: OG_LOCALE_MAP[currentLang],
    alternateLocale: LANGUAGES.filter((l) => l !== currentLang).map(
      (l) => OG_LOCALE_MAP[l],
    ),
  };
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
