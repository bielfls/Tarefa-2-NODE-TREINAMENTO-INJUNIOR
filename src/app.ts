import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { z, ZodError } from 'zod'
import cors from '@fastify/cors'
import { env } from './env/index.js'
import { appRoutes } from './http/routes.js'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})

app.register(cors)

app.register(appRoutes)

//rota de erro de zod e syntax
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Dados de registro inválidos!',
      details: z.treeifyError(error),
    })
  }

  if (error instanceof SyntaxError) {
    return reply.status(400).send({
      message:
        'O corpo da requisição não está em formato JSON válido. Verifique a estrutura dos dados enviados.',
    })
  }

  return reply.status(500).send({ message: 'Erro interno do servidor!' })
})