"use client";

import { useLanguage } from "@/lib/i18n/context";

const featureIcons = ["📝", "📊", "🔍", "💱", "🪙", "📤"];

const featureKeys = [
  "sessionRecording",
  "bankrollManagement",
  "detailedAnalysis",
  "multiCurrency",
  "customCurrency",
  "dataExport",
] as const;

const screenshots = [
  { src: "/screenshot1.png", srcEn: "/screenshot1_en.png", key: "dashboard" as const },
  { src: "/screenshot2.png", srcEn: "/screenshot2_en.png", key: "analysis" as const },
  { src: "/screenshot3.png", srcEn: "/screenshot3_en.png", key: "liveSession" as const },
];

export default function Home() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <img
          src="/appicon_clear.png"
          alt="Poker Bankroll Manager"
          width={180}
          height={180}
          className="rounded-[40px]"
        />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Poker Bankroll Manager
        </h1>
        <p className="max-w-md text-lg text-zinc-400">
          {t.hero.subtitle}
        </p>
        <a
          href="#"
          className="mt-2 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          {t.hero.download}
        </a>
      </section>

      {/* Screenshots */}
      <section className="py-16">
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-[calc(50vw-130px)] pb-6 sm:px-[calc(50vw-400px)]">
          {screenshots.map((s) => (
            <div key={s.src} className="w-[260px] flex-shrink-0 snap-center">
              <img
                src={language === "en" ? s.srcEn : s.src}
                alt={t.screenshots[s.key]}
                className="w-full rounded-2xl border border-zinc-800 shadow-lg shadow-black/30"
              />
              <p className="mt-3 text-center text-sm text-zinc-400">
                {t.screenshots[s.key]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
          {t.features.heading}
        </h2>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((key, i) => (
            <div
              key={key}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
            >
              <div className="mb-3 text-3xl">{featureIcons[i]}</div>
              <h3 className="mb-1 text-lg font-semibold">
                {t.features[key].title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {t.features[key].description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-4 py-8 text-center text-sm text-zinc-500">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
          <a href="/privacy-policy" className="hover:text-zinc-300 transition">
            {t.footer.privacyPolicy}
          </a>
          <a href="/terms-of-service" className="hover:text-zinc-300 transition">
            {t.footer.termsOfService}
          </a>
        </div>
        <p className="mt-4">&copy; 2025 Poker Bankroll Manager</p>
      </footer>
    </div>
  );
}
