import type { CommentsRepository } from '@/repositories/comments-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface UpdateCommentUseCaseRequest {
  id: number
  conteudo?: string
}

export class UpdateCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({ id, conteudo }: UpdateCommentUseCaseRequest) {
    // 1. Verificar se o post existe
    const comment = await this.commentsRepository.findById(id)

    if (!comment) {
        throw new ResourceNotFoundError()
    }

    await this.commentsRepository.update(id, {
      conteudo,
    })
  }
}