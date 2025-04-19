import type { Prisma, Shortlink } from '@prisma/client'

export interface IShortlinksRepository {
  findByShortenedUrl(shortenedUrl: string): Promise<Shortlink | null>
  create(data: Prisma.ShortlinkCreateInput): Promise<Shortlink>
}
