import Image from "next/image";
import { WhyAzavistaBlockData } from "../types";

export default function WhyAzavistaBlock(props: WhyAzavistaBlockData) {
  const { badge, title, subtitle, features } = props;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features?.map((feature, i) => {
            const imageUrl =
              feature.icon?.cloudinary?.secure_url ||
              feature.icon?.url ||
              feature.icon?.thumbnailURL ||
              "";
            const width = feature.icon?.cloudinary?.width || 60;
            const height = feature.icon?.cloudinary?.height || 60;

            return (
              <div
                key={i}
                className="bg-white rounded-lg p-6 flex flex-col items-start text-left"
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={feature.headingBlue || "icon"}
                    width={width}
                    height={height}
                    className="mb-4"
                  />
                ) : (
                  <div className="w-[60px] h-[60px] bg-gray-200 mb-4 rounded" />
                )}

                <p className="text-blue-600 font-semibold text-sm">
                  {feature.headingBlue}
                </p>
                <p className="text-gray-900 font-bold text-lg mt-1">
                  {feature.headingBlack}
                </p>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}