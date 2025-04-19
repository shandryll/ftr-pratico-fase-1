import type { FastifyInstance } from 'fastify'
import { create } from './create'

export async function urlsRoutes(app: FastifyInstance) {
  app.post('/urls', create)
}
