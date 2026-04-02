import type { Comment } from '@/@types/prisma/client.js'
import type { CommentsRepository } from '@/repositories/comments-repository.js'
import type { UsersRepository } from '@/repositories/users-repository.js'
import { ResourceNotFoundError } from '../errors/resourse-not-found-errors.js'

interface ListUserCommentsUseCaseRequest {
  publicId: string
}

type ListUserCommentsUseCaseResponse = {
  comments: Comment[]
}

export class ListUserCommentsUseCase {
  constructor(
    private commentsRepository: CommentsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    publicId: userpublicId,
  }: ListUserCommentsUseCaseRequest): Promise<ListUserCommentsUseCaseResponse> {
    const user = await this.usersRepository.findById(userpublicId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const comments = await this.commentsRepository.findManyByUserId(user.id)

    return { comments }
  }
}
