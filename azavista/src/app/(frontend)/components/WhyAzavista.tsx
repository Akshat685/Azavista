import { getPayload } from "payload";
import config from "@/payload.config";
import { JSX } from "react";
import Image from "next/image";

interface CloudinaryImage {
    cloudinary?: {
        secure_url?: string;
        width?: number;
        height?: number;
    };
    url?: string;
    thumbnailURL?: string;
}

interface Feature {
    headingBlue?: string;
    headingBlack?: string;
    description?: string;
    icon?: CloudinaryImage;
}

interface WhyAzavistaData {
    badge?: string;
    title?: string;
    subtitle?: string;
    features?: Feature[];
}

export default async function WhyAzavistaBlock(): Promise<JSX.Element | null> {
    const payload = await getPayload({ config });

    // Fetch from Payload CMS
    const res = await payload.find({
        collection: "why-azavista",
        limit: 1,
        depth: 2,
    });

    const data = res.docs[0] as WhyAzavistaData;

    if (!data) return null;

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center">
                {data.badge && (
                    <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                        {data.badge}
                    </span>
                )}

                {data.title && (
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        {data.title}
                    </h2>
                )}

                {data.subtitle && (
                    <p className="text-gray-600 text-base sm:text-lg mb-12 max-w-3xl mx-auto">
                        {data.subtitle}
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.features?.map((feature: Feature, i: number) => {
                        const imageUrl =
                            feature.icon?.cloudinary?.secure_url ||
                            feature.icon?.url ||
                            feature.icon?.thumbnailURL ||
                            "";

                        return (
                            <div
                                key={i}
                                className="bg-white rounded-lg p-6 flex flex-col items-start text-left"
                            >
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={feature.headingBlue || ""}
                                        width={feature.icon?.cloudinary?.width || 60}
                                        height={feature.icon?.cloudinary?.height || 60}
                                        className="mb-4"
                                    />
                                ) : (
                                    <div className="w-[60px] h-[60px] bg-gray-200 mb-4 rounded" />
                                )}

                                <p className="text-blue-600 font-semibold text-sm">
                                    {feature.headingBlue}
                                </p>
                                <p className="text-gray-900 font-bold text-lg mt-1">
                                    {feature.headingBlack}
                                </p>
                                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}