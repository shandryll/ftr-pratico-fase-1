import { z } from 'zod'

const createShortlinkInput = z.object({
  originalUrl: z.string().url(),
  shortenedUrl: z.string().url(),
})

type CreateShortlinkInput = z.infer<typeof createShortlinkInput>

export async function createShortlink(input: CreateShortlinkInput) {
  const { originalUrl, shortenedUrl } = createShortlinkInput.parse(input)
}
