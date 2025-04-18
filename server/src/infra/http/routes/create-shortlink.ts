import { createShortlink } from '@/app/use-cases/create-shortlink'
import type { FastifyInstance } from 'fastify'
import type { FastifyReply, FastifyRequest } from 'fastify'
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
            .object({ remoteKey: z.string() })
            .describe('Shortlink create successfully.'),
          409: z
            .object({ message: z.string() })
            .describe('Shortlink already exists.'),
        },
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const createShortlinkBodySchema = z.object({
        originalUrl: z.string(),
        shortenedUrl: z.string(),
      })

      const { originalUrl, shortenedUrl } = createShortlinkBodySchema.parse(
        request.body
      )

      await createShortlink({
        originalUrl,
        shortenedUrl,
      })

      return reply.status(201).send({ remoteKey: 'brev.ly/shandryll' })
    }
  )
}

// await db.insert(schema.shortlinks).values({
//   originalUrl: 'http://google.com/shandryll',
//   shortenedUrl: 'http://brev.ly/shandryll',
//   accessCounter: 0,
//   remoteKey: 'http://brev.ly/shandryll',
//   remoteUrl: 'http://s3.com/fsdfha290h9fh2nc20c',
// })
