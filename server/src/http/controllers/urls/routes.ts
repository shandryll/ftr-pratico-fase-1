import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createUrl } from './create'
import { deleteUrl } from './delete'
import { fetchUrls } from './fetch-urls'
import { getOriginalUrl } from './get-original-url'
import { updateUrlAccessCounter } from './update-url-access-counter'

export const urlsRoutes: FastifyPluginAsyncZod = async (app: FastifyInstance) => {
  app.post('/', createUrl)
  app.get('/', fetchUrls)
  app.get('/filter/:shortenedUrl', getOriginalUrl)
  app.patch('/:id', updateUrlAccessCounter)
  app.delete('/:id', deleteUrl)
}
