import type { Prisma, Url } from '@prisma/client'

export interface IUrlsRepository {
  findByShortenedUrl(shortenedUrl: string): Promise<Url | null>
  create(data: Prisma.UrlCreateInput): Promise<Url>
}
