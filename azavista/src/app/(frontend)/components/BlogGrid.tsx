'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BlogGridBlock, BlogGridPostItem } from '../types'

export default function BlogGrid(props: BlogGridBlock) {
  const { searchPlaceholder = 'Search...', types = [], items = [] } = props
  const [query, setQuery] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')

  const filtered = useMemo(() => {
    return items.filter((item: BlogGridPostItem) => {
      const matchesType =
        selectedType === 'all' || (item.type || '').toLowerCase() === selectedType.toLowerCase()

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
                <option key={i} value={(t.label || '').toLowerCase()}>
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
            const imgUrl =
              (post.image as any)?.cloudinary?.secure_url ||
              (post.image as any)?.url ||
              (post.image as any)?.thumbnailURL ||
              ''
            const href = post.link
              ? post.link.startsWith('http') || post.link.startsWith('/')
                ? post.link
                : `/blog/${post.link.replace(/^\/+|\/+$/g, '')}`
              : '#'

            return (
              <div key={idx} className="flex flex-col">
                {imgUrl && (
                  <Link
                    href={href}
                    className="block relative w-full aspect-[16/10] overflow-hidden"
                  >
                    <Image
                      src={imgUrl}
                      alt={post.title || 'Blog Image'}
                      fill
                      className="object-cover"
                    />
                  </Link>
                )}
                <div className="mt-4">
                  {post.category && (
                    <div className="text-sm text-gray-500 mb-1">{post.category}</div>
                  )}
                  <Link href={href} className="font-semibold text-lg leading-snug hover:underline">
                    {post.title}
                  </Link>
                  {post.excerpt && (
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">{post.excerpt}</p>
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
