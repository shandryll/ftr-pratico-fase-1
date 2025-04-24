import { PrismaUrlsRepository } from '@/repositories/prisma/prisma-urls-repository'
import { DeleteUrlUseCase } from '../delete-url'

export function makeDeleteUrlUseCase() {
  const repository = new PrismaUrlsRepository()
  const useCase = new DeleteUrlUseCase(repository)

  return useCase
}
