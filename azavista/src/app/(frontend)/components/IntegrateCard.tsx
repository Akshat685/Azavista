"use client"

import Link from "next/link"
import Image from "next/image"
import type { IntegrateCardBlock, Media, CloudinaryImage } from "../types"

function getImageUrl(image?: CloudinaryImage | number | Media): string {
  if (!image || typeof image === "number") return ""
  const cloud = (image as CloudinaryImage).cloudinary
  if (cloud?.secure_url) return cloud.secure_url || ""
  const media = image as Media
  return media.url || media.thumbnailURL || ""
}

function getAlt(image?: CloudinaryImage | number | Media): string | undefined {
  if (!image || typeof image === "number") return undefined
  const asCloud = image as CloudinaryImage
  if (asCloud.alt) return asCloud.alt
  const asMedia = image as Media
  return asMedia.alt
}

export default function IntegrateCard({ title, items = [] }: IntegrateCardBlock) {
  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 ">
        {title && (
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-semibold mb-8 text-center mt-11">{title}</h1>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 ">
          {items.map((item, idx) => {
            const img = getImageUrl(item.image)
            const href = item.learnMore
            return (
              <article key={idx} className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.07)] h-full flex flex-col">
                {img && (
                  href ? (
                    <Link href={href} className="relative block w-full aspect-[16/10]">
                      <Image src={img} alt={getAlt(item.image) || item.title || "Card image"} fill className="object-cover" />
                    </Link>
                  ) : (
                    <div className="relative w-full aspect-[16/10]">
                      <Image src={img} alt={getAlt(item.image) || item.title || "Card image"} fill className="object-cover" />
                    </div>
                  )
                )}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[20px] font-semibold justify-center leading-snug mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-5">{item.description}</p>
                  )}
                  {href && (
                    <span className="text-blue-600 font-semibold text-sm mt-auto hover:cursor-pointer">{"Learn More >"}</span>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}


