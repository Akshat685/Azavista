"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { CaseStudiesGridBlock, CaseStudyGridItem, Media, CloudinaryImage } from "../types"

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

function normalize(v?: string | null): string {
  return (v || "").trim()
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
      aria-hidden="true"
    >
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
    </svg>
  )
}



export default function CaseStudiesGrid(props: CaseStudiesGridBlock) {
  const {
    items = [],
    industriesLabel = "All Industries",
    regionsLabel = "All Regions",
    solutionsLabel = "All Solutions",
    resetLabel = "Reset",
    showIndustries = true,
    showRegions = true,
    showSolutions = true,
    industries = [],
    regions = [],
    solutions = [],
  } = props

  const [industry, setIndustry] = useState<string>("all")
  const [region, setRegion] = useState<string>("all")
  const [solution, setSolution] = useState<string>("all")

  const availableIndustries = useMemo(() => {
    if (industries.length) return industries.map((i) => (i.label || '').trim()).filter(Boolean)
    const set = new Set<string>()
    items.forEach((it) => it.industry && set.add(it.industry))
    return Array.from(set)
  }, [items, industries])

  const availableRegions = useMemo(() => {
    if (regions.length) return regions.map((r) => (r.label || '').trim()).filter(Boolean)
    const set = new Set<string>()
    items.forEach((it) => it.region && set.add(it.region))
    return Array.from(set)
  }, [items, regions])

  const availableSolutions = useMemo(() => {
    if (solutions.length) return solutions.map((s) => (s.label || '').trim()).filter(Boolean)
    const set = new Set<string>()
    items.forEach((it) => it.solution && set.add(it.solution))
    return Array.from(set)
  }, [items, solutions])

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const byIndustry = industry === "all" || normalize(it.industry).toLowerCase() === industry
      const byRegion = region === "all" || normalize(it.region).toLowerCase() === region
      const bySolution = solution === "all" || normalize(it.solution).toLowerCase() === solution
      return byIndustry && byRegion && bySolution
    })
  }, [items, industry, region, solution])

  function resetFilters() {
    setIndustry("all")
    setRegion("all")
    setSolution("all")
  }

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8">
          {showIndustries && (
            <div className="relative">
              <select
                aria-label={industriesLabel}
                className="appearance-none min-w-[200px] h-11 rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm text-gray-700 font-medium shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={industry}
                onChange={(e) => setIndustry(e.target.value.toLowerCase())}
              >
                <option value="all">{industriesLabel}</option>
                {availableIndustries.map((t) => (
                  <option key={t} value={t.toLowerCase()}>
                    {t}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          )}

          {showRegions && (
            <div className="relative">
              <select
                aria-label={regionsLabel}
                className="appearance-none min-w-[190px] h-11 rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm text-gray-700 font-medium shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={region}
                onChange={(e) => setRegion(e.target.value.toLowerCase())}
              >
                <option value="all">{regionsLabel}</option>
                {availableRegions.map((r) => (
                  <option key={r} value={r.toLowerCase()}>
                    {r}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          )}

          {showSolutions && (
            <div className="relative">
              <select
                aria-label={solutionsLabel}
                className="appearance-none min-w-[200px] h-11 rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm text-gray-700 font-medium shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={solution}
                onChange={(e) => setSolution(e.target.value.toLowerCase())}
              >
                <option value="all">{solutionsLabel}</option>
                {availableSolutions.map((s) => (
                  <option key={s} value={s.toLowerCase()}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </div>
          )}

          {(showIndustries || showRegions || showSolutions) && (
            <button
              type="button"
              onClick={resetFilters}
              className="ml-auto md:ml-0 h-11 rounded-xl border border-blue-500 text-blue-600 bg-white px-5 text-sm font-semibold shadow-sm hover:bg-blue-50"
            >
              {resetLabel}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((card: CaseStudyGridItem, idx: number) => {
            const img = getImageUrl(card.mainImage)
            const badge = getImageUrl(card.badgeImage)
            const href = card.link && (card.link.startsWith("http") || card.link.startsWith("/"))
              ? card.link
              : card.link
              ? `/${card.link.replace(/^\/+|\/+$/g, "")}`
              : undefined

            const ArticleInner = (
              <>
                {img && (
                  <div className="relative w-full aspect-[4/3]">
                    <Image src={img} alt={getAlt(card.mainImage) || card.title || "Case study"} fill className="object-cover" />
                    {badge && (
                      <Image
                        src={badge}
                        alt={getAlt(card.badgeImage) || "Badge"}
                        width={70}
                        height={50}
                        className="absolute left-3 top-3 object-contain opacity-80 w-20 h-15 transition-opacity"
                      />
                    )}
                  </div>
                )}
                <div className="p-5">
                  {card.title && (
                    <h3 className="text-[22px] font-semibold leading-snug mb-2">{card.title}</h3>
                  )}
                  {href && (
                    <Link href={href} className="text-blue-600 font-semibold text-sm ">
                      {"Read The Case Study "}
                      {">"}
                    </Link>
                  )}
                </div>
              </>
            )

            return (
              <article key={idx} className="rounded-md overflow-hidden border border-gray-200 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.07)]">
                {href ? (
                  <Link href={href} className="block">{ArticleInner}</Link>
                ) : (
                  ArticleInner
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}


