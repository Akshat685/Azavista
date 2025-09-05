import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (_request: Request) => {
  const payload = await getPayload({ config: configPromise })

  const docs = await payload.find({
    collection: 'custom-feature',
    limit: 1,
  })

  return Response.json({ docs })
}
