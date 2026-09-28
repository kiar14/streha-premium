"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { company, reviews } from "@/content/site"
import { SectionEyebrow } from "@/components/section-eyebrow"
import { cn } from "@/lib/utils"

const AUTOPLAY_MS = 7000

/** Real 5-star reviews from the Google Business Profile, quoted verbatim, one at a time. */
export function Reviews() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const regionRef = useRef<HTMLDivElement>(null)
  const count = reviews.length

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count])

  useEffect(() => {
    if (paused || reduced) return
    const id = window.setInterval(() => go(1), AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, reduced, go])

  return (
    <section aria-labelledby="mnenja-title" className="bg-zinc py-24 text-graphite md:py-32">
      <div className="mx-auto max-w-[80rem] px-5 md:px-8">
        <SectionEyebrow>Mnenja strank</SectionEyebrow>
        <h2
          id="mnenja-title"
          className="mt-5 text-center text-[clamp(2.25rem,4.6vw,3.6rem)] leading-[1.05] font-semibold tracking-[-0.035em]"
        >
          Kaj pravijo naše stranke
        </h2>

        <div
          ref={regionRef}
          role="region"
          aria-roledescription="vrtiljak"
          aria-label="Mnenja strank"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => !regionRef.current?.contains(e.relatedTarget as Node) && setPaused(false)}
          className="relative mx-auto mt-14 max-w-[64rem] md:mt-16 md:px-16"
        >
          <div className="grid rounded-[14px] border border-graphite/10 bg-white shadow-[0_1px_2px_rgb(21_23_26/0.04)]">
            {reviews.map((r, i) => {
              const active = i === index
              return (
                <figure
                  key={r.name}
                  role="group"
                  aria-roledescription="mnenje"
                  aria-label={`${i + 1} od ${count}`}
                  aria-hidden={!active}
                  className={cn(
                    "col-start-1 row-start-1 flex flex-col items-center justify-center px-6 py-12 text-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-16 md:py-14",
                    active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                  )}
                >
                  <div className="flex gap-1 text-chalk-deep" aria-label={`Ocena ${r.stars} od 5 na Googlu`} role="img">
                    {Array.from({ length: r.stars }, (_, s) => (
                      <Star key={s} aria-hidden className="size-5 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote className="mt-6 max-w-[40rem] text-[clamp(1.25rem,2.2vw,1.7rem)] leading-[1.4] font-medium tracking-[-0.01em] text-graphite">
                    <p>„{r.quote}“</p>
                  </blockquote>
                  <figcaption className="mt-7 flex flex-col items-center gap-1.5 text-[1rem] text-graphite/70 sm:flex-row sm:gap-3">
                    <span className="flex items-center gap-3">
                      <span aria-hidden className="h-px w-6 bg-graphite/25" />
                      <span className="font-medium text-graphite/85">{r.name}</span>
                    </span>
                    <span className="text-base text-graphite/65">{r.note}</span>
                  </figcaption>
                </figure>
              )
            })}
          </div>

          <ArrowButton side="left" onClick={() => go(-1)} label="Prejšnje mnenje" />
          <ArrowButton side="right" onClick={() => go(1)} label="Naslednje mnenje" />

          <div className="mt-8 flex items-center justify-center gap-2">
            {reviews.map((r, i) => (
              <button
                key={r.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Pokaži mnenje ${i + 1}`}
                aria-current={i === index}
                className="group grid h-6 place-items-center"
              >
                <span
                  className={cn(
                    "block h-[3px] rounded-full transition-all duration-500",
                    i === index ? "w-8 bg-chalk-deep" : "w-4 bg-graphite/20 group-hover:bg-graphite/40",
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={company.googleProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-[10px] border border-graphite/15 bg-white px-5 py-3 text-[1.05rem] font-medium text-graphite shadow-[0_1px_2px_rgb(21_23_26/0.05)] transition-colors hover:border-graphite/35"
          >
            <Star aria-hidden className="size-4 fill-chalk-deep text-chalk-deep" strokeWidth={0} />
            Mnenja na Googlu
            <ArrowUpRight aria-hidden className="size-4 text-graphite/60" />
          </a>
        </div>
      </div>
    </section>
  )
}

function ArrowButton({ side, onClick, label }: { side: "left" | "right"; onClick: () => void; label: string }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "absolute top-[calc(50%-1.75rem)] hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-graphite/15 bg-white text-graphite shadow-[0_1px_2px_rgb(21_23_26/0.06)] transition-colors hover:border-graphite/40 md:grid",
        side === "left" ? "left-0" : "right-0",
      )}
    >
      <Icon aria-hidden className="size-5" strokeWidth={1.75} />
    </button>
  )
}
