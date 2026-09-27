import { brands } from "@/content/site"

export function Materials() {
  return (
    <section aria-labelledby="materiali-title" className="border-t border-zinc/10 bg-ink py-20 md:py-24">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 id="materiali-title" className="text-2xl font-semibold tracking-tight text-zinc md:text-3xl">
            10 blagovnih znamk kritin
          </h2>
          <p className="mt-3 max-w-[26rem] leading-relaxed text-zinc/70">
            Delamo s preverjenimi materiali in ob ogledu svetujemo, katera kritina je prava za naklon in
            konstrukcijo vaše strehe. Za hidroizolacije uporabljamo tudi Sika.
          </p>
        </div>
        <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-4 self-center lg:col-span-8">
          {brands.map((b) => (
            <li
              key={b}
              className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] text-zinc/55 transition-colors duration-300 hover:text-zinc"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
