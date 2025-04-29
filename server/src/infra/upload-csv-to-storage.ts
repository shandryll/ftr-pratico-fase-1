import { env } from '@/env'
import { S3Client } from '@aws-sdk/client-s3'

const BUCKET_NAME = 'brev-lv'

export async function uploadCsvToStorage() {
  const passThrough = new PassThrough()
  csvStream.pipe(passThrough)
}
