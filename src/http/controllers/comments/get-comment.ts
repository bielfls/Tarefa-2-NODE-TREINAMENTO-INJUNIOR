import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository.js'
import { GetCommentUseCase } from '@/use-cases/comments/get-comment.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getComment(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
        id: z.coerce.number(),
  })

  const { id } = getParamsSchema.parse(request.params)

  try {
      const commentsRepository = new PrismaCommentsRepository()
      const getCommentUseCase = new GetCommentUseCase(commentsRepository)

      const { comment } = await getCommentUseCase.execute({id})

      return reply.status(200).send(comment)
  
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: error.message})
        }
            
        throw error
    }
}