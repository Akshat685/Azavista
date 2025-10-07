import Image from "next/image";
import { HeroBlockData } from "../types";

export default function HeroBlock(props: HeroBlockData) {
  const { heading, subheading, trustedCompaniesText, buttons, logos } = props;

  return (
    <section className="relative bg-gray-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="max-w-4xl mx-auto text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-4">
          {heading}
        </h1>

        {subheading && (
          <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            {subheading}
          </p>
        )}

        {(buttons ?? []).length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            {(buttons ?? []).map((btn, i) => (
              <a
                key={i}
                href={btn.url}
                className={`px-7 py-4 rounded-full font-bold text-lg sm:text-base transition ${
                  btn.variant === "primary"
                    ? "bg-blue-600 text-white hover:bg-blue-800"
                    : "border border-blue-600 text-blue-600 hover:bg-gray-300"
                }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        )}

        {trustedCompaniesText && (
          <p className="text-center text-black-600 text-sm sm:text-base font-medium mb-6">
            {trustedCompaniesText}
          </p>
        )}
      </div>

      {/* Logos Marquee */}
      {(logos ?? []).length > 0 && (
        <div className="mt-15 w-full overflow-hidden relative">
          <div className="flex animate-marquee gap-12 sm:gap-10 md:gap-12 lg:gap-30">
            {/* First set of logos */}
            {(logos ?? []).map((logo, i) => (
              <div key={`set1-${i}`} className="flex-shrink-0 h-8 sm:h-10 md:h-12 flex items-center">
                <Image
                  src={
                    logo.logo?.cloudinary?.secure_url ||
                    logo.logo?.thumbnailURL ||
                    logo.logo?.url ||
                    ""
                  }
                  alt={logo.alt || "logo"}
                  width={logo.logo?.cloudinary?.width || 120}
                  height={logo.logo?.cloudinary?.height || 50}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
            {/* Second set of logos for seamless loop */}
            {(logos ?? []).map((logo, i) => (
              <div key={`set2-${i}`} className="flex-shrink-0 h-8 sm:h-10 md:h-12 flex items-center">
                <Image
                  src={
                    logo.logo?.cloudinary?.secure_url ||
                    logo.logo?.thumbnailURL ||
                    logo.logo?.url ||
                    ""
                  }
                  alt={logo.alt || "logo"}
                  width={logo.logo?.cloudinary?.width || 120}
                  height={logo.logo?.cloudinary?.height || 50}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}