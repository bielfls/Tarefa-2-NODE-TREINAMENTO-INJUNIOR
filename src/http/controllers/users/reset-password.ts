import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { ResetPasswordUseCase } from '@/use-cases/users/reset-password.js'
import { InvalidTokenError } from '@/use-cases/errors/invalid-token.error.js'

export async function resetPassword(request: FastifyRequest, reply: FastifyReply) {
  const resetPasswordBodySchema = z.object({
    token: z.string(),
    password: z.string().min(3),
  })

  try {
    const { token, password } = resetPasswordBodySchema.parse(request.body)

    const usersRepository = new PrismaUsersRepository()
    const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository)

    await resetPasswordUseCase.execute({ token, password })

    return reply.status(200).send({ message: 'Senha alterada!' })
  } catch (error) {
    if (error instanceof InvalidTokenError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }
}