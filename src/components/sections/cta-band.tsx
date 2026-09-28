import { Phone } from "lucide-react"
import { company } from "@/content/site"
import { CtaLink } from "@/components/cta-link"

export function CtaBand({ formHref = "/#povprasevanje" }: { formHref?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-ink py-24 md:py-32">
      <div aria-hidden className="tape-ticks absolute inset-x-0 top-0 h-4 text-chalk/60" />
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 md:px-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 id="cta-title" className="font-display text-[clamp(2.75rem,7vw,6rem)] text-zinc">
            Ogled in ponudba
            <br />
            sta <span className="text-chalk">brezplačna.</span>
          </h2>
          <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-zinc/75">
            Povejte nam, kaj potrebuje vaša streha. Na klice in sporočila odgovorimo hitro, nato se dogovorimo
            za termin ogleda.
          </p>
        </div>
        <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:items-end">
          <CtaLink href={formHref} size="lg" />
          <a
            href={company.phoneHref}
            className="tabular inline-flex items-center gap-3 text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight text-zinc transition-colors hover:text-chalk"
          >
            <Phone aria-hidden className="size-7 text-chalk" strokeWidth={1.75} />
            {company.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
