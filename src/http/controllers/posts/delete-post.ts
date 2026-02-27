import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'
import { DeletePostUseCase } from '@/use-cases/posts/delete-post.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deletePostById(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
        id: z.coerce.number(),
    })

  const { id } = getParamsSchema.parse(request.params)

  try {
    const postsRepository = new PrismaPostsRepository()
    const deletePostUseCase = new DeletePostUseCase(postsRepository)

    await deletePostUseCase.execute({ id })

    return reply.status(204).send()

  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}