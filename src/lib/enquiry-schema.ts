import { z } from "zod"

const serviceIds = ["nove-strehe", "obnova", "kleparstvo", "ravne-strehe", "zlebovi", "drugo"] as const

export const serviceOptions: { id: (typeof serviceIds)[number]; label: string }[] = [
  { id: "nove-strehe", label: "Nova streha ali prekrivanje" },
  { id: "obnova", label: "Obnova ali popravilo strehe" },
  { id: "kleparstvo", label: "Kleparska dela" },
  { id: "ravne-strehe", label: "Ravna streha ali hidroizolacija" },
  { id: "zlebovi", label: "Žlebovi in odvodnjavanje" },
  { id: "drugo", label: "Drugo" },
]

export const enquirySchema = z.object({
  name: z.string().trim().min(2, { error: "Vpišite ime in priimek." }),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s/-]{5,}$/, { error: "Vpišite telefonsko številko, da vas lahko pokličemo." }),
  services: z.array(z.enum(serviceIds)).min(1, { error: "Izberite vsaj eno storitev." }),
  message: z.string().trim().max(2000, { error: "Sporočilo je predolgo (največ 2000 znakov)." }),
})

export type EnquiryInput = z.input<typeof enquirySchema>
