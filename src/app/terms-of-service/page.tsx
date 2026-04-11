"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { detectLanguage } from "@/lib/i18n/detectLanguage";

export default function TermsOfServiceRedirect() {
  const router = useRouter();

  useEffect(() => {
    const lang = detectLanguage();
    router.replace(`/${lang}/terms-of-service`);
  }, [router]);

  return null;
}
