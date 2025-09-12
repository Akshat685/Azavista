import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import type { Navbar as NavbarType, Media } from "@/payload-types";

type MenuItem = {
  title: string;
  description?: string;
  link?: string;
  icon?: Media | number;
};

type PlatformDoc = {
  category: string;
  items: MenuItem[];
  highlight?: {
    title?: string;
    description?: string;
    link?: string;
    image?: Media | number;
  };
  order?: number;
  createdAt?: string;
};
type ResourcesDoc = { category: string; items: MenuItem[]; order?: number; createdAt?: string };
type SolutionsDoc = {
  category: string;
  items: MenuItem[];
  highlight?: {
    title?: string;
    description?: string;
    link?: string;
    image?: Media | number;
  };
  order?: number;
  createdAt?: string;
};

const mediaUrl = (img?: Media | number | null) => {
  if (!img || typeof img === "number") return "";
  return img.cloudinary?.secure_url || img.thumbnailURL || img.url || "";
};

export default async function Navbar() {
  try {
    const payload = await getPayload({ config: configPromise });
    // Fetch single navbar with embedded menus
    const data = await payload.find({ collection: "navbar", depth: 2, limit: 1 });
    const navbar: NavbarType | undefined = data.docs?.[0];
    // Sort by optional custom order, then createdAt for stability
    const sortByOrder = <T extends { order?: number; createdAt?: string }>(arr: T[]): T[] => {
      return [...arr].sort((a, b) => {
        const byOrder = (a.order ?? 0) - (b.order ?? 0);
        if (byOrder !== 0) return byOrder;
        return (a.createdAt ?? "").localeCompare(b.createdAt ?? "");
      });
    };

    // Flexible menu items from admin (authoritative)
    const menuItems = ((navbar as unknown as any)?.menuItems as any[]) || [];
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
      <nav className="sticky top-0 bg-[#f1f4f9] z-50 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={logoAlt}
                  width={logoWidth}
                  height={logoHeight}
                  className="h-8 w-auto"
                  priority
                />
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                  <span className="text-gray-900 font-bold text-lg">AZAVISTA</span>
                  <span className="text-xs text-gray-500 font-medium">EVENT TECHNOLOGY</span>
                </div>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Dynamic menu items from Admin if present */}
              {menuItems.length > 0 ? (
                <>
                  {menuItems.map((mi, i) => {
                    const blockType = mi?.blockType || mi?.blockType_ || mi?._blockType || mi?.blockTypeSlug;
                    if (blockType === 'link') {
                      return (
                        <Link key={mi.id || i} href={mi.url || '#'} className="text-gray-600 hover:text-gray-900 text-sm font-medium py-4 border-b-2 border-transparent hover:border-blue-600 transition-all duration-200">
                          {mi.label}
                        </Link>
                      );
                    }
                    if (blockType === 'megaMenu') {
                      const cols = sortByOrder((mi.columns || []) as any[]);
                      const hl = mi.highlight;
                      return (
                        <div key={mi.id || i} className="relative group">
                          <button className="text-gray-600 hover:text-blue-600 text-sm font-medium py-4 border-b-2 border-transparent group-hover:border-blue-600 transition-all duration-200">
                            {mi.label}
                          </button>
                          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 fixed left-0 right-0 top-16 bg-white w-screen pointer-events-none z-50">
                            <div className="pointer-events-auto p-8">
                              <div className="flex gap-8">
                                {/* Left highlight section */}
                                {hl && (hl.title || hl.description || hl.image) && (
                                  <div className="w-80 flex-shrink-0">
                                    <div className="bg-gray-50 rounded-lg p-6">
                                      {(() => {
                                        const img = mediaUrl(hl.image as any);
                                        return (
                                          <>
                                            {img && (
                                              <div className="mb-4">
                                                <Image src={img} alt={hl.title || ''} width={320} height={180} className="rounded-lg w-full h-40 object-cover" />
                                              </div>
                                            )}
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">{hl.title}</h3>
                                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{hl.description}</p>
                                            {hl.link && (
                                              <Link href={hl.link} className="text-blue-600 text-sm font-medium hover:text-blue-700">Contact Sales &gt;</Link>
                                            )}
                                          </>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                )}
                                {/* Right columns */}
                                <div className="flex-1 grid grid-cols-4 gap-8">
                                  {cols.slice(0, 4).map((doc: any, j: number) => (
                                    <div key={j}>
                                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{doc.category}</h4>
                                      <ul className="space-y-3">
                                        {(doc.items || []).map((item: any, k: number) => (
                                          <li key={k} className="flex items-start space-x-3">
                                            {item.icon && (
                                              <Image src={mediaUrl(item.icon as any)} alt="" width={20} height={20} className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                            )}
                                            <div>
                                              <Link href={item.link || '#'} className="text-sm font-semibold text-gray-900 hover:text-blue-600 block">{item.title}</Link>
                                              {item.description && <p className="text-xs text-gray-500 mt-1">{item.description}</p>}
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </>
              ) : (
                <></>
              )}
              {/* Legacy fallback removed: menus are 100% driven by menuItems */}
            </div>

            {/* CTA Button */}
            {navbar?.ctaLabel && (
              <div>
                <Link
                  href={navbar.ctaUrl || "#"}
                  className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-600 hover:text-white transition-all duration-200"
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