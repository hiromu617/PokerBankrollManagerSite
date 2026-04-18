import type { MetadataRoute } from "next";
import { LANGUAGES } from "@/lib/i18n/config";
import { getAllSlugs } from "@/lib/blog";
import { getAllFaqSlugs } from "@/lib/faq";

const BASE_URL = "https://pokerbankrollmanager.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getAllSlugs();
  const faqSlugs = getAllFaqSlugs();
  const staticPaths = ["", "blog", "faq", "privacy-policy", "terms-of-service"];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LANGUAGES) {
    for (const p of staticPaths) {
      entries.push({
        url: p ? `${BASE_URL}/${lang}/${p}` : `${BASE_URL}/${lang}`,
        changeFrequency: p === "" ? "weekly" : "monthly",
        priority: p === "" ? 1.0 : 0.7,
      });
    }
    for (const slug of blogSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/blog/${slug}`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
    for (const slug of faqSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/faq/${slug}`,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
