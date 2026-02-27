import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UpdatePostUseCase } from '@/use-cases/posts/update-post.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
      id: z.coerce.number(),
  })

  const updatePostBodySchema = z.object({
      titulo: z.string().min(1).max(100).optional(),
      conteudo: z.string().min(1).optional(),
  })

  const { id } = updateParamsSchema.parse(request.params)
  const { titulo, conteudo } = updatePostBodySchema.parse(request.body)

  try {
    const postsRepository = new PrismaPostsRepository()
    const updatePostUseCase = new UpdatePostUseCase(postsRepository)

    await updatePostUseCase.execute({
      id,
      titulo,
      conteudo
    })

    return reply.status(204).send()

  } catch (error) {
      if(error instanceof ResourceNotFoundError) {
        return reply.status(404).send({ message: error.message})
      }
          
      throw error
  }
}