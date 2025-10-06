import Image from "next/image";
import { getPayload } from "payload";
import config from "@/payload.config";
import type { FooterData, Media } from "../types";

export default async function Footer() {
  const payload = await getPayload({ config });

  const footerRes = await payload.find({
    collection: "footer",
    limit: 1,
    depth: 1,
  });

  const data = footerRes.docs?.[0] as FooterData | undefined;

  if (!data) return null;

  const getImageUrl = (img?: number | Media) => {
    if (!img || typeof img === "number") return "";
    return img.cloudinary?.secure_url || img.url || img.thumbnailURL || "";
  };

  const getAlt = (img?: number | Media, fallback = "Image") => {
    if (!img || typeof img === "number") return fallback;
    return img.alt || fallback;
  };

  return (
    <footer className="bg-[#0f4f73] text-white py-8 px-4 sm:py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-6 sm:gap-8 mt-8 sm:mt-12">
        {/* Logo & Headquarters */}
        <div className="sm:col-span-2 lg:col-span-1">
          {getImageUrl(data.logo) && (
            <Image
              src={getImageUrl(data.logo)}
              alt={getAlt(data.logo, "Logo")}
              width={150}
              height={40}
              className="mb-4 w-32 sm:w-36 lg:w-[150px] h-auto"
            />
          )}
          {data.headquarters?.map((hq, idx) => (
            <div key={idx} className="mb-4 sm:mb-6">
              <h4 className="font-bold text-sm sm:text-base">{hq.title}</h4>
              <p className="text-sm sm:text-base whitespace-pre-line font-bold">
                {hq.address}
              </p>
            </div>
          ))}
        </div>

        {/* Link Groups */}
        {data.links?.map((group, idx) => (
          <div key={idx} className="min-w-0">
            <h4 className="uppercase text-xs sm:text-sm text-[#91d9e3] font-semibold mb-2 sm:mb-3">
              {group.groupTitle}
            </h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {group.items?.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a
                    href={link.url}
                    className="font-bold text-sm sm:text-base hover:text-[#91d9e3] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Social Links & Copyright */}
      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-0">
        <div className="flex gap-3 sm:gap-4">
          {data.socialLinks?.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
            >
              {getImageUrl(social.icon) && (
                <Image
                  src={getImageUrl(social.icon)}
                  alt={social.platform}
                  width={18}
                  height={18}
                  className="invert brightness-0 w-4 sm:w-[18px] h-4 sm:h-[18px]"
                />
              )}
            </a>
          ))}
        </div>
        <div className="text-xs sm:text-sm text-center sm:text-right">
          {data.copyright}
        </div>
      </div>
    </footer>
  );
}
