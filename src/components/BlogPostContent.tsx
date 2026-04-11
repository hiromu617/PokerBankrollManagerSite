"use client";

import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLanguage } from "@/lib/i18n/context";
import type { BlogPost } from "@/lib/blog";

function formatDate(dateStr: string, language: string): string {
  const date = new Date(dateStr);
  const locale = language === "ja" ? "ja-JP" : language;
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { language, t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href={`/${language}/blog`}
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-zinc-200"
      >
        &larr; {t.blog.backToBlog}
      </Link>
      <header className="mb-8">
        <time className="text-sm text-zinc-500">
          {formatDate(post.date, language)}
        </time>
        <h1 className="mt-2 text-3xl font-bold tracking-tight bg-gradient-to-r from-[#3377F6] to-[#66AAFF] bg-clip-text text-transparent">
          {post.title}
        </h1>
      </header>
      {post.thumbnail && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={post.thumbnail}
            alt={post.title}
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
            h1: ({ children }) => (
              <h1 className="bg-gradient-to-r from-[#3377F6] to-[#66AAFF] bg-clip-text text-transparent">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="bg-gradient-to-r from-[#3377F6] to-[#66AAFF] bg-clip-text text-transparent">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="bg-gradient-to-r from-[#3377F6] to-[#66AAFF] bg-clip-text text-transparent">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="bg-gradient-to-r from-[#3377F6] to-[#66AAFF] bg-clip-text text-transparent">
                {children}
              </h4>
            ),
          }}
        >
          {post.content}
        </Markdown>
      </article>
    </div>
  );
}
