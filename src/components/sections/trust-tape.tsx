import { trust } from "@/content/site"

/** Five checks people make before hiring a roofer, read off a measuring tape. */
export function TrustTape() {
  return (
    <section aria-label="Zakaj Streha Premium" className="relative bg-zinc text-graphite">
      <div aria-hidden className="tape-ticks h-4 w-full text-graphite/35" />
      <ul className="mx-auto grid max-w-[88rem] grid-cols-1 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-5">
        {trust.map((item, i) => (
          <li
            key={item}
            className="relative flex items-start gap-3 border-graphite/15 py-6 max-lg:border-b sm:max-lg:odd:pr-6 lg:border-l lg:px-6 lg:py-9 lg:first:border-l-0 lg:first:pl-0"
          >
            <span
              aria-hidden
              className={i === 0 ? "mt-1.5 size-2.5 shrink-0 rounded-full bg-chalk" : "mt-2 h-px w-3 shrink-0 bg-graphite/50"}
            />
            <span
              className={
                i === 0
                  ? "text-[1.05rem] font-semibold leading-snug text-graphite"
                  : "text-[1.05rem] font-medium leading-snug text-graphite/85"
              }
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
