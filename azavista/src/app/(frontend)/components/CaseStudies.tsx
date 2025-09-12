import Image from "next/image";
import { CaseStudiesBlockData } from "../types";

export default function CaseStudiesBlock(props: CaseStudiesBlockData) {
  const { badge, title, subtitle, cards } = props;

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Top Section */}
        {badge && (
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {badge}
          </span>
        )}
        {title && (
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-gray-600 text-base sm:text-lg mb-12 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards?.map((card, i) => {
            const imageUrl =
              card.image?.cloudinary?.secure_url ||
              card.image?.url ||
              card.image?.thumbnailURL ||
              "";

            const width = card.image?.cloudinary?.width || 400;
            const height = card.image?.cloudinary?.height || 250;

            return (
              <div
                key={i}
                className="bg-white rounded-lg shadow overflow-hidden text-left"
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={card.image?.alt || card.title || "Case Study"}
                    width={width}
                    height={height}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  {card.category && (
                    <p className="text-xs font-semibold uppercase text-gray-500 tracking-wide">
                      {card.category}
                    </p>
                  )}
                  {card.title && (
                    <h3 className="mt-2 text-lg font-bold text-gray-900">
                      {card.title}
                    </h3>
                  )}
                  {card.description && (
                    <p className="mt-2 text-sm text-gray-600">
                      {card.description}
                    </p>
                  )}
                  {card.link && (
                    <a
                      href={card.link}
                      className="mt-3 inline-block text-blue-600 font-medium text-sm"
                    >
                      Learn More &gt;
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}