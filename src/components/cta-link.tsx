import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function CtaLink({
  href = "/#povprasevanje",
  children = "Pošlji povpraševanje",
  className,
  size = "md",
}: {
  href?: string
  children?: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-3 bg-chalk-deep font-semibold text-white transition-colors duration-300 hover:bg-[#c01616] active:translate-y-px",
        size === "sm" && "h-10 px-4 text-sm",
        size === "md" && "h-12 px-5 text-[0.95rem]",
        size === "lg" && "h-14 px-6 text-base",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
        strokeWidth={2.25}
      />
    </a>
  )
}
