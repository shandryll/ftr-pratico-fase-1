import type { FastifyInstance } from 'fastify'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createShortlinkRoute: FastifyPluginAsyncZod = async (
  server: FastifyInstance
) => {
  server.post(
    '/create',
    {
      schema: {
        summary: 'Create a shortlink',
        body: z.object({
          originalUrl: z.string().url(),
          shortenedUrl: z.string().url(),
        }),
        response: {
          201: z
            .object({ shortenedUrl: z.string() })
            .describe('Shortlink create successfully.'),
          409: z
            .object({ message: z.string() })
            .describe('Shortlink already exists.'),
        },
      },
    },
    async (request, reply) => {
      return reply.status(201).send({ shortenedUrl: 'brev.ly/shandryll' })
    }
  )
}
