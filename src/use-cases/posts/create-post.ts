import type { PostsRepository } from '@/repositories/posts-repository.js'

interface CreatePostUseCaseRequest {
  titulo: string
  conteudo: string
  userId: number
}

export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ titulo, conteudo, userId }: CreatePostUseCaseRequest) {

    const post = await this.postsRepository.create({
      titulo,
      conteudo,
      userId,
    })

    return { post }
  }
}