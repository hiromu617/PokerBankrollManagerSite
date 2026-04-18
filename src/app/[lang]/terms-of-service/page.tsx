import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import type { Language } from "@/lib/i18n/translations";
import { getTranslations } from "@/lib/i18n/translations";
import { buildAlternates } from "@/lib/seo";
import MarkdownContent from "@/components/MarkdownContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const language = lang as Language;
  const t = getTranslations(language);

  return {
    title: t.seo.termsTitle,
    alternates: buildAlternates((l) => `/${l}/terms-of-service`, language),
    robots: { index: true, follow: true },
  };
}

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
