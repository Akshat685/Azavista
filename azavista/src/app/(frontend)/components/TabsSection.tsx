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
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Buttons */}
        <div className="overflow-x-auto">
          <div className="flex flex-nowrap sm:flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 border-b border-gray-200 pb-4 mb-6 sm:mb-8 md:mb-10 min-w-max sm:min-w-0">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`pb-2 sm:pb-3 px-2 sm:px-4 text-sm sm:text-base md:text-lg font-semibold tracking-wide transition-all cursor-pointer hover:text-black duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeIndex === index
                    ? "text-black-600 border-b-2 sm:border-b-4 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-center">
          {/* Text Section */}
          <div className="order-2 lg:order-1">
            {activeTab.heading && (
              <h6 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-900 mb-4 sm:mb-6 leading-tight sm:leading-snug">
                {activeTab.heading}
              </h6>
            )}

            {activeTab.description && (
              <div className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-10 leading-relaxed max-w-none [&_ul]:list-disc [&_ul]:pl-4 sm:[&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-4 sm:[&_ol]:pl-6 [&_li]:mb-1 [&_li::marker]:text-[#1e61f0]">
                <RichText data={activeTab.description} />
              </div>
            )}

            {buttonLabel && buttonUrl && (
              <a
                href={buttonUrl}
                className="block w-full sm:inline-block sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold text-base sm:text-lg rounded-full hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-center"
              >
                {buttonLabel}
              </a>
            )}
          </div>

          {/* Image Section */}
          <div className="flex justify-center order-1 lg:order-2">
            {imageUrl && (
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <Image
                  src={imageUrl}
                  alt={activeTab.image?.alt || activeTab.heading || "Tab image"}
                  width={imgWidth}
                  height={imgHeight}
                  className="object-cover w-full h-auto shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
