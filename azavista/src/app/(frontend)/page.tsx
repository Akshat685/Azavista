import { getPayload } from "payload";
import config from "@/payload.config";
import './globals.css';
import PageBuilder from "./components/PageBuilder";
import { BlockData } from "@/app/(frontend)/types/index";
import AnnouncementBar from "./components/AnnouncementBar";

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

  // Fetch header global for announcement bar
  const header = await payload.findGlobal({ slug: 'header' }).catch(() => null) as any;

  return (
    <>
      {header?.enabled && (
        <AnnouncementBar
          message={header?.message ?? ''}
          linkLabel={header?.link?.label ?? undefined}
          linkUrl={header?.link?.url ?? undefined}
          dismissible={Boolean(header?.dismissible)}
          fixedTop
        />
      )}
      {header?.enabled && <div className="" />}
      <PageBuilder blocks={page.pagebuilder as BlockData[] ?? []} />
    </>
  );
}
