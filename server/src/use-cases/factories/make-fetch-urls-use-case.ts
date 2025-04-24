import { PrismaUrlsRepository } from '@/repositories/prisma/prisma-urls-repository'
import { FetchUrlsUseCase } from '../fetch-urls'

export function makeFetchUrlsUseCase() {
  const repository = new PrismaUrlsRepository()
  const useCase = new FetchUrlsUseCase(repository)

  return useCase
}
