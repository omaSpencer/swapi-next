'use client'

import { z } from 'zod'

export const SearchQuerySchema = z.object({
  query: z.string(),
})

export type SearchQuerySchemaType = z.infer<typeof SearchQuerySchema>
