import type { FastifyInstance } from 'fastify'
import { createUrl } from './create'
import { deleteUrl } from './delete'

export async function urlsRoutes(app: FastifyInstance) {
  app.post('/urls', createUrl)
  app.delete('/urls/:id', deleteUrl)
}
