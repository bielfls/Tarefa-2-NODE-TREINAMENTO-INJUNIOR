import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface CreateCommentUseCaseRequest {
  conteudo: string
  userId: number
  postId: number
}

export class CreateCommentUseCase {
  constructor(private postsRepository: PostsRepository, private commentsRepository: CommentsRepository) {}

  async execute({ conteudo, userId, postId }: CreateCommentUseCaseRequest) {

    const post = await this.postsRepository.findById(postId)

    if(!post) {
        throw new ResourceNotFoundError()
    }

    const comment = await this.commentsRepository.create({
      conteudo,
      userId,
      postId,
    })

    return { comment }
  }
}