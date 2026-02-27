import type { Like } from '@/@types/prisma/client.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'

interface ListUserLikesUseCaseRequest {
  publicId: string
}

type ListUserLikesUseCaseResponse = {
    likes: Like[]
}

export class ListUserLikesUseCase {
    constructor(
    private likesRepository: LikesRepository,
    private usersRepository: UsersRepository
    ) {}
        
    async execute({ publicId: userpublicId }: ListUserLikesUseCaseRequest): Promise<ListUserLikesUseCaseResponse> {

        const user = await this.usersRepository.findById(userpublicId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        const likes = await this.likesRepository.findManyByUserId(user.id)

        return { likes }
    }
}