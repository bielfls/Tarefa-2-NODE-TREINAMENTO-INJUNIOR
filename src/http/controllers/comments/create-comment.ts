import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository.js'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository.js'
import { CreateCommentUseCase } from '@/use-cases/comments/create-comment.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'

export async function createComment(request: FastifyRequest, reply: FastifyReply) {
  const createCommentParamsSchema = z.object({
    postId: z.coerce.number(),
  })

  const createCommentBodySchema = z.object({
    conteudo: z.string().min(1),
  })

  const { postId } = createCommentParamsSchema.parse(request.params)
  const { conteudo } = createCommentBodySchema.parse(request.body)
  
  const userId = Number(request.user.sub)

  try {
    const commentsRepository = new PrismaCommentsRepository()
    const postsRepository = new PrismaPostsRepository()
    const createCommentUseCase = new CreateCommentUseCase(postsRepository, commentsRepository)

    const { comment } = await createCommentUseCase.execute({
      conteudo,
      userId,
      postId,
    })

    return reply.status(201).send(comment)
  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}