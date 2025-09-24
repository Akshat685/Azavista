"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number; // 1 for h1, 2 for h2, etc.
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function TableOfContents({ containerSelector = "#article-content", headingsSelector = "h1, h2, h3", maxHeightClass = "max-h-[calc(100vh-6rem)]" }: { containerSelector?: string; headingsSelector?: string; maxHeightClass?: string; }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.querySelector(containerSelector) as HTMLElement | null;
    if (!container) return;

    const nodes = Array.from(container.querySelectorAll(headingsSelector)) as HTMLElement[];

    const collected: Heading[] = nodes.map((node) => {
      // ensure each heading has an id
      if (!node.id) {
        const generated = slugify(node.innerText || node.textContent || "");
        // avoid empty ids
        node.id = generated || `heading-${Math.random().toString(36).slice(2, 8)}`;
      }
      const level = Number(node.tagName.replace("H", ""));
      return { id: node.id, text: node.innerText || node.textContent || "", level };
    });

    setHeadings(collected);

    // Observe headings for active highlight
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        // pick the closest heading in view
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));

        if (visible.length > 0) {
          setActiveId((visible[0].target as HTMLElement).id);
        } else {
          // fall back to the last heading above viewport
          const past = entries
            .filter((e) => e.boundingClientRect.top < 0)
            .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
          if (past.length > 0) setActiveId((past[past.length - 1].target as HTMLElement).id);
        }
      },
      {
        rootMargin: "0px 0px -65% 0px",
        threshold: [0, 1.0],
      }
    );

    nodes.forEach((n) => observer.observe(n));
    observerRef.current = observer;

    // cleanup
    return () => {
      observer.disconnect();
    };
  }, [containerSelector, headingsSelector]);

  // Keep active item visible within the TOC panel
  useEffect(() => {
    if (!activeId) return;
    const nav = navRef.current;
    const link = nav?.querySelector(`a[href="#${CSS.escape(activeId)}"]`) as HTMLAnchorElement | null;
    if (link && nav) {
      // only adjust if out of view
      const linkRect = link.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
        link.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
      }
    }
  }, [activeId]);

  const items = useMemo(() => headings, [headings]);

  if (items.length === 0) return null;

  return (
    <nav ref={navRef} className={`sticky top-24 ${maxHeightClass} overflow-auto pr-4`}>
      <div className="text-sm font-semibold text-gray-900 mb-3">TABLE OF CONTENTS</div>
      <ul className="space-y-3 lg:space-y-4 text-sm">
        {items.map((h) => (
          <li key={h.id} className={h.level === 1 ? "" : h.level === 2 ? "ml-3" : "ml-6"}>
            <a
              href={`#${h.id}`}
              className={
                activeId === h.id
                  ? "text-gray-900 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }
              aria-current={activeId === h.id ? "true" : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
