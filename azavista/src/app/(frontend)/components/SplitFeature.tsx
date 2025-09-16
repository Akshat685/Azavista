"use client";

import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SplitFeature, CloudinaryImage } from "../types";

// Generic split feature section: text + image, badge, 2 CTAs
export default function SplitFeature(props: SplitFeature) {
  const {
    title,
    badge,
    heading,
    subheading,
    description,
    primaryCta,
    secondaryCta,
    image,
    imageOnRight = true,
    backgroundVariant = "none",
  } = props;

  const media = image as CloudinaryImage | undefined;
  const imageUrl = media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL || "";
  const width = media?.cloudinary?.width || 800;
  const height = media?.cloudinary?.height || 600;

  const sectionBgClass = backgroundVariant === "light" ? "bg-gray-50" : "";

  const Text = (
    <div>
      <div className="flex-1 py-16 lg:py-20">
        {title && (
          <div className="text-gray-700 text-xl font-semibold mb-4">{title}</div>
        )}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-600" aria-hidden />
            {badge}
          </div>
        )}
        
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
          {heading}
        </h1>
        {subheading && (
          <p className="text-lg lg:text-xl text-gray-700 mb-6">{subheading}</p>
        )}
        
        {description && (
          <div className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-none [&_h2]:text-xl [&_h2]:lg:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mb-6 [&_h2]:leading-tight [&_h2]:mt-0 [&_p]:text-lg [&_p]:text-gray-600 [&_p]:mb-8 [&_p]:leading-relaxed [&_ul]:space-y-4 [&_ul]:mt-4 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li::before]:content-['•'] [&_li::before]:text-blue-600 [&_li::before]:font-bold [&_li::before]:text-lg [&_li::before]:mt-0.5 [&_li::before]:flex-shrink-0 [&_strong]:font-semibold [&_strong]:text-gray-900">
            <RichText data={description} />
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {primaryCta?.label && primaryCta?.url && (
          <Link 
            href={primaryCta.url} 
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg font-medium rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            {primaryCta.label}
          </Link>
        )}
        {secondaryCta?.label && secondaryCta?.url && (
          <Link 
            href={secondaryCta.url} 
            className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-medium rounded-full hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            {secondaryCta.label}
          </Link>
        )}
      </div>
    </div>
  );

  const Visual = (
    <div className="flex-1 relative">
      {imageUrl && (
        <div className="relative">
          <Image
            src={imageUrl}
            alt={media?.alt || heading || "Registration Analytics Dashboard"}
            width={width}
            height={height}
            className="w-full h-auto rounded-2xl shadow-2xl object-cover"
            priority
          />
          {/* Optional overlay for better visual hierarchy */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5"></div>
        </div>
      )}
    </div>
  );

  return (
    <section className={`py-12 lg:py-20 xl:py-24 ${sectionBgClass}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {imageOnRight ? (
            <>
              {Text}
              {Visual}
            </>
          ) : (
            <>
              {Visual}
              {Text}
            </>
          )}
        </div>
      </div>
    </section>
  );
}