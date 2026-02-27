import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository.js'
import { DeleteCommentUseCase } from '@/use-cases/comments/delete-comment.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteCommentById(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
        id: z.coerce.number(),
    })

  const { id } = getParamsSchema.parse(request.params)

  try {
    const commentsRepository = new PrismaCommentsRepository()
    const deleteCommentUseCase = new DeleteCommentUseCase(commentsRepository)

    await deleteCommentUseCase.execute({ id })

    return reply.status(204).send()

  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}