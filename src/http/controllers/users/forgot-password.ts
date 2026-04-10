import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { ForgotPasswordUseCase } from '@/use-cases/users/forgot-password.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'

export async function forgotPassword(request: FastifyRequest, reply: FastifyReply) {
  const forgotPasswordBodySchema = z.object({
    email: z.email('Formato de e-mail inválido.'),
  })

  try {
    const { email } = forgotPasswordBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository)

    await forgotPasswordUseCase.execute({ email })

    return reply.status(200).send({ 
      message: 'Se o e-mail tiver login, um link de recuperação será enviado em instantes.' 
    })

  } catch (error) {
    //retornando a mesma coisa pra ter segurança
    if (error instanceof ResourceNotFoundError) {
      return reply.status(200).send({ 
        message: 'Se o e-mail estiver cadastrado, um link de recuperação será enviado em instantes.' 
      })
    }

    throw error
  }
}