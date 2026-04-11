"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import type { Language } from "@/lib/i18n/translations";

const languageOptions: { code: Language; flag: string; label: string }[] = [
  { code: "ja", flag: "🇯🇵", label: "JA" },
  { code: "en", flag: "🇺🇸", label: "EN" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "es", flag: "🇪🇸", label: "ES" },
  { code: "de", flag: "🇩🇪", label: "DE" },
  { code: "pt", flag: "🇧🇷", label: "PT" },
  { code: "zh-CN", flag: "🇨🇳", label: "简中" },
  { code: "zh-TW", flag: "🇹🇼", label: "繁中" },
  { code: "ko", flag: "🇰🇷", label: "KO" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languageOptions.find((o) => o.code === language)!;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
      </button>
      {open && (
        <ul className="absolute right-0 mt-1 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-lg">
          {languageOptions.map((opt) => (
            <li key={opt.code}>
              <button
                onClick={() => {
                  setLanguage(opt.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-4 py-2 text-sm transition hover:bg-zinc-800 ${
                  opt.code === language
                    ? "text-zinc-100 bg-zinc-800"
                    : "text-zinc-400"
                }`}
              >
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
