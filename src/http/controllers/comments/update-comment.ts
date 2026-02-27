import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository.js'
import { UpdateCommentUseCase } from '@/use-cases/comments/update-comment.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'


export async function updateComment(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
      id: z.coerce.number(),
  })

  const updateCommentBodySchema = z.object({
      conteudo: z.string().min(1).optional(),
  })

  const { id } = updateParamsSchema.parse(request.params)
  const { conteudo } = updateCommentBodySchema.parse(request.body)

  try {
    const commentsRepository = new PrismaCommentsRepository()
    const updateCommentUseCase = new UpdateCommentUseCase(commentsRepository)

    await updateCommentUseCase.execute({
      id,
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