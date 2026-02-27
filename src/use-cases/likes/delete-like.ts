import type { LikesRepository } from '@/repositories/likes-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface DeleteLikeUseCaseRequest {
  id: number
}

export class DeleteLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({ id }: DeleteLikeUseCaseRequest) {
    const like = await this.likesRepository.findById(id)

    if (!like) {
      throw new ResourceNotFoundError()
    }
    
    await this.likesRepository.delete(id)
  }
}