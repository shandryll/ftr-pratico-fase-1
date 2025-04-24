import { InMemoryUrlsRepository } from '@/repositories/in-memory/in-memory-urls-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUrlUseCase } from './create-url'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetOriginalUrlUseCase } from './get-original-url'

let sutRepository: InMemoryUrlsRepository
let sut: GetOriginalUrlUseCase
let createUrl: CreateUrlUseCase

describe('Get Original Url Use Case', () => {
  beforeEach(() => {
    sutRepository = new InMemoryUrlsRepository()
    sut = new GetOriginalUrlUseCase(sutRepository)
    createUrl = new CreateUrlUseCase(sutRepository)
  })

  it('should be able to get the original url using a shortened url', async () => {
    await createUrl.execute({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'http://brev.ly/shandryll',
    })

    const { url } = await sut.execute({
      shortenedUrl: 'http://brev.ly/shandryll',
    })

    expect(url.id).toEqual(expect.any(String))
    expect(url.originalUrl).toEqual('http://www.google.com/shandryll')
    expect(url.shortenedUrl).toEqual('http://brev.ly/shandryll')
  })

  it('should not be able to get the original url using a shortened url that does not exist', async () => {
    await createUrl.execute({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'http://brev.ly/shandryll',
    })

    await expect(
      async () =>
        await sut.execute({
          shortenedUrl: 'http://brev.ly/not-found',
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
