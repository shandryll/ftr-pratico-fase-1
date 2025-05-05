import { InMemoryUrlsRepository } from '@/repositories/in-memory/in-memory-urls-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUrlUseCase } from './create-url'
import { UpdateUrlAccessCounterUseCase } from './update-url-access-counter'

let sutRepository: InMemoryUrlsRepository
let sut: UpdateUrlAccessCounterUseCase
let createUrl: CreateUrlUseCase

describe('Update Url Access Counter Use Case', () => {
  beforeEach(() => {
    sutRepository = new InMemoryUrlsRepository()
    sut = new UpdateUrlAccessCounterUseCase(sutRepository)
    createUrl = new CreateUrlUseCase(sutRepository)
  })

  it('should be able to increase the counter of access on an url', async () => {
    const { url } = await createUrl.execute({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'shandryll',
    })

    expect(url.urlAccessCounter).toEqual(0)

    await sut.execute({ urlId: url.id })
    await sut.execute({ urlId: url.id })
    await sut.execute({ urlId: url.id })
    await sut.execute({ urlId: url.id })
    await sut.execute({ urlId: url.id })

    expect(url.urlAccessCounter).toEqual(5)
  })
})
