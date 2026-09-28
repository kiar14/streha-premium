import Image from "next/image"
import { projects } from "@/content/site"

const layout = [
  "aspect-[3/2] sm:col-span-2 lg:col-span-8 lg:aspect-auto lg:h-[34rem]",
  "aspect-[4/5] lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:h-auto",
  "aspect-[4/3] lg:col-span-4 lg:aspect-auto lg:h-[24rem]",
  "aspect-[4/3] sm:col-span-2 lg:col-span-4 lg:aspect-auto lg:h-[24rem]",
]

export function Projects() {
  return (
    <section id="projekti" aria-labelledby="projekti-title" className="bg-white py-24 text-graphite md:py-32">
      <div className="mx-auto max-w-[88rem] px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="projekti-title" className="font-display text-[clamp(2.5rem,5.6vw,4.75rem)] lg:col-span-7">
            Naše strehe.
          </h2>
          <p className="max-w-[30rem] text-lg leading-relaxed text-graphite/75 lg:col-span-5 lg:justify-self-end">
            Posnetki z naših gradbišč. Brez fotografij iz kataloga.
          </p>
        </div>

        {/* curated layout: wide lead, tall portrait, two small */}
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          {projects.map((p, i) => (
            <li key={p.src} className={layout[i]}>
              <figure className="flex h-full flex-col">
                <div className="relative min-h-0 flex-1 overflow-hidden bg-zinc-2">
                  <Image
                    src={p.src}
                    alt={p.title}
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 62vw, 100vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3 text-[1.05rem] font-medium text-graphite/85">{p.title}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
