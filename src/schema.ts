"use client"

import { z } from "zod"

export const shortenerFormSchema = z.object({
  longurl: z.string().min(10).max(2000),
  alias: z.string().optional(),
})
