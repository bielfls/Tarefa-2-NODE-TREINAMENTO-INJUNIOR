import type { CommentsRepository } from '@/repositories/comments-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface GetCommentUseCaseRequest {
  id: number
}

export class GetCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({ id }: GetCommentUseCaseRequest) {
    const comment = await this.commentsRepository.findById(id)

    if (!comment) {
      throw new ResourceNotFoundError
    }

    return { comment }
  }
}