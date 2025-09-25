"use client";

import type { HeadingBlock } from "../types";

export default function Heading({ heading }: HeadingBlock) {
  return (
    <section className={`bg-[#215EF4] text-white w-full`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className={`text-center py-25`}>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">{heading}</h2>
        </div>
      </div>
    </section>
  );
}


