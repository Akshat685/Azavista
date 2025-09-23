"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogListBlock, BlogListItem, Media, CloudinaryImage } from "../types";

export default function BlogList({ featured, itemsRight }: BlogListBlock) {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:[grid-template-columns:1fr_1.25fr] gap-12">

                {/* Featured Card */}
                {featured && (
                    <div className="flex flex-col gap-4">
                        {featured.image && (
                            <Link
                                href={featured.link ? featured.link : "#"}
                                className="w-full relative aspect-[16/11]"
                            >
                                <Image
                                    src={
                                        (featured.image as any)?.cloudinary?.secure_url ||
                                        (featured.image as any)?.url ||
                                        (featured.image as any)?.thumbnailURL ||
                                        ""
                                    }
                                    alt={featured.title || "Featured Image"}
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
                                href={featured.link ? featured.link : "#"}
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
                                        href={item.link ? item.link : "#"}
                                        className="min-w-[230px] max-w-[230px] w-full relative aspect-[16/11]"
                                    >
                                        <Image
                                            src={
                                                (item.image as any)?.cloudinary?.secure_url ||
                                                (item.image as any)?.url ||
                                                (item.image as any)?.thumbnailURL ||
                                                ""
                                            }
                                            alt={item.title || "Blog Image"}
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
                                        href={item.link ? item.link : "#"}
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
