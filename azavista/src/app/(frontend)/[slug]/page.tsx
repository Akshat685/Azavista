import { notFound } from "next/navigation";

import PageBuilder from "../components/PageBuilder";
import { BlockData } from "@/app/(frontend)/types/index";
import { getPageBySlug } from "@/lib/actions/page.action";

export const revalidate = 60;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) return notFound();

  return <PageBuilder blocks={page?.pagebuilder as BlockData[]} />;
}