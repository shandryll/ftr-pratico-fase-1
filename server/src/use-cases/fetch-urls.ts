import type { IUrlsRepository } from '@/repositories/urls-repository'
import type { Url } from '@prisma/client'

type FetchUrlsUseCaseResponse = {
  urls: Url[]
}

export class FetchUrlsUseCase {
  constructor(private urlsRepository: IUrlsRepository) {}

  async execute(): Promise<FetchUrlsUseCaseResponse> {
    const urls = await this.urlsRepository.fetchUrls()

    return { urls }
  }
}
