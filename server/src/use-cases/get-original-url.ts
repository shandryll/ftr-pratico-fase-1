import type { IUrlsRepository } from '@/repositories/urls-repository'
import type { Url } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type GetOriginalUrlUseCaseResquest = {
  shortenedUrl: string
}

type GetOriginalUrlUseCaseResponse = {
  url: Url
}

export class GetOriginalUrlUseCase {
  constructor(private urlsRepository: IUrlsRepository) {}

  async execute({
    shortenedUrl,
  }: GetOriginalUrlUseCaseResquest): Promise<GetOriginalUrlUseCaseResponse> {
    const url = await this.urlsRepository.findByShortenedUrl(shortenedUrl)

    if (!url) {
      throw new ResourceNotFoundError()
    }

    return { url }
  }
}
