"use server"

import { z } from "zod"
import { enquirySchema } from "@/lib/enquiry-schema"

export type EnquiryResult =
  | { ok: true }
  | { ok: false; errors: Partial<Record<string, string[]>> }

/** Demo: validates on the server, sends nothing. Production delivery (Resend or n8n) is planned in B1. */
export async function sendEnquiry(input: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input)
  if (!parsed.success) return { ok: false, errors: z.flattenError(parsed.error).fieldErrors }
  return { ok: true }
}
