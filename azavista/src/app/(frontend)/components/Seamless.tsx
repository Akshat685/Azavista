import Image from "next/image";
import { SeamlessBlockData } from "../types";

export default function SeamlessBlock(props: SeamlessBlockData) {
  const { title, description, buttonLabel, buttonUrl, mainLogo, logos } = props;

  const mainLogoUrl = mainLogo?.cloudinary?.secure_url || mainLogo?.url || "";

  return (
    <section className="bg-gray-100 py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10 lg:gap-12">
        {/* LEFT SIDE TEXT */}
        <div className="text-center md:text-left">
          {title && (
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 mb-4 sm:mb-6 md:mb-8 lg:mb-13 leading-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
              {description}
            </p>
          )}
          {buttonLabel && buttonUrl && (
            <a
              href={buttonUrl}
              className="inline-block px-5 sm:px-6 md:px-7 py-3 sm:py-4 border border-blue-600 text-blue-600 text-base sm:text-lg font-bold rounded-full hover:bg-gray-200 transition"
            >
              {buttonLabel}
            </a>
          )}
        </div>

        {/* RIGHT SIDE LOGOS */}
        <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
          {mainLogoUrl && (
            <div className="relative w-full max-w-[450px] sm:max-w-[550px] md:max-w-[650px] lg:max-w-[750px]">
              <Image
                src={mainLogoUrl}
                alt="Main logo"
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
          )}

          {logos?.map((item, i) => {
            const logoUrl = item.logo?.cloudinary?.secure_url || item.logo?.url || "";
            const angle = (i / (logos?.length || 1)) * 2 * Math.PI;
            const radius = 35; // Percentage for positioning
            
            return (
              <div
                key={i}
                className="absolute bg-white rounded-full p-1.5 sm:p-2 shadow-md"
                style={{
                  top: `${50 + radius * Math.sin(angle)}%`,
                  left: `${50 + radius * Math.cos(angle)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt={item.alt || "Integration logo"}
                    width={50}
                    height={50}
                    className="rounded-full object-contain w-6 h-6 sm:w-8 sm:h-10 md:w-15 md:h-15"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}