import { cn } from "@/lib/utils"

/** Demo marker: content the client still has to confirm. Remove before launch. */
export function Potrdi({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "annotation inline-flex items-center gap-1.5 border border-dashed border-chalk/70 px-1.5 py-0.5 align-middle text-[0.625rem] text-chalk",
        className,
      )}
      title="Demo: podatek še potrdi stranka"
    >
      <span aria-hidden className="size-1.5 rounded-full bg-chalk" />
      {children ?? "potrdi"}
    </span>
  )
}
