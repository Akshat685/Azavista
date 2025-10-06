import Image from "next/image";
import { SmarterEventsBlockData, CloudinaryImage } from "../types";

export default function SmarterEvents(props: SmarterEventsBlockData) {
    const {
        heading,
        image,
        categoryLabel,
        icon,
        title,
        description,
        primaryButtonLabel,
        primaryButtonUrl,
        secondaryButtonLabel,
        secondaryButtonUrl,
    } = props;

    const media = image as CloudinaryImage | undefined;

    const imageUrl =
        media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL || "";
    const imgWidth = media?.cloudinary?.width || 600;
    const imgHeight = media?.cloudinary?.height || 400;
    const imageAlt = media?.alt || "Feature image";

    return (
        <section className="bg-white mb-12 py-10 sm:py-14 lg:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {heading && (
                    <h1 className="text-center text-2xl sm:text-3xl lg:text-5xl text-gray-900 mb-10 sm:mb-14 lg:mb-20 mt-2 sm:mt-4">
                        {heading}
                    </h1>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    {/* Image column */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-[800px] border-8 border-[#3BB7C4] rounded-lg overflow-hidden">
                            {imageUrl ? (
                                <div className="w-full aspect-video">
                                    <Image
                                        src={imageUrl}
                                        alt={imageAlt}
                                        width={imgWidth}
                                        height={imgHeight}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="bg-gray-100 w-full aspect-video flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Text column */}
                    <div>
                        {categoryLabel && (
                            <div className="flex items-center gap-2 text-[#3BB7C4] font-semibold text-base sm:text-lg mb-6 sm:mb-8 lg:mb-10">
                                {icon && (
                                    <Image
                                        src={(icon as any)?.cloudinary?.secure_url || (icon as any)?.url || (icon as any)?.thumbnailURL || ""}
                                        alt={(icon as any)?.alt || "icon"}
                                        width={(icon as any)?.cloudinary?.width || 20}
                                        height={(icon as any)?.cloudinary?.height || 20}
                                        className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
                                    />
                                )}
                                <span className="text-black">{categoryLabel}</span>
                            </div>
                        )}

                        {title && (
                            <h3 className="text-xl sm:text-2xl lg:text-3xl text-gray-900 font-semibold mb-5 sm:mb-8 lg:mb-10">
                                {title}
                            </h3>
                        )}

                        {description && (
                            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 lg:mb-12">
                                {description}
                            </p>
                        )}

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
                            {primaryButtonLabel && primaryButtonUrl && (
                                <a
                                    href={primaryButtonUrl}
                                    className="w-full sm:w-auto inline-flex justify-center px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white rounded-full font-semibold text-base sm:text-lg hover:bg-blue-800 transition"
                                >
                                    {primaryButtonLabel}
                                </a>
                            )}
                            {secondaryButtonLabel && secondaryButtonUrl && (
                                <a
                                    href={secondaryButtonUrl}
                                    className="w-full sm:w-auto inline-flex justify-center text-blue-600 font-semibold text-base sm:text-lg hover:underline"
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