import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe.skip('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an url', async () => {
    const response = await request(app.server).post('/urls').send({
      originalUrl: 'http://www.google.com/shandryll',
      shortenedUrl: 'http://brev.ly/shandryll',
    })

    expect(response.statusCode).toEqual(201)
  })
})
