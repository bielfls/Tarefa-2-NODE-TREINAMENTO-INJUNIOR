import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository.js'
import { ListUserLikesUseCase } from '@/use-cases/likes/list-user-likes.js'

export async function listUserLikes(request: FastifyRequest, reply: FastifyReply) {
  const listUserLikesParamsSchema = z.object({
    publicId: z.uuid(),
  })

  const { publicId } = listUserLikesParamsSchema.parse(request.params)

  try {
    const likesRepository = new PrismaLikesRepository()
    const usersRepository = new PrismaUsersRepository()
    
    const listUserLikesUseCase = new ListUserLikesUseCase(likesRepository, usersRepository)

    const { likes } = await listUserLikesUseCase.execute({ publicId })

    return reply.status(200).send(likes)

  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}