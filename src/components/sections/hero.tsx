"use client"

import { useRef } from "react"
import Image from "next/image"
import { preload } from "react-dom"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { Award, ChevronsRight, ClipboardCheck, House } from "lucide-react"
import { company } from "@/content/site"
import { CtaLink } from "@/components/cta-link"
import { WarrantyStamp } from "@/components/warranty-stamp"
import { cn } from "@/lib/utils"

gsap.registerPlugin(useGSAP, SplitText)

const SEEN_KEY = "sp-hero-seen"
const trust = [
  { figure: "10 let", title: "Pisna garancija na vodotesnost" },
  { icon: Award, title: "20+ let izkušenj", text: "Družinsko podjetje" },
  { icon: ClipboardCheck, title: "Brezplačen ogled", text: "In pregledna pisna ponudba" },
  { icon: House, title: "150 projektov", text: "Po Sloveniji in v Avstriji" },
] as const
// Intrinsic sizes: the video is the centre band of the still, at the same horizontal scale.
const VIDEO = { w: 1280, h: 708 }
const STILL = { w: 1448, h: 1086 }

export function Hero() {
  preload("/hero/poster.webp", { as: "image", fetchPriority: "high" })
  const scope = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useGSAP(
    () => {
      const root = scope.current!
      const video = videoRef.current!
      const media = root.querySelector<HTMLElement>("[data-hero-media]")!
      const still = root.querySelector<HTMLElement>("[data-hero-still]")!
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      let seen = false
      try {
        seen = sessionStorage.getItem(SEEN_KEY) === "1"
      } catch {}

      const settle = () => {
        root.dataset.phase = "done"
        document.documentElement.classList.add("hero-seen")
        video.pause()
      }

      if (reduced || seen) {
        settle()
        return
      }

      let revealed = false
      const reveal = () => {
        if (revealed) return
        revealed = true
        cleanupListeners()
        try {
          sessionStorage.setItem(SEEN_KEY, "1")
        } catch {}

        // Scale the sharp still so it matches the video frame exactly, then pull back.
        const { width: W, height: H } = media.getBoundingClientRect()
        const videoScale = Math.max(W / VIDEO.w, H / VIDEO.h)
        const stillScale = Math.max(W / STILL.w, H / STILL.h)
        const match = (VIDEO.w * videoScale) / (STILL.w * stillScale)

        const title = SplitText.create("[data-hero-title]", { type: "lines", mask: "lines" })
        gsap.set(still, { opacity: 0, scale: match })
        gsap.set(["[data-hero-reveal]", "[data-hero-stamp]", "[data-hero-trust]"], { opacity: 0 })
        root.dataset.phase = "reveal"

        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: settle })
        tl.to(still, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0)
          .to(still, { scale: 1, duration: 2.4, ease: "power3.inOut" }, 0.1)
          .set("[data-hero-reveal]", { opacity: 1 }, 0.45)
          .from(title.lines, { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.45)
          .from("[data-hero-line]", { opacity: 0, y: 18, duration: 1, stagger: 0.12 }, 0.95)
          .set("[data-hero-trust]", { opacity: 1 }, 1.2)
          .from("[data-hero-trust-item]", { opacity: 0, y: 20, duration: 0.9, stagger: 0.08 }, 1.2)
          .fromTo(
            "[data-hero-stamp]",
            { opacity: 0, scale: 1.6, rotate: -24 },
            { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.8)" },
            1.35,
          )
      }

      const skipKeys = new Set(["ArrowDown", "PageDown", " ", "End", "Enter", "Escape"])
      const onKey = (e: KeyboardEvent) => skipKeys.has(e.key) && reveal()
      const onPointer = () => reveal()
      const onScroll = () => window.scrollY > 8 && reveal()
      const safety = window.setTimeout(reveal, 9000)
      const cleanupListeners = () => {
        gsap.ticker.remove(tick)
        window.clearTimeout(safety)
        window.removeEventListener("keydown", onKey)
        window.removeEventListener("wheel", onPointer)
        window.removeEventListener("touchmove", onPointer)
        window.removeEventListener("scroll", onScroll)
        root.removeEventListener("pointerdown", onPointer)
      }
      window.addEventListener("keydown", onKey)
      window.addEventListener("wheel", onPointer, { passive: true })
      window.addEventListener("touchmove", onPointer, { passive: true })
      window.addEventListener("scroll", onScroll, { passive: true })
      root.addEventListener("pointerdown", onPointer)

      const progress = root.querySelector<HTMLElement>("[data-hero-progress]")!
      const setProgress = gsap.quickSetter(progress, "scaleX")
      const tick = () => video.duration && setProgress(video.currentTime / video.duration)
      gsap.ticker.add(tick)

      video.muted = true
      video.preload = "auto"
      video.addEventListener("ended", reveal, { once: true })
      video.addEventListener("error", reveal, { once: true })
      video.play().catch(reveal)

      return () => {
        gsap.ticker.remove(tick)
        cleanupListeners()
        video.removeEventListener("ended", reveal)
        video.removeEventListener("error", reveal)
      }
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      id="vrh"
      data-phase="intro"
      aria-labelledby="hero-title"
      className="under-header relative isolate bg-ink lg:h-svh lg:min-h-[calc(46rem+var(--header-h))]"
    >
      {/* media: 16:10 box on phones, full bleed on desktop */}
      <div data-hero-media className="relative aspect-[16/10] overflow-hidden bg-slate lg:absolute lg:inset-0 lg:aspect-auto">
        <video
          ref={videoRef}
          data-hero-video
          className="absolute inset-0 h-full w-full object-cover"
          poster="/hero/poster.webp"
          muted
          playsInline
          preload="none"
          disablePictureInPicture
          aria-hidden
          tabIndex={-1}
        >
          <source src="/hero/streha-nastaja-752.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/hero/streha-nastaja-1280.webm" type="video/webm" />
          <source src="/hero/streha-nastaja-1280.mp4" type="video/mp4" />
        </video>
        <div data-hero-still className="absolute inset-0 origin-center">
          <Image
            src="/hero/koncana-streha.webp"
            alt="Nova antracitna kritina na beli družinski hiši"
            fill
            sizes="100vw"
            quality={85}
            className="object-cover"
          />
        </div>
        <WarrantyStamp
          data-hero-stamp
          className="absolute top-[calc(var(--header-h)+0.75rem)] right-3 w-20 sm:w-24 lg:top-32 lg:right-[6vw] lg:w-40 xl:w-44"
        />

        {/* intro only: progress of the build, and a way out */}
        <div aria-hidden data-hero-intro-ui className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-ink/40">
          <div data-hero-progress className="h-full origin-left scale-x-0 bg-chalk" />
        </div>
        <button
          type="button"
          data-hero-intro-ui
          className="absolute right-3 bottom-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3.5 py-2 text-base font-medium text-zinc backdrop-blur-sm transition-colors hover:bg-ink/90 lg:right-8 lg:bottom-8"
        >
          Preskoči <ChevronsRight aria-hidden className="size-4" />
        </button>
      </div>

      <div className="relative mx-auto flex max-w-[88rem] flex-col px-5 pt-8 pb-10 md:px-8 lg:pointer-events-none lg:h-full lg:pt-[calc(var(--header-h)+clamp(3.5rem,calc(21vh-5rem),7rem))] lg:pb-0">
        <div data-hero-reveal className="pointer-events-auto max-w-[58rem]">
          <h1
            id="hero-title"
            data-hero-title
            className="font-display text-[clamp(3rem,7.6vw,6rem)] text-zinc"
          >
            Streha brez skrbi.
            <br />
            <span className="text-chalk">10&nbsp;let garancije.</span>
          </h1>
          <p data-hero-line className="mt-6 max-w-[36rem] text-lg leading-relaxed text-zinc/90 md:text-xl">
            Krovska, kleparska in hidroizolacijska dela po vsej Sloveniji in v Avstriji. Brezplačen ogled in
            ponudba, začetek del takoj po ogledu.
          </p>
          <div data-hero-line className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <CtaLink size="lg" />
            <a
              href={company.phoneHref}
              className="tabular text-base text-zinc/90 underline decoration-zinc/35 transition-colors hover:text-zinc hover:decoration-chalk"
            >
              ali pokličite <span className="font-semibold text-zinc">{company.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* trust bar: a solid band across the bottom of the hero */}
      <div
        data-hero-trust
        data-header-dark
        className="relative border-t border-zinc/10 bg-[#26292e] lg:absolute lg:inset-x-0 lg:bottom-0 lg:bg-[#26292e]/95"
      >
        <ul
          aria-label="Zakaj Streha Premium"
          className="mx-auto grid max-w-[80rem] grid-cols-2 lg:grid-cols-4"
        >
          {trust.map((item, i) => (
            <li
              key={item.title}
              data-hero-trust-item
              className={cn(
                "flex flex-col items-center justify-center px-4 py-5 text-center lg:my-3 lg:py-1.5",
                i % 2 === 1 && "border-l border-zinc/12",
                i > 1 && "border-t border-zinc/12 lg:border-t-0",
                i === 2 && "lg:border-l",
              )}
            >
              {"figure" in item ? (
                <>
                  <span className="font-display text-[clamp(2.2rem,3vw,2.7rem)] text-chalk">{item.figure}</span>
                  <span className="mt-1.5 max-w-[14rem] text-[1.15rem] leading-snug text-zinc/80">{item.title}</span>
                </>
              ) : (
                <>
                  <item.icon aria-hidden className="size-7 text-chalk" strokeWidth={1.5} />
                  <span className="mt-2 text-[1.2rem] leading-tight font-semibold text-zinc lg:text-[1.3rem]">
                    {item.title}
                  </span>
                  <span className="mt-1 text-[1.1rem] leading-snug text-zinc/75">{item.text}</span>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
