import { randomUUID } from 'node:crypto'
import type { Prisma, Url } from '@prisma/client'
import type { IUrlsRepository } from '../urls-repository'

export class InMemoryUrlsRepository implements IUrlsRepository {
  public urls: Url[] = []

  async findByShortenedUrl(shortenedUrl: string) {
    const url = this.urls.find(url => url.shortenedUrl === shortenedUrl)

    if (!url) {
      return null
    }

    return url
  }

  async create(data: Prisma.UrlCreateInput) {
    const url = {
      id: randomUUID(),
      originalUrl: data.originalUrl,
      shortenedUrl: data.shortenedUrl,
      urlAccessCounter: 0,
      created_at: new Date(),
    }

    this.urls.push(url)

    return url
  }
}
