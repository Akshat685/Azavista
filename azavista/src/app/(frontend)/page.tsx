import { getPayload } from "payload";
import config from "@/payload.config";
import './globals.css';
import PageBuilder from "./components/PageBuilder";
import { BlockData } from "@/app/(frontend)/types/index";

export const revalidate = 60;

export default async function HomePage() {
  const payload = await getPayload({ config });

  const pagesRes = await payload.find({
    collection: "pages",
    limit: 1,
    where: {
      slug: { equals: "home" },
    },
    depth: 2,
  });

  const page = pagesRes.docs[0];
  if (!page) return <div>Page not found</div>;

  return (
    <PageBuilder blocks={page.pagebuilder as BlockData[] ?? []} />
  );
}
