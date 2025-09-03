import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/navbar?depth=2`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            console.error("Failed to fetch navbar:", res.statusText);
            return <div className="p-4 bg-red-100 text-red-600">Navbar failed to load</div>;
        }

        const data = await res.json();
        const navbar = data.docs?.[0];
        const logo = navbar?.logo;

        // Get the correct Cloudinary URL
        let logoUrl = null;
        let logoAlt = "Logo";
        let logoWidth = 80;
        let logoHeight = 40;

        if (logo && typeof logo === "object") {
            if (logo.cloudinary?.secure_url) {
                logoUrl = logo.cloudinary.secure_url;
                logoWidth = logo.cloudinary.width || logo.width || 120;
                logoHeight = logo.cloudinary.height || logo.height || 40;
            }
            else if (logo.thumbnailURL) {
                logoUrl = logo.thumbnailURL;
                logoWidth = logo.width || 120;
                logoHeight = logo.height || 40;
            }
            logoAlt = logo.alt || "Logo";
        }

        return (
            <nav className="sticky top-0 bg-white z-50">
                {/* Mobile and Desktop Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
                    <div className="flex items-center h-16">
                        {/* Logo Section */}
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
                                <span className="text-gray-500 font-bold text-sm sm:text-base">No Logo</span>
                            )}
                        </div>

                        {/* Desktop Navigation Links */}
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

                        {/* Desktop CTA Button */}
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

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <label htmlFor="mobile-menu-toggle" className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 cursor-pointer">
                                <span className="sr-only">Open main menu</span>
                                {/* Hamburger icon */}
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" className="block peer-checked:hidden" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" className="hidden peer-checked:block" />
                                </svg>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <input type="checkbox" id="mobile-menu-toggle" className="hidden peer" />
                <div className="hidden peer-checked:block md:hidden bg-white border-t border-gray-200">
                    <div className="px-8 pt-4 pb-6 space-y-4">
                        {navbar?.links?.map((link, index) => (
                            <Link
                                key={link.id || index}
                                href={link.url}
                                className="text-[#1a1a1a] hover:text-blue-600 block py-3 text-[15px] font-medium transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {/* Mobile CTA Button */}
                        {navbar?.ctaLabel && (
                            <div className="pt-4">
                                <Link
                                    href={navbar.ctaUrl || "#"}
                                    className="w-full inline-flex items-center justify-center px-[24px] py-[12px] bg-[#4F46E5] text-white text-[15px] font-medium rounded-[24px] hover:bg-[#4338CA] transition-all duration-200"
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
        return <div className="p-4 bg-red-100 text-red-600">Navbar crashed</div>;
    }
}