import { notFound } from "next/navigation";

import PageBuilder from "@/app/(frontend)/components/PageBuilder";
import type { BlockData } from "@/app/(frontend)/types";
import { getPageBySlug } from "@/lib/actions/page.action";

export const revalidate = 60;

export default async function BlogIndexPage() {
  const page = await getPageBySlug("blog");
  if (!page) return notFound();
  return <PageBuilder blocks={page?.pagebuilder as BlockData[]} />;
}


