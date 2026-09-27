import Image from "next/image"
import { projects } from "@/content/site"
import { Potrdi } from "@/components/potrdi"

export function Projects() {
  return (
    <section id="projekti" aria-labelledby="projekti-title" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="projekti-title" className="font-display text-[clamp(2.5rem,5.6vw,4.75rem)] text-zinc lg:col-span-7">
            Naše strehe.
          </h2>
          <p className="max-w-[30rem] text-lg leading-relaxed text-zinc/75 lg:col-span-5 lg:justify-self-end">
            Posnetki z naših gradbišč. Brez fotografij iz kataloga.
          </p>
        </div>

        <ul className="mt-14 columns-1 gap-5 sm:columns-2 lg:mt-20 lg:columns-3">
          {projects.map((p) => (
            <li key={p.src} className="mb-5 break-inside-avoid">
              <figure>
                <div className="overflow-hidden bg-slate">
                  <Image
                    src={p.src}
                    alt={p.title}
                    width={p.w}
                    height={p.h}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
                    className="h-auto w-full transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[0.95rem] font-medium text-zinc/85">{p.title}</span>
                  <Potrdi>lokacija</Potrdi>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
