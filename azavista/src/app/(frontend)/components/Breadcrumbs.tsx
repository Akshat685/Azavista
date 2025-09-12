"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function toTitle(segment: string) {
  return segment.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname) return null;

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return null; // homepage → no breadcrumbs, no spacing

  const crumbs = [
    { href: "/", label: "Home" },
    ...parts.map((part, idx) => ({
      href: "/" + parts.slice(0, idx + 1).join("/"),
      label: toTitle(part),
    })),
  ];

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 mt-10   ">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          {crumbs.map((c, i) => (
            <li key={c.href} className="flex items-center gap-2">
              {i < crumbs.length - 1 ? (
                <Link href={c.href} className="hover:text-gray-700">{c.label}</Link>
              ) : (
                <span className="text-gray-800 font-medium">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span className="text-gray-400">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}


