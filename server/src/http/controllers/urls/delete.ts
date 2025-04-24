import { logger } from '@/log/logger'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteUrlUseCase } from '@/use-cases/factories/make-delete-url-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteUrl(request: FastifyRequest, reply: FastifyReply) {
  const deleteUrlParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = deleteUrlParamsSchema.parse(request.params)

  try {
    const deleteUseCase = makeDeleteUrlUseCase()

    await deleteUseCase.execute({ urlId: id })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    logger.error(err)
    throw err
  }

  return reply.status(204).send()
}
