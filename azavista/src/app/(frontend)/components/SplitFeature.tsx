"use client";

import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SplitFeature, CloudinaryImage, SplitFeatureButton } from "../types";

// Improved Registration Analytics split feature section
export default function SplitFeature(props: SplitFeature) {
  const {
    title,
    badge,
    heading,
    description,
    buttons,
    image,
    imageOnRight = true,
    backgroundVariant = "none",
  } = props;

  const media = image as CloudinaryImage | undefined;
  const imageUrl = media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL || "";
  const width = media?.cloudinary?.width || 1200;
  const height = media?.cloudinary?.height || 800;

  // Handle badge icon
  const badgeIcon = badge?.icon as CloudinaryImage | undefined;
  const badgeIconUrl = badgeIcon?.cloudinary?.secure_url || badgeIcon?.url || badgeIcon?.thumbnailURL || "";

  const sectionBgClass = backgroundVariant === "light" ? "bg-gray-50" : "bg-white";

  return (
    <section className={`w-full ${sectionBgClass}`}>
      <div className="relative py-16 lg:py-24 xl:py-32 overflow-hidden">

        {/* Section Title - Centered at the top */}
        {title && (
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16 lg:mb-20">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl text-gray-900 tracking-tight">
              {title}
            </h2>
          </div>
        )}

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center ${!imageOnRight ? 'lg:grid-flow-col lg:grid-cols-[1fr,1fr]' : ''}`}>

            {/* Text Content */}
            <div className={`w-full ${!imageOnRight ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="max-w-none">
                {/* Badge Section */}
                {badge?.text && (
                  <div className="inline-flex items-center gap-3 px-4 py-2 text-sm font-semibold mb-6 ">
                    <div className="flex items-center gap-2">
                      {badgeIconUrl ? (
                        <Image
                          src={badgeIconUrl}
                          alt={badgeIcon?.alt || "Badge icon"}
                          width={16}
                          height={16}
                          className="w-4 h-4 object-contain flex-shrink-0"
                        />
                      ) : (
                        // Fallback chart icon
                        <svg className="w-4 h-4 text-current flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="3" y="4" width="18" height="15" rx="2" ry="2" strokeWidth="2" fill="none" />
                          <rect x="7" y="8" width="3" height="8" fill="currentColor" />
                          <rect x="12" y="6" width="3" height="10" fill="currentColor" />
                        </svg>
                      )}
                      <span>{badge.text}</span>
                    </div>
                  </div>
                )}

                {/* Main Heading */}
                {heading && (
                  <h1 className="text-4xl lg:text-5xl xl:text-2xl tracking-tight text-gray-900 mb-6 leading-tight">
                    {heading}
                  </h1>
                )}

                {/* Rich Text Description */}
                {description && (
                  <div className="prose prose-lg prose-gray max-w-none mb-10">
                    <div className="text-gray-600 leading-relaxed space-y-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mb-4 [&_h2]:mt-8 [&_p]:text-lg [&_p]:text-gray-600 [&_p]:mb-6 [&_p]:leading-relaxed [&_ul]:space-y-4 [&_ul]:ml-0 [&_ul]:pl-0 [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-lg [&_li]:text-gray-600 [&_li]:leading-relaxed [&_li::before]:content-['•'] [&_li::before]:text-blue-600 [&_li::before]:font-bold [&_li::before]:text-xl [&_li::before]:mt-0.5 [&_li::before]:flex-shrink-0 [&_strong]:font-semibold [&_strong]:text-gray-900">
                      <RichText data={description} />
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                {buttons && buttons.length > 0 && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
                {buttons.map((button: SplitFeatureButton, index: number) => {
                      if (!button.label || !button.url) return null;

                      const isPrimary = button.variant === "primary";
                      const buttonClasses = isPrimary
                        ? "inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        : "inline-flex items-center justify-center px-8 py-4 border-2 border-blue-300 text-blue-700 text-lg font-semibold rounded-full hover:bg-gray-100 hover:border-blue-400 transition-all duration-200 min-w-[180px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";

                      return (
                        <Link
                          key={index}
                          href={button.url}
                          className={buttonClasses}
                        >
                          {button.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Image Content */}
            <div className={`w-full ${!imageOnRight ? 'lg:order-1' : 'lg:order-2'}`}>
              {imageUrl ? (
                <div className="relative w-full">
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white">
                    <Image
                      src={imageUrl}
                      alt={media?.alt || heading || "Feature illustration"}
                      width={width}
                      height={height}
                      className="w-full h-full object-cover"
                      priority
                      quality={95}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    />
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 ring-1 ring-black/5 rounded-2xl pointer-events-none"></div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -z-10 top-8 right-8 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-2xl pointer-events-none"></div>
                  <div className="absolute -z-10 bottom-8 left-8 w-24 h-24 bg-indigo-100 rounded-full opacity-30 blur-xl pointer-events-none"></div>
                </div>
              ) : (
                // Fallback placeholder if no image
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-gray-100 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21,15 16,10 5,21" strokeWidth="2" />
                    </svg>
                    <p className="text-sm">Image placeholder</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom fade effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}