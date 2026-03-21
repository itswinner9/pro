/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Prevent 404s when crawlers request URLs with trailing slash (e.g. /blog/ -> /blog)
  async redirects() {
    return [
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ]
  },
}

// Only run OpenNext dev init when in development (avoids EPIPE / broken pipe during build in CI)
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  try {
    require('@opennextjs/cloudflare').initOpenNextCloudflareForDev()
  } catch (_) {
    // ignore if OpenNext not available or fails
  }
}

module.exports = nextConfig
