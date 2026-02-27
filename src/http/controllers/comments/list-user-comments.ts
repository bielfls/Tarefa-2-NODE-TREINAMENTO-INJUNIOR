import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository.js'
import { ListUserCommentsUseCase } from '@/use-cases/comments/list-user-comments.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'

export async function listUserComments(request: FastifyRequest, reply: FastifyReply) {
  const listUserCommentsParamsSchema = z.object({
    publicId: z.uuid(),
  })

  const { publicId } = listUserCommentsParamsSchema.parse(request.params)

  try {
    const commentsRepository = new PrismaCommentsRepository()
    const usersRepository = new PrismaUsersRepository()
    
    const listUserCommentsUseCase = new ListUserCommentsUseCase(commentsRepository, usersRepository)

    const { comments } = await listUserCommentsUseCase.execute({ publicId })

    return reply.status(200).send(comments)

  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}