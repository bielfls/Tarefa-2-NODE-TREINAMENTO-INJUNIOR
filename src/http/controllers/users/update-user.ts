import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { UpdateUserUseCase } from '@/use-cases/users/update-user.js' // Ajuste o caminho/nome se precisar

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
      publicId: z.uuid(),
  })

  const updateUserBodySchema = z.object({
      name: z.string().trim().min(1).max(100).optional(),
      foto: z.string().optional(),
      email: z.email().max(100).optional(),
      password: z.string().min(8).max(100).optional(),
  })

  const { publicId } = updateParamsSchema.parse(request.params)
  const { name, foto, email, password } = updateUserBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const updateUserUseCase = new UpdateUserUseCase(usersRepository)

    await updateUserUseCase.execute({
      publicId,
      name,
      foto,
      email,
      password
    })

    return reply.status(204).send()

  } catch (error: any) {
    return reply.status(400).send({ message: error.message })
  }
}