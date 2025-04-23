import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'
import type { IUrlsRepository } from '../urls-repository'

export class PrismaUrlsRepository implements IUrlsRepository {
  async findById(urlId: string) {
    const url = await prisma.url.findUnique({
      where: {
        id: urlId,
      },
    })

    return url
  }

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

  async delete(urlId: string) {
    await prisma.url.delete({
      where: {
        id: urlId,
      },
    })
  }
}
