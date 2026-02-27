import { PrismaLikesRepository } from '@/repositories/prisma/prisma-likes-repository.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'
import { GetLikeUseCase } from '@/use-cases/likes/get-like.js'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getLike(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
        id: z.coerce.number(),
  })

  const { id } = getParamsSchema.parse(request.params)

  try {
      const likesRepository = new PrismaLikesRepository()
      const getLikeUseCase = new GetLikeUseCase(likesRepository)

      const { like } = await getLikeUseCase.execute({id})

      return reply.status(200).send(like)
  
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
          return reply.status(404).send({ message: error.message})
        }
            
        throw error
    }
}