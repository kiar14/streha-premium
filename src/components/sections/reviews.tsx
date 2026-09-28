import { ArrowUpRight, Quote } from "lucide-react"
import { company, reviews } from "@/content/site"
import { cn } from "@/lib/utils"

/** Real reviews from the Google Business Profile, quoted verbatim. */
export function Reviews() {
  const [lead, ...rest] = reviews
  return (
    <section aria-labelledby="mnenja-title" className="bg-zinc py-24 text-graphite md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="mnenja-title" className="font-display text-[clamp(2.5rem,5.6vw,4.75rem)] lg:col-span-7">
            Kaj pravijo stranke.
          </h2>
          <div className="lg:col-span-5 lg:justify-self-end">
            <p className="max-w-[30rem] text-lg leading-relaxed text-graphite/75">
              Mnenja ljudi, ki so nam zaupali svojo streho, objavljena na Googlu.
            </p>
            <a
              href={company.googleProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 font-semibold underline decoration-graphite/30 underline-offset-4 hover:decoration-chalk"
            >
              Vsa mnenja na Googlu <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12">
          <ReviewCard review={lead} featured className="lg:col-span-7 lg:row-span-2" />
          {rest.map((r) => (
            <ReviewCard key={r.name} review={r} className="lg:col-span-5" />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewCard({
  review,
  featured,
  className,
}: {
  review: (typeof reviews)[number]
  featured?: boolean
  className?: string
}) {
  return (
    <figure
      className={cn(
        "flex flex-col border border-graphite/12 bg-white p-7 md:p-9",
        featured && "bg-slate text-zinc md:p-12",
        className,
      )}
    >
      <Quote aria-hidden className={cn("size-8 text-chalk", featured && "size-10")} strokeWidth={1.5} />
      <blockquote
        className={cn(
          "mt-6 text-lg leading-relaxed text-graphite/85",
          featured && "font-display text-[clamp(1.9rem,3.2vw,2.9rem)] leading-[1.05] text-zinc",
        )}
      >
        <p>„{review.quote}“</p>
      </blockquote>
      <figcaption
        className={cn(
          "mt-auto flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t pt-5",
          featured ? "mt-10 border-zinc/15" : "mt-8 border-graphite/12",
        )}
      >
        <span className="font-semibold">{review.name}</span>
        <span className={cn("annotation", featured ? "text-zinc/55" : "text-graphite/65")}>{review.note}</span>
      </figcaption>
    </figure>
  )
}
