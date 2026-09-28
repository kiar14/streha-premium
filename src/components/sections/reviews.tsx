import { Quote } from "lucide-react"
import { reviewSlots } from "@/content/site"
import { Potrdi } from "@/components/potrdi"

/** Three slots for real customer reviews. The demo shows marked placeholders; nothing is invented. */
export function Reviews() {
  return (
    <section aria-labelledby="mnenja-title" className="bg-zinc py-24 text-graphite md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="mnenja-title" className="font-display text-[clamp(2.5rem,5.6vw,4.75rem)] lg:col-span-7">
            Kaj pravijo stranke.
          </h2>
          <div className="lg:col-span-5 lg:justify-self-end">
            <p className="max-w-[30rem] text-lg leading-relaxed text-graphite/75">
              Mnenja ljudi, ki so nam zaupali svojo streho.
            </p>
            <Potrdi className="mt-4">Demo: prava mnenja pošlje stranka</Potrdi>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3 lg:mt-20">
          {reviewSlots.map((slot, i) => (
            <li key={i} className="flex flex-col border border-graphite/12 bg-white p-7 md:p-8">
              <Quote aria-hidden className="size-8 text-chalk" strokeWidth={1.5} />
              <div aria-hidden className="mt-6 space-y-3">
                <div className="h-3 w-full bg-graphite/10" />
                <div className="h-3 w-[92%] bg-graphite/10" />
                <div className="h-3 w-[78%] bg-graphite/10" />
                <div className="h-3 w-[55%] bg-graphite/10" />
              </div>
              <p className="sr-only">Prostor za mnenje stranke.</p>
              <div className="flex items-end justify-between gap-4 border-t border-graphite/12 pt-5 mt-10">
                <div>
                  <p className="font-semibold">Ime, kraj</p>
                  <p className="annotation mt-1 text-graphite/55">{slot.work}</p>
                </div>
                <Potrdi />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
