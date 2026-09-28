"use client"

import { useEffect, useId, useState } from "react"
import { useForm, type UseFormRegisterReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowUpRight, Check, ChevronDown, Loader2, Mail, Phone } from "lucide-react"
import { sendEnquiry } from "@/app/actions"
import { company, type ServiceId } from "@/content/site"
import { enquirySchema, serviceOptions, type EnquiryInput } from "@/lib/enquiry-schema"
import { PREFILL_EVENT } from "@/components/service-enquiry-link"
import { WhatsAppIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

const defaults = { name: "", phone: "", location: "", service: "", message: "" } as unknown as EnquiryInput

export function Enquiry() {
  const [sent, setSent] = useState<{ name: string; phone: string } | null>(null)
  const [serverError, setServerError] = useState(false)
  const form = useForm<EnquiryInput>({ resolver: zodResolver(enquirySchema), defaultValues: defaults })
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = form

  useEffect(() => {
    const onPrefill = (e: Event) => {
      const id = (e as CustomEvent<ServiceId>).detail
      setValue("service", id, { shouldValidate: true })
    }
    window.addEventListener(PREFILL_EVENT, onPrefill)
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill)
  }, [setValue])

  async function onSubmit(values: EnquiryInput) {
    setServerError(false)
    const res = await sendEnquiry(values)
    if (res.ok) {
      setSent({ name: values.name.trim().split(" ")[0], phone: values.phone })
      return
    }
    let mapped = false
    for (const [field, messages] of Object.entries(res.errors)) {
      if (messages?.[0] && field in defaults) {
        setError(field as keyof EnquiryInput, { message: messages[0] })
        mapped = true
      }
    }
    if (!mapped) setServerError(true)
  }

  return (
    <section
      id="povprasevanje"
      aria-labelledby="povprasevanje-title"
      className="scroll-mt-20 border-y border-graphite/10 bg-zinc-2 py-20 md:py-28"
    >
      <div className="mx-auto max-w-[80rem] px-4 md:px-8">
        <div className="grid overflow-hidden rounded-[18px] bg-[#f8f8f6] shadow-[0_1px_2px_rgb(21_23_26/0.06),0_30px_70px_-30px_rgb(21_23_26/0.45)] lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)]">
          {/* Left: promise and direct contact */}
          <div className="relative flex flex-col bg-slate px-7 py-10 text-zinc sm:px-10 md:px-12 md:py-14">
            <h2 id="povprasevanje-title" className="font-display text-[clamp(2.5rem,4.6vw,3.9rem)]">
              Vaša streha.
              <br />
              Naš ogled.
              <br />
              <span className="text-chalk">Brezplačno.</span>
            </h2>
            <p className="mt-6 max-w-[26rem] text-[1.05rem] leading-relaxed text-zinc/75">
              Nova streha, obnova ali popravilo po neurju? Povejte nam, kaj potrebujete. Pokličemo vas in se
              dogovorimo za ogled.
            </p>

            <div className="mt-10 border-t border-zinc/12 pt-8 lg:mt-auto">
              <p className="annotation text-zinc/55">Ali nas pokličite</p>
              <a
                href={company.phoneHref}
                className="tabular mt-3 inline-flex items-center gap-3 text-[clamp(1.75rem,3vw,2.25rem)] font-bold tracking-tight text-zinc transition-colors hover:text-chalk"
              >
                <Phone aria-hidden className="size-6 text-chalk" strokeWidth={1.75} />
                {company.phone}
              </a>
              <div className="mt-5 flex flex-col gap-3 text-[0.95rem] text-zinc/75">
                <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2.5 transition-colors hover:text-zinc">
                  <Mail aria-hidden className="size-4" /> {company.email}
                  <ArrowUpRight aria-hidden className="size-3.5 opacity-60" />
                </a>
                <a
                  href={company.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-zinc"
                >
                  <WhatsAppIcon className="size-4" /> Pišite na WhatsApp
                  <ArrowUpRight aria-hidden className="size-3.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: the form */}
          <div className="px-6 py-10 text-graphite sm:px-10 md:px-12 md:py-14">
            {sent ? (
              <div role="status" className="flex h-full flex-col justify-center">
                <span className="grid size-14 place-items-center rounded-full bg-chalk-deep text-white">
                  <Check aria-hidden className="size-7" strokeWidth={2.5} />
                </span>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight">Hvala, {sent.name}.</h3>
                <p className="mt-3 max-w-[30rem] text-lg leading-relaxed text-graphite/75">
                  Povpraševanje smo prejeli. Poklicali vas bomo na{" "}
                  <span className="tabular font-semibold text-graphite">{sent.phone}</span> in se dogovorili za
                  brezplačen ogled.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    reset(defaults)
                    setSent(null)
                  }}
                  className="mt-8 self-start text-[0.95rem] font-semibold underline decoration-graphite/30 underline-offset-4 hover:decoration-chalk"
                >
                  Pošlji novo povpraševanje
                </button>
                <p className="mt-10 text-xs text-graphite/50">Demo obrazec – podatki se ne pošiljajo ali shranjujejo.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
                <Field label="Ime in priimek" error={errors.name?.message}>
                  {(p) => <input {...p} {...register("name")} autoComplete="name" />}
                </Field>
                <Field label="Telefon" error={errors.phone?.message}>
                  {(p) => <input {...p} {...register("phone")} type="tel" inputMode="tel" autoComplete="tel" />}
                </Field>
                <Field label="Kraj izvedbe" error={errors.location?.message}>
                  {(p) => (
                    <input {...p} {...register("location")} autoComplete="address-level2" placeholder="npr. Domžale" />
                  )}
                </Field>
                <Field label="Vrsta storitve" error={errors.service?.message}>
                  {(p) => <ServiceSelect inputProps={p} registration={register("service")} />}
                </Field>
                <Field label="Sporočilo" optional error={errors.message?.message} className="sm:col-span-2">
                  {(p) => (
                    <textarea
                      {...p}
                      {...register("message")}
                      rows={4}
                      placeholder="Nova streha ali obnova, približna velikost, želena kritina …"
                      className={cn(p.className, "h-auto min-h-28 resize-y py-3")}
                    />
                  )}
                </Field>

                <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex h-14 items-center justify-center gap-3 rounded-[10px] bg-chalk-deep px-7 text-base font-semibold text-white transition-colors duration-300 hover:bg-[#c01616] disabled:cursor-wait disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 aria-hidden className="size-4 animate-spin" /> Pošiljam …
                      </>
                    ) : (
                      <>
                        Pošlji povpraševanje
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </>
                    )}
                  </button>
                  <p className="max-w-[15rem] text-xs leading-relaxed text-graphite/55 sm:text-right">
                    Demo obrazec. Podatki se ne pošiljajo ali shranjujejo.
                  </p>
                </div>
                {serverError && (
                  <p role="alert" className="text-sm font-medium text-chalk-deep sm:col-span-2">
                    Pošiljanje ni uspelo. Poskusite znova ali nas pokličite na {company.phone}.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

type ControlProps = {
  id: string
  className: string
  "aria-invalid": boolean
  "aria-describedby"?: string
}

const controlClass =
  "h-13 w-full rounded-[10px] border border-graphite/18 bg-white px-4 text-base text-graphite placeholder:text-graphite/40 shadow-[inset_0_1px_1px_rgb(21_23_26/0.03)] transition-[border-color,box-shadow] duration-200 hover:border-graphite/35 focus:border-graphite focus:outline-none focus:ring-4 focus:ring-graphite/8 aria-invalid:border-chalk-deep aria-invalid:ring-chalk-deep/10"

function Field({
  label,
  optional,
  error,
  className,
  children,
}: {
  label: string
  optional?: boolean
  error?: string
  className?: string
  children: (props: ControlProps) => React.ReactNode
}) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="mb-2 text-[0.95rem] font-medium text-graphite">
        {label}
        {optional && <span className="ml-1.5 text-sm font-normal text-graphite/50">(neobvezno)</span>}
      </label>
      {children({
        id,
        className: controlClass,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-chalk-deep">
          {error}
        </p>
      )}
    </div>
  )
}

function ServiceSelect({
  inputProps,
  registration,
}: {
  inputProps: ControlProps
  registration: UseFormRegisterReturn
}) {
  return (
    <div className="relative">
      <select {...inputProps} {...registration} className={cn(inputProps.className, "appearance-none pr-11")}>
        <option value="" disabled>
          Izberite storitev
        </option>
        {serviceOptions.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-graphite/60" />
    </div>
  )
}
