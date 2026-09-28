"use client"

import { Plus } from "lucide-react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import type { FaqItem } from "@/content/site"
import { Potrdi } from "@/components/potrdi"

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <AccordionPrimitive.Root className="mt-4 border-t border-graphite/15">
      {items.map((item) => (
        <AccordionPrimitive.Item key={item.q} className="border-b border-graphite/15">
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-start justify-between gap-6 py-5 text-left text-lg font-semibold tracking-tight text-graphite transition-colors hover:text-graphite/80 md:text-xl">
              {item.q}
              <Plus
                aria-hidden
                className="mt-1 size-5 shrink-0 text-chalk-deep transition-transform duration-300 group-aria-expanded:rotate-45"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-out data-ending-style:h-0 data-starting-style:h-0">
            <div className="max-w-[44rem] pb-6 text-[1.05rem] leading-relaxed text-graphite/75">
              {item.a}
              {item.confirm && <Potrdi className="ml-2">odgovor</Potrdi>}
            </div>
          </AccordionPrimitive.Panel>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}
