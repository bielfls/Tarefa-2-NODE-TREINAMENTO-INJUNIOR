import { hash } from 'bcryptjs'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error.js'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  foto: string
}

export class RegisterUseCase {

  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password, foto }: RegisterUseCaseRequest) {

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError
    }

    const passwordHash = await hash(password, 10)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      foto,
    })

    return { user }
  }
}