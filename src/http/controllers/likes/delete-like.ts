import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'
import { DeleteLikeUseCase } from '@/use-cases/likes/delete-like.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteLikeById(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
        id: z.coerce.number(),
    })

  const { id } = getParamsSchema.parse(request.params)

  try {
    const likesRepository = new PrismaLikesRepository()
    const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository)

    await deleteLikeUseCase.execute({ id })

    return reply.status(204).send()

  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}