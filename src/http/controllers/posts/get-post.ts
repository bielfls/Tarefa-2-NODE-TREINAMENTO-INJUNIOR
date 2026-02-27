import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository.js'
import { GetPostUseCase } from '@/use-cases/posts/get-post.js'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'

export async function getPost(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
        id: z.coerce.number(),
  })

  const { id } = getParamsSchema.parse(request.params)

  try {
      const postsRepository = new PrismaPostsRepository()
      const getPostUseCase = new GetPostUseCase(postsRepository)

      const { post } = await getPostUseCase.execute({id})

      return reply.status(200).send(post)
  
  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }

    throw error
  }
}