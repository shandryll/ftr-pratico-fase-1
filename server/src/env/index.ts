import { z } from 'zod'
import 'dotenv/config'
import { logger } from '@/log/logger'

const envSchema = z.object({
  DATABASE_URL: z.string().url().startsWith('postgresql://'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.coerce.number().default(3333),
  BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
  logger.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
