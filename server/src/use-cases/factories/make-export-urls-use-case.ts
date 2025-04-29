import { PrismaUrlsRepository } from '@/repositories/prisma/prisma-urls-repository'
import { ExportUrlsUseCase } from '../export-urls'

export function makeExportUrlsUseCase() {
  const repository = new PrismaUrlsRepository()
  const useCase = new ExportUrlsUseCase(repository)

  return useCase
}
