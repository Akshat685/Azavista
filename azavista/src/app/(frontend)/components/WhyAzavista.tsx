import Image from "next/image";
import { WhyAzavistaBlockData } from "../types";

export default function WhyAzavistaBlock(props: WhyAzavistaBlockData) {
  const { badge, title, subtitle, features } = props;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {badge && (
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-11">
            {badge}
          </span>
        )}

        {title && (
          <h2 className="text-4xl sm:text-4xl font-medium  text-gray-900 mb-10">
            {title}
          </h2>
        )}

        {subtitle && (
          <p className="text-gray-600 text-base sm:text-lg mb-12 max-w-4xl mx-auto px-3">
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
            // Control image size from frontend only
            const width = 70;
            const height = 70;

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
                    className="mb-7 object-contain w-[60px] h-[60px] sm:w-[70px] sm:h-[70px]"
                    sizes="(min-width: 640px) 80px, 70px"
                    style={{ width: undefined, height: undefined }}
                  />
                ) : (
                  <div className="mb-2 rounded bg-gray-200 w-[70px] h-[70px] sm:w-[80px] sm:h-[80px]" />
                )}

                <p className="text-blue-500 font-bold text-lg mb-4">
                  {feature.headingBlue}
                </p>
                <p className="text-gray-600 font-semibold text-2xl mb-4">
                  {feature.headingBlack}
                </p>
                <p className="text-gray-500 text-lg mt-3 leading-relaxed">
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