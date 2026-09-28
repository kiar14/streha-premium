import { Phone } from "lucide-react"
import { company } from "@/content/site"
import { CtaLink } from "@/components/cta-link"

export function CtaBand({ formHref = "/#povprasevanje" }: { formHref?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-ink py-14 md:py-16">
      <div aria-hidden className="tape-ticks absolute inset-x-0 top-0 h-4 text-chalk/60" />
      <div className="mx-auto grid max-w-[88rem] gap-8 px-5 md:px-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <h2 id="cta-title" className="font-display text-[clamp(2.25rem,4.6vw,3.75rem)] text-zinc">
            Ogled in ponudba sta <span className="text-chalk">brezplačna.</span>
          </h2>
          <p className="mt-4 max-w-[36rem] text-[1.15rem] leading-relaxed text-zinc/75">
            Povejte nam, kaj potrebuje vaša streha. Na klice in sporočila odgovorimo hitro, nato se dogovorimo
            za termin ogleda.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
          <CtaLink href={formHref} size="lg" />
          <a
            href={company.phoneHref}
            className="tabular inline-flex items-center gap-3 text-[clamp(1.5rem,2.4vw,2rem)] font-bold tracking-tight text-zinc transition-colors hover:text-chalk"
          >
            <Phone aria-hidden className="size-7 text-chalk" strokeWidth={1.75} />
            {company.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
