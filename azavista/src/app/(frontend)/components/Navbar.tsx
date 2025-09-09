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

    // Fetch navbar + mega menu collections
    const [data, platformRes, resourcesRes, solutionsRes] = await Promise.all([
      payload.find({ collection: "navbar", depth: 2, limit: 1 }),
      payload.find({ collection: "platformMenu" as any, depth: 2, limit: 100, sort: "createdAt" }),
      payload.find({ collection: "resourcesMenu" as any, depth: 2, limit: 100, sort: "createdAt" }),
      payload.find({ collection: "solutionsMenu" as any, depth: 2, limit: 100, sort: "createdAt" }),
    ]);

    const navbar: NavbarType | undefined = data.docs?.[0];
    // Sort by optional custom order, then createdAt for stability
    const sortByOrder = <T extends { order?: number; createdAt?: string }>(arr: T[]): T[] => {
      return [...arr].sort((a, b) => {
        const byOrder = (a.order ?? 0) - (b.order ?? 0);
        if (byOrder !== 0) return byOrder;
        return (a.createdAt ?? "").localeCompare(b.createdAt ?? "");
      });
    };

    const platformDocs = sortByOrder(platformRes.docs as unknown as PlatformDoc[]);
    const resourcesDocs = sortByOrder(resourcesRes.docs as unknown as ResourcesDoc[]);
    const solutionsDocs = sortByOrder(solutionsRes.docs as unknown as SolutionsDoc[]);
    const hasHighlight = (d: SolutionsDoc) =>
      Boolean(d.highlight && (d.highlight.title || d.highlight.description || d.highlight.image));
    const solutionsHighlight = solutionsDocs.find(hasHighlight);
    const solutionsColumns = solutionsDocs.filter((d) => !hasHighlight(d));
    const hasPlatformHighlight = (d: PlatformDoc) =>
      Boolean(d.highlight && (d.highlight.title || d.highlight.description || d.highlight.image));
    const platformHighlight = platformDocs.find(hasPlatformHighlight);
    const platformColumns = platformDocs.filter((d) => !hasPlatformHighlight(d));
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
              {/* Platform */}
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 text-sm font-medium py-4 border-b-2 border-transparent group-hover:border-blue-600  transition-all duration-200">
                  Platform
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 fixed left-0 right-0 top-16 bg-white  w-screen pointer-events-none z-50">
                  <div className="pointer-events-auto p-8">
                    <div className="flex gap-8">
                      {/* Left highlight section */}
                      {platformHighlight?.highlight && (
                        <div className="w-80 flex-shrink-0">
                          <div className="bg-gray-50 rounded-lg p-6">
                            {(() => {
                              const hl = platformHighlight.highlight;
                              const img = mediaUrl(hl?.image as Media | number | undefined);
                              return (
                                <>
                                  {img && (
                                    <div className="mb-4">
                                      <Image
                                        src={img}
                                        alt={hl?.title || ""}
                                        width={320}
                                        height={180}
                                        className="rounded-lg w-full h-40 object-cover"
                                      />
                                    </div>
                                  )}
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {hl?.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                    {hl?.description}
                                  </p>
                                  {hl?.link && (
                                    <Link
                                      href={hl.link}
                                      className="text-blue-600 text-sm font-medium hover:text-blue-700"
                                    >
                                      Contact Sales &gt;
                                    </Link>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      )}

                      {/* Right columns */}
                      <div className="flex-1 grid grid-cols-4 gap-8">
                        {platformColumns.slice(0, 4).map((doc, i) => (
                          <div key={i}>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                              {doc.category}
                            </h4>
                            <ul className="space-y-3">
                              {doc.items?.map((item, idx) => (
                                <li key={idx} className="flex items-start space-x-3">
                                  {item.icon && (
                                    <Image
                                      src={mediaUrl(item.icon)}
                                      alt=""
                                      width={20}
                                      height={20}
                                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                                    />
                                  )}
                                  <div>
                                    <Link
                                      href={item.link || "#"}
                                      className="text-sm font-semibold text-gray-900 hover:text-blue-600 block"
                                    >
                                      {item.title}
                                    </Link>
                                    {item.description && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        {item.description}
                                      </p>
                                    )}
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

              {/* Solutions */}
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 text-sm font-medium py-4 border-b-2 border-transparent group-hover:border-blue-600 transition-all duration-200">
                  Solutions
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 fixed left-0 right-0 top-16 bg-white w-screen pointer-events-none z-50">
                  <div className="pointer-events-auto p-8">
                    <div className="flex gap-8">
                      {/* Left highlight section */}
                      {solutionsHighlight?.highlight && (
                        <div className="w-80 flex-shrink-0">
                          <div className="bg-gray-50 rounded-lg p-6">
                            {(() => {
                              const hl = solutionsHighlight.highlight;
                              const img = mediaUrl(hl?.image as Media | number | undefined);
                              return (
                                <>
                                  {img && (
                                    <div className="mb-4">
                                      <Image
                                        src={img}
                                        alt={hl?.title || ""}
                                        width={320}
                                        height={180}
                                        className="rounded-lg w-full h-40 object-cover"
                                      />
                                    </div>
                                  )}
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {hl?.title}
                                  </h3>
                                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                    {hl?.description}
                                  </p>
                                  {hl?.link && (
                                    <Link
                                      href={hl.link}
                                      className="text-blue-600 text-sm font-medium hover:text-blue-700"
                                    >
                                      Contact Sales &gt;
                                    </Link>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      )}

                      {/* Right columns - 4 columns for solutions */}
                      <div className="flex-1 grid grid-cols-4 gap-8">
                        {solutionsColumns.slice(0, 4).map((doc, i) => (
                          <div key={i}>
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                              {doc.category}
                            </h4>
                            <ul className="space-y-3">
                              {doc.items?.map((item, idx) => (
                                <li key={idx} className="flex items-start space-x-3">
                                  {item.icon && (
                                    <Image
                                      src={mediaUrl(item.icon)}
                                      alt=""
                                      width={20}
                                      height={20}
                                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                                    />
                                  )}
                                  <div>
                                    <Link
                                      href={item.link || "#"}
                                      className="text-sm font-semibold text-gray-900 hover:text-blue-600 block"
                                    >
                                      {item.title}
                                    </Link>
                                    {item.description && (
                                      <p className="text-xs text-gray-500 mt-1">
                                        {item.description}
                                      </p>
                                    )}
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

              {/* Resources */}
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 text-sm font-medium py-4 border-b-2 border-transparent group-hover:border-blue-600 transition-all duration-200">
                  Resources
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 fixed left-0 right-0 top-16 bg-white shadow-2xl rounded-lg w-screen pointer-events-none z-50">
                  <div className="pointer-events-auto p-8">
                    <div className="grid grid-cols-2 gap-8">
                      {resourcesDocs.map((doc, i) => (
                        <div key={i}>
                          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            {doc.category}
                          </h4>
                          <ul className="space-y-3">
                            {doc.items?.map((item, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                {item.icon && (
                                  <Image
                                    src={mediaUrl(item.icon)}
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                                  />
                                )}
                                <div>
                                  <Link
                                    href={item.link || "#"}
                                    className="text-sm font-semibold text-gray-900 hover:text-blue-600 block"
                                  >
                                    {item.title}
                                  </Link>
                                  {item.description && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      {item.description}
                                    </p>
                                  )}
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

              {/* Other navbar links */}
              {navbar?.links
                ?.filter((l) => !["Platform", "Solutions", "Resources"].includes(l.label))
                .map((link, index) => (
                  <Link
                    key={link.id || index}
                    href={link.url}
                    className="text-gray-600 hover:text-gray-900 text-sm font-medium py-4 border-b-2 border-transparent hover:border-blue-600 transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
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