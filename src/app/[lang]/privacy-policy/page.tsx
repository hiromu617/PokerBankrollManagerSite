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
    title: t.seo.privacyTitle,
    alternates: buildAlternates((l) => `/${l}/privacy-policy`, language),
    robots: { index: true, follow: true },
  };
}

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
