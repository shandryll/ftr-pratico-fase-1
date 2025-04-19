import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { IUrlsRepository } from '../urls-repository'

export class PrismaUrlsRepository implements IUrlsRepository {
  async findByShortenedUrl(shortenedUrl: string) {
    const url = await prisma.url.findUnique({
      where: {
        shortenedUrl,
      },
    })

    return url
  }

  async create(data: Prisma.UrlCreateInput) {
    const url = await prisma.url.create({
      data,
    })

    return url
  }
}
