import type { FastifyInstance } from 'fastify'
import { createUrl } from './create'
import { deleteUrl } from './delete'
import { downloadCSV } from './download-csv'
import { exportUrls } from './export-urls'
import { fetchUrls } from './fetch-urls'
import { getOriginalUrl } from './get-original-url'
import { updateUrlAccessCounter } from './update-url-access-counter'

export const urlsRoutes = async (app: FastifyInstance) => {
  app.post('/', createUrl)
  app.get('/', fetchUrls)
  app.get('/filter', getOriginalUrl)
  app.get('/export', exportUrls)
  app.get('/download', downloadCSV)
  app.patch('/:id', updateUrlAccessCounter)
  app.delete('/:id', deleteUrl)
}
