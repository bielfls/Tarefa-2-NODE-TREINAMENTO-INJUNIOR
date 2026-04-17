import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'staging', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().min(1024).max(65535).default(3333),
  HOST: z.string().default('0.0.0.0'),

  DATABASE_URL: z.string(),

  JWT_SECRET: z.string(),

  EMAIL_USER: z.email(),
  EMAIL_PASS: z.string(),

  CRON_SCHEDULE: z.string(),

  REDIS_HOST: z.string().default('127.0.0.1'),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables.', _env.error)

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
