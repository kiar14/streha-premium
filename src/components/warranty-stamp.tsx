import { useId } from "react"

/** The logo's red sun, turned into the 10-year watertightness warranty stamp. */
export function WarrantyStamp({ className, ...rest }: { className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const id = useId()
  const ring = `stamp-ring-${id}`
  return (
    <div className={className} {...rest}>
      <svg viewBox="0 0 200 200" role="img" aria-label="10 let garancije na vodotesnost" className="h-auto w-full drop-shadow-[0_10px_24px_rgb(22_24_27/0.35)]">
        <defs>
          <path id={ring} d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
        </defs>
        <circle cx="100" cy="100" r="98" className="fill-chalk" />
        <circle cx="100" cy="100" r="88" fill="none" className="stroke-ink/30" strokeWidth="1.25" />
        <circle cx="100" cy="100" r="58" fill="none" className="stroke-ink/30" strokeWidth="1.25" />
        <text className="fill-ink" style={{ fontSize: 14.5, fontWeight: 700, letterSpacing: "0.2em" }}>
          <textPath href={`#${ring}`} startOffset="0" textLength="458" lengthAdjust="spacing">
            GARANCIJA NA VODOTESNOST · PISNO ·&nbsp;
          </textPath>
        </text>
        <text
          x="100"
          y="112"
          textAnchor="middle"
          className="fill-ink"
          style={{ fontSize: 58, fontWeight: 800, fontVariationSettings: '"wdth" 66' }}
        >
          10
        </text>
        <text x="100" y="134" textAnchor="middle" className="fill-ink" style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.34em" }}>
          LET
        </text>
      </svg>
    </div>
  )
}
