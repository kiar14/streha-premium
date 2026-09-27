"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { Menu, Phone, X } from "lucide-react"
import { company, nav } from "@/content/site"
import { CtaLink } from "@/components/cta-link"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : ""
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open ? "bg-ink/95 shadow-[0_1px_0_rgb(242_243_241/0.1)]" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-[88rem] items-center gap-8 px-5 md:px-8">
        <a href="#vrh" className="shrink-0" aria-label="Streha Premium – na vrh strani">
          <Image
            src="/brand/logo-light.png"
            alt="Streha Premium"
            width={640}
            height={411}
            preload
            className="h-11 w-auto"
          />
        </a>

        <nav aria-label="Glavni meni" className="hidden flex-1 lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[0.9rem] font-medium text-zinc/80 transition-colors hover:text-zinc"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <a
            href={company.phoneHref}
            className="tabular inline-flex items-center gap-2 text-[0.95rem] font-semibold text-zinc transition-colors hover:text-chalk"
          >
            <Phone aria-hidden className="size-4" strokeWidth={2} />
            {company.phone}
          </a>
          <CtaLink size="sm" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobilni-meni"
          className="ml-auto grid size-11 place-items-center text-zinc lg:hidden"
        >
          <span className="sr-only">{open ? "Zapri meni" : "Odpri meni"}</span>
          {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobilni-meni"
            aria-label="Mobilni meni"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-zinc/10 bg-ink px-5 pb-28 pt-6 lg:hidden"
          >
            <ul className="divide-y divide-zinc/10">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display block py-4 text-4xl text-zinc"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <CtaLink size="lg" className="w-full" />
              <a
                href={company.phoneHref}
                className="tabular inline-flex h-14 items-center justify-center gap-2 border border-zinc/25 font-semibold"
              >
                <Phone aria-hidden className="size-4" /> {company.phone}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
