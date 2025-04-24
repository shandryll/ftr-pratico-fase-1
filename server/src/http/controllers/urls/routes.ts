import type { FastifyInstance } from 'fastify'
import { createUrl } from './create'
import { deleteUrl } from './delete'
import { getOriginalUrl } from './get-original-url'

export async function urlsRoutes(app: FastifyInstance) {
  app.get('/urls', getOriginalUrl)
  app.post('/urls', createUrl)
  app.delete('/urls/:id', deleteUrl)
}
