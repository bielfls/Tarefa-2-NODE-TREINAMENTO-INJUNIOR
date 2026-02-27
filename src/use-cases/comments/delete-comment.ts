import type { CommentsRepository } from '@/repositories/comments-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface DeleteCommentUseCaseRequest {
  id: number
}

export class DeleteCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({ id }: DeleteCommentUseCaseRequest) {
    const comment = await this.commentsRepository.findById(id)

    if (!comment) {
      throw new ResourceNotFoundError()
    }
    
    await this.commentsRepository.delete(id)
  }
}