"use client";

import Image from "next/image";
import type { CustomerTestimonial } from "../types";

export default function CustomerTestimonial({ logo, quote, author }: CustomerTestimonial) {
    // Resolve logo URL
    const logoUrl =
        logo?.cloudinary?.secure_url || logo?.url || logo?.thumbnailURL || "";

    // Resolve author image URL
    const authorImageUrl =
        author.image?.cloudinary?.secure_url ||
        author.image?.url ||
        author.image?.thumbnailURL ||
        "";

    return (
        <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24 text-center">
            {/* Logo */}
            {logoUrl && (
                <div className="mb-8 flex justify-center">
                    <Image
                        src={logoUrl}
                        alt={logo?.alt || "Company logo"}
                        width={120}
                        height={40}
                        className="h-auto w-auto object-contain max-h-12"
                    />
                </div>
            )}

            {/* Quote */}
            <blockquote className="text-2xl md:text-4xl font-light leading-relaxed text-gray-900 max-w-4xl mx-auto">
                {quote}
            </blockquote>

            {/* Author (inline with image + details) */}
            <div className="mt-10 flex items-center justify-center gap-4">
                {authorImageUrl && (
                    <Image
                        src={authorImageUrl}
                        alt={author.image?.alt || author.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                    />
                )}
                <div className="text-left">
                    <p className="font-semibold text-gray-900">{author.name}</p>
                    <p className="text-gray-600 text-sm">
                        {author.company} <br />
                        <span className="text-gray-500">{author.role}</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
