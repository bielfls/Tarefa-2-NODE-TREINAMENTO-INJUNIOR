import type { LikesRepository } from '@/repositories/likes-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface GetLikeUseCaseRequest {
  id: number
}

export class GetLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({ id }: GetLikeUseCaseRequest) {
    const like = await this.likesRepository.findById(id)

    if (!like) {
      throw new ResourceNotFoundError
    }

    return { like }
  }
}