import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository.js'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { ListUserPostsUseCase } from '@/use-cases/posts/list-user-posts.js'
import { ResourceNotFoundError } from '@/use-cases/errors/resourse-not-found-errors.js'

export async function listUserPosts(request: FastifyRequest, reply: FastifyReply) {
  const listUserPostsParamsSchema = z.object({
    publicId: z.uuid(),
  })

  const { publicId } = listUserPostsParamsSchema.parse(request.params)

  try {
    const postsRepository = new PrismaPostsRepository()
    const usersRepository = new PrismaUsersRepository()
    
    const listUserPostsUseCase = new ListUserPostsUseCase(postsRepository, usersRepository)

    const { posts } = await listUserPostsUseCase.execute({ publicId })

    return reply.status(200).send(posts)

  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message})
    }
        
    throw error
  }
}