import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'
import { ListPostCommentsUseCase } from '@/use-cases/comments/list-post-comments.js'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository.js'

export async function listPostComments(request: FastifyRequest, reply: FastifyReply) {
  const listPostCommentsParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id: postId } = listPostCommentsParamsSchema.parse(request.params)

  try {
    const commentsRepository = new PrismaCommentsRepository()
    const postsRepository = new PrismaPostsRepository()
    
    const listPostCommentsUseCase = new ListPostCommentsUseCase(commentsRepository, postsRepository)

    const { comments } = await listPostCommentsUseCase.execute({ postId })

    return reply.status(200).send(comments)

  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}