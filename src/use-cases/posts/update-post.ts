import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface UpdatePostUseCaseRequest {
  id: number
  titulo?: string
  conteudo?: string
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ id, titulo, conteudo }: UpdatePostUseCaseRequest) {
    // 1. Verificar se o post existe
    const post = await this.postsRepository.findById(id)

    if (!post) {
        throw new ResourceNotFoundError()
    }

    await this.postsRepository.update(id, {
      titulo,
      conteudo,
    })
  }
}