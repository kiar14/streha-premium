"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP)

// Geometry follows the Streha Premium logo: two overlapping gables, chimney, window, sun.
const L = { x: 40, y: 330 } // left eave
const A = { x: 310, y: 150 } // main apex
const R = { x: 580, y: 330 } // main right eave
const A2 = { x: 420, y: 158 } // second apex
const J = { x: 373, y: 192 } // where the second gable meets the main slope
const R2 = { x: 678, y: 330 } // second gable eave
const SUN = { x: 560, y: 222, r: 92 }

// Chalk line runs parallel to the main left slope, a little above it.
const CH0 = { x: L.x + 6, y: L.y - 16 }
const CH1 = { x: A.x - 6, y: A.y - 12 }
const chalkPath = (bow: number) => {
  const mx = (CH0.x + CH1.x) / 2
  const my = (CH0.y + CH1.y) / 2
  // perpendicular to the slope
  const dx = CH1.x - CH0.x
  const dy = CH1.y - CH0.y
  const len = Math.hypot(dx, dy)
  const nx = -dy / len
  const ny = dx / len
  return `M${CH0.x} ${CH0.y} Q${mx + nx * bow} ${my + ny * bow} ${CH1.x} ${CH1.y}`
}

const pitch = Math.round((Math.atan2(L.y - A.y, A.x - L.x) * 180) / Math.PI)

export function RoofSurvey() {
  const scope = useRef<SVGSVGElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const draw = gsap.utils.toArray<SVGGeometryElement>("[data-draw]")
        draw.forEach((el) => {
          const len = el.getTotalLength()
          gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })
        })
        const chalk = scope.current!.querySelector<SVGPathElement>("[data-chalk]")!
        const chalkLen = chalk.getTotalLength() + 40
        gsap.set(chalk, { strokeDasharray: chalkLen, strokeDashoffset: chalkLen })
        const bow = { v: -26 }

        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.25 })
        tl.to(draw, { strokeDashoffset: 0, duration: 1.4, stagger: 0.05 })
          .from("[data-fade]", { opacity: 0, duration: 0.8, stagger: 0.06 }, "-=0.9")
          .to(chalk, { strokeDashoffset: 0, duration: 0.35, ease: "power2.in" }, "-=0.5")
          .to(
            bow,
            {
              v: 0,
              duration: 0.9,
              ease: "elastic.out(1.2, 0.28)",
              onUpdate: () => chalk.setAttribute("d", chalkPath(bow.v)),
            },
            ">-0.05",
          )
          .fromTo(
            "[data-dust]",
            { opacity: 0, scale: 0, transformOrigin: "center" },
            { opacity: 1, scale: 1, duration: 0.4, stagger: 0.02 },
            "<",
          )
          .to("[data-dust]", { opacity: 0, y: 14, duration: 1.2, ease: "power1.out" }, ">-0.1")
          .from(
            "[data-stamp]",
            { scale: 1.35, rotate: -18, opacity: 0, transformOrigin: "50% 50%", duration: 0.7, ease: "back.out(2)" },
            "-=1.1",
          )
      })
    },
    { scope },
  )

  const line = "stroke-zinc"
  const dim = "stroke-zinc/45"

  return (
    <svg
      ref={scope}
      viewBox="0 0 720 470"
      role="img"
      aria-labelledby="roof-survey-title"
      className="h-auto w-full overflow-visible"
    >
      <title id="roof-survey-title">
        Izmera strehe: naklon, razpon in žig z 10-letno garancijo na vodotesnost
      </title>
      <defs>
        <path
          id="stamp-ring"
          d={`M ${SUN.x - 66} ${SUN.y} a 66 66 0 1 1 132 0 a 66 66 0 1 1 -132 0`}
        />
      </defs>

      {/* Warranty stamp in place of the logo's sun */}
      <g data-stamp>
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r} className="fill-chalk" />
        <circle cx={SUN.x} cy={SUN.y} r={SUN.r - 10} fill="none" className="stroke-ink/35" strokeWidth={1} />
        <text className="fill-ink" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.16em" }}>
          <textPath href="#stamp-ring" startOffset="0">
            GARANCIJA NA VODOTESNOST · PISNO ·
          </textPath>
        </text>
        <text
          x={SUN.x}
          y={SUN.y + 14}
          textAnchor="middle"
          className="fill-ink"
          style={{ fontSize: 58, fontWeight: 800, fontVariationSettings: '"wdth" 70' }}
        >
          10
        </text>
        <text
          x={SUN.x}
          y={SUN.y + 36}
          textAnchor="middle"
          className="fill-ink"
          style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.3em" }}
        >
          LET
        </text>
      </g>

      {/* Roof outline (logo geometry) */}
      <g fill="none" strokeLinecap="square" strokeLinejoin="miter">
        <path data-draw d={`M${L.x} ${L.y} L${A.x} ${A.y} L${R.x} ${R.y}`} className={line} strokeWidth={9} />
        <path data-draw d={`M${J.x} ${J.y} L${A2.x} ${A2.y} L${R2.x} ${R2.y}`} className={line} strokeWidth={9} />
        {/* chimney */}
        <path data-draw d="M130 270 V190 H185 V233" className={line} strokeWidth={9} />
      </g>
      {/* window */}
      <g data-fade className="fill-chalk">
        <rect x={282} y={236} width={25} height={25} />
        <rect x={313} y={236} width={25} height={25} />
        <rect x={282} y={267} width={25} height={25} />
        <rect x={313} y={267} width={25} height={25} />
      </g>

      {/* Dimension: span */}
      <g data-fade fill="none" className={dim} strokeWidth={1.25}>
        <path d={`M${L.x} 352 V404 M${R.x} 352 V404`} />
        <path d={`M${L.x} 392 H${R.x}`} />
        <path d={`M${L.x - 6} 398 L${L.x + 6} 386 M${R.x - 6} 398 L${R.x + 6} 386`} className="stroke-zinc" />
      </g>
      <text
        data-fade
        x={(L.x + R.x) / 2}
        y={384}
        textAnchor="middle"
        className="annotation fill-zinc/80"
        style={{ fontSize: 13 }}
      >
        RAZPON 12,40 M
      </text>

      {/* Dimension: pitch arc at the left eave */}
      <g data-fade fill="none" className={dim} strokeWidth={1.25}>
        <path d={`M${L.x} ${L.y} H${L.x + 150}`} strokeDasharray="3 5" />
        <path
          d={`M${L.x + 110} ${L.y} A110 110 0 0 0 ${L.x + 110 * Math.cos((pitch * Math.PI) / 180)} ${
            L.y - 110 * Math.sin((pitch * Math.PI) / 180)
          }`}
        />
      </g>
      <text data-fade x={L.x + 124} y={L.y - 18} className="annotation fill-zinc/80" style={{ fontSize: 13 }}>
        {pitch}°
      </text>

      {/* Ridge marker */}
      <g data-fade>
        <path d={`M${A.x} ${A.y - 34} V${A.y - 16}`} className="stroke-zinc/45" strokeWidth={1.25} />
        <text x={A.x} y={A.y - 42} textAnchor="middle" className="annotation fill-zinc/80" style={{ fontSize: 13 }}>
          SLEME
        </text>
      </g>

      {/* The snapped red chalk line */}
      <path
        data-chalk
        d={chalkPath(0)}
        fill="none"
        className="stroke-chalk"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <g className="fill-chalk">
        {[0.18, 0.31, 0.47, 0.6, 0.74, 0.86].map((t, i) => (
          <circle
            key={t}
            data-dust
            cx={CH0.x + (CH1.x - CH0.x) * t + (i % 2 ? 4 : -3)}
            cy={CH0.y + (CH1.y - CH0.y) * t + (i % 3) * 3 + 4}
            r={1.6}
            opacity={0}
          />
        ))}
      </g>
    </svg>
  )
}
