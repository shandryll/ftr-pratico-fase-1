import { z } from 'zod'

const stringSchema = z.string().regex(/^[a-z]+$/)

export const isValidStringFormat = (url: string) => {
  return stringSchema.safeParse(url)
}
