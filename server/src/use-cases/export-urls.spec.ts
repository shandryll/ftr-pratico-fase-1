import { InMemoryUrlsRepository } from '@/repositories/in-memory/in-memory-urls-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUrlUseCase } from './create-url'
import { ExportUrlsUseCase } from './export-urls'

let sutRepository: InMemoryUrlsRepository
let sut: ExportUrlsUseCase
let createUrl: CreateUrlUseCase

describe('Transform Data from Urls to CSV Use Case', () => {
  beforeEach(() => {
    sutRepository = new InMemoryUrlsRepository()
    sut = new ExportUrlsUseCase(sutRepository)
    createUrl = new CreateUrlUseCase(sutRepository)
  })

  it('should be able to transform the url data into csv', async () => {
    await createUrl.execute({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'shandryll',
    })

    await createUrl.execute({
      originalUrl: 'http://www.google.com/ftr',
      shortenedUrl: 'ftr',
    })

    const csv = await sut.execute()

    expect(csv).toContain('URL original,URL encurtada,Contagem de acessos,Data de criação')
    expect(csv).toContain('http://www.google.com/shandryll,shandryll')
    expect(csv).toContain('http://www.google.com/ftr,ftr')
  })
})
