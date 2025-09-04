import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔧 CRITICAL: Add image configuration for Cloudinary
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `res.cloudinary.com`,
        pathname: `/dyzcs1rlb/**`, // Your cloud name from env
      },
    ],
    domains: [
      'res.cloudinary.com',
    ],
  },
  
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })