import Image from "next/image"
import { services } from "@/content/site"
import { ServiceEnquiryLink } from "@/components/service-enquiry-link"
import { cn } from "@/lib/utils"

export function Services() {
  return (
    <section id="storitve" aria-labelledby="storitve-title" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="storitve-title" className="font-display text-[clamp(2.5rem,5.6vw,4.75rem)] text-zinc lg:col-span-7">
            Vse za streho.
            <br />
            Ena ekipa.
          </h2>
          <p className="max-w-[32rem] text-lg leading-relaxed text-zinc/75 lg:col-span-5 lg:justify-self-end">
            Od ostrešja do zadnjega žleba. Za vsa dela odgovarja ena ekipa, ki na koncu podpiše tudi garancijo na
            vodotesnost.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:mt-20 lg:grid-cols-6">
          {services.map((s, i) => (
            <li
              key={s.id}
              className={cn(
                "relative flex flex-col border border-zinc/14 bg-slate transition-colors duration-500 hover:border-zinc/35",
                i < 2 ? "lg:col-span-3" : "lg:col-span-2",
              )}
            >
              {/* tag hole */}
              <span aria-hidden className="absolute top-4 right-4 z-10 size-3 rounded-full border border-zinc/40 bg-ink" />

              <div className={cn("relative overflow-hidden", i < 2 ? "aspect-[16/10]" : "aspect-[4/3]")}>
                {s.image ? (
                  <>
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes={i < 2 ? "(min-width: 1024px) 44vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 29vw, (min-width: 768px) 50vw, 100vw"}
                      className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
                    />
                    {s.temporary && (
                      <span className="annotation absolute bottom-3 left-3 bg-ink/85 px-2 py-1 text-[0.625rem] text-zinc/80">
                        Začasna slika
                      </span>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-slate-2 [background-image:repeating-linear-gradient(135deg,rgb(242_243_241/0.06)_0_1px,transparent_1px_14px)]">
                    <span className="annotation border border-dashed border-zinc/30 px-3 py-2 text-center text-[0.625rem] leading-relaxed text-zinc/60">
                      Slika P05 · ravna streha
                      <br />
                      glej asset-plan
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="text-2xl font-semibold tracking-tight text-zinc">{s.title}</h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-zinc/75">{s.text}</p>
                <p className="annotation mt-5 text-fog">{s.spec}</p>
                <div className="mt-auto pt-7">
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
