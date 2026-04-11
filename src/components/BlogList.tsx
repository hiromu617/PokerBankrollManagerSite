"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import type { BlogPostMeta } from "@/lib/blog";

function formatDate(dateStr: string, language: string): string {
  const date = new Date(dateStr);
  const locale = language === "ja" ? "ja-JP" : language;
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogList({ posts }: { posts: BlogPostMeta[] }) {
  const { language, t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href={`/${language}/`}
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-zinc-200"
      >
        &larr; {t.blog.backToHome}
      </Link>
      <h1 className="mb-10 text-3xl font-bold tracking-tight bg-gradient-to-r from-[#3377F6] to-[#66AAFF] bg-clip-text text-transparent">
        {t.blog.heading}
      </h1>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${language}/blog/${post.slug}`}
            className="block rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-zinc-600"
          >
            <time className="text-sm text-zinc-500">
              {formatDate(post.date, language)}
            </time>
            <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
