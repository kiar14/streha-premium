import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { company } from "@/content/site"
import { CtaLink } from "@/components/cta-link"
import { Potrdi } from "@/components/potrdi"

const rows = [
  ["Kaj", "Garancija za vodotesnost"],
  ["Trajanje", "10 let"],
  ["Velja za", "Vse naše storitve"],
  ["Oblika", "Pisni garancijski list"],
  ["Podpiše", `${company.director}, direktor`],
] as const

export function Warranty() {
  return (
    <section id="garancija" aria-labelledby="garancija-title" className="overflow-hidden bg-zinc py-24 text-graphite md:py-32">
      <div className="mx-auto grid max-w-[88rem] items-center gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 xl:col-span-5">
          <h2 id="garancija-title" className="font-display text-[clamp(2.5rem,5.6vw,4.75rem)]">
            Garancija, ki jo podpišemo.
          </h2>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-graphite/80">
            Obljub o kakovosti je na spletu veliko. Mi za vse naše storitve jamčimo in izstavimo 10-letno
            garancijo za vodotesnost – pisno, s podpisom direktorja.
          </p>

          <dl className="mt-10 border-t border-graphite/20">
            {rows.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-graphite/20 py-3.5">
                <dt className="annotation pt-0.5 text-graphite/60">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <CtaLink />
            <a
              href="/docs/garancija-10-let.webp"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 font-semibold underline decoration-graphite/30 hover:decoration-chalk"
            >
              Odpri garancijski list <ArrowUpRight aria-hidden className="size-4" />
            </a>
            <Potrdi>PDF različica</Potrdi>
          </div>
        </div>

        <div className="relative lg:col-span-6 xl:col-span-6 xl:col-start-7">
          <div aria-hidden className="absolute -inset-x-10 top-1/2 hidden h-px bg-graphite/15 lg:block" />
          <a
            href="/docs/garancija-10-let.webp"
            target="_blank"
            rel="noopener"
            className="relative mx-auto block w-[min(100%,26rem)] rotate-[2.5deg] bg-white p-2 shadow-[0_2px_4px_rgb(21_23_26/0.08),0_24px_60px_-12px_rgb(21_23_26/0.35)] transition-transform duration-700 ease-out hover:rotate-0"
          >
            <Image
              src="/docs/garancija-10-let.webp"
              alt="Garancijski list Streha Premium d.o.o.: 10-letna garancija za vodotesnost na vse storitve, podpisal Stefan Gabor, direktor"
              width={1273}
              height={1800}
              sizes="(min-width: 1024px) 26rem, 90vw"
              className="h-auto w-full"
            />
          </a>
          <span className="annotation absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full whitespace-nowrap text-graphite/55 max-lg:hidden">
            Izvirnik garancijskega lista
          </span>
        </div>
      </div>
    </section>
  )
}
