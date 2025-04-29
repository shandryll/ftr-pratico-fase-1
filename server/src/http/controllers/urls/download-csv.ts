import { env } from '@/env'
import { s3 } from '@/lib/s3'
import { logger } from '@/log/logger'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function downloadCSV(request: FastifyRequest, reply: FastifyReply) {
  const downloadCSVBodySchema = z.object({
    key: z.string().min(1),
  })

  const { key } = downloadCSVBodySchema.parse(request.query)

  try {
    const command = new GetObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: key,
    })

    const response = await s3.send(command)

    if (!response.Body) {
      return reply.status(404).send({ message: 'File not found.' })
    }

    const filename = key.split('/').pop()

    reply
      .header('Content-Type', 'text/csv; charset=utf-8')
      .header('Content-Disposition', `attachment; filename="${filename}"`)

    logger.info('CSV downloaded successfully!')

    return reply.status(200).send(response.Body)
  } catch (err) {
    logger.error(err)
    throw err
  }
}
