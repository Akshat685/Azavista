import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import configPromise from "@payload-config";

import type { Navbar as NavbarType, Media as PayloadMedia } from "@/payload-types";
import type { MegaMenuBlock, MegaMenuColumn, MegaMenuItem, Media as FrontendMedia } from "../types";


const mediaUrl = (img?: PayloadMedia | FrontendMedia | number | null) => {
  if (!img || typeof img === "number") return "";
  return img.cloudinary?.secure_url || img.thumbnailURL || img.url || "";
};

// Normalize CMS-provided links to absolute paths.
// - Full URLs (http/https) and absolute paths (starting with /) are returned as-is
// - Relative paths like "blog" or "blog/slug" become "/blog" or "/blog/slug"
function normalizeNavLink(link?: string | null): string {
  if (!link) return "#";
  const raw = link.trim();
  if (raw.startsWith("http") || raw.startsWith("/")) return raw;
  const trimmed = raw.replace(/^\/+|\/+$/g, "");
  return `/${trimmed}`;
}

export default async function Navbar() {
  try {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.find({ collection: "navbar", depth: 2, limit: 1 });
    const navbar: NavbarType | undefined = data.docs?.[0];
    const sortByOrder = <T extends { order?: number; createdAt?: string }>(arr: T[]): T[] => {
      return [...arr].sort((a, b) => {
        const byOrder = (a.order ?? 0) - (b.order ?? 0);
        if (byOrder !== 0) return byOrder;
        return (a.createdAt ?? "").localeCompare(b.createdAt ?? "");
      });
    };

    const menuItems: MegaMenuBlock[] = (
      (navbar as unknown as { menuItems?: MegaMenuBlock[] } | undefined)?.menuItems
    ) || [];
    const logo = navbar?.logo as PayloadMedia | number | undefined;

    let logoUrl: string | null = null;
    let logoAlt = "Logo";
    let logoWidth = 80;
    let logoHeight = 40;

    if (logo && typeof logo === "object") {
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
          <div className="flex items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 mr-8">
              <Link href={navbar?.logoUrl || "/"}>
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
              </Link>
            </div>


            {/* Mobile menu (hamburger) */}
            <div className="md:hidden ml-auto">
              <details className="relative">
                <summary className="list-none inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <span className="sr-only">Open menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </summary>
                <div className="fixed inset-x-0 top-16 bottom-0 bg-white border-t border-gray-200 overflow-y-auto px-6 py-6 z-50">
                  <nav className="max-w-3xl mx-auto">
                    <ul className="space-y-6">
                      {menuItems.map((mi, i) => {
                        const blockType = mi?.blockType || mi?.blockType_ || mi?._blockType || mi?.blockTypeSlug;
                        if (blockType !== 'megaMenu') return null;
                        const cols = (mi.columns || []);
                        const hl = mi.highlight;
                        return (
                          <li key={mi.id || i} className="border-b last:border-b-0 border-gray-200 py-3">
                            <input id={`mob-acc-${i}`} type="checkbox" data-acc="mobile" className="peer sr-only" />
                            <label htmlFor={`mob-acc-${i}`} className="flex items-center justify-between py-2 cursor-pointer select-none">
                              <span className="text-gray-900 font-semibold text-lg">{mi.label}</span>
                              <svg className="w-5 h-5 text-gray-500 transition-transform duration-500 ease-in-out peer-checked:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </label>
                            <div className="max-h-0 overflow-hidden transition-all duration-500 ease-in-out peer-checked:max-h-[1000px]">
                              {hl && (hl.title) && (
                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                  <div className="text-sm font-bold text-gray-900">{hl.title}</div>
                                </div>
                              )}
                              <div className="grid grid-cols-1 gap-5 pb-3">
                                {cols.map((doc, j) => (
                                  <div key={j}>
                                    {doc.category && <div className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">{doc.category}</div>}
                                    <ul className="space-y-3">
                                      {(doc.items || []).map((item, k) => (
                                        <li key={k}>
                                          <a href={normalizeNavLink(item.link)} className="block text-base text-blue-800 font-medium hover:text-blue-600 focus:text-blue-600 active:text-blue-600 transition-colors duration-150 py-1.5">
                                            {item.title}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                  <script dangerouslySetInnerHTML={{
                    __html: `
                  (function(){
                    try {
                      const items = Array.from(document.querySelectorAll('input[type="checkbox"][data-acc="mobile"]'));
                      items.forEach((cb) => {
                        cb.addEventListener('change', () => {
                          if (cb.checked) {
                            items.forEach(other => { if (other !== cb) other.checked = false; });
                          }
                        });
                      });
                    } catch (e) {}
                  })();
                `}} />
                </div>
              </details>
            </div>
            {/* Menu Items - starts from left after logo */}
            <div className="hidden md:flex items-center space-x-8 flex-1">
              {/* Dynamic menu items from Admin if present */}
              {menuItems.length > 0 ? (
                <>
                  {menuItems.map((mi, i) => {
                    const blockType = mi?.blockType || mi?.blockType_ || mi?._blockType || mi?.blockTypeSlug;
                    if (blockType === 'megaMenu') {
                      const cols = sortByOrder(mi.columns || []);
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
                                    <div className="bg-gray-100 rounded-lg p-6">
                                      {(() => {
                                        const img = mediaUrl(hl.image);
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
                                              <Link href={normalizeNavLink(hl.link)} className="text-blue-600 text-sm font-medium hover:text-blue-700">{hl.linkText || "Contact Sales"} &gt;</Link>
                                            )}
                                          </>
                                        );
                                      })()}
                                    </div>
                                  </div>
                                )}
                                {/* Right columns */}
                                <div className="flex-1 grid grid-cols-4 gap-8">
                                  {cols.slice(0, 4).map((doc: MegaMenuColumn, j: number) => (
                                    <div key={j}>
                                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{doc.category}</h4>
                                      <ul className="space-y-5">
                                        {(doc.items || []).map((item: MegaMenuItem, k: number) => (
                                          <li key={k} className="flex items-start space-x-3">
                                            {item.icon && (
                                              <Image src={mediaUrl(item.icon)} alt="" width={20} height={20} className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                            )}
                                            <div>
                                              <Link href={normalizeNavLink(item.link)} className="text-sm font-semibold text-gray-900 hover:text-blue-600 block">{item.title}</Link>
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
            </div>

            {/* CTA Button - pushed to the right */}
            {navbar?.ctaLabel && (
              <div className="ml-auto hidden md:block">
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