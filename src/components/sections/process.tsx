"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { process } from "@/content/site"
import { SectionEyebrow } from "@/components/section-eyebrow"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Process() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: "[data-steps]", start: "top 80%", once: true } })
        tl.fromTo("[data-line]", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0)
          .from("[data-tile]", { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.18, ease: "expo.out" }, 0.1)
          .from("[data-step-copy]", { opacity: 0, y: 14, duration: 0.8, stagger: 0.18, ease: "expo.out" }, 0.3)
      })
    },
    { scope },
  )

  return (
    <section ref={scope} id="kako-delamo" aria-labelledby="kako-delamo-title" className="bg-zinc-2 py-24 text-graphite md:py-32">
      <div className="mx-auto max-w-[80rem] px-5 md:px-8">
        <SectionEyebrow>Kako delamo</SectionEyebrow>
        <h2
          id="kako-delamo-title"
          className="mx-auto mt-5 max-w-[46rem] text-center text-[clamp(2.25rem,4.6vw,3.6rem)] leading-[1.05] font-semibold tracking-[-0.035em]"
        >
          Brez presenečenj. V štirih korakih.
        </h2>

        <ol data-steps className="relative mt-16 grid gap-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-8">
          {/* connecting line through the tile centres */}
          <div aria-hidden className="absolute top-[30px] right-[12.5%] left-[12.5%] hidden h-px bg-graphite/20 lg:block">
            <div data-line className="h-full w-full origin-left bg-graphite/25" />
          </div>
          {process.map((step) => (
            <li key={step.n} className="relative flex flex-col items-center text-center">
              <span
                data-tile
                className="tabular relative grid size-[60px] place-items-center rounded-[12px] bg-chalk-deep text-[1.05rem] font-semibold tracking-wide text-white shadow-[0_10px_22px_-10px_rgb(214_31_31/0.7)]"
              >
                {step.n}
              </span>
              <div data-step-copy>
                <h3 className="mt-7 text-[1.35rem] font-semibold tracking-[-0.02em]">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-[19rem] text-[1.1rem] leading-relaxed text-graphite/70">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
