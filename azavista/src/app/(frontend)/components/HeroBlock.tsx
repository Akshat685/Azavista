"use client";

import Image from "next/image";

export default function HeroBlock({ data }: { data: any }) {
  const { heading, subheading, buttons, logos } = data;

  return (
    <section className="relative bg-[#f6f8fc] py-16 md:py-24">
      <div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl text-gray-900 mb-4">
          {heading}
        </h1>

        {subheading && (
          <p className="text-base sm:text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            {subheading}
          </p>
        )}

        {buttons?.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            {buttons.map((btn: any, i: number) => (
              <a
                key={i}
                href={btn.url}
                className={`px-6 py-3 rounded-full font-medium text-sm sm:text-base transition ${
                  btn.variant === "primary"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        )}

        <p className="text-center text-gray-600 text-sm sm:text-base font-medium mb-6">
          Trusted by industry-leading companies around the world
        </p>
      </div>

      {/* Logos */}
      {logos?.length > 0 && (
        <div className="mt-15 w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-10">
            {logos.concat(logos).map((logo: any, i: number) => (
              <div key={i} className="flex-shrink-0 h-8 sm:h-10 md:h-12">
                <Image
                  src={
                    logo.logo?.cloudinary?.secure_url ||
                    logo.logo?.thumbnailURL ||
                    logo.logo?.url ||
                    ""
                  }
                  alt={logo.alt || "logo"}
                  width={logo.logo?.cloudinary?.width || 80}
                  height={logo.logo?.cloudinary?.height || 50}
                  className="h-full w-auto object-contain ml-20"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
