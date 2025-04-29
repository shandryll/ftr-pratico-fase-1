import { env } from '@/env'
import { s3 } from '@/lib/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function downloadCSV(
  request: FastifyRequest<{ Params: { file: string } }>,
  reply: FastifyReply
) {
  const { file } = request.params

  if (!file) {
    return reply.status(400).send({ message: 'File parameter is required.' })
  }

  try {
    const command = new GetObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: `exports/${file}`,
    })

    const response = await s3.send(command)

    if (!response.Body) {
      return reply.status(404).send({ message: 'File not found.' })
    }

    reply
      .header('Content-Type', 'text/csv; charset=utf-8')
      .header('Content-Disposition', `attachment; filename="${file}"`)

    return reply.send(response.Body)
  } catch (err) {
    console.error(err)
    return reply.status(500).send({ message: 'Failed to download the file.' })
  }
}
