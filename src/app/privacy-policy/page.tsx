import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー - Poker Bankroll Manager",
  description:
    "Poker Bankroll Managerのプライバシーポリシーについて説明します。",
};

export default function PrivacyPolicyPage() {
  const filePath = path.join(process.cwd(), "content", "privacy-policy.md");
  const content = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-400 transition hover:text-zinc-200"
      >
        &larr; ホームに戻る
      </Link>
      <article className="prose prose-invert prose-zinc max-w-none">
        <Markdown>{content}</Markdown>
      </article>
    </div>
  );
}
