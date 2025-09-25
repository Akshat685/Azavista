"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { EventsGridBlock, EventItem, Media, CloudinaryImage } from "../types"

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

function getEventUrl(link?: string): string | undefined {
  if (!link) return undefined
  if (link.startsWith('http') || link.startsWith('/')) return link
  const clean = link.replace(/^\/+|\/+$/g, '')
  return `/${clean}`
}



export default function EventsGrid(props: EventsGridBlock) {
  const { events = [], eventTypeLabel = "Event Type", regionLabel = "Region", resetLabel = "Reset", eventTypes = [], regionsList = [] } = props

  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [regionFilter, setRegionFilter] = useState<string>("all")

  const normalizeRegion = (input: unknown): string => {
    if (typeof input === "string") return input
    if (input && typeof input === "object" && "value" in (input as Record<string, unknown>)) {
      const v = (input as { value?: unknown }).value
      return typeof v === "string" ? v : ""
    }
    return ""
  }

  const uniqueTypes = useMemo(() => {
    if (eventTypes.length) return eventTypes.map((t) => (t.label || '').trim()).filter(Boolean)
    const set = new Set<string>()
    events.forEach((e) => e.eventType && set.add(e.eventType))
    return Array.from(set)
  }, [events, eventTypes])

  const uniqueRegions = useMemo(() => {
    if (regionsList.length) return regionsList.map((r) => (r.label || '').trim()).filter(Boolean)
    const set = new Set<string>()
    events.forEach((e) => (e.regions || []).forEach((r) => {
      const s = normalizeRegion(r)
      if (s) set.add(s)
    }))
    return Array.from(set)
  }, [events, regionsList])

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesType = typeFilter === "all" || (e.eventType || "").toLowerCase() === typeFilter
      const matchesRegion =
        regionFilter === "all" || (e.regions || []).some((r) => normalizeRegion(r).toLowerCase() === regionFilter)
      return matchesType && matchesRegion
    })
  }, [events, typeFilter, regionFilter])

  function resetFilters() {
    setTypeFilter("all")
    setRegionFilter("all")
  }

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8">
          {/* Event Type select styled like pill with chevron */}
          <div className="relative">
            <select
              aria-label={eventTypeLabel}
              className="appearance-none min-w-[200px] h-11 rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm text-gray-700 font-medium shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value.toLowerCase())}
            >
              <option value="all">{eventTypeLabel}</option>
              {uniqueTypes.map((t) => (
                <option key={t} value={t.toLowerCase()}>
                  {t}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Region select styled similarly */}
          <div className="relative">
            <select
              aria-label={regionLabel}
              className="appearance-none min-w-[190px] h-11 rounded-xl border border-gray-300 bg-white px-4 pr-10 text-sm text-gray-700 font-medium shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value.toLowerCase())}
            >
              <option value="all">{regionLabel}</option>
              {uniqueRegions.map((r) => (
                <option key={r} value={r.toLowerCase()}>
                  {r}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
            </svg>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="ml-auto md:ml-0 h-11 rounded-xl border border-blue-500 text-blue-600 bg-white px-5 text-sm font-semibold shadow-sm hover:bg-blue-50"
          >
            {resetLabel}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((ev: EventItem, idx: number) => {
            const img = getImageUrl(ev.image)
            const typeBadge = ev.eventType
            const regions = (ev.regions || []).map((r) => normalizeRegion(r)).filter(Boolean)
            const href = getEventUrl(ev.link)

            return (
              <article key={idx} className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.07)]">
                {img && (
                  href ? (
                    <Link href={href} className="relative block w-full aspect-[16/10]">
                      <Image src={img} alt={getAlt(ev.image) || ev.title || "Event image"} fill className="object-cover" />
                    </Link>
                  ) : (
                    <div className="relative w-full aspect-[16/10]">
                      <Image src={img} alt={getAlt(ev.image) || ev.title || "Event image"} fill className="object-cover" />
                    </div>
                  )
                )}

                <div className="p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium mb-3">
                    {regions.map((r, i) => (
                      <span key={i} className="rounded-full bg-gray-100 text-gray-700 px-3 py-1">
                        {r}
                      </span>
                    ))}
                    {typeBadge && (
                      <span className="rounded-full bg-gray-100 text-gray-700 px-3 py-1">{typeBadge}</span>
                    )}
                  </div>

                  {href ? (
                    <Link href={href} className="text-[22px] font-semibold leading-snug mb-2 hover:underline">
                      {ev.title}
                    </Link>
                  ) : (
                    <h3 className="text-[22px] font-semibold leading-snug mb-2">{ev.title}</h3>
                  )}
                  {ev.date && (
                    <div className="text-sm text-gray-600 mb-3">{ev.date}</div>
                  )}
                  {(!ev.date && (ev as any).eventDate) && (
                    <div className="text-sm text-gray-600 mb-3">{new Date((ev as any).eventDate as string).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                  )}
                  {ev.description && (
                    <p className="text-gray-700 leading-relaxed line-clamp-4 mb-4">{ev.description}</p>
                  )}

                  {href && (
                    <Link href={href} className="text-blue-600 font-semibold text-sm hover:underline">
                      {"Learn More "}
                      {">"}
                    </Link>
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


