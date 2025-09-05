import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";

interface LogoItem {
  logo?: {
    cloudinary?: { secure_url?: string };
    url?: string;
  };
  alt?: string;
}

interface IntegrationsData {
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  mainLogo?: {
    cloudinary?: { secure_url?: string };
    url?: string;
  };
  logos?: LogoItem[];
}

export default async function Seamless() {
  const payload = await getPayload({ config });

  const res = await payload.find({
    collection: "Seamless",
    limit: 1,
  });

  const data = res.docs[0] as IntegrationsData | undefined;
  if (!data) return null;

  const { title, description, buttonLabel, buttonUrl, mainLogo, logos } = data;

  const mainLogoUrl =
    mainLogo?.cloudinary?.secure_url || mainLogo?.url || "";

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* LEFT SIDE TEXT */}
        <div>
          {title && (
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
          )}

          {buttonLabel && buttonUrl && (
            <a
              href={buttonUrl}
              className="inline-block px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              {buttonLabel}
            </a>
          )}
        </div>

        {/* RIGHT SIDE LOGOS */}
        <div className="relative flex items-center justify-center">
          {mainLogoUrl && (
            <Image
              src={mainLogoUrl}
              alt="Main logo"
              width={600}
              height={500}
              className=""
            />
          )}

          {/* Small logos arranged in a circle */}
          {logos?.map((item, i) => {
            const logoUrl =
              item.logo?.cloudinary?.secure_url || item.logo?.url || "";

            return (
              <div
                key={i}
                className="absolute bg-white rounded-full p-2 shadow-md"
                style={{
                  top: `${40 + 30 * Math.sin((i / logos.length) * 2 * Math.PI)}%`,
                  left: `${40 + 30 * Math.cos((i / logos.length) * 2 * Math.PI)}%`,
                }}
              >
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt={item.alt || "Integration logo"}
                    width={40}
                    height={40}
                    className="rounded-full object-contain"
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
