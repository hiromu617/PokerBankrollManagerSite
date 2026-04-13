import GithubSlugger from "github-slugger";

export type TocItem = {
  level: 2 | 3;
  text: string;
  slug: string;
};

/**
 * Extracts H2 and H3 headings from a Markdown source and returns them with
 * GitHub-style slugs (matching what `rehype-slug` produces at render time).
 *
 * Skips headings inside fenced code blocks (` ``` ` or `~~~`).
 */
export function buildToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let fence: string | null = null;

  for (const rawLine of content.split("\n")) {
    const line = rawLine.replace(/\r$/, "");

    // Track fenced code blocks so headings inside are ignored.
    const fenceMatch = line.match(/^(```|~~~)/);
    if (fenceMatch) {
      if (fence === null) fence = fenceMatch[1];
      else if (line.startsWith(fence)) fence = null;
      continue;
    }
    if (fence !== null) continue;

    const match = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    // Strip basic inline markdown (bold/italic/code) for display & slugging.
    const text = match[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/_([^_]+)_/g, "$1")
      .trim();

    items.push({ level, text, slug: slugger.slug(text) });
  }

  return items;
}
