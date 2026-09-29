import type { Metadata } from "next"
import { faqGroups } from "@/content/site"
import { baseOpenGraph } from "@/lib/metadata"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CtaBand } from "@/components/sections/cta-band"
import { FaqAccordion } from "@/components/faq-accordion"

export const metadata: Metadata = {
  title: "Pogosta vprašanja",
  description:
    "Odgovori na vprašanja pred menjavo ali obnovo strehe: brezplačen ogled in ponudba, 10-letna garancija na vodotesnost, roki izvedbe, kritine in območje dela.",
  alternates: { canonical: "/pogosta-vprasanja" },
  openGraph: { ...baseOpenGraph, url: "/pogosta-vprasanja" },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  ),
}

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main>
        <section aria-labelledby="faq-title" data-header-dark className="under-header relative overflow-hidden bg-ink pt-40 pb-16 md:pt-48 md:pb-24">
          <div aria-hidden className="tape-ticks absolute inset-x-0 bottom-0 h-4 text-zinc/25" />
          <div className="mx-auto max-w-[88rem] px-5 md:px-8">
            <h1 id="faq-title" className="font-display text-[clamp(3rem,8vw,6rem)] text-zinc">
              Pogosta vprašanja
            </h1>
            <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-zinc/75 md:text-xl">
              Odgovori na vprašanja, ki jih slišimo pred vsakim ogledom strehe. Ne najdete odgovora? Pokličite{" "}
              <a href="tel:+38641815559" className="tabular font-semibold text-zinc underline decoration-chalk underline-offset-4">
                041 815 559
              </a>
              .
            </p>
          </div>
        </section>

        <section className="bg-white py-16 text-graphite md:py-24">
          <div className="mx-auto grid max-w-[88rem] gap-12 px-5 md:px-8 lg:grid-cols-12">
            <nav aria-label="Teme" className="lg:col-span-3">
              <ul className="flex flex-wrap gap-2 lg:sticky lg:top-28 lg:flex-col lg:gap-0 lg:border-l lg:border-graphite/15">
                {faqGroups.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`#${g.id}`}
                      className="block border border-graphite/15 px-3 py-2 text-[1.05rem] font-medium text-graphite/70 transition-colors hover:text-graphite lg:-ml-px lg:border-0 lg:border-l lg:border-transparent lg:py-2.5 lg:pl-5 lg:hover:border-chalk"
                    >
                      {g.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-16 lg:col-span-8 lg:col-start-5">
              {faqGroups.map((g) => (
                <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`} className="scroll-mt-28">
                  <h2 id={`${g.id}-title`} className="annotation text-graphite/65">
                    {g.title}
                  </h2>
                  <FaqAccordion items={g.items} />
                </section>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
      </main>
      <SiteFooter />
    </>
  )
}
