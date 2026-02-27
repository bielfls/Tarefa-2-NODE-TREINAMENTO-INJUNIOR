import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository.js'
import { ListCommentsUseCase } from '@/use-cases/comments/list-comments.js'

export async function listComments(_request: FastifyRequest, reply: FastifyReply) {
  const commentsRepository = new PrismaCommentsRepository()
  const listCommentsUseCase = new ListCommentsUseCase(commentsRepository)

  const { comments } = await listCommentsUseCase.execute()

  return reply.status(200).send(comments)
}