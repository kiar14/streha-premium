import { company } from "@/content/site"
import { CtaLink } from "@/components/cta-link"
import { RoofSurvey } from "@/components/hero/roof-survey"
import { SplitReveal } from "@/components/motion/split-reveal"

export function Hero() {
  return (
    <section
      id="vrh"
      className="relative isolate overflow-hidden bg-ink pt-18"
      aria-labelledby="hero-title"
    >
      {/* survey grid */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(to_right,var(--color-zinc)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-zinc)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_70%_45%,black_20%,transparent_75%)]"
      />

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-[88rem] items-center gap-10 px-5 pt-6 pb-16 md:px-8 lg:grid-cols-12 lg:gap-6 lg:pb-24">
        <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-5">
          <SplitReveal
            as="h1"
            id="hero-title"
            onScroll={false}
            delay={0.15}
            className="font-display text-[clamp(3.4rem,8.4vw,6rem)] text-zinc"
          >
            <span className="block">
              Streha, ki ostane suha.
            </span>
            <span className="block text-chalk">Pisno, 10&nbsp;let.</span>
          </SplitReveal>

          <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-zinc/80 md:text-xl">
            Krovska, kleparska in hidroizolacijska dela po vsej Sloveniji in v Avstriji. Brezplačen ogled in
            ponudba, začetek del takoj po ogledu.
          </p>

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <CtaLink size="lg" />
            <a
              href={company.phoneHref}
              className="tabular text-base text-zinc/80 underline decoration-zinc/30 transition-colors hover:text-zinc hover:decoration-chalk"
            >
              ali pokličite <span className="font-semibold text-zinc">{company.phone}</span>
            </a>
          </div>
        </div>

        <div className="order-1 mx-auto w-full max-w-[34rem] lg:order-2 lg:col-span-6 lg:max-w-none xl:col-span-7 xl:pl-10">
          <RoofSurvey />
        </div>
      </div>
    </section>
  )
}
