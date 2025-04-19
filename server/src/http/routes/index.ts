import type { FastifyInstance } from 'fastify'
import { createShortlinkRoute } from './create-shortlink'

export async function registerRoutes(server: FastifyInstance) {
  server.register(createShortlinkRoute)
}
