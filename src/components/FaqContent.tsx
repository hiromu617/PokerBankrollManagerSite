"use client";

import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "@/lib/i18n/context";
import type { FaqItem } from "@/lib/faq";

function formatDate(dateStr: string, language: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const locale = language === "ja" ? "ja-JP" : language;
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function FaqContent({ item }: { item: FaqItem }) {
  const { language, t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href={`/${language}/faq`}
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-zinc-200"
      >
        &larr; {t.faq.backToFaq}
      </Link>
      <header className="mb-8">
        {item.date && (
          <time className="text-sm text-zinc-500">
            {formatDate(item.date, language)}
          </time>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight bg-clip-text">
          {item.title}
        </h1>
      </header>
      {item.thumbnail && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={1200}
            height={630}
            className="w-full"
            priority
          />
        </div>
      )}
      <article className="prose prose-invert prose-zinc max-w-none">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="mt-12 mb-6 border-b border-zinc-700 pb-2 text-zinc-200">
                {children}
              </h2>
            ),
          }}
        >
          {item.content}
        </Markdown>
      </article>

      <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#3377F6] to-[#66AAFF] p-8 text-center">
        <Image
          src="/appicon.png"
          alt="Poker Bankroll Manager"
          width={64}
          height={64}
          className="mx-auto mb-4 rounded-xl"
        />
        <p className="text-lg font-bold text-white">
          Poker Bankroll Manager
        </p>
        <p className="mt-1 text-sm text-white/80">
          {t.hero.subtitle}
        </p>
        <a
          href="https://apps.apple.com/us/app/poker-bankroll-manager/id6758828195"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          {t.hero.download}
        </a>
      </div>
    </div>
  );
}
