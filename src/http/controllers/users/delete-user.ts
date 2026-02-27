import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { DeleteUserUseCase } from '@/use-cases/users/delete-user.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'

export async function deleteUserById(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
        publicId: z.uuid(),
    })

  const { publicId } = getParamsSchema.parse(request.params)

  try {
    const usersRepository = new PrismaUsersRepository()
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

    await deleteUserUseCase.execute({ publicId })

    return reply.status(204).send()

  } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message})
        }
  }
}