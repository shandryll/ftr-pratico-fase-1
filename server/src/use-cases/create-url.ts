import type { IUrlsRepository } from '@/repositories/urls-repository'
import { isValidUrlFormat } from '@/utils/validadeUrlFormat'
import type { Url } from '@prisma/client'
import { InvalidUrlFormatError } from './errors/invalid-url-format-error'
import { UrlAlreadyExistsError } from './errors/url-already-exists-error'

type CreateUrlUseCaseResquest = {
  originalUrl: string
  shortenedUrl: string
}

type CreateUrlUseCaseResponse = {
  url: Url
}

export class CreateUrlUseCase {
  constructor(private urlsRepository: IUrlsRepository) {}

  async execute({
    originalUrl,
    shortenedUrl,
  }: CreateUrlUseCaseResquest): Promise<CreateUrlUseCaseResponse> {
    const isInvalidUrlFormat = isValidUrlFormat(shortenedUrl)

    if (!isInvalidUrlFormat.success) {
      throw new InvalidUrlFormatError()
    }

    const urlWithSameShortendUrl = await this.urlsRepository.findByShortenedUrl(shortenedUrl)
    if (urlWithSameShortendUrl) {
      throw new UrlAlreadyExistsError()
    }

    const url = await this.urlsRepository.create({
      originalUrl,
      shortenedUrl,
    })

    return { url }
  }
}
