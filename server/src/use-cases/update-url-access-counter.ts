import type { IUrlsRepository } from '@/repositories/urls-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type UpdateUrlAccessCounterUseCaseResquest = {
  urlId: string
}

export class UpdateUrlAccessCounterUseCase {
  constructor(private urlsRepository: IUrlsRepository) {}

  async execute({ urlId }: UpdateUrlAccessCounterUseCaseResquest): Promise<void> {
    const hasUrl = await this.urlsRepository.findById(urlId)

    if (!hasUrl) {
      throw new ResourceNotFoundError()
    }

    this.urlsRepository.updateUrlAccessCounter(urlId)
  }
}
