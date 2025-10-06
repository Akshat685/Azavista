import Image from "next/image";
import { CustomFeatureBlockData, CloudinaryImage } from "../types";

export default function CustomFeatureBlock(props: CustomFeatureBlockData) {
  const { subheading, heading, buttonLabel, buttonUrl, image } = props;

  const media = image as CloudinaryImage | undefined;

  const imageUrl =
    media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL || "";

  const imgWidth = media?.cloudinary?.width || 650;
  const imgHeight = media?.cloudinary?.height || 400;

  return (
    <section className="bg-gray-100 py-18">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          {subheading && (
            <p className="text-gray-500 text-base font-semibold sm:text-lg mb-6 md:mb-8">{subheading}</p>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8 md:mb-10">
              {heading}
            </h2>
          )}
          {buttonLabel && buttonUrl && (
            <a
              href={buttonUrl}
              className="inline-block px-8 py-3 md:mb-14 text-blue-600 border font-semibold text-lg border-blue-600 rounded-full hover:bg-gray-200 transition mx-auto md:mx-0"
            >
              {buttonLabel}
            </a>
          )}
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={media?.alt || heading || "Feature image"}
              width={imgWidth}
              height={imgHeight}
              className="object-cover shadow-lg w-full max-w-lg"
            />
          )}
        </div>
      </div>
    </section>
  );
}