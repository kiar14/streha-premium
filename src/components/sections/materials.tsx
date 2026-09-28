import Image from "next/image"
import { SectionEyebrow } from "@/components/section-eyebrow"

// Logos as shown on the current strehapremium.si, in their real colours.
const partners = [
  { name: "Tondach", src: "/partnerji/tondach.webp", w: 347 },
  { name: "Creaton", src: "/partnerji/creaton.webp", w: 708 },
  { name: "Bramac", src: "/partnerji/bramac.webp", w: 574 },
  { name: "Sika", src: "/partnerji/sika.webp", w: 129 },
  { name: "Partner za ravne strehe", src: "/partnerji/ravne-strehe.webp", w: 198 },
] as const

export function Materials() {
  return (
    <section aria-labelledby="materiali-title" className="overflow-hidden bg-ink py-20 md:py-24">
      <div className="mx-auto max-w-[80rem] px-5 text-center md:px-8">
        <SectionEyebrow className="text-zinc/60">Materiali</SectionEyebrow>
        <h2
          id="materiali-title"
          className="mt-5 text-[clamp(2rem,4vw,3.1rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-zinc"
        >
          Podjetja, s katerimi sodelujemo
        </h2>
        <p className="mx-auto mt-4 max-w-[36rem] text-[1.05rem] leading-relaxed text-zinc/70">
          Delamo s preverjenimi materiali in ob ogledu svetujemo, katera kritina je prava za naklon in konstrukcijo
          vaše strehe.
        </p>
      </div>

      <div className="marquee group relative mt-12 md:mt-14">
        <div className="marquee-track flex w-max gap-5 group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-5">
              {[...partners, ...partners].map((p, i) => (
                <li
                  key={`${p.name}-${i}`}
                  className="grid h-24 w-52 shrink-0 place-items-center rounded-[14px] bg-white px-7 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.8)] md:h-28 md:w-60"
                >
                  <Image
                    src={p.src}
                    alt={copy === 0 && i < partners.length ? p.name : ""}
                    width={p.w}
                    height={112}
                    sizes="200px"
                    className={p.name === "Sika" ? "max-h-16 w-auto object-contain md:max-h-[4.5rem]" : "max-h-12 w-auto max-w-full object-contain md:max-h-14"}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
