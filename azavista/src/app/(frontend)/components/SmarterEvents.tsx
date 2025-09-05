import Image from "next/image";
import { FaChartBar } from "react-icons/fa";
import { getPayload } from "payload";
import config from "@/payload.config";

interface CloudinaryImage {
    cloudinary?: {
        secure_url?: string;
        width?: number;
        height?: number;
    };
    url?: string;
    thumbnailURL?: string;
    alt?: string;
    width?: number;
    height?: number;
}


export default async function SmarterEvents() {
    const payload = await getPayload({ config });

    const smartEventRes = await payload.find({
        collection: "smarterEvents",
        limit: 1,
        depth: 1,
    });

    const data = smartEventRes.docs[0];
    if (!data) return null;

    const {
        heading,
        image,
        categoryLabel,
        title,
        description,
        primaryButtonLabel,
        primaryButtonUrl,
        secondaryButtonLabel,
        secondaryButtonUrl,
    } = data;

    const media = image as CloudinaryImage | undefined;

    const imageUrl =
        media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL || "";
    const imgWidth = media?.cloudinary?.width || 600;
    const imgHeight = media?.cloudinary?.height || 400;
    const imageAlt = media?.alt || "Feature image";

    return (
        <section className="py-16 bg-white mb-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-4">
                {heading && (
                    <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-20 mt-4">
                        {heading}
                    </h1>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="flex justify-center">
                        <div className="border-8 border-[#3BB7C4] rounded-lg overflow-hidden w-[800px]">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={imageAlt}
                                    width={imgWidth}
                                    height={imgHeight}
                                    className="object-cover h-[320px] w-full"
                                />
                            ) : (
                                <div className="bg-gray-100 w-[800px] h-[300px] flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        {categoryLabel && (
                            <div className="flex items-center gap-2 text-[#3BB7C4] font-semibold text-lg mb-10">
                                <FaChartBar className="text-lg" />
                                <span className="text-[black]">{categoryLabel}</span>
                            </div>
                        )}

                        {title && (
                            <h3 className="text-2xl sm:text-3xl text-gray-900 mb-10">
                                {title}
                            </h3>
                        )}

                        {description && (
                            <p className="text-gray-600 mb-12">{description}</p>
                        )}

                        <div className="flex items-center gap-6">
                            {primaryButtonLabel && primaryButtonUrl && (
                                <a
                                    href={primaryButtonUrl}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium text-sm hover:bg-blue-700 transition"
                                >
                                    {primaryButtonLabel}
                                </a>
                            )}
                            {secondaryButtonLabel && secondaryButtonUrl && (
                                <a
                                    href={secondaryButtonUrl}
                                    className="text-blue-600 font-medium text-sm hover:underline flex items-center"
                                >
                                    {secondaryButtonLabel} <span className="ml-1">&gt;</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
