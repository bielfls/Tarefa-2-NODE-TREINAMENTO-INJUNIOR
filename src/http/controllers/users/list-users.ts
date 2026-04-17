import type { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { ListUsersUseCase } from '@/use-cases/users/list-users.js'
import { UserPresenter } from '../presenters/user-presenter.js'
import { redis } from '@/libs/redis.js'

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const cacheKey = 'users:all'

    const cachedUsers = await redis.get(cacheKey)

    if (cachedUsers) {
      return reply.status(200).send({ users: JSON.parse(cachedUsers) })
    }

    const usersRepository = new PrismaUsersRepository()
    const listUserUseCase = new ListUsersUseCase(usersRepository)

    const { users } = await listUserUseCase.execute()
    const formattedUsers = UserPresenter.toHTTP(users)

    await redis.set(cacheKey, JSON.stringify(formattedUsers), 'EX', 60)

    return reply.status(200).send({ users: formattedUsers })
  } catch (error) {
    return reply.status(404).send({ message: (error as Error).message })
  }
}