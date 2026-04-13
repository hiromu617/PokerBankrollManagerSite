import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Language } from "@/lib/i18n/translations";

export type FaqMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  thumbnail?: string;
};

export type FaqItem = FaqMeta & {
  content: string;
};

const FAQ_DIR = path.join(process.cwd(), "content", "faq");
const DEFAULT_LANG: Language = "en";

export function getAllFaqSlugs(): string[] {
  if (!fs.existsSync(FAQ_DIR)) return [];
  return fs
    .readdirSync(FAQ_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getFaq(slug: string, language: Language): FaqItem | null {
  const filePath = path.join(FAQ_DIR, slug, `${language}.md`);
  const fallbackPath = path.join(FAQ_DIR, slug, `${DEFAULT_LANG}.md`);

  let raw: string;
  try {
    raw = fs.readFileSync(filePath, "utf-8");
  } catch {
    try {
      raw = fs.readFileSync(fallbackPath, "utf-8");
    } catch {
      return null;
    }
  }

  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    description: data.description ?? "",
    thumbnail: data.thumbnail,
    content,
  };
}

export function getAllFaqMeta(language: Language): FaqMeta[] {
  const slugs = getAllFaqSlugs();
  const items: FaqMeta[] = [];

  for (const slug of slugs) {
    const item = getFaq(slug, language);
    if (item) {
      items.push({
        slug: item.slug,
        title: item.title,
        date: item.date,
        description: item.description,
        thumbnail: item.thumbnail,
      });
    }
  }

  return items.sort((a, b) => (a.date > b.date ? -1 : 1));
}
