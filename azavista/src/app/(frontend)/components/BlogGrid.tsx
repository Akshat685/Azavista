'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogGridBlock, BlogGridPostItem, Media, CloudinaryImage } from '../types'

// Helper function to construct proper blog URLs
function getBlogUrl(link?: string): string {
  if (!link) return '#'

  // If it's already a full URL (http/https) or starts with /, use as-is
  if (link.startsWith('http') || link.startsWith('/')) {
    return link
  }

  // Otherwise, treat it as a blog slug and prepend /blog/
  const cleanSlug = link.replace(/^\/+|\/+$/g, '') // Remove leading/trailing slashes
  return `/blog/${cleanSlug}`
}

export default function BlogGrid(props: BlogGridBlock) {
  const { searchPlaceholder = 'Search...', types = [], items = [] } = props
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')

  const filtered = useMemo(() => {
    return items.filter((item: BlogGridPostItem) => {
      const matchesType =
        selectedType === 'all' ||
        (item.type || '').trim().toLowerCase() === selectedType.toLowerCase()

      const q = query.trim().toLowerCase()
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.excerpt || '').toLowerCase().includes(q) ||
        (item.category || '').toLowerCase().includes(q)

      return matchesType && matchesQuery
    })
  }, [items, query, selectedType])

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-8">
          <div className="w-full md:w-64">
            <input
              type="search"
              aria-label="Search posts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={searchPlaceholder}
            />
          </div>
          <div>
            <select
              className="border border-gray-300 rounded px-3 py-2 text-sm"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Blog Types</option>
              {types.map((t, i) => (
                <option key={i} value={(t.label || '').trim().toLowerCase()}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-500 mb-6">
          Showing {filtered.length} of {items.length} results
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {filtered.map((post: BlogGridPostItem, idx: number) => {
            const imgUrl = getImageUrl(post.image)
            const href = getBlogUrl(post.link)

            return (
              <div key={idx} className="flex flex-col">
                {imgUrl && (
                  <Link
                    href={href}
                    className="block relative w-full aspect-[16/10] overflow-hidden"
                  >
                    <Image
                      src={imgUrl}
                      alt={getAlt(post.image) || post.title || 'Blog Image'}
                      fill
                      className="object-cover"
                    />
                  </Link>
                )}
                <div className="mt-4">
                  {post.category && (
                    <div className="text-sm text-gray-500 mb-1">{post.category}</div>
                  )}
                  <Link
                    href={href}
                    className="font-semibold text-lg leading-snug hover:underline line-clamp-2"
                  >
                    {post.title}
                  </Link>
                  {post.excerpt && (
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed line-clamp-4">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function getImageUrl(image?: CloudinaryImage | number | Media): string {
  if (!image || typeof image === 'number') return ''
  const cloud = (image as CloudinaryImage).cloudinary
  if (cloud?.secure_url) return cloud.secure_url
  const media = image as Media
  return media.url || media.thumbnailURL || ''
}

function getAlt(image?: CloudinaryImage | number | Media): string | undefined {
  if (!image || typeof image === 'number') return undefined
  const asCloud = image as CloudinaryImage
  if (asCloud.alt) return asCloud.alt
  const asMedia = image as Media
  return asMedia.alt
}
