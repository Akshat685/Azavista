"use client";

import TableOfContents from "./TableOfContents";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { JSX as ReactJSX } from "react";
import type { PolicyContentBlock, PolicyContentSection } from "../types";

export default function PolicyContent(props: PolicyContentBlock) {
  const { lastUpdatedDate, lastUpdated, sections } = props;

  const formattedLastUpdated = (() => {
    if (lastUpdatedDate) {
      const date = new Date(lastUpdatedDate);
      if (!isNaN(date.getTime())) {
        return new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(date);
      }
    }
    return lastUpdated || null;
  })();

  return (
    <section className="py-10 lg:py-14 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* TOC Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 max-w-3xl mx-auto">
          <div className="sticky top-24">
            
            <TableOfContents
              containerSelector="#policy-content"
              headingsSelector="h1, h2"
            />
          </div>
        </aside>

        {/* Main Content */}
        <div id="policy-content" className="lg:col-span-9 max-w-4xl mx-auto">
          {formattedLastUpdated && (
            <p className="text-sm font-medium text-gray-700 mb-6 my-10 ">
              Last Updated: {formattedLastUpdated}
            </p>
          )}

          {Array.isArray(sections) && sections.length > 0 && (
            <div className="space-y-12">
              {sections.map((section: PolicyContentSection, idx: number) => {
                const level = section.level ?? 1;
                const HeadingTag =
                  ("h" + level) as keyof ReactJSX.IntrinsicElements;
                return (
                  <div key={idx} className="space-y-6">
                    {section.heading && (
                      <div className="bg-gray-100 px-8 py-6">
                        <HeadingTag
                          className={
                            level === 1
                              ? "text-3xl font-semibold text-gray-900"
                              : "text-2xl font-semibold text-gray-900"
                          }
                        >
                          {idx + 1}. {section.heading}
                        </HeadingTag>
                      </div>
                    )}
                     {section.content && (
                       <div className="prose max-w-3xl mx-auto text-gray-700 leading-7 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_li::marker]:text-[#1e61f0] my-10">
                         <RichText data={section.content} />
                       </div>
                     )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
