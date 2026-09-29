"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Menu, Phone, X } from "lucide-react"
import { company, nav } from "@/content/site"
import { CtaLink } from "@/components/cta-link"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : ""
  }, [open])

  return (
    // Glass styling lives in globals.css (.site-header); no background classes here.
    <header className="site-header">
      <div className="mx-auto flex h-[calc(var(--header-h)-1px)] max-w-[88rem] items-center gap-6 px-5 md:px-8 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="shrink-0 xl:justify-self-start" aria-label="Streha Premium, domov">
          <Image
            src="/brand/logo-light.png"
            alt="Streha Premium"
            width={640}
            height={411}
            loading="eager"
            className="h-12 w-auto max-[700px]:h-11"
          />
        </Link>

        <nav aria-label="Glavni meni" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-[1.0625rem] font-semibold text-zinc/85 transition-colors hover:text-zinc"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-5 lg:flex xl:ml-0 xl:justify-self-end">
          <a
            href={company.phoneHref}
            aria-label={`Pokličite ${company.phone}`}
            className="tabular inline-flex items-center gap-2 text-[1.0625rem] font-semibold text-zinc transition-colors hover:text-chalk"
          >
            <Phone aria-hidden className="size-[1.1rem]" strokeWidth={2} />
            <span className="xl:hidden min-[1400px]:inline">{company.phone}</span>
          </a>
          <CtaLink size="md" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobilni-meni"
          className="grid size-12 place-items-center text-zinc max-lg:ml-auto xl:hidden"
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
            className="absolute inset-x-0 top-0 -z-10 h-dvh overflow-y-auto bg-ink px-5 pt-[calc(var(--header-h)+1.5rem)] pb-28 xl:hidden"
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
