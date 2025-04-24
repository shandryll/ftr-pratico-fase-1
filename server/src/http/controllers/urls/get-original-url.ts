import { logger } from '@/log/logger'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOriginalUrlUseCase } from '@/use-cases/factories/make-get-original-url-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOriginalUrl(request: FastifyRequest, reply: FastifyReply) {
  const getOriginalUrlQuerySchema = z.object({
    shortenedUrl: z.string().url(),
  })

  const { shortenedUrl } = getOriginalUrlQuerySchema.parse(request.query)

  try {
    const getOriginalUrlUseCase = makeGetOriginalUrlUseCase()

    const url = await getOriginalUrlUseCase.execute({ shortenedUrl })

    return reply.status(200).send(url)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    logger.error(err)
    throw err
  }
}
