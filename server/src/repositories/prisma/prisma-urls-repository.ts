import { prisma } from '@/lib/prisma'
import type { Prisma, Url } from '@prisma/client'
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

  async fetchUrls() {
    const urls = await prisma.url.findMany({
      orderBy: {
        created_at: 'desc',
      },
    })

    return urls
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
