"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { detectLanguage } from "@/lib/i18n/detectLanguage";

export default function PrivacyPolicyRedirect() {
  const router = useRouter();

  useEffect(() => {
    const lang = detectLanguage();
    router.replace(`/${lang}/privacy-policy`);
  }, [router]);

  return null;
}
