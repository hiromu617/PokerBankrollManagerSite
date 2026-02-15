"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import { useLanguage } from "@/lib/i18n/context";

type Props = {
  contentJa: string;
  contentEn: string;
};

export default function MarkdownContent({ contentJa, contentEn }: Props) {
  const { language, t } = useLanguage();
  const content = language === "ja" ? contentJa : contentEn;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-zinc-200"
      >
        &larr; {t.legal.backToHome}
      </Link>
      <article className="prose prose-invert prose-zinc max-w-none">
        <Markdown>{content}</Markdown>
      </article>
    </div>
  );
}
