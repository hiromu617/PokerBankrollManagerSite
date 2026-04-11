import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Language } from "@/lib/i18n/translations";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  thumbnail?: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const DEFAULT_LANG: Language = "en";

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getPost(slug: string, language: Language): BlogPost | null {
  const filePath = path.join(BLOG_DIR, slug, `${language}.md`);
  const fallbackPath = path.join(BLOG_DIR, slug, `${DEFAULT_LANG}.md`);

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

export function getAllPostsMeta(language: Language): BlogPostMeta[] {
  const slugs = getAllSlugs();
  const posts: BlogPostMeta[] = [];

  for (const slug of slugs) {
    const post = getPost(slug, language);
    if (post) {
      posts.push({
        slug: post.slug,
        title: post.title,
        date: post.date,
        description: post.description,
        thumbnail: post.thumbnail,
      });
    }
  }

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}
