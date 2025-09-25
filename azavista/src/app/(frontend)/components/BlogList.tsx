"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogListBlock, BlogListItem, Media, CloudinaryImage } from "../types";

// Helper function to construct proper blog URLs
function getBlogUrl(link?: string): string {
    if (!link) return "#";

    // If it's already a full URL (http/https) or starts with /, use as-is
    if (link.startsWith("http") || link.startsWith("/")) {
        return link;
    }

    // Otherwise, treat it as a blog slug and prepend /blog/
    const cleanSlug = link.replace(/^\/+|\/+$/g, ""); // Remove leading/trailing slashes
    return `/blog/${cleanSlug}`;
}

export default function BlogList({ featured, itemsRight }: BlogListBlock) {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:[grid-template-columns:1fr_1.25fr] gap-12">

                {/* Featured Card */}
                {featured && (
                    <div className="flex flex-col gap-4">
                        {featured.image && (
                            <Link
                                href={getBlogUrl(featured.link)}
                                className="w-full relative aspect-[16/11]"
                            >
                                <Image
                                    src={getImageUrl(featured.image)}
                                    alt={getAlt(featured.image) || featured.title || "Featured Image"}
                                    fill
                                    className="object-cover"
                                />
                            </Link>
                        )}
                        <div className="flex flex-col">
                            {featured.category && (
                                <span className="text-sm text-gray-500 mb-2">
                                    {featured.category}
                                </span>
                            )}
                            <Link
                                href={getBlogUrl(featured.link)}
                                className="text-2xl font-semibold leading-snug hover:underline"
                            >
                                {featured.title}
                            </Link>
                            {featured.excerpt && (
                                <p className="text-gray-600 mt-3 leading-relaxed">
                                    {featured.excerpt}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Right side list */}
                <div className="flex flex-col gap-12">
                    {itemsRight &&
                        itemsRight.map((item: BlogListItem, index: number) => (
                            <div key={index} className="flex gap-6">
                                {item.image && (
                                    <Link
                                        href={getBlogUrl(item.link)}
                                        className="min-w-[230px] max-w-[230px] w-full relative aspect-[16/11]"
                                    >
                                        <Image
                                            src={getImageUrl(item.image)}
                                            alt={getAlt(item.image) || item.title || "Blog Image"}
                                            fill
                                            className="object-cover"
                                        />
                                    </Link>
                                )}
                                <div className="flex flex-col">
                                    {item.category && (
                                        <span className="text-sm text-gray-500 mb-2">
                                            {item.category}
                                        </span>
                                    )}
                                    <Link
                                        href={getBlogUrl(item.link)}
                                        className="text-2xl font-semibold leading-snug hover:underline"
                                    >
                                        {item.title}
                                    </Link>
                                    {item.excerpt && (
                                        <p className="text-gray-600 mt-3 leading-relaxed">
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