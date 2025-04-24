import { PrismaUrlsRepository } from '@/repositories/prisma/prisma-urls-repository'
import { GetOriginalUrlUseCase } from '../get-original-url'

export function makeGetOriginalUrlUseCase() {
  const repository = new PrismaUrlsRepository()
  const useCase = new GetOriginalUrlUseCase(repository)

  return useCase
}
