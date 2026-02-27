import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { AuthenticateUseCase } from '@/use-cases/users/authenticate.js'
import { UserPresenter } from '../presenters/user-presenter.js'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    const { user } = await authenticateUseCase.execute({ email, password })

    const token = await reply.jwtSign(
      {
      sub: user.id,
      },
      { expiresIn: '1d' },
    )

    return reply.status(200).send({token, user: UserPresenter.toHTTP(user) })

  } catch (error: any) {
    return reply.status(401).send({ message: error.message })
  }
}