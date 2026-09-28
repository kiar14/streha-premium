import Image from "next/image"
import { company, nav } from "@/content/site"
import { FacebookIcon } from "@/components/icons"

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc/10 bg-[#121416] pt-16 pb-28 text-zinc/75 lg:pb-12">
      <div className="mx-auto grid max-w-[88rem] gap-12 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src="/brand/logo-light.png" alt="Streha Premium" width={640} height={411} className="h-16 w-auto" />
          <p className="mt-5 max-w-[20rem] leading-relaxed">
            Krovstvo – vse za streho. Pisna 10-letna garancija na vodotesnost za vsa naša dela.
          </p>
          <a
            href={company.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-grid size-10 place-items-center border border-zinc/20 text-zinc transition-colors hover:border-zinc/50"
          >
            <FacebookIcon className="size-4" />
            <span className="sr-only">Streha Premium na Facebooku</span>
          </a>
        </div>

        <div className="lg:col-span-3">
          <h2 className="annotation text-zinc/50">Kontakt</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={company.phoneHref} className="tabular font-semibold text-zinc hover:text-chalk">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-zinc">
                {company.email}
              </a>
            </li>
            <li>
              {company.street}, {company.city}
            </li>
          </ul>
          <h2 className="annotation mt-8 text-zinc/50">Delovni čas</h2>
          <dl className="mt-4 space-y-1.5">
            {company.hours.map((h) => (
              <div key={h.days} className="flex gap-4">
                <dt className="w-20">{h.days}</dt>
                <dd className="tabular text-zinc">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label="Noga strani" className="lg:col-span-2">
          <h2 className="annotation text-zinc/50">Povezave</h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-zinc">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="annotation text-zinc/50">Podjetje</h2>
          <p className="mt-4 leading-relaxed">
            {company.legalName}
            <br />
            {company.street}, {company.city}
          </p>
          <dl className="tabular mt-3 space-y-1">
            <div className="flex gap-2">
              <dt>Davčna št.:</dt>
              <dd className="text-zinc">{company.taxId}</dd>
            </div>
            <div className="flex gap-2">
              <dt>Matična št.:</dt>
              <dd className="text-zinc">{company.registrationNo}</dd>
            </div>
          </dl>
          <p className="mt-1 text-sm text-zinc/50">Nismo zavezanci za DDV.</p>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[88rem] flex-col gap-3 border-t border-zinc/10 px-5 pt-6 text-sm text-zinc/50 sm:flex-row sm:justify-between md:px-8">
        <p>© 2026 {company.name} Vse pravice pridržane.</p>
        <a href="https://strehapremium.si/politika-zasebnosti/" className="hover:text-zinc">
          Politika zasebnosti
        </a>
      </div>
    </footer>
  )
}
