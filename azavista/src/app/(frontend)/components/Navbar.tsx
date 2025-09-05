import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import type { Navbar as NavbarType, Media } from "@/payload-types";

export default async function Navbar() {
  try {
    const payload = await getPayload({ config: configPromise });

    // Fetch from Payload directly
    const data = await payload.find({
      collection: "navbar",
      depth: 2,
      limit: 1,
    });

    const navbar: NavbarType | undefined = data.docs?.[0];
    const logo = navbar?.logo as Media | number | undefined;

    let logoUrl: string | null = null;
    let logoAlt = "Logo";
    let logoWidth = 80;
    let logoHeight = 40;

    if (logo && typeof logo === "object") {
      // Cloudinary plugin typically adds `cloudinary.secure_url`
      if (logo.cloudinary?.secure_url) {
        logoUrl = logo.cloudinary.secure_url || null;
        logoWidth = logo.cloudinary.width || logo.width || 120;
        logoHeight = logo.cloudinary.height || logo.height || 40;
      } else if (logo.thumbnailURL) {
        logoUrl = logo.thumbnailURL || null;
        logoWidth = logo.width || 120;
        logoHeight = logo.height || 40;
      }
      logoAlt = logo.alt || "Logo";
    }

    return (
      <nav className="sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
          <div className="flex items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className="h-8 w-auto sm:h-10"
                  priority
                />
              ) : (
                <span className="text-gray-500 font-bold text-sm sm:text-base">
                  No Logo
                </span>
              )}
            </div>

            {/* Desktop Links */}
            <div className="hidden ml-10 md:flex flex-grow items-center">
              <div className="flex items-baseline space-x-4 lg:space-x-8">
                {navbar?.links?.map((link, index) => (
                  <Link
                    key={link.id || index}
                    href={link.url}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 hover:bg-gray-50 rounded-md"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop CTA */}
            {navbar?.ctaLabel && (
              <div className="hidden md:block">
                <Link
                  href={navbar.ctaUrl || "#"}
                  className="px-4 py-6 lg:px-6 lg:py-2 border border-blue-600 text-blue-600 text-sm lg:text-base rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200 font-medium"
                >
                  {navbar.ctaLabel}
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  } catch (err) {
    console.error("Error loading navbar:", err);
    return (
      <div className="p-4 bg-red-100 text-red-600">Navbar crashed</div>
    );
  }
}
