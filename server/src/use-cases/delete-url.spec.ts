import { InMemoryUrlsRepository } from '@/repositories/in-memory/in-memory-urls-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUrlUseCase } from './create-url'
import { DeleteUrlUseCase } from './delete-url'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let sutRepository: InMemoryUrlsRepository
let sut: DeleteUrlUseCase
let createUrl: CreateUrlUseCase

describe('Delete Url Use Case', () => {
  beforeEach(() => {
    sutRepository = new InMemoryUrlsRepository()
    sut = new DeleteUrlUseCase(sutRepository)
    createUrl = new CreateUrlUseCase(sutRepository)
  })

  it('should be able to delete an url', async () => {
    const urls = sutRepository.urls

    const { url } = await createUrl.execute({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'shandryll',
    })

    await sut.execute({ urlId: url.id })

    const stillExists = urls.find(urls => urls.id === url.id)

    expect(stillExists).toBeUndefined()
  })

  it('should not be able to delete an url if not exists', async () => {
    await expect(
      async () =>
        await sut.execute({
          urlId: '2d98892e-c408-4833-973e-86f0f40c874b',
        })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
