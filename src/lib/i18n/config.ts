import type { Language } from "./translations";

export const LANGUAGES: Language[] = [
  "ja", "en", "fr", "es", "de", "pt", "zh-CN", "zh-TW", "ko",
];

export const DEFAULT_LANGUAGE: Language = "en";

export function isLanguage(value: string): value is Language {
  return LANGUAGES.includes(value as Language);
}
