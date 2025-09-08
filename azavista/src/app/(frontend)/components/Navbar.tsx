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

            {/* Desktop Links + Mega menus */}
            <div className="hidden ml-10 md:flex flex-grow items-center">
              <div className="flex items-baseline space-x-4 lg:space-x-8">
                {/* Platform mega - optional highlight + four columns */}
                <div className="relative group">
                  <span className="cursor-pointer text-gray-700 hover:text-blue-600 px-3 py-2 text-sm lg:text-base font-medium rounded-md">Platform</span>
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition duration-200 fixed left-1/2 -translate-x-1/2 top-16 bg-white shadow-xl rounded-xl p-6 border border-gray-100 w-[calc(100vw-48px)] max-w-[1400px] pointer-events-none z-50">
                    <div className={`pointer-events-auto grid gap-12 ${platformHighlight
                        ? 'grid-cols-[300px,repeat(2,minmax(220px,1fr))] lg:grid-cols-[300px,repeat(3,minmax(220px,1fr))] xl:grid-cols-[300px,repeat(4,minmax(240px,1fr))]'
                        : 'grid-cols-[repeat(2,minmax(220px,1fr))] lg:grid-cols-[repeat(3,minmax(220px,1fr))] xl:grid-cols-[repeat(4,minmax(240px,1fr))]'
                      }`}>
                      {platformHighlight?.highlight && (
                        <div className="bg-gray-50 rounded-xl p-5">
                          {(() => {
                            const hl = platformHighlight.highlight;
                            const img = mediaUrl(hl?.image as Media | number | undefined);
                            return (
                              <div>
                                {img && (
                                  <Image src={img} alt={hl?.title || "Highlight"} width={280} height={180} className="rounded-xl object-cover mb-4" />
                                )}
                                <h4 className="text-lg font-semibold mb-2">{hl?.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{hl?.description}</p>
                                {hl?.link && (
                                  <Link href={hl.link} className="text-blue-600 text-sm font-medium">Contact Sales &gt;</Link>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {platformColumns.map((doc, i) => (
                        <div key={i} className="md:col-span-1">
                          <p className="uppercase text-xs tracking-wider text-gray-500 font-semibold mb-3">{doc.category}</p>
                          <ul className="space-y-4">
                            {doc.items?.map((item, idx) => (
                              <li key={idx} className="flex gap-3">
                                {item.icon && (<Image src={mediaUrl(item.icon)} alt={item.title} width={24} height={24} className="mt-1" />)}
                                <div>
                                  <Link href={item.link || "#"} className="text-sm font-semibold text-gray-900 hover:text-blue-600">{item.title}</Link>
                                  {item.description && (<p className="text-xs text-gray-500 mt-1 max-w-xs">{item.description}</p>)}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Solutions mega with highlight card */}
                <div className="relative group">
                  <span className="cursor-pointer text-gray-700 hover:text-blue-600 px-3 py-2 text-sm lg:text-base font-medium rounded-md">Solutions</span>
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition duration-200 fixed left-1/2 -translate-x-1/2 top-16 bg-white shadow-lg rounded-xl p-5 border border-gray-100 w-[calc(100vw-48px)] max-w-[1600px] pointer-events-none z-50">
                    <div className={`pointer-events-auto grid gap-12 ${solutionsHighlight
                        ? 'grid-cols-[300px,repeat(2,minmax(200px,1fr))] lg:grid-cols-[300px,repeat(4,minmax(220px,1fr))] xl:grid-cols-[300px,repeat(5,minmax(220px,1fr))]'
                        : 'grid-cols-[repeat(2,minmax(200px,1fr))] lg:grid-cols-[repeat(4,minmax(220px,1fr))] xl:grid-cols-[repeat(5,minmax(220px,1fr))]'
                      }`}>
                      {/* Highlight (fixed first column) */}
                      {solutionsHighlight?.highlight && (
                        <div className="bg-gray-50 rounded-xl p-5">
                          {(() => {
                            const hl = solutionsHighlight.highlight;
                            const img = mediaUrl(hl?.image as Media | number | undefined);
                            return (
                              <div>
                                {img && (
                                  <Image src={img} alt={hl?.title || "Highlight"} width={280} height={180} className="rounded-xl object-cover mb-4" />
                                )}
                                <h4 className="text-lg font-semibold mb-2">{hl?.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{hl?.description}</p>
                                {hl?.link && (
                                  <Link href={hl.link} className="text-blue-600 text-sm font-medium">
                                    Contact Sales &gt;
                                  </Link>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      )}

                      {/* Dynamic columns */}
                      {solutionsColumns.map((doc, i) => (
                        <div key={i} className="md:col-span-1">
                          <p className="uppercase text-xs tracking-wider text-gray-500 font-semibold mb-3">{doc.category}</p>
                          <ul className="space-y-4">
                            {doc.items?.map((item, idx) => (
                              <li key={idx} className="flex gap-3">
                                {item.icon && (
                                  <Image src={mediaUrl(item.icon)} alt={item.title} width={24} height={24} className="mt-1" />
                                )}
                                <div>
                                  <Link href={item.link || "#"} className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                                    {item.title}
                                  </Link>
                                  {item.description && (
                                    <p className="text-xs text-gray-500 mt-1 max-w-xs">{item.description}</p>
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

                {/* Resources mega */}
                <div className="relative group">
                  <span className="cursor-pointer text-gray-700 hover:text-blue-600 px-3 py-2 text-sm lg:text-base font-medium rounded-md">Resources</span>
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition duration-200 absolute left-1/2 -translate-x-1/2 top-full bg-white shadow-xl rounded-xl p-6 border border-gray-100 w-[900px] pointer-events-none z-50">
                    <div className="pointer-events-auto grid gap-16 grid-cols-[repeat(2,minmax(380px,1fr))]">
                      {resourcesDocs.map((doc, i) => (
                        <div key={i}>
                          <p className="uppercase text-xs tracking-wider text-gray-500 font-semibold mb-3">{doc.category}</p>
                          <ul className="space-y-4">
                            {doc.items?.map((item, idx) => (
                              <li key={idx} className="flex gap-3">
                                {item.icon && (<Image src={mediaUrl(item.icon)} alt={item.title} width={28} height={28} className="mt-1" />)}
                                <div>
                                  <Link href={item.link || "#"} className="text-sm font-semibold text-gray-900 hover:text-blue-600">{item.title}</Link>
                                  {item.description && (<p className="text-xs text-gray-500 mt-1 max-w-xs">{item.description}</p>)}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Remaining links */}
                {navbar?.links?.filter(l => !["Platform", "Solutions", "Resources"].includes(l.label)).map((link, index) => (
                  <Link key={link.id || index} href={link.url} className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm lg:text-base font-medium transition-colors duration-200 hover:bg-gray-50 rounded-md">{link.label}</Link>
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
