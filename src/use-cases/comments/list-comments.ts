import type { Comment } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'

type ListCommentsUseCaseResponse = {
    comments: Comment[]
}

export class ListCommentsUseCase {
    constructor(private commentsRepository: CommentsRepository) {}
        
    async execute(): Promise<ListCommentsUseCaseResponse> {
        const comments = await this.commentsRepository.list()

        return { comments }
    }
}