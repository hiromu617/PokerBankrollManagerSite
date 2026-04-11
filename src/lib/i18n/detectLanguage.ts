import type { Language } from "./translations";
import { DEFAULT_LANGUAGE, isLanguage } from "./config";

export function detectLanguage(): Language {
  const saved = localStorage.getItem("language");
  if (saved && isLanguage(saved)) return saved;

  const browserLang = navigator.language;
  if (isLanguage(browserLang)) return browserLang;

  const prefix = browserLang.split("-")[0];
  const mapped = prefix === "zh" ? "zh-CN" : prefix;
  if (isLanguage(mapped)) return mapped as Language;

  return DEFAULT_LANGUAGE;
}
