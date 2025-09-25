import Link from "next/link";
import type { IntegratedHero } from "../types";

export default function IntegratedHero({
  heading,
  description,
  buttonText,
  buttonUrl,
  backgroundImage,
}: IntegratedHero) {
  const imageUrl =
    // @ts-ignore - handle flexible shapes coming from CMS
    (backgroundImage as any)?.cloudinary?.secure_url ||
    // @ts-ignore
    (backgroundImage as any)?.url ||
    undefined;

  return (
    <section
      className="py-20 mt-15 bg-no-repeat bg-center bg-cover"
      style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl lg:text-5xl text-white mb-6 leading-tight">
          {heading}
        </h2>
        <p className="text-lg md:text-xl text-white mb-10 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
        {buttonUrl ? (
          <Link
            href={buttonUrl}
            className="inline-block bg-white text-blue-600 hover:bg-gray-200 px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg"
          >
            {buttonText}
          </Link>
        ) : (
          buttonText ? (
            <span className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg opacity-80">
              {buttonText}
            </span>
          ) : null
        )}
      </div>
    </section>
  );
}


