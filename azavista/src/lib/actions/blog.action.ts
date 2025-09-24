"use server"

import { getPayload } from "payload"
import config from "@/payload.config"

const payload = await getPayload({ config })

export async function getBlogPostBySlug(slug: string) {
  try {
    const res = await payload.find({
      collection: "blogs",
      limit: 1,
      where: { slug: { equals: slug } },
      depth: 2,
    })

    return res.docs[0] || null
  } catch (_error) {
    return null
  }
}


