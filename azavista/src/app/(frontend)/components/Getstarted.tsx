import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";

interface Media {
  id: string | number;
  url?: string;
  thumbnailURL?: string;
  alt?: string;
  cloudinary?: {
    secure_url?: string;
    width?: number;
    height?: number;
  };
}

interface GetstartedProps {
  sectionLabel: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: number | Media; // ✅ fixed
}

export default async function Getstarted() {
  const payload = await getPayload({ config });

  const getStartedRes = await payload.find({
    collection: "getstarted",
    limit: 1,
    depth: 1, // ensures backgroundImage resolves into Media
  });

  const data = getStartedRes.docs?.[0] as GetstartedProps | undefined;
  if (!data) return null;

  const getImageUrl = (img?: number | Media) => {
    if (!img || typeof img === "number") return "";
    return img.cloudinary?.secure_url || img.url || img.thumbnailURL || "";
  };

  const getAlt = (img?: number | Media, fallback = "Background") => {
    if (!img || typeof img === "number") return fallback;
    return img.alt || fallback;
  };

  const imageUrl = getImageUrl(data.backgroundImage);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden flex items-center">
        {/* Background image */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={getAlt(data.backgroundImage, data.heading)}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}

        {/* Content aligned left */}
        <div className="relative z-10 max-w-3xl px-8 md:px-16 text-left text-white">
          {data.sectionLabel && (
            <p className="text-sm font-semibold mb-2">{data.sectionLabel}</p>
          )}
          {data.heading && (
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              {data.heading}
            </h2>
          )}
          {data.description && (
            <p className="text-base sm:text-lg mb-6 max-w-xl">
              {data.description}
            </p>
          )}
          {data.buttonText && data.buttonLink && (
            <a
              href={data.buttonLink}
              className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white font-medium transition"
            >
              {data.buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
