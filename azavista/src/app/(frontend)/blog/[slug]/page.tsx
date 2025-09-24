import { notFound } from "next/navigation";

import PageBuilder from "@/app/(frontend)/components/PageBuilder";
import type { BlockData, BlogPage } from "@/app/(frontend)/types";
import { getPageBySlug } from "@/lib/actions/page.action";
import { getBlogPostBySlug } from "@/lib/actions/blog.action";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import TableOfContents from "@/app/(frontend)/components/TableOfContents";

export const revalidate = 60;

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const fullSlug = `blog/${slug}`;

  // Prefer Blogs collection first
  const blog: BlogPage | null =
    ((await getBlogPostBySlug(slug)) || (await getBlogPostBySlug(fullSlug))) as unknown as BlogPage | null;
  if (blog) {
    return (
      <article className="px-4 lg:px-6 py-14">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          {blog.title && (
            <h1 className="text-center text-4xl md:text-5xl tracking-tight">
              {blog.title}
            </h1>
          )}

          {/* Subtitle */}
          {blog.subtitle && (
            <p className="mt-4 text-center text-gray-600 text-lg max-w-3xl mx-auto">
              {blog.subtitle}
            </p>
          )}

          {/* Meta row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 font-semibold">
            {blog.category && <span>{blog.category}</span>}
            {blog.publishedAt && (
              <span className="flex items-center gap-1">
                <span>Original Publish Date :</span>
                <time dateTime={blog.publishedAt as string}>{new Date(blog.publishedAt as string).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</time>
              </span>
            )}
            <span className="flex items-center gap-1">
              <span>Last Updated Date :</span>
              <time dateTime={(blog as any).lastUpdatedAt as string || blog.updatedAt as string}>
                {new Date(((blog as any).lastUpdatedAt as string) || (blog.updatedAt as string)).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </span>
          </div>

          {/* Share icons from Payload */}
          {Array.isArray((blog as any).socialIcons) && (blog as any).socialIcons.length > 0 && (
            <div className="mt-4 flex items-center justify-left gap-5 text-gray-500">
              {(blog as any).socialIcons.map((s: any, i: number) => (
                <a key={i} aria-label={s.label || "Social link"} href={s.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={s.icon?.cloudinary?.secure_url || s.icon?.url || s.icon?.thumbnailURL || ""}
                    alt={s.label || "Icon"}
                    width={22}
                    height={22}
                  />
                </a>
              ))}
            </div>
          )}

          {/* Featured image */}
          {blog.image && (
            <div className="relative w-full aspect-[16/9] mt-8">
              <Image
                src={(blog.image as any)?.cloudinary?.secure_url || (blog.image as any)?.url || (blog.image as any)?.thumbnailURL || ""}
                alt={(blog.image as any)?.alt || blog.title || "Blog image"}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>

        {/* Body with TOC layout */}
        <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
          <aside className="hidden lg:block w-full">
            <TableOfContents containerSelector="#article-content" headingsSelector="h1, h2, h3" maxHeightClass="max-h-[60vh]" />
          </aside>

          {blog.bodyContent && (
            <div id="article-content" className="max-w-4xl mx-auto">
              <div
                className="
        prose prose-lg md:prose-xl max-w-none dark:prose-invert
        prose-headings:font-bold prose-headings:tracking-tight
        [&>div>h1]:text-4xl [&>div>h1]:md:text-5xl [&>div>h1]:mt-10 [&>div>h1]:mb-6 [&>div>h1]:scroll-mt-28
        [&>div>h2]:text-2xl [&>div>h2]:md:text-3xl [&>div>h2]:mt-10 [&>div>h2]:mb-6 [&>div>h2]:scroll-mt-28
        [&>div>h3]:mt-10 [&>div>h3]:mb-6 [&>div>h3]:scroll-mt-10
        [&>div>p]:text-gray-700 [&>div>p]:leading-relaxed [&>div>p]:mb-6
        [&>div>strong]:font-semibold [&>div>strong]:text-gray-900
        [&_a]:text-blue-600 [&_a]:underline hover:[&_a]:text-blue-700 [&_a]:underline-offset-2
        [&>div>ul]:list-disc [&>div>ul]:pl-6 [&>div>ul]:mb-6
        [&>div>ol]:list-decimal [&>div>ol]:pl-6 [&>div>ol]:mb-6
        [&>div>li]:my-2
        [&>div>img]:rounded-lg [&>div>img]:shadow-md [&>div>img]:mx-auto [&>div>img]:my-6
        [&>.callout-problem]:border-l-4 [&>.callout-problem]:border-red-500 [&>.callout-problem]:bg-red-50 [&>.callout-problem]:p-4 [&>.callout-problem]:rounded-md [&>.callout-problem]:mb-6
        [&>.callout-help]:border-l-4 [&>.callout-help]:border-green-500 [&>.callout-help]:bg-green-50 [&>.callout-help]:p-4 [&>.callout-help]:rounded-md [&>.callout-help]:mb-6
        [&>.callout-tools]:border-l-4 [&>.callout-tools]:border-blue-500 [&>.callout-tools]:bg-blue-50 [&>.callout-tools]:p-4 [&>.callout-tools]:rounded-md [&>.callout-tools]:mb-6
      "
              >
                <RichText data={blog.bodyContent as any} />
              </div>
            </div>
          )}
        </div>

      </article>
    );
  }

  // Fallback to Pages collection
  const page = await getPageBySlug(fullSlug);
  if (page) {
    return <PageBuilder blocks={page?.pagebuilder as BlockData[]} />;
  }

  return notFound();
}