import { z } from 'zod'

const protocol = '^https?:\\/\\/'
const domain = '[a-zA-Z0-9.-]+'
const tld = '\\.[a-zA-Z]{2,}'
const path = '(\\/[-a-zA-Z0-9_]+)?'
const end = '$'

const urlRegex = new RegExp(`${protocol}${domain}${tld}${path}${end}`)

const urlSchema = z.string().regex(urlRegex)

export const isValidUrlFormat = (url: string) => {
  return urlSchema.safeParse(url)
}
