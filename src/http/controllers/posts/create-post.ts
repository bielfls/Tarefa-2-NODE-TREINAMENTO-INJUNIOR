import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository.js'
import { CreatePostUseCase } from '@/use-cases/posts/create-post.js'

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const createPostBodySchema = z.object({
      titulo: z.string().min(1).max(100),
      conteudo: z.string().min(1),
  })

  const { titulo, conteudo} = createPostBodySchema.parse(request.body)

  try {
    const postsRepository = new PrismaPostsRepository()
    const createPostUseCase = new CreatePostUseCase(postsRepository)

    const userId = Number(request.user.sub)

    const { post } = await createPostUseCase.execute({
      titulo,
      conteudo,
      userId
    })

    return reply.status(201).send(post)

  } catch (error: any) {
    return reply.status(409).send({ message: error.message })
  }
}