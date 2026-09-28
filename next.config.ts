import type { NextConfig } from "next"

const longCache = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return ["/hero/:path*", "/storitve/:path*", "/photos/:path*", "/brand/:path*"].map((source) => ({
      source,
      headers: longCache,
    }))
  },
}

export default nextConfig
