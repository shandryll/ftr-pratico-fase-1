import { app } from '@/app'
import { env } from '@/env'
import { logger } from '@/log/logger'

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  logger.info('HTTP server running!')
})
