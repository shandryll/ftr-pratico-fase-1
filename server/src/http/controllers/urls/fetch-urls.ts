import { logger } from '@/log/logger'
import { makeFetchUrlsUseCase } from '@/use-cases/factories/make-fetch-urls-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchUrls(request: FastifyRequest, reply: FastifyReply) {
  try {
    const fetchUrlsUseCase = makeFetchUrlsUseCase()

    const urls = await fetchUrlsUseCase.execute()

    return reply.status(200).send(urls)
  } catch (err) {
    logger.error(err)
    throw err
  }
}
