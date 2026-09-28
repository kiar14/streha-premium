"use client"

import { ArrowRight } from "lucide-react"
import type { ServiceId } from "@/content/site"

export const PREFILL_EVENT = "streha:prefill-service"

/** Jumps to the enquiry form with this service already ticked. */
export function ServiceEnquiryLink({ service, label }: { service: ServiceId; label: string }) {
  return (
    <a
      href="#povprasevanje"
      onClick={() => window.dispatchEvent(new CustomEvent<ServiceId>(PREFILL_EVENT, { detail: service }))}
      className="group/link inline-flex items-center gap-2 text-[0.95rem] font-semibold transition-colors hover:text-chalk-deep"
    >
      Povpraševanje
      <span className="sr-only"> za {label}</span>
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
    </a>
  )
}
