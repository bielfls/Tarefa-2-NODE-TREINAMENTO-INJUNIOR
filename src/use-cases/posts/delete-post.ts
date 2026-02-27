import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface DeletePostUseCaseRequest {
  id: number
}

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ id }: DeletePostUseCaseRequest) {
    const post = await this.postsRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError()
    }
    
    await this.postsRepository.delete(id)
  }
}