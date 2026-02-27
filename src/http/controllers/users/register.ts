import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository.js'
import { RegisterUseCase } from '@/use-cases/users/register.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
      name: z.string().trim().min(1).max(100),
      foto: z.string(),
      email: z.email().max(100),
      password: z.string().min(8).max(100),
  })

  const { name, foto, email, password } = registerBodySchema.parse(request.body)

  try {

    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password, foto })

  } catch (error: any) {
    return reply.status(409).send({ message: error.message })
  }

  return reply.status(201).send()
}