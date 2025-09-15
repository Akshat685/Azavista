import { RichText } from "@payloadcms/richtext-lexical/react";
import type { PlatformFeature } from "../types";

export default function PlatformFeature({ title, heading, description }: PlatformFeature) {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <span className="inline-block px-5 py-3 mb-3 rounded-full bg-blue-50 text-[#1e61f0] text-sm font-medium">
          {title}
        </span>
        <h2 className="mt-6 text-4xl md:text-5xl tracking-tight text-gray-900">{heading}</h2>
        {description && (
          <div className="mt-6 text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_li::marker]:text-[#1e61f0]">
            <RichText data={description} />
          </div>
        )}
      </div>
    </section>
  );
}


