import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";

interface Media {
  id: string | number;
  url?: string;
  alt?: string;
  cloudinary?: {
    secure_url?: string;
    width?: number;
    height?: number;
  };
  thumbnailURL?: string;
}

interface CustomFeatureData {
  subheading?: string;
  heading?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  image?: number | Media; // upload field can be an ID or Media object
}

export default async function CustomFeature() {
  try {
    const payload = await getPayload({ config });

    const res = await payload.find({
      collection: "custom-feature",
      limit: 1,
      depth: 1, // important so we actually get the Media object
    });

    const data = res.docs?.[0] as CustomFeatureData | undefined;
    if (!data) return null;

    // Type guard to check if image is a Media object
    const image = typeof data.image === "object" ? data.image : undefined;

    const imageUrl =
      image?.cloudinary?.secure_url ||
      image?.url ||
      image?.thumbnailURL ||
      "";

    const imgWidth = image?.cloudinary?.width || 650;
    const imgHeight = image?.cloudinary?.height || 400;

    return (
      <section className="bg-gray-100 py-18">
        <div className="max-w-8xl ml-10 mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {data.subheading && (
              <p className="text-gray-500 text-lg mb-10">{data.subheading}</p>
            )}
            {data.heading && (
              <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-14">
                {data.heading}
              </h2>
            )}
            {data.buttonLabel && data.buttonUrl && (
              <a
                href={data.buttonUrl}
                className="inline-block px-8 py-3 mb-14 text-blue-600 border border-blue-600 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                {data.buttonLabel}
              </a>
            )}
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={image?.alt || data.heading || "Feature image"}
                width={imgWidth}
                height={imgHeight}
                className="object-cover shadow-lg w-full max-w-md"
              />
            )}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching custom feature data:", error);
    return null;
  }
}
