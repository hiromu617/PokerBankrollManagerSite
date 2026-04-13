"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { detectLanguage } from "@/lib/i18n/detectLanguage";

export default function FaqSlugRedirect({ slug }: { slug: string }) {
  const router = useRouter();

  useEffect(() => {
    const lang = detectLanguage();
    router.replace(`/${lang}/faq/${slug}`);
  }, [router, slug]);

  return null;
}
