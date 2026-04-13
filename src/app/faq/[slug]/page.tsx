import { getAllFaqSlugs } from "@/lib/faq";
import FaqSlugRedirect from "./FaqSlugRedirect";

export function generateStaticParams() {
  return getAllFaqSlugs().map((slug) => ({ slug }));
}

export default async function FaqSlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <FaqSlugRedirect slug={slug} />;
}
