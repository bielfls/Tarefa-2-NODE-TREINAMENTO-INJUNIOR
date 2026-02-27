import type { Like } from '@/@types/prisma/client.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'

interface ListCommentLikesUseCaseRequest {
  commentId: number
}

type ListCommentLikesUseCaseResponse = {
    likes: Like[]
}

export class ListCommentLikesUseCase {
    constructor(
    private likesRepository: LikesRepository,
    private commentsRepository: CommentsRepository
    ) {}
        
    async execute({ commentId }: ListCommentLikesUseCaseRequest): Promise<ListCommentLikesUseCaseResponse> {

        const comment = await this.commentsRepository.findById(commentId)

        if (!comment) {
            throw new ResourceNotFoundError()
        }

        const likes = await this.likesRepository.findManyByCommentId(commentId)

        return { likes }
    }
}