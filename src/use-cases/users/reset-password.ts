import { hash } from 'bcryptjs'
import type { User } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { InvalidTokenError } from '../errors/invalid-token.error.js'

interface ResetPasswordUseCaseRequest {
  token: string
  password: string
}

type ResetPasswordUseCaseResponse = {
  user: User
}

export class ResetPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    token,
    password,
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const passwordHash = await hash(password, 10)

    const userExists = await this.usersRepository.findbyToken(token)

    if (!userExists?.tokenExpiresAt || userExists.tokenExpiresAt < new Date()) {
      throw new InvalidTokenError()
    }

    const user = await this.usersRepository.update(userExists.id, {
      passwordHash,
      token: null,
      tokenExpiresAt: null,
    })

    return { user }
  }
}
