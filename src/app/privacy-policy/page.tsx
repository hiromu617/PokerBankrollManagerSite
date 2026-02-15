import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import MarkdownContent from "@/components/MarkdownContent";

export const metadata: Metadata = {
  title: "プライバシーポリシー - Poker Bankroll Manager",
  description:
    "Poker Bankroll Managerのプライバシーポリシーについて説明します。",
};

export default function PrivacyPolicyPage() {
  const contentJa = fs.readFileSync(
    path.join(process.cwd(), "content", "privacy-policy.md"),
    "utf-8"
  );
  const contentEn = fs.readFileSync(
    path.join(process.cwd(), "content", "privacy-policy.en.md"),
    "utf-8"
  );

  return <MarkdownContent contentJa={contentJa} contentEn={contentEn} />;
}
