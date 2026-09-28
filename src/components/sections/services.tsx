import Image from "next/image"
import { services } from "@/content/site"
import { ServiceEnquiryLink } from "@/components/service-enquiry-link"
import { cn } from "@/lib/utils"

export function Services() {
  return (
    <section id="storitve" aria-labelledby="storitve-title" className="bg-zinc py-24 text-graphite md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="storitve-title" className="font-display text-[clamp(2.5rem,5.6vw,4.75rem)] lg:col-span-7">
            Vse za streho.
            <br />
            Ena ekipa.
          </h2>
          <p className="max-w-[32rem] text-lg leading-relaxed text-graphite/75 lg:col-span-5 lg:justify-self-end">
            Od ostrešja do zadnjega žleba. Za vsa dela odgovarja ena ekipa, ki na koncu podpiše tudi garancijo na
            vodotesnost.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-6">
          {services.map((s, i) => (
            <li
              key={s.id}
              className={cn(
                "group/card relative flex flex-col border border-graphite/10 bg-white shadow-[0_1px_2px_rgb(21_23_26/0.04)] transition-[border-color,box-shadow] duration-500 hover:border-graphite/25 hover:shadow-[0_18px_40px_-24px_rgb(21_23_26/0.35)]",
                i < 2 ? "lg:col-span-3" : "lg:col-span-2",
              )}
            >
              {/* tag hole */}
              <span aria-hidden className="absolute top-4 right-4 z-10 size-3 rounded-full border border-graphite/25 bg-zinc" />

              <div className={cn("relative overflow-hidden", i < 2 ? "aspect-[2/1]" : "aspect-[16/10]")}>
                <Image
                  src={s.image}
                  alt={s.imageAlt}
                  fill
                  sizes={
                    i < 2
                      ? "(min-width: 1024px) 44vw, (min-width: 768px) 50vw, 100vw"
                      : "(min-width: 1024px) 29vw, (min-width: 768px) 50vw, 100vw"
                  }
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover/card:scale-[1.04]"
                />
              </div>

              <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
                <h3 className="text-[1.4rem] leading-tight font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-[1.15rem] leading-relaxed text-graphite/75">{s.text}</p>
                <p className="annotation mt-3 text-graphite/65">{s.spec}</p>
                <div className="mt-auto pt-4">
                  <ServiceEnquiryLink service={s.id} label={s.title} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
