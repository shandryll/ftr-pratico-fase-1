import { PrismaUrlsRepository } from '@/repositories/prisma/prisma-urls-repository'
import { CreateUrlUseCase } from '../create-url'

export function makeCreateUrlUseCase() {
  const repository = new PrismaUrlsRepository()
  const useCase = new CreateUrlUseCase(repository)

  return useCase
}
