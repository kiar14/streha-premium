"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { process } from "@/content/site"

gsap.registerPlugin(useGSAP, ScrollTrigger)

export function Process() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-steps]", start: "top 78%", end: "bottom 60%", scrub: 0.8 },
        })
        tl.fromTo("[data-line]", { scaleX: 0, scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: "none", duration: 1 }, 0).from(
          "[data-step]",
          { opacity: 0.15, stagger: 0.25, duration: 0.25, ease: "power1.out" },
          0,
        )
      })
    },
    { scope },
  )

  return (
    <section ref={scope} id="kako-delamo" aria-labelledby="kako-delamo-title" className="bg-slate py-24 md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="kako-delamo-title" className="font-display text-[clamp(2.5rem,5.6vw,4.75rem)] text-zinc lg:col-span-7">
            Brez presenečenj. V štirih korakih.
          </h2>
          <p className="max-w-[30rem] text-lg leading-relaxed text-zinc/75 lg:col-span-5 lg:justify-self-end">
            Ogled in ponudba sta brezplačna. Ko ponudbo potrdite, lahko začnemo takoj.
          </p>
        </div>

        <ol data-steps className="relative mt-16 grid gap-10 pl-8 lg:mt-24 lg:grid-cols-4 lg:gap-8 lg:pt-12 lg:pl-0">
          {/* dimension line: vertical on mobile, horizontal on desktop */}
          <div aria-hidden className="absolute top-0 bottom-0 left-[5px] w-px bg-zinc/15 lg:top-[5px] lg:right-0 lg:bottom-auto lg:h-px lg:w-auto lg:left-0">
            <div data-line className="h-full w-full origin-top bg-chalk lg:origin-left" />
          </div>
          {process.map((step) => (
            <li key={step.n} data-step className="relative">
              <span
                aria-hidden
                className="absolute top-1.5 -left-8 size-[11px] -translate-y-1/2 rounded-full border-2 border-chalk bg-slate lg:-top-12 lg:left-0 lg:translate-y-0"
              />
              <span className="annotation text-chalk">{step.n}</span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc">{step.title}</h3>
              <p className="mt-3 max-w-[22rem] leading-relaxed text-zinc/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
