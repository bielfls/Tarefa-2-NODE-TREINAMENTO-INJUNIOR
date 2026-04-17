import { Redis } from 'ioredis'
import { env } from '@/env/index.js'

export const redis = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
})

redis.on('connect', () => {
  console.log('Conectado ao Redis com sucesso!');
})

redis.on('error', (error) => {
  console.error('Erro ao conectar no Redis:', error);
})