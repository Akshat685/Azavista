import Image from "next/image";
import { GetstartedBlockData, CloudinaryImage } from "../types";

export default function GetstartedBlock(props: GetstartedBlockData) {
  const { sectionLabel, heading, description, buttonText, buttonLink, backgroundImage } = props;

  const media = backgroundImage as CloudinaryImage | undefined;

  const imageUrl =
    media?.cloudinary?.secure_url || media?.url || media?.thumbnailURL || "";

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] sm:rounded-2xl overflow-hidden flex items-center">

          {/* Background image */}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={media?.alt || heading || "Background"}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1280px"
              quality={85}
            />
          )}

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20 z-[1]" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-full md:max-w-3xl px-4 sm:px-6 md:px-10 lg:px-16 text-left text-white">
            {sectionLabel && (
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center lg:text-left">
                {sectionLabel}
              </p>
            )}

            {heading && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center lg:text-left leading-tight">
                {heading}
              </h2>
            )}

            {description && (
              <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-7 md:mb-8 lg:mb-9 max-w-xl leading-relaxed text-center lg:text-left">
                {description}
              </p>
            )}

            {buttonText && buttonLink && (
              <a
                href={buttonLink}
                className="inline-block w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 px-5 sm:px-6 md:px-7 lg:px-8 py-3 sm:py-3.5 md:py-4 rounded-full text-white text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {buttonText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
