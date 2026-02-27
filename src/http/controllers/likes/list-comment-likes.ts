import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository.js'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository.js'
import { ListCommentLikesUseCase } from '@/use-cases/likes/list-comment-likes.js'

export async function listCommentLikes(request: FastifyRequest, reply: FastifyReply) {
  const listCommentLikesParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id: commentId } = listCommentLikesParamsSchema.parse(request.params)

  try {
    const likesRepository = new PrismaLikesRepository()
    const commentsRepository = new PrismaCommentsRepository()
    
    const listCommentLikesUseCase = new ListCommentLikesUseCase(likesRepository, commentsRepository)

    const { likes } = await listCommentLikesUseCase.execute({ commentId })

    return reply.status(200).send(likes)

  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}