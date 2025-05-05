import { InMemoryUrlsRepository } from '@/repositories/in-memory/in-memory-urls-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUrlUseCase } from './create-url'
import { InvalidUrlFormatError } from './errors/invalid-url-format-error'
import { UrlAlreadyExistsError } from './errors/url-already-exists-error'

let sutRepository: InMemoryUrlsRepository
let sut: CreateUrlUseCase

describe('Create Url Use Case', () => {
  beforeEach(() => {
    sutRepository = new InMemoryUrlsRepository()
    sut = new CreateUrlUseCase(sutRepository)
  })

  it('should be able to create an url', async () => {
    const { url } = await sut.execute({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'shandryll',
    })

    expect(url.id).toEqual(expect.any(String))
  })

  it('should not be able to create a link with an invalid shortened URL format', async () => {
    await expect(
      async () =>
        await sut.execute({
          originalUrl: 'http://www.google.com/shandryll',
          shortenedUrl: '$h@ndry11',
        })
    ).rejects.toBeInstanceOf(InvalidUrlFormatError)
  })

  it('should not be able to create an url with an already existing shortened URL', async () => {
    await sut.execute({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'shandryll',
    })

    await expect(
      async () =>
        await sut.execute({
          originalUrl: 'http://www.google.com/shandryll',
          shortenedUrl: 'shandryll',
        })
    ).rejects.toBeInstanceOf(UrlAlreadyExistsError)
  })
})
