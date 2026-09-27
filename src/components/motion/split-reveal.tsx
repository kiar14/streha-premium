"use client"

import { useRef } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, SplitText)

/** Masked line reveal for a heading. Content is visible without JS and with reduced motion. */
export function SplitReveal({
  as: Tag = "h2",
  className,
  children,
  delay = 0,
  onScroll = true,
  id,
}: {
  id?: string
  as?: "h1" | "h2" | "h3" | "p"
  className?: string
  children: React.ReactNode
  delay?: number
  onScroll?: boolean
}) {
  const ref = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        SplitText.create(ref.current!, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.08,
              delay,
              scrollTrigger: onScroll ? { trigger: ref.current, start: "top 85%", once: true } : undefined,
            }),
        })
      })
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  )
}
