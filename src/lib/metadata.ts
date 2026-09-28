import type { Metadata } from "next"

export const siteUrl = "https://strehapremium.si"

/**
 * Page-level `openGraph` replaces the root one entirely (shallow merge),
 * so every page spreads these shared fields and adds its own `url`.
 * The image lives here rather than in app/opengraph-image.jpg because a
 * file-based image is dropped on any child page that sets its own openGraph.
 */
export const baseOpenGraph = {
  type: "website",
  locale: "sl_SI",
  siteName: "Streha Premium d.o.o.",
  images: [
    {
      url: "/opengraph-image.jpg",
      width: 1200,
      height: 630,
      type: "image/jpeg",
      alt: "Streha Premium, nova antracitna streha na beli družinski hiši",
    },
  ],
} satisfies Metadata["openGraph"]
