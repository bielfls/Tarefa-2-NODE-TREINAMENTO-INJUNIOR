import type { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository.js'
import { ListPostsUseCase } from '@/use-cases/posts/list-posts.js'

export async function listPosts(_request: FastifyRequest, reply: FastifyReply) {
  const postsRepository = new PrismaPostsRepository()
  const listPostsUseCase = new ListPostsUseCase(postsRepository)

  const { posts } = await listPostsUseCase.execute()

  return reply.status(200).send(posts)
}