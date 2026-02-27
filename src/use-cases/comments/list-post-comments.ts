import type { Comment } from '@/@types/prisma/client.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'

interface ListPostCommentsUseCaseRequest {
  postId: number
}

type ListPostCommentsUseCaseResponse = {
    comments: Comment[]
}

export class ListPostCommentsUseCase {
    constructor(
    private commentsRepository: CommentsRepository,
    private postsRepository: PostsRepository
    ) {}
        
    async execute({ postId }: ListPostCommentsUseCaseRequest): Promise<ListPostCommentsUseCaseResponse> {

        const post = await this.postsRepository.findById(postId)

        if (!post) {
            throw new ResourceNotFoundError()
        }

        const comments = await this.commentsRepository.findManyByPostId(postId)

        return { comments }
    }
}