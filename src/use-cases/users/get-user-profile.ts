import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface GetUserUseCaseRequest {
  publicId: string
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ publicId }: GetUserUseCaseRequest) {
    const user = await this.usersRepository.findById(publicId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}