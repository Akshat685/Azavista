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
    <footer className="bg-[#135a7f] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Headquarters */}
        <div>
          {getImageUrl(data.logo) && (
            <Image
              src={getImageUrl(data.logo)}
              alt={getAlt(data.logo, "Logo")}
              width={150}
              height={40}
              className="mb-4"
            />
          )}
          {data.headquarters?.map((hq, idx) => (
            <div key={idx} className="mb-4">
              <h4 className="font-bold">{hq.title}</h4>
              <p className="text-sm whitespace-pre-line">{hq.address}</p>
            </div>
          ))}

          {/* Social Links */}
          <div className="flex gap-4 mt-4">
            {data.socialLinks?.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getImageUrl(social.icon) && (
                  <Image
                    src={getImageUrl(social.icon)}
                    alt={social.platform}
                    width={20}
                    height={20}
                    className="invert brightness-0"
                  />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Link Groups */}
        {data.links?.map((group, idx) => (
          <div key={idx}>
            <h4 className="uppercase text-sm font-semibold mb-3">
              {group.groupTitle}
            </h4>
            <ul className="space-y-2">
              {group.items?.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a href={link.url} className="font-semibold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs border-t border-white/20 pt-4">
        {data.copyright}
      </div>
    </footer>
  );
}
