import { PrismaUrlsRepository } from '@/repositories/prisma/prisma-urls-repository'
import { UpdateUrlAccessCounterUseCase } from '../update-url-access-counter'

export function makeUpdateUrlAccessCounterUseCase() {
  const repository = new PrismaUrlsRepository()
  const useCase = new UpdateUrlAccessCounterUseCase(repository)

  return useCase
}
