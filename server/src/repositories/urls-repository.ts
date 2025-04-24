import type { Prisma, Url } from '@prisma/client'

export interface IUrlsRepository {
  findById(urlId: string): Promise<Url | null>
  findByShortenedUrl(shortenedUrl: string): Promise<Url | null>
  create(data: Prisma.UrlCreateInput): Promise<Url>
  delete(urlId: string): Promise<void>
}
