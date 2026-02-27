import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'
import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository.js'
import { ListPostLikesUseCase } from '@/use-cases/likes/list-post-likes.js'

export async function listPostLikes(request: FastifyRequest, reply: FastifyReply) {
  const listPostLikesParamsSchema = z.object({
    id: z.coerce.number(),
  })

  const { id: postId } = listPostLikesParamsSchema.parse(request.params)

  try {
    const likesRepository = new PrismaLikesRepository()
    const postsRepository = new PrismaPostsRepository()
    
    const listPostLikesUseCase = new ListPostLikesUseCase(likesRepository, postsRepository)

    const { likes } = await listPostLikesUseCase.execute({ postId })

    return reply.status(200).send(likes)

  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}