"use client";

import { useState } from "react";
import Image from "next/image";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { TabsSectionData } from "../types";


export default function TabsSection(props: TabsSectionData) {
  const { tabs, buttonLabel, buttonUrl } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  if (!tabs || tabs.length === 0) return null;

  const activeTab = tabs[activeIndex];
  const imageUrl =
    activeTab.image?.cloudinary?.secure_url ||
    activeTab.image?.url ||
    activeTab.image?.thumbnailURL ||
    "";
  const imgWidth = activeTab.image?.cloudinary?.width || 500;
  const imgHeight = activeTab.image?.cloudinary?.height || 400;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-15 border-b border-gray-200 pb-4 mb-10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`pb-3 text-lg font-semibold tracking-wide transition-all duration-300 ${
                activeIndex === index
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              {tab.tabLabel}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Text Section */}
          <div>
            {activeTab.heading && (
              <h6 className="text-2xl text-gray-900 mb-6 leading-snug">
                {activeTab.heading}
              </h6>
            )}

            {activeTab.description && (
              <div className="text-lg text-gray-600 mb-10 leading-relaxed max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_li::marker]:text-[#1e61f0]">
                <RichText data={activeTab.description} />
              </div>
            )}

            {buttonLabel && buttonUrl && (
              <a
                href={buttonUrl}
                className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                {buttonLabel}
              </a>
            )}
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={activeTab.image?.alt || activeTab.heading || "Tab image"}
                width={imgWidth}
                height={imgHeight}
                className="object-cover w-full max-w-lg"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}