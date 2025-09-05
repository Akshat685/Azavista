// src/app/(frontend)/components/CaseStudies.tsx
import { getPayload } from "payload";
import config from "@/payload.config";
import Image from "next/image";
import { JSX } from "react";

interface CaseStudyImage {
  cloudinary?: {
    secure_url?: string;
  };
  url?: string;
  alt?: string;
}

interface CaseStudyCard {
  title?: string;
  description?: string;
  link?: string;
  category?: string;
  image?: CaseStudyImage;
}

interface CaseStudiesBlock {
  badge?: string;
  title?: string;
  subtitle?: string;
  cards?: CaseStudyCard[];
}

export default async function CaseStudies(): Promise<JSX.Element | null> {
  const payload = await getPayload({ config });

  const caseStudiesRes = await payload.find({
    collection: "caseStudiesBlock",
    limit: 1,
  });

  const data = caseStudiesRes.docs[0] as CaseStudiesBlock | undefined;
  if (!data) return null;

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Top Section */}
        {data.badge && (
          <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {data.badge}
          </span>
        )}
        {data.title && (
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
        )}
        {data.subtitle && (
          <p className="text-gray-600 text-base sm:text-lg mb-12 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cards?.map((card, i) => {
            const imageUrl =
              card.image?.cloudinary?.secure_url || card.image?.url || "";

            return (
              <div
                key={i}
                className="bg-white rounded-lg shadow overflow-hidden text-left"
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={card.image?.alt || card.title || "Case Study"}
                    width={400}
                    height={250}
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
