'use client'

import { z } from 'zod'

export const SearchQuerySchema = z.object({
  query: z.string().min(2),
})

export type SearchQuerySchemaType = z.infer<typeof SearchQuerySchema>
