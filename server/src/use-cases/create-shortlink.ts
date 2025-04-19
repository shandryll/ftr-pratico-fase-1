import type { IShortlinksRepository } from '@/repositories/shortlinks-repository'
import { isValidUrlFormat } from '@/utils/validadeUrlFormat'
import type { Shortlink } from '@prisma/client'
import { InvalidUrlFormatError } from './errors/invalid-url-format-error'
import { ShortlinkAlreadyExistsError } from './errors/shortlink-already-exists-error'

interface ICreateShortlinkUseCaseResquest {
  originalUrl: string
  shortenedUrl: string
}

interface ICreateShortlinkUseCaseResponse {
  shortlink: Shortlink
}

export class CreateShortlinkUseCase {
  constructor(private shortlinksRepository: IShortlinksRepository) {}

  async execute({
    originalUrl,
    shortenedUrl,
  }: ICreateShortlinkUseCaseResquest): Promise<ICreateShortlinkUseCaseResponse> {
    const isInvalidUrlFormat = isValidUrlFormat(shortenedUrl)

    if (!isInvalidUrlFormat.success) {
      throw new InvalidUrlFormatError()
    }

    const urlWithSameShortendUrl = await this.shortlinksRepository.findByShortenedUrl(shortenedUrl)
    if (urlWithSameShortendUrl) {
      throw new ShortlinkAlreadyExistsError()
    }

    const shortlink = await this.shortlinksRepository.create({
      originalUrl,
      shortenedUrl,
    })

    return { shortlink }
  }
}
