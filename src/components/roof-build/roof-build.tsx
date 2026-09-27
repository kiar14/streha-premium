"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { roofBeats } from "@/content/site"
import { frameSrc, roofBuild } from "@/content/roof-build"
import { RoofDrawing } from "./roof-drawing"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const useFrames = roofBuild.frameCount > 0

export function RoofBuild() {
  const scope = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useGSAP(
    () => {
      const root = scope.current!
      const beats = gsap.utils.toArray<HTMLElement>("[data-beat]", root)
      const setActive = (p: number) => {
        const idx = Math.min(beats.length - 1, Math.floor(p * beats.length * 0.999))
        beats.forEach((b, i) => {
          b.dataset.active = String(i === idx)
          b.dataset.done = String(i < idx)
        })
      }

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${window.innerHeight * 3.2}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setActive(self.progress)
              root.toggleAttribute("data-raining", self.progress > 0.84)
            },
          },
        })

        if (useFrames) {
          tl.add(frameSequence(canvasRef.current!), 0)
        } else {
          buildDrawingTimeline(tl, root)
        }

        const bar = root.querySelector("[data-progress]")
        if (bar) tl.fromTo(bar, { scaleY: 0 }, { scaleY: 1, ease: "none", duration: tl.duration() }, 0)
        setActive(0)
        return () => root.removeAttribute("data-raining")
      })
      mm.add("(prefers-reduced-motion: reduce)", () => {
        beats.forEach((b) => {
          b.dataset.active = "true"
        })
      })
    },
    { scope },
  )

  return (
    <section
      ref={scope}
      id="streha-nastaja"
      aria-labelledby="streha-nastaja-title"
      className="group/build relative flex h-svh min-h-[36rem] flex-col overflow-hidden bg-slate"
    >
      <div className="mx-auto grid h-full w-full max-w-[88rem] grid-rows-[auto_1fr] gap-4 px-5 pt-22 pb-6 md:px-8 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-8 lg:pt-18 lg:pb-0">
        <div className="lg:col-span-4">
          <h2 id="streha-nastaja-title" className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] text-zinc">
            Kako nastane streha, ki ne pušča
          </h2>

          <div className="mt-5 flex gap-5 lg:mt-10">
            <div aria-hidden className="relative hidden w-px shrink-0 bg-zinc/15 lg:block">
              <div data-progress className="absolute inset-0 origin-top bg-chalk" />
            </div>
            <ol className="grid gap-0 lg:gap-6">
              {roofBeats.map((beat) => (
                <li
                  key={beat.n}
                  data-beat
                  data-active="false"
                  className="grid grid-cols-[2.25rem_1fr] gap-x-2 transition-opacity duration-500 max-lg:[&[data-active=false]]:hidden lg:opacity-40 lg:data-[active=true]:opacity-100 lg:data-[done=true]:opacity-60"
                >
                  <span className="annotation pt-1 text-chalk">{beat.n}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc md:text-xl">{beat.title}</h3>
                    <p className="mt-1 max-w-[30rem] text-[0.975rem] leading-relaxed text-zinc/75">{beat.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="relative min-h-0 lg:col-span-8 lg:h-[78svh]">
          {useFrames ? (
            <canvas ref={canvasRef} className="h-full w-full object-contain" aria-label="Streha nastaja plast za plastjo" />
          ) : (
            <RoofDrawing />
          )}
        </div>
      </div>
    </section>
  )
}

function buildDrawingTimeline(tl: gsap.core.Timeline, root: HTMLElement) {
  const q = gsap.utils.selector(root)
  const prepDraw = (els: Element[]) =>
    els.forEach((el) => {
      const len = (el as SVGGeometryElement).getTotalLength()
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
    })

  const rafters = q('[data-layer="rafters"] [data-draw]')
  const battens = q('[data-layer="battens"] [data-draw]')
  const finish = q('[data-layer="finish"] [data-draw]')
  prepDraw([...rafters, ...battens, ...finish, ...q("[data-counter]")])

  tl.to(rafters, { strokeDashoffset: 0, stagger: 0.04, duration: 1 }, 0)
    .fromTo(
      "[data-membrane-clip]",
      { attr: { y: 380, height: 0 } },
      { attr: { y: 170, height: 210 }, duration: 1, ease: "power1.inOut" },
      1.1,
    )
    .to("[data-counter]", { strokeDashoffset: 0, stagger: 0.03, duration: 0.6 }, 1.7)
    .to(battens, { strokeDashoffset: 0, stagger: 0.05, duration: 0.6 }, 2.3)
    .from(
      "[data-tile-row]",
      { opacity: 0, y: -10, stagger: { each: 0.09, from: "end" }, duration: 0.4 },
      2.8,
    )
    .to(finish, { strokeDashoffset: 0, stagger: 0.06, duration: 0.7 }, 3.9)
    .from("[data-guard]", { opacity: 0, stagger: 0.02, duration: 0.2 }, 4.5)
    .from('[data-layer="rain"]', { opacity: 0, duration: 0.5 }, 4.9)
    .from(
      "[data-stamp]",
      { scale: 1.6, rotate: -20, opacity: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(2)" },
      5.1,
    )
    .to({}, { duration: 0.4 })
}

function frameSequence(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")!
  const mobile = window.matchMedia("(max-width: 767px)").matches
  const dir = mobile ? roofBuild.mobileDir : roofBuild.desktopDir
  const images: HTMLImageElement[] = []
  const state = { frame: 0 }

  const draw = () => {
    const img = images[Math.round(state.frame)]
    if (!img?.complete || !img.naturalWidth) return
    const { width, height } = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio, 2)
    if (canvas.width !== Math.round(width * dpr)) {
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
    }
    const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
    const w = img.naturalWidth * scale
    const h = img.naturalHeight * scale
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h)
  }

  // First frame right away, the rest progressively.
  for (let i = 0; i < roofBuild.frameCount; i++) {
    const img = new Image()
    img.decoding = "async"
    if (i === 0) img.onload = draw
    images.push(img)
  }
  images[0].src = frameSrc(dir, 0)
  const loadRest = () => images.forEach((img, i) => i && (img.src = frameSrc(dir, i)))
  if ("requestIdleCallback" in window) window.requestIdleCallback(loadRest)
  else setTimeout(loadRest, 200)

  return gsap.to(state, {
    frame: roofBuild.frameCount - 1,
    ease: "none",
    duration: 5,
    onUpdate: draw,
  })
}
