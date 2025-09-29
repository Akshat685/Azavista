"use client";

import Link from "next/link";
import type { HeroHighlight } from "../types";


export default function HeroHighlight({
    title,
    description,
    primaryButton,
    secondaryButton,
}: HeroHighlight) {
    return (
        <section className="text-center py-16 px-6 bg-white">
            <h2 className="max-w-4xl text-4xl md:text-5xl mx-auto tracking-tight text-black">
                {title}
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                {description}
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <Link
                    href={primaryButton.link}
                    className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
                >
                    {primaryButton.label}
                </Link>
                <Link
                    href={secondaryButton.link}
                    className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition"
                >
                    {secondaryButton.label}
                </Link>
            </div>
        </section>
    );
}
