import { InMemoryUrlsRepository } from '@/repositories/in-memory/in-memory-urls-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUrlUseCase } from './create-url'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { FetchUrlsUseCase } from './fetch-urls'

let sutRepository: InMemoryUrlsRepository
let sut: FetchUrlsUseCase
let createUrl: CreateUrlUseCase

describe('Fetch Urls Use Case', () => {
  beforeEach(() => {
    sutRepository = new InMemoryUrlsRepository()
    sut = new FetchUrlsUseCase(sutRepository)
    createUrl = new CreateUrlUseCase(sutRepository)
  })

  it('should be able to list all registered urls', async () => {
    await createUrl.execute({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'http://brev.ly/shandryll',
    })

    await createUrl.execute({
      originalUrl: 'http://www.google.com/ftr',
      shortenedUrl: 'http://brev.ly/ftr',
    })

    const { urls } = await sut.execute()

    expect(urls).toHaveLength(2)
  })

  it('should be able to list all urls even without data', async () => {
    const { urls } = await sut.execute()

    expect(urls).toHaveLength(0)
  })
})
