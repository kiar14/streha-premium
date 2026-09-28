import Image from "next/image"
import { company } from "@/content/site"

const facts = [
  ["Vodi", `${company.director}, direktor`],
  ["Izkušnje", "Več kot 20 let"],
  ["Ekipa", "12 sodelavcev"],
  ["Zaključenih projektov", "150"],
  ["Območje", "Slovenija in Avstrija"],
  ["Sedež", `${company.street}, Ljubljana`],
] as const

export function About() {
  return (
    <section id="o-nas" aria-labelledby="o-nas-title" className="bg-zinc py-24 text-graphite md:py-32">
      <div className="mx-auto grid max-w-[88rem] gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-5">
          <Image
            src="/photos/ekipa-letve-folija.webp"
            alt="Ekipa Streha Premium polaga letve na paroprepustno folijo"
            width={1010}
            height={1530}
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="h-auto w-full"
          />
          <div className="absolute -bottom-6 right-4 w-28 border-4 border-zinc bg-slate-2 sm:right-[-1.5rem] sm:w-44">
            <div className="grid aspect-[4/5] place-items-center [background-image:repeating-linear-gradient(135deg,rgb(242_243_241/0.07)_0_1px,transparent_1px_12px)]">
              <span className="annotation px-2 text-center text-[0.625rem] leading-relaxed text-zinc/65">
                Portret
                <br />
                Stefan Gabor
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
          <h2 id="o-nas-title" className="font-display text-[clamp(2.5rem,5.6vw,4.75rem)]">
            Družinsko podjetje. Več kot 20 let na strehah.
          </h2>
          <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-graphite/80">
            Streha Premium je družinsko podjetje, ki ga vodi Stefan Gabor. Z ekipo dvanajstih sodelavcev smo
            zaključili že 150 projektov, od popravil po neurju do novih streh na novogradnjah. Na streho
            prihajamo z znanjem, ki se je v družini nabiralo več kot dve desetletji.
          </p>

          <dl className="mt-10 grid border-t border-graphite/20 sm:grid-cols-2 sm:gap-x-10">
            {facts.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-graphite/20 py-3.5">
                <dt className="annotation text-graphite/65">{k}</dt>
                <dd className="tabular text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
