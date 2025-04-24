import { logger } from '@/log/logger'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateUrlAccessCounterUseCase } from '@/use-cases/factories/make-update-url-access-counter-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateUrlAccessCounter(request: FastifyRequest, reply: FastifyReply) {
  const updateUrlAccessCounterParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = updateUrlAccessCounterParamsSchema.parse(request.params)

  try {
    const updateUrlAccessCounterUseCase = makeUpdateUrlAccessCounterUseCase()

    await updateUrlAccessCounterUseCase.execute({ urlId: id })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    logger.error(err)
    throw err
  }
  return reply.status(200).send()
}
