import { notFound } from "next/navigation";

import PageBuilder from "@/app/(frontend)/components/PageBuilder";
import type { BlockData } from "@/app/(frontend)/types";
import { getPageBySlug } from "@/lib/actions/page.action";

export const revalidate = 60;

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fullSlug = `blog/${slug}`;

  const page = await getPageBySlug(fullSlug);
  if (!page) return notFound();

  return <PageBuilder blocks={page?.pagebuilder as BlockData[]} />;
}


