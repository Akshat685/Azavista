"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { SerializedEditorState } from "lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";


interface CloudinaryImage {
  cloudinary?: {
    secure_url?: string;
    width?: number;
    height?: number;
  };
  url?: string;
  thumbnailURL?: string;
  alt?: string;
}

interface Tab {
  tabLabel: string;
  heading: string;
  description: SerializedEditorState; 
  image: CloudinaryImage;
}

interface TabsData {
  tabs: Tab[];
  buttonLabel?: string;
  buttonUrl?: string;
}

export default function TabsSection() {
  const [data, setData] = useState<TabsData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchTabs() {
      const res = await fetch("/api/event-features");
      const json = await res.json();
      setData(json.docs?.[0] as TabsData);
    }
    fetchTabs();
  }, []);

  if (!data || !data.tabs || data.tabs.length === 0) return null;

  const activeTab = data.tabs[activeIndex];
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
          {data.tabs.map((tab, index) => (
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
              <div className="prose prose-lg text-lg prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-gray-600 text-gray-600 mb-10 leading-relaxed max-w-none">
                <RichText data={activeTab.description} />
              </div>
            )}

            {data.buttonLabel && data.buttonUrl && (
              <a
                href={data.buttonUrl}
                className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-lg"
              >
                {data.buttonLabel}
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
