import { env } from '@/env'
import pino from 'pino'

export const logger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          level: 'error',
          options: {
            name: 'dev-terminal',
            colorize: true,
            levelFirst: true,
            include: 'level,time',
            translateTime: 'yyyy-mm-dd HH:MM:ss Z',
          },
        }
      : undefined,
})
