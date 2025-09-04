"use client";

import Image from "next/image";
import { FaChartBar } from "react-icons/fa";

export default function SmarterEvents({ data }: { data: any }) {
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

    const imageUrl =
        image?.cloudinary?.secure_url || image?.url || image?.thumbnailURL || "";
    const imgWidth = image?.cloudinary?.width || 600;
    const imgHeight = image?.cloudinary?.height || 400;

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
                                    alt={image?.alt || "Feature image"}
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
                            <div className="flex items-center gap-2 text-[#3BB7C4] font-semibold text-lg mb-10 ">
                                <FaChartBar className="text-lg" />
                                <span className="text-[black]">{categoryLabel}</span>
                            </div>
                        )}

                        {title && (
                            <h3 className="text-2xl sm:text-3xl  text-gray-900 mb-10">
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
