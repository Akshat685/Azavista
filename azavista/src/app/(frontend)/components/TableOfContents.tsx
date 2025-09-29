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

    // ensure unique ids for duplicate headings
    const usedIds = new Set<string>();
    const collected: Heading[] = nodes.map((node) => {
      const text = node.innerText || node.textContent || "";
      let id = node.id;
      if (!id) {
        const base = slugify(text) || `heading-${Math.random().toString(36).slice(2, 8)}`;
        id = base;
        let i = 2;
        while (usedIds.has(id)) id = `${base}-${i++}`;
        node.id = id;
      } else if (usedIds.has(id)) {
        let i = 2;
        let candidate = `${id}-${i}`;
        while (usedIds.has(candidate)) candidate = `${id}-${++i}`;
        id = candidate;
        node.id = id;
      }
      usedIds.add(id);
      const level = Number(node.tagName.replace("H", ""));
      return { id, text, level };
    });

    setHeadings(collected);

    // stable active detection using scroll position
    function updateActive() {
      const offset = 120;
      let current = collected[0]?.id || "";
      for (const h of collected) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = h.id; else break;
      }
      if (current) setActiveId(current);
    }

    updateActive();
    const onScroll = () => requestAnimationFrame(updateActive);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
