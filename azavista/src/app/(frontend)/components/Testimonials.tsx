import Image from "next/image";
import { TestimonialsBlockData, CloudinaryImage } from "../types";

export default function TestimonialsBlock(props: TestimonialsBlockData) {
  const { badge, title, subtitle, items, quoteImage } = props;

  // Properly type the quoteImage
  const quoteMedia = typeof quoteImage === 'number' ? undefined : (quoteImage as CloudinaryImage | undefined);
  const quoteUrl = quoteMedia?.cloudinary?.secure_url || quoteMedia?.url || quoteMedia?.thumbnailURL || "";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {badge && (
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-8">
            {badge}
          </span>
        )}
        {title && (
          <h2 className="text-4xl sm:text-4xl font-semibold text-gray-900 mb-7">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-gray-600 text-base sm:text-lg mb-12 max-w-4xl mx-auto">
            {subtitle}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {items?.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg p-6 text-left shadow-sm relative"
            >
              {/* Quote Icon in exact top-left position */}
              {quoteUrl && (
                <Image
                  className="absolute -top-6 left-4"
                  src={quoteUrl}
                  alt="quote"
                  width={56}
                  height={56}
                />
              )}

              {/* Padding top to push text below the quote */}
              <div className="pt-6 mb-4">
                <p className="text-gray-700 font-semibold text-lg leading-relaxed">
                  {item.quote}
                </p>
              </div>

              <div className="pt-2">
                <p className="font-bold text-lg text-gray-900">{item.author}</p>
                {item.role && (
                  <p className="text-sm text-gray-500 mt-1">{item.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
