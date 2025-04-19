import { InMemoryShortlinksRepository } from '@/repositories/in-memory/in-memory-shortlinks-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateShortlinkUseCase } from './create-shortlink'
import { InvalidUrlFormatError } from './errors/invalid-url-format-error'
import { ShortlinkAlreadyExistsError } from './errors/shortlink-already-exists-error'

let sutRepository: InMemoryShortlinksRepository
let sut: CreateShortlinkUseCase

describe('Create Shortlink Use Case', () => {
  beforeEach(() => {
    sutRepository = new InMemoryShortlinksRepository()
    sut = new CreateShortlinkUseCase(sutRepository)
  })

  it('should be able to create shortlink', async () => {
    const { shortlink } = await sut.execute({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'http://brev.ly/shandryll',
    })

    expect(shortlink.id).toEqual(expect.any(String))
  })

  it('should not be able to create a link with an invalid shortened URL format', async () => {
    await expect(
      async () =>
        await sut.execute({
          originalUrl: 'http://www.google.com/shandryll',
          shortenedUrl: 'http://br&v.ly/$h@ndry11',
        })
    ).rejects.toBeInstanceOf(InvalidUrlFormatError)
  })

  it('should not be able to create an url with an already existing shortened URL', async () => {
    await sut.execute({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'http://brev.ly/shandryll',
    })

    await expect(
      async () =>
        await sut.execute({
          originalUrl: 'http://www.google.com/shandryll',
          shortenedUrl: 'http://brev.ly/shandryll',
        })
    ).rejects.toBeInstanceOf(ShortlinkAlreadyExistsError)
  })
})
