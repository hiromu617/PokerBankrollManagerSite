"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { type Language, type Translations, getTranslations } from "./translations";

const LANGUAGES: Language[] = ["ja", "en", "fr", "es", "de", "pt", "zh-CN", "zh-TW", "ko"];

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string): value is Language {
  return LANGUAGES.includes(value as Language);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("language");
    if (saved && isLanguage(saved)) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
      return;
    }
    const browserLang = navigator.language;
    if (isLanguage(browserLang)) {
      setLanguageState(browserLang);
      document.documentElement.lang = browserLang;
      return;
    }
    const prefix = browserLang.split("-")[0];
    // Default bare "zh" to Simplified Chinese
    const mapped = prefix === "zh" ? "zh-CN" : prefix;
    if (isLanguage(mapped)) {
      setLanguageState(mapped);
      document.documentElement.lang = mapped;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = getTranslations(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
