import { Phone } from "lucide-react"
import { company } from "@/content/site"
import { CtaLink } from "@/components/cta-link"
import { WhatsAppIcon } from "@/components/icons"

/** Sticky phone-first actions. Replaces the old floating chat widget. */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc/10 bg-ink/97 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] lg:hidden">
      <div className="flex gap-2">
        <CtaLink size="md" className="flex-1" />
        <a
          href={company.phoneHref}
          className="grid size-12 shrink-0 place-items-center border border-zinc/25 text-zinc"
        >
          <Phone aria-hidden className="size-5" />
          <span className="sr-only">Pokličite {company.phone}</span>
        </a>
        <a
          href={company.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="grid size-12 shrink-0 place-items-center border border-zinc/25 text-zinc"
        >
          <WhatsAppIcon className="size-5" />
          <span className="sr-only">Pišite na WhatsApp</span>
        </a>
      </div>
    </div>
  )
}
