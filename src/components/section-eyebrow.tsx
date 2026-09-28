import { cn } from "@/lib/utils"

/** Small centred label flanked by two red rules. */
export function SectionEyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center justify-center gap-3 text-graphite/65", className)}>
      <span aria-hidden className="h-px w-8 bg-chalk-deep" />
      <span className="text-[0.9375rem] font-medium tracking-[0.2em] uppercase">{children}</span>
      <span aria-hidden className="h-px w-8 bg-chalk-deep" />
    </p>
  )
}
