import type { UsersRepository } from '@/repositories/users-repository.js'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error.js'

interface UpdateUserUseCaseRequest {
  publicId: string
  name?: string
  foto?: string
  email?: string
  password?: string
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ publicId, name, foto, email, password }: UpdateUserUseCaseRequest) {
    const user = await this.usersRepository.findById(publicId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    if (email) {
      const userWithSameEmail = await this.usersRepository.findByEmail(email)
      if (userWithSameEmail && userWithSameEmail.publicId !== publicId) {
        throw new UserAlreadyExistsError
      }
    }

    let passwordHash: string | undefined = undefined
    
    if (password) {
      passwordHash =  await hash(password, 10)
    }

    await this.usersRepository.update(user.id, {
      name,
      foto,
      email,
      passwordHash,
    })
  }
}