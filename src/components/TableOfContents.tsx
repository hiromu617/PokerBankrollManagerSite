"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { buildToc } from "@/lib/toc";

export default function TableOfContents({ content }: { content: string }) {
  const { t } = useLanguage();
  const items = useMemo(() => buildToc(content), [content]);

  if (items.length < 2) return null;

  return (
    <nav
      aria-label={t.common.tableOfContents}
      className="mb-8 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
    >
      <p className="mb-2 text-sm font-semibold text-zinc-300">
        {t.common.tableOfContents}
      </p>
      <ul className="space-y-1 text-sm">
        {items.map((item, i) => (
          <li
            key={`${item.slug}-${i}`}
            className={item.level === 3 ? "ml-4" : ""}
          >
            <a
              href={`#${item.slug}`}
              className="text-zinc-400 transition hover:text-zinc-200"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
