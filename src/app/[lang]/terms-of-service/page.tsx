import fs from "fs";
import path from "path";
import MarkdownContent from "@/components/MarkdownContent";

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
