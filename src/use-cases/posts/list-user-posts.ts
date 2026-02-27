import type { PostsRepository } from '@/repositories/posts-repository.js'
import type { Post } from '@/@types/prisma/client.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface ListUserPostsUseCaseRequest {
  publicId: string
}

type ListUserPostsUseCaseResponse = {
    posts: Post[]
}

export class ListUserPostsUseCase {
    constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository
    ) {}
        
    async execute({ publicId: userpublicId }: ListUserPostsUseCaseRequest): Promise<ListUserPostsUseCaseResponse> {

        const user = await this.usersRepository.findById(userpublicId)

        if (!user) {
            throw new ResourceNotFoundError()
        }

        const posts = await this.postsRepository.findByUserId(user.id)

        return { posts }
    }
}