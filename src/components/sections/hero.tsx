"use client"

import { useRef } from "react"
import Image from "next/image"
import { preload } from "react-dom"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { Award, ChevronsRight, ClipboardCheck, House, ShieldCheck } from "lucide-react"
import { company } from "@/content/site"
import { CtaLink } from "@/components/cta-link"
import { WarrantyStamp } from "@/components/warranty-stamp"

gsap.registerPlugin(useGSAP, SplitText)

const SEEN_KEY = "sp-hero-seen"
const trust = [
  { label: "10 let pisne garancije na vodotesnost", icon: ShieldCheck },
  { label: "Več kot 20 let izkušenj", icon: Award },
  { label: "Brezplačen ogled in ponudba", icon: ClipboardCheck },
  { label: "150 zaključenih projektov", icon: House },
]
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
        gsap.set(["[data-hero-shade]", "[data-hero-reveal]", "[data-hero-stamp]", "[data-hero-trust]"], { opacity: 0 })
        root.dataset.phase = "reveal"

        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: settle })
        tl.to(still, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0)
          .to(still, { scale: 1, duration: 2.4, ease: "power3.inOut" }, 0.1)
          .to("[data-hero-shade]", { opacity: 1, duration: 1.6, ease: "power2.out" }, 0.2)
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
      className="relative isolate bg-ink pt-20 lg:h-svh lg:min-h-[46rem] lg:pt-0"
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
        {/* keeps the header legible over a bright sky */}
        <div aria-hidden className="absolute inset-x-0 top-0 hidden h-44 bg-gradient-to-b from-ink/75 to-transparent lg:block" />
        <div
          aria-hidden
          data-hero-shade
          className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgb(22_24_27/0.86)_0%,rgb(22_24_27/0.6)_36%,transparent_66%),linear-gradient(to_top,rgb(22_24_27/0.94)_0%,rgb(22_24_27/0.4)_22%,transparent_38%)] lg:block"
        />

        <WarrantyStamp
          data-hero-stamp
          className="absolute top-3 right-3 w-20 sm:w-24 lg:top-32 lg:right-[6vw] lg:w-40 xl:w-44"
        />

        {/* intro only: progress of the build, and a way out */}
        <div aria-hidden data-hero-intro-ui className="absolute inset-x-0 bottom-0 z-10 h-[3px] bg-ink/40">
          <div data-hero-progress className="h-full origin-left scale-x-0 bg-chalk" />
        </div>
        <button
          type="button"
          data-hero-intro-ui
          className="absolute right-3 bottom-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3.5 py-2 text-sm font-medium text-zinc backdrop-blur-sm transition-colors hover:bg-ink/90 lg:right-8 lg:bottom-8"
        >
          Preskoči <ChevronsRight aria-hidden className="size-4" />
        </button>
      </div>

      <div className="relative mx-auto flex max-w-[88rem] flex-col px-5 pt-8 md:px-8 lg:pointer-events-none lg:h-full lg:pt-[clamp(8.5rem,21vh,12rem)]">
        <div data-hero-reveal className="pointer-events-auto max-w-[58rem]">
          <h1
            id="hero-title"
            data-hero-title
            className="font-display text-[clamp(3rem,7.6vw,6rem)] text-zinc"
          >
            Streha, ki ostane suha.
            <br />
            <span className="text-chalk">Pisno, 10&nbsp;let.</span>
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

        {/* trust bar: part of the hero */}
        <ul
          data-hero-trust
          aria-label="Zakaj Streha Premium"
          className="pointer-events-auto mt-12 mb-10 grid grid-cols-2 gap-3 lg:mt-auto lg:mb-0 lg:grid-cols-4 lg:gap-0 lg:border-t lg:border-zinc/15"
        >
          {trust.map(({ label, icon: Icon }) => (
            <li
              key={label}
              data-hero-trust-item
              className="flex flex-col gap-3 rounded-[12px] border border-zinc/12 bg-slate p-4 sm:flex-row sm:items-center sm:gap-4 lg:rounded-none lg:border-0 lg:border-l lg:border-zinc/15 lg:bg-transparent lg:px-7 lg:py-7 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-chalk-deep text-white shadow-[0_6px_16px_-6px_rgb(214_31_31/0.6)] lg:size-12">
                <Icon aria-hidden className="size-5 lg:size-6" strokeWidth={2} />
              </span>
              <span className="text-[1.02rem] leading-snug font-semibold text-zinc lg:text-[1.125rem]">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
