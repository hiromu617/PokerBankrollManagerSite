import { getAllSlugs } from "@/lib/blog";
import BlogSlugRedirect from "./BlogSlugRedirect";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function BlogSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogSlugRedirect slug={slug} />;
}
