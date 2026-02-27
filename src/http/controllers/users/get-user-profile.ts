import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { GetUserUseCase } from '@/use-cases/users/get-user-profile.js'
import { UserPresenter } from '../presenters/user-presenter.js'

export async function getUserById(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
        publicId: z.uuid(),
    })

  const { publicId } = getParamsSchema.parse(request.params)

  try {
    const usersRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(usersRepository)

    const { user } = await getUserUseCase.execute({ publicId })

    return reply.status(200).send({user: UserPresenter.toHTTP(user)})

  } catch (error: any) {
    return reply.status(404).send({ message: error.message })
  }
}