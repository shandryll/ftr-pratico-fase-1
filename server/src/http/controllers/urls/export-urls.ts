import { randomUUID } from 'node:crypto'
import { env } from '@/env'
import { s3 } from '@/lib/s3'
import { logger } from '@/log/logger'
import { makeExportUrlsUseCase } from '@/use-cases/factories/make-export-urls-use-case'
import { NoContentResponse } from '@/use-cases/responses/no-content-response'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function exportUrls(request: FastifyRequest, reply: FastifyReply) {
  try {
    const exportUrls = makeExportUrlsUseCase()

    const csvUrls = await exportUrls.execute()

    if (csvUrls instanceof NoContentResponse) {
      return reply.status(204).send({ message: csvUrls.message })
    }

    const filename = `exports/urls-${Date.now()}_${randomUUID()}.csv`

    const buffer = Buffer.from(csvUrls, 'utf-8')

    await s3.send(
      new PutObjectCommand({
        Bucket: env.BUCKET_NAME,
        Key: filename,
        Body: buffer,
        ContentType: 'text/csv; charset=utf-8',
        ContentLength: buffer.length,
      })
    )

    const publicUrl = `https://${env.BUCKET_NAME}.s3.amazonaws.com/${filename}`

    logger.info('CSV uploaded to S3 successfully!')

    return reply.status(200).send({ url: publicUrl })
  } catch (err) {
    logger.error(err)
    throw err
  }
}
