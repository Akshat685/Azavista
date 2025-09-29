"use client";

import Image from "next/image";
import type { StatsWithLogos } from "../types";

export default function StatsWithLogos({ heading, stats, logos }: StatsWithLogos) {
    return (
        <section className="py-16 px-6 text-center bg-white">
            {/* Heading */}
            <h1 className="text-2xl md:text-4xl font-semibold text-black max-w-2xl mx-auto">
                {heading}
            </h1>

            {/* Stats Grid */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {stats.map((stat, i) => (
                    <div key={i}>
                        <p className="text-6xl font-light text-black">{stat.percentage}</p>
                        <p className="mt-2 text-gray-600 text-md md:text-base">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>

          {/* Logos Grid */}
<div className="mt-16 flex flex-wrap justify-center gap-22 items-center max-w-6xl mx-auto">
    {logos.map((item, i) => {
        const logoUrl =
            item.logo?.cloudinary?.secure_url ||
            item.logo?.url ||
            item.logo?.thumbnailURL ||
            "";

        if (!logoUrl) return null;

        return (
            <div key={i} className="flex justify-center w-[120px]">
                <Image
                    src={logoUrl}
                    alt={item.logo?.alt || "Company logo"}
                    width={120}
                    height={60}
                    className="object-contain max-h-12"
                />
            </div>
        );
    })}
</div>
        </section>
    );
}
