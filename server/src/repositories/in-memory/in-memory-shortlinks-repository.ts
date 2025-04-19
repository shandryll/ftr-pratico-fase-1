import { randomUUID } from 'node:crypto'
import type { Prisma, Shortlink } from '@prisma/client'
import type { IShortlinksRepository } from '../shortlinks-repository'

export class InMemoryShortlinksRepository implements IShortlinksRepository {
  public links: Shortlink[] = []

  async findByShortenedUrl(shortenedUrl: string) {
    const shortlink = this.links.find(url => url.shortenedUrl === shortenedUrl)

    if (!shortlink) {
      return null
    }

    return shortlink
  }

  async create(data: Prisma.ShortlinkCreateInput) {
    const shortlink = {
      id: randomUUID(),
      originalUrl: data.originalUrl,
      shortenedUrl: data.shortenedUrl,
      accessCounter: 0,
      created_at: new Date(),
    }

    this.links.push(shortlink)

    return shortlink
  }
}
