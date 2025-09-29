"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import type { IntegrationsGridBlock, IntegrationItem, Media, CloudinaryImage } from "../types"

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


export default function IntegrationsGrid(props: IntegrationsGridBlock) {
  const {
    integrations = [],
    searchPlaceholder = "Search...",
    filterByLabel = "Filter By",
    clearAllLabel = "Clear All",
    categoriesLabel = "Categories",
    categories = []
  } = props

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const uniqueCategories = useMemo(() => {
    if (categories.length) return categories.map((c) => (c.label || '').trim()).filter(Boolean)
    const set = new Set<string>()
    integrations.forEach((integration) => {
      if (integration.category) {
        set.add(integration.category)
      }
    })
    return Array.from(set)
  }, [integrations, categories])

  const filtered = useMemo(() => {
    return integrations.filter((integration) => {
      const matchesSearch = !searchTerm ||
        integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (integration.description && integration.description.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "all" ||
        (integration.category && integration.category.toLowerCase() === selectedCategory.toLowerCase())

      return matchesSearch && matchesCategory
    })
  }, [integrations, searchTerm, selectedCategory])

  function clearAllFilters() {
    setSearchTerm("")
    setSelectedCategory("all")
  }

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-80 flex-shrink-0 bg-white rounded-lg p-6">
            {/* Search Bar */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 px-4 pr-10 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter By Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">{filterByLabel}</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {clearAllLabel}
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">{categoriesLabel}</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`block w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-100 ${selectedCategory === "all" ? "text-blue-600 font-medium" : "text-gray-600"
                      }`}
                  >
                    All Categories
                  </button>
                  {uniqueCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category.toLowerCase())}
                      className={`block w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-100 ${selectedCategory === category.toLowerCase() ? "text-blue-600 font-medium" : "text-gray-600"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 bg-gray-200 p-6">
            {/* Results Count */}
            <div className="flex justify-end mb-6">
              <span className="text-sm text-gray-600">{`Showing ${filtered.length} results`}</span>
            </div>

            {/* Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {filtered.map((integration: IntegrationItem, idx: number) => {
                const img = getImageUrl(integration.logo)

                return (
                  <div
                    key={idx}
                    className="group relative bg-white rounded-sm border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden min-h-[220px]"
                  >
                    {/* Integration Card */}
                    <div className="p-6 text-center min-h-[150px] flex flex-col items-center justify-center">
                      {img && (
                        <div className="mb-4 flex justify-center">
                          <div className="w-20 h-20 flex items-center justify-center">
                            <Image
                              src={img}
                              alt={getAlt(integration.logo) || integration.name || "Integration logo"}
                              width={64}
                              height={64}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        </div>
                      )}

                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {integration.name}
                      </h3>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-white bg-opacity-95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-6">
                      <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {integration.name}
                        </h4>
                        {integration.description && (
                          <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-4">
                            {integration.description}
                          </p>
                        )}
                        <span className="inline-flex items-center text-blue-600 font-medium text-sm mt-auto">
                          Learn More
                          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}