import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { PostsRepository } from '@/repositories/posts-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'
import type { LikesRepository } from '@/repositories/likes-repository.js'

interface CreateLikeUseCaseRequest {
  userId: number
  postId?: number
  commentId?: number
}

export class CreateLikeUseCase {
  constructor(
    private likesRepository: LikesRepository, 
    private postsRepository: PostsRepository, 
    private commentsRepository: CommentsRepository
  ) {}

  async execute({ userId, postId, commentId }: CreateLikeUseCaseRequest) {
    if (!postId && !commentId) {
      throw new Error('É necessário informar o ID de um post ou de um comentário.')
    }

    let like;

    if (postId) {
        const post = await this.postsRepository.findById(postId)
        if (!post) {
            throw new ResourceNotFoundError()
        }
        
        like = await this.likesRepository.create({
            userId,
            postId,
        })
    } else if (commentId) {
        const comment = await this.commentsRepository.findById(commentId)
        if (!comment) {
            throw new ResourceNotFoundError()
        }
        
        like = await this.likesRepository.create({
            userId,
            commentId,
        })
    }

    return { like }
  }
}