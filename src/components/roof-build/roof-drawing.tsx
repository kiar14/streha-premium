// Line drawing of a roof, split into the layers the scroll assembles.
// Default render is the finished roof, so no-JS and reduced motion get the complete picture.

const X0 = 140
const X1 = 860
const RIDGE = 170
const EAVE = 380
const rafters = Array.from({ length: Math.floor((X1 - X0) / 48) + 1 }, (_, i) => X0 + i * 48)
const battens = Array.from({ length: 10 }, (_, i) => EAVE - 8 - i * 21)
const TILE_W = 40

function tileRow(yBottom: number, offset: number) {
  const top = yBottom - 26
  let d = `M${X0} ${top} H${X1} V${yBottom - 6}`
  // scalloped lower edge, right to left
  for (let x = X1; x > X0; x -= TILE_W) {
    const nx = Math.max(X0, x - TILE_W)
    d += ` Q${(x + nx) / 2 + offset * 0} ${yBottom + 6} ${nx} ${yBottom - 6}`
  }
  return `${d} Z`
}
const tileRows = battens.map((y, i) => ({ y, d: tileRow(y + 6, i % 2) }))

const rain = Array.from({ length: 46 }, (_, i) => {
  const x = 60 + ((i * 97) % 900)
  const y = ((i * 53) % 560) - 40
  return { x, y, len: 16 + (i % 4) * 6 }
})

export function RoofDrawing() {
  return (
    <svg viewBox="0 0 1000 640" className="h-full w-full" role="img" aria-labelledby="roof-drawing-title">
      <title id="roof-drawing-title">
        Prerez gradnje strehe: ostrešje, folija, letve, kritina, obrobe in žlebovi
      </title>
      <defs>
        <clipPath id="membrane-clip">
          <rect data-membrane-clip x={X0} y={RIDGE} width={X1 - X0} height={EAVE - RIDGE} />
        </clipPath>
        <clipPath id="roof-clip">
          <rect x={X0} y={RIDGE - 2} width={X1 - X0} height={EAVE - RIDGE + 20} />
        </clipPath>
        <pattern id="membrane-print" width="120" height="42" patternUnits="userSpaceOnUse">
          <path d="M0 21 H120 M60 0 V42" className="stroke-zinc/12" strokeWidth="1" />
          <path d="M8 8 h14" className="stroke-zinc/20" strokeWidth="2" />
        </pattern>
      </defs>

      {/* ground and walls (always visible) */}
      <g fill="none" className="stroke-zinc/55" strokeWidth={1.5}>
        <path d="M40 600 H960" />
        <path d={`M180 ${EAVE} V600 M820 ${EAVE} V600`} />
        <rect x={250} y={440} width={90} height={90} />
        <path d="M295 440 V530 M250 485 H340" />
        <rect x={455} y={440} width={90} height={90} />
        <path d="M500 440 V530 M455 485 H545" />
        <rect x={660} y={470} width={70} height={130} />
      </g>

      {/* chimney */}
      <g fill="none" className="stroke-zinc/75" strokeWidth={2}>
        <path data-chimney d="M300 225 V112 H352 V225" />
      </g>

      {/* 01 rafters */}
      <g data-layer="rafters" fill="none" className="stroke-zinc" strokeWidth={2}>
        <path data-draw d={`M${X0 - 20} ${RIDGE} H${X1 + 20}`} strokeWidth={3} />
        <path data-draw d={`M${X0 - 20} ${EAVE} H${X1 + 20}`} strokeWidth={3} />
        {rafters.map((x) => (
          <path key={x} data-draw d={`M${x} ${RIDGE} V${EAVE + 14}`} />
        ))}
      </g>

      {/* 02 membrane + counter-battens */}
      <g data-layer="membrane">
        <g clipPath="url(#membrane-clip)">
          <rect x={X0} y={RIDGE} width={X1 - X0} height={EAVE - RIDGE} className="fill-slate-3" />
          <rect x={X0} y={RIDGE} width={X1 - X0} height={EAVE - RIDGE} fill="url(#membrane-print)" />
        </g>
        <g fill="none" className="stroke-zinc/80" strokeWidth={4}>
          {rafters.map((x) => (
            <path key={x} data-counter d={`M${x} ${RIDGE} V${EAVE}`} />
          ))}
        </g>
      </g>

      {/* 03 battens + tiles */}
      <g data-layer="battens" fill="none" className="stroke-zinc/85" strokeWidth={3}>
        {battens.map((y) => (
          <path key={y} data-draw d={`M${X0} ${y} H${X1}`} />
        ))}
      </g>
      <g data-layer="tiles" clipPath="url(#roof-clip)">
        {tileRows.map((row) => (
          <path
            key={row.y}
            data-tile-row
            d={row.d}
            className="fill-[#2b2e33] stroke-zinc/55"
            strokeWidth={1.25}
          />
        ))}
      </g>

      {/* 04 flashings, ridge, gutter, snow guards */}
      <g data-layer="finish" fill="none">
        <path data-draw d={`M${X0 - 14} ${RIDGE - 2} H${X1 + 14}`} className="stroke-zinc" strokeWidth={10} strokeLinecap="round" />
        <path data-draw d={`M${X0} ${RIDGE} V${EAVE + 4} M${X1} ${RIDGE} V${EAVE + 4}`} className="stroke-zinc" strokeWidth={5} />
        <path data-draw d="M292 226 H360" className="stroke-zinc" strokeWidth={5} />
        <path data-draw d={`M${X0 - 16} ${EAVE + 6} H${X1 + 16}`} className="stroke-zinc/80" strokeWidth={2} />
        <path
          data-draw
          d={`M${X0 - 16} ${EAVE + 6} Q${X0 - 16} ${EAVE + 26} ${X0 + 4} ${EAVE + 26} H${X1 - 4} Q${X1 + 16} ${EAVE + 26} ${X1 + 16} ${EAVE + 6}`}
          className="stroke-zinc"
          strokeWidth={3}
        />
        <path data-draw d={`M${X1 - 30} ${EAVE + 26} V600`} className="stroke-zinc" strokeWidth={6} />
        <path data-draw d={`M${X0 + 10} ${EAVE - 34} H${X1 - 10}`} className="stroke-zinc/80" strokeWidth={2} />
        {rafters.slice(1, -1).map((x) => (
          <path key={x} data-guard d={`M${x} ${EAVE - 40} V${EAVE - 28}`} className="stroke-zinc/80" strokeWidth={2} />
        ))}
      </g>

      {/* 05 rain + run-off */}
      <g data-layer="rain" className="stroke-zinc/40" strokeWidth={1.5} strokeLinecap="round">
        <g data-rain>
          {rain.map((r, i) => (
            <path key={i} d={`M${r.x} ${r.y} l-5 ${r.len}`} />
          ))}
          {rain.map((r, i) => (
            <path key={`b${i}`} d={`M${r.x} ${r.y - 560} l-5 ${r.len}`} />
          ))}
        </g>
        <path d={`M${X1 - 30} 604 q-6 10 0 14 q6 -4 0 -14`} className="fill-zinc/60 stroke-none" data-drip />
      </g>

      {/* warranty stamp */}
      <g data-stamp transform="translate(880 96)">
        <circle r={64} className="fill-chalk" />
        <circle r={56} fill="none" className="stroke-ink/35" strokeWidth={1} />
        <text y={10} textAnchor="middle" className="fill-ink" style={{ fontSize: 44, fontWeight: 800, fontVariationSettings: '"wdth" 70' }}>
          10
        </text>
        <text y={30} textAnchor="middle" className="fill-ink" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.24em" }}>
          LET VODOTESNO
        </text>
      </g>
    </svg>
  )
}
