import { z } from "zod"

const serviceIds = ["nove-strehe", "obnova", "kleparstvo", "ravne-strehe", "zlebovi", "drugo"] as const
const roofingIds = ["opecna", "cementna", "plocevinasta", "ne-vem"] as const

export const serviceOptions: { id: (typeof serviceIds)[number]; label: string }[] = [
  { id: "nove-strehe", label: "Nova streha / prekrivanje" },
  { id: "obnova", label: "Obnova ali popravilo" },
  { id: "kleparstvo", label: "Kleparska dela" },
  { id: "ravne-strehe", label: "Ravna streha / hidroizolacija" },
  { id: "zlebovi", label: "Žlebovi" },
  { id: "drugo", label: "Drugo" },
]

export const roofingOptions: { id: (typeof roofingIds)[number]; label: string }[] = [
  { id: "opecna", label: "Opečna" },
  { id: "cementna", label: "Cementna" },
  { id: "plocevinasta", label: "Pločevinasta" },
  { id: "ne-vem", label: "Še ne vem" },
]

const optionalNumber = (label: string) =>
  z
    .string()
    .trim()
    .regex(/^$|^\d+([.,]\d+)?$/, { error: `${label}: vpišite število ali pustite prazno` })

export const enquirySchema = z.object({
  services: z
    .array(z.enum(serviceIds))
    .min(1, { error: "Izberite vsaj eno storitev." }),
  workType: z.enum(["prenova", "nova", ""]),
  roofing: z.enum([...roofingIds, ""]),
  area: optionalNumber("Velikost strehe"),
  pitch: optionalNumber("Naklon"),
  ridge: optionalNumber("Dolžina slemena"),
  location: z.string().trim().min(2, { error: "Vpišite kraj, kjer je streha." }),
  name: z.string().trim().min(2, { error: "Vpišite ime in priimek." }),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s/-]{5,}$/, { error: "Vpišite telefonsko številko, da vas lahko pokličemo." }),
  email: z.union([z.literal(""), z.email({ error: "E-naslov ni pravilen." })]),
  message: z.string().trim().max(2000, { error: "Sporočilo je predolgo (največ 2000 znakov)." }),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

export const enquiryDefaults: EnquiryInput = {
  services: [],
  workType: "",
  roofing: "",
  area: "",
  pitch: "",
  ridge: "",
  location: "",
  name: "",
  phone: "",
  email: "",
  message: "",
}
