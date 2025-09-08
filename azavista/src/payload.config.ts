import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { cloudinaryStorage } from 'payload-cloudinary'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Navbar } from './collections/Navbar'
import { Hero } from './collections/Hero'
import { SmarterEvents } from './collections/SmarterEvents'
import { EventFeatures } from './collections/EventFeatures'
import { CustomFeature } from './collections/CustomFeature'
import { WhyAzavista } from './collections/WhyAzavista'
import { CaseStudies } from './collections/CaseStudies'
import { Testimonials } from './collections/Testimonials'
import { Seamless } from './collections/Seamless'
import { Getstarted } from './collections/GetStarted'
import { Footer } from './collections/Footer'
import { PlatformMenu } from './collections/PlatformMenu'
import { ResourcesMenu } from './collections/ResourcesMenu'
import { SolutionsMenu } from './collections/SolutionsMenu'


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Navbar,
    PlatformMenu,
    SolutionsMenu,
    ResourcesMenu,
    Hero,
    SmarterEvents,
    EventFeatures,
    CustomFeature,
    WhyAzavista,
    CaseStudies,
    Testimonials,
    Seamless,
    Getstarted,
    Footer,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),

    cloudinaryStorage({
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
        api_key: process.env.CLOUDINARY_API_KEY || "",
        api_secret: process.env.CLOUDINARY_API_SECRET || "",

      },
      collections: {
        media: true,
      },
      folder: 'azavista-media',
    }),
  ],
})
