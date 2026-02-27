import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface DeleteUserUseCaseRequest {
  publicId: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ publicId }: DeleteUserUseCaseRequest) {
    const user = await this.usersRepository.findById(publicId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.delete(user.id)
  }
}