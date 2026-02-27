import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface GetPostUseCaseRequest {
  id: number
}

export class GetPostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ id }: GetPostUseCaseRequest) {
    const post = await this.postsRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError
    }

    return { post }
  }
}