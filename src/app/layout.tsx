import type { Metadata, Viewport } from "next"
import { Archivo } from "next/font/google"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import "./globals.css"

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://strehapremium.si"),
  title: {
    default: "Streha Premium – krovstvo z 10-letno garancijo na vodotesnost",
    template: "%s – Streha Premium",
  },
  description:
    "Krovska, kleparska in hidroizolacijska dela po vsej Sloveniji in v Avstriji. Brezplačen ogled in ponudba, pisna 10-letna garancija na vodotesnost. Pošljite povpraševanje.",
  openGraph: {
    type: "website",
    locale: "sl_SI",
    siteName: "Streha Premium d.o.o.",
  },
  // Demo build: keep it out of search results until launch.
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: "#1f2226",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sl" className={archivo.variable}>
      <body className="min-h-dvh">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
