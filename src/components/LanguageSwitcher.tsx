"use client";

import { useLanguage } from "@/lib/i18n/context";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "ja" ? "en" : "ja")}
      className="fixed top-4 right-4 z-50 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
    >
      {language === "ja" ? "EN" : "JA"}
    </button>
  );
}
