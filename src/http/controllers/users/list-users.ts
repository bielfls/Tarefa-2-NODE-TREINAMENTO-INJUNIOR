import type { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { ListUsersUseCase } from '@/use-cases/users/list-users.js'
import { UserPresenter } from '../presenters/user-presenter.js'

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const usersRepository = new PrismaUsersRepository()
    const listUserUseCase = new ListUsersUseCase(usersRepository)

    const { users } = await listUserUseCase.execute()

    return reply.status(200).send({ users: UserPresenter.toHTTP(users) })
  } catch (error) {
    return reply.status(404).send({ message: (error as Error).message })
  }
}
