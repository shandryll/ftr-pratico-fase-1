import type { IUrlsRepository } from '@/repositories/urls-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type DeleteUrlUseCaseResquest = {
  urlId: string
}

export class DeleteUrlUseCase {
  constructor(private urlsRepository: IUrlsRepository) {}

  async execute({ urlId }: DeleteUrlUseCaseResquest): Promise<void> {
    const hasUrl = await this.urlsRepository.findById(urlId)

    if (!hasUrl) {
      throw new ResourceNotFoundError()
    }

    this.urlsRepository.delete(urlId)
  }
}
