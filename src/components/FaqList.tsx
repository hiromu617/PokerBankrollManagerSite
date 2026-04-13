"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import type { FaqMeta } from "@/lib/faq";

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

export default function FaqList({ items }: { items: FaqMeta[] }) {
  const { language, t } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <Link
        href={`/${language}/`}
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-zinc-200"
      >
        &larr; {t.faq.backToHome}
      </Link>
      <h1 className="mb-10 text-3xl font-bold tracking-tight bg-gradient-to-r from-[#3377F6] to-[#66AAFF] bg-clip-text text-transparent">
        {t.faq.heading}
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/${language}/faq/${item.slug}`}
            className="block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-600"
          >
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={item.title}
                width={1200}
                height={630}
                className="w-full"
              />
            )}
            <div className="p-4">
              {item.date && (
                <time className="text-sm text-zinc-500">
                  {formatDate(item.date, language)}
                </time>
              )}
              <h2 className="mt-2 text-lg font-semibold">{item.title}</h2>
              {item.description && (
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
