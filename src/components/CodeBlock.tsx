"use client";

import { useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/context";

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export default function CodeBlock({ children }: { children?: ReactNode }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = extractText(children);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative group">
      <pre>{children}</pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 rounded bg-zinc-800/80 px-2 py-1 text-xs text-zinc-400 opacity-0 transition hover:text-zinc-200 group-hover:opacity-100 focus:opacity-100"
      >
        {copied ? t.common.copied : t.common.copy}
      </button>
    </div>
  );
}
