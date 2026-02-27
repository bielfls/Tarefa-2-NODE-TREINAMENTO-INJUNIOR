import type { Like } from '@/@types/prisma/client.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'

interface ListPostLikesUseCaseRequest {
  postId: number
}

type ListPostLikesUseCaseResponse = {
    likes: Like[]
}

export class ListPostLikesUseCase {
    constructor(
    private likesRepository: LikesRepository,
    private postsRepository: PostsRepository
    ) {}
        
    async execute({ postId }: ListPostLikesUseCaseRequest): Promise<ListPostLikesUseCaseResponse> {

        const post = await this.postsRepository.findById(postId)

        if (!post) {
            throw new ResourceNotFoundError()
        }

        const likes = await this.likesRepository.findManyByPostId(postId)

        return { likes }
    }
}