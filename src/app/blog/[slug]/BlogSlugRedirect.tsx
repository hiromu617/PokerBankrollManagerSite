"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { detectLanguage } from "@/lib/i18n/detectLanguage";

export default function BlogSlugRedirect({ slug }: { slug: string }) {
  const router = useRouter();

  useEffect(() => {
    const lang = detectLanguage();
    router.replace(`/${lang}/blog/${slug}`);
  }, [router, slug]);

  return null;
}
