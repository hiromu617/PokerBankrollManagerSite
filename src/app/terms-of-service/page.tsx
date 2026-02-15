import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import MarkdownContent from "@/components/MarkdownContent";

export const metadata: Metadata = {
  title: "利用規約 - Poker Bankroll Manager",
  description: "Poker Bankroll Managerの利用規約について説明します。",
};

export default function TermsOfServicePage() {
  const contentJa = fs.readFileSync(
    path.join(process.cwd(), "content", "terms-of-service.md"),
    "utf-8"
  );
  const contentEn = fs.readFileSync(
    path.join(process.cwd(), "content", "terms-of-service.en.md"),
    "utf-8"
  );

  return <MarkdownContent contentJa={contentJa} contentEn={contentEn} />;
}
