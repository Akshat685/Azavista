import Image from "next/image";
import { GetstartedBlockData, CloudinaryImage } from "../types";

export default function GetstartedBlock(props: GetstartedBlockData) {
  const { sectionLabel, heading, description, buttonText, buttonLink, backgroundImage } = props;

  const media = backgroundImage as CloudinaryImage | undefined;

  const imageUrl =
    media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL || "";

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden flex items-center">
        {/* Background image */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={media?.alt || heading || "Background"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}

        {/* Content */}
        <div className="relative z-10 max-w-full md:max-w-3xl px-6 md:px-16 text-left text-white">
          {sectionLabel && (
            <p className="text-sm font-semibold mb-2">{sectionLabel}</p>
          )}
          {heading && (
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">{heading}</h2>
          )}
          {description && (
            <p className="text-base sm:text-lg mb-6 max-w-xl">{description}</p>
          )}
          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-medium transition"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}