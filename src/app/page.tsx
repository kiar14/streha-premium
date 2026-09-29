import type { Metadata } from "next"
import { company } from "@/content/site"
import { baseOpenGraph, siteUrl } from "@/lib/metadata"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { Enquiry } from "@/components/sections/enquiry"
import { Warranty } from "@/components/sections/warranty"
import { Process } from "@/components/sections/process"
import { About } from "@/components/sections/about"
import { Materials } from "@/components/sections/materials"
import { Projects } from "@/components/sections/projects"
import { Reviews } from "@/components/sections/reviews"
import { CtaBand } from "@/components/sections/cta-band"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...baseOpenGraph, url: "/" },
}

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: company.name,
  legalName: company.legalName,
  url: siteUrl,
  telephone: "+38641815559",
  email: company.email,
  image: `${siteUrl}/hero/koncana-streha.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: "1000",
    addressLocality: "Ljubljana",
    addressCountry: "SI",
  },
  areaServed: ["SI", "AT"],
  taxID: company.taxId,
  openingHours: ["Mo-Fr 07:00-18:00", "Su 07:00-18:00"],
  founder: { "@type": "Person", name: company.director },
  sameAs: [company.facebook],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Enquiry />
        <Warranty />
        <Process />
        <About />
        <Materials />
        <Projects />
        <Reviews />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
