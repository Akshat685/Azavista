"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogListBlock, BlogListItem, Media, CloudinaryImage } from "../types";

function getImageUrl(image?: CloudinaryImage | number | Media): string {
    if (!image || typeof image === "number") return "";
    const cloud = (image as CloudinaryImage).cloudinary;
    if (cloud?.secure_url) return cloud.secure_url;
    const media = image as Media;
    return media.url || media.thumbnailURL || "";
}

function getAlt(image?: CloudinaryImage | number | Media): string | undefined {
    if (!image || typeof image === "number") return undefined;
    const asCloud = image as CloudinaryImage;
    if (asCloud.alt) return asCloud.alt;
    const asMedia = image as Media;
    return asMedia.alt;
}

// Helper function to construct proper blog URLs
function getBlogUrl(link?: string): string {
    if (!link) return "#";

    const raw = link.trim();
    // If it's already a full URL (http/https) or starts with /, use as-is
    if (raw.startsWith("http") || raw.startsWith("/")) {
        return raw;
    }

    // Normalize possible values like "blog/slug" coming from CMS
    const trimmed = raw.replace(/^\/+|\/+$/g, ""); // Remove leading/trailing slashes
    const withoutBlogPrefix = trimmed.replace(/^blog\//, "");
    return `/blog/${withoutBlogPrefix}`;
}

export default function BlogList({ featured, itemsRight }: BlogListBlock) {
    return (
        <section className="py-12 sm:py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-8 sm:gap-10 md:gap-12">

                {/* Featured Card */}
                {featured && (
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {featured.image && (
                            <Link
                                href={getBlogUrl(featured.link)}
                                className="w-full relative aspect-[16/11] rounded-lg overflow-hidden"
                            >
                                <Image
                                    src={getImageUrl(featured.image)}
                                    alt={getAlt(featured.image) || featured.title || "Featured Image"}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </Link>
                        )}
                        <div className="flex flex-col">
                            {featured.category && (
                                <span className="text-xs sm:text-sm text-gray-500 mb-1.5 sm:mb-2">
                                    {featured.category}
                                </span>
                            )}
                            <Link
                                href={getBlogUrl(featured.link)}
                                className="text-xl sm:text-2xl md:text-2xl font-semibold leading-snug hover:underline"
                            >
                                {featured.title}
                            </Link>
                            {featured.excerpt && (
                                <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3 leading-relaxed">
                                    {featured.excerpt}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Right side list */}
                <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
                    {itemsRight &&
                        itemsRight.map((item: BlogListItem, index: number) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6">
                                {item.image && (
                                    <Link
                                        href={getBlogUrl(item.link)}
                                        className="w-full sm:min-w-[180px] sm:max-w-[180px] md:min-w-[200px] md:max-w-[200px] lg:min-w-[230px] lg:max-w-[230px] relative aspect-[16/11] rounded-lg overflow-hidden flex-shrink-0"
                                    >
                                        <Image
                                            src={getImageUrl(item.image)}
                                            alt={getAlt(item.image) || item.title || "Blog Image"}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </Link>
                                )}
                                <div className="flex flex-col flex-1">
                                    {item.category && (
                                        <span className="text-xs sm:text-sm text-gray-500 mb-1.5 sm:mb-2">
                                            {item.category}
                                        </span>
                                    )}
                                    <Link
                                        href={getBlogUrl(item.link)}
                                        className="text-lg sm:text-xl md:text-2xl font-semibold leading-snug hover:underline"
                                    >
                                        {item.title}
                                    </Link>
                                    {item.excerpt && (
                                        <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3 leading-relaxed">
                                            {item.excerpt}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}