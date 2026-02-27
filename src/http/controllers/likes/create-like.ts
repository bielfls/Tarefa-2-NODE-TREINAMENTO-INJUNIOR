import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository.js'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository.js'
import { CreateLikeUseCase } from '@/use-cases/likes/create-like.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'

export async function createLike(request: FastifyRequest, reply: FastifyReply) {
  const createLikeBodySchema = z.object({
    postId: z.number().optional(),
    commentId: z.number().optional(),
  })

  const { postId, commentId } = createLikeBodySchema.parse(request.body)

  const userId = Number(request.user.sub)

  try {
    const likesRepository = new PrismaLikesRepository()
    const postsRepository = new PrismaPostsRepository()
    const commentsRepository = new PrismaCommentsRepository()
    
    const createLikeUseCase = new CreateLikeUseCase(
        likesRepository, 
        postsRepository, 
        commentsRepository
    )

    const { like } = await createLikeUseCase.execute({
      userId,
      postId,
      commentId,
    })

    return reply.status(201).send(like)
  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}