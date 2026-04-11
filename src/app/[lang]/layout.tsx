import { LANGUAGES } from "@/lib/i18n/config";
import type { Language } from "@/lib/i18n/translations";
import { LanguageProvider } from "@/lib/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <LanguageProvider lang={lang as Language}>
      <LanguageSwitcher />
      {children}
    </LanguageProvider>
  );
}
