import type { MetadataRoute } from "next"

// Demo build: keep crawlers out until launch (B4).
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } }
}
