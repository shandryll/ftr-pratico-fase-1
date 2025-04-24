import type { FastifyInstance } from 'fastify'
import { createUrl } from './create'
import { deleteUrl } from './delete'
import { fetchUrls } from './fetch-urls'
import { getOriginalUrl } from './get-original-url'
import { updateUrlAccessCounter } from './update-url-access-counter'

export async function urlsRoutes(app: FastifyInstance) {
  app.post('/urls', createUrl)
  app.get('/urls', fetchUrls)
  app.get('/url', getOriginalUrl)
  app.patch('/url/:id', updateUrlAccessCounter)
  app.delete('/url/:id', deleteUrl)
}
