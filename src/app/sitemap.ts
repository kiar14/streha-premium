import type { MetadataRoute } from "next"

const base = "https://strehapremium.si"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/pogosta-vprasanja`, changeFrequency: "monthly", priority: 0.6 },
  ]
}
