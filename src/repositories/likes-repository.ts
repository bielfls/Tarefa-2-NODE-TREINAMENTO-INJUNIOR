import type { Prisma, Like } from '@/@types/prisma/client.js'

export interface LikesRepository {
  create(data: Prisma.LikeUncheckedCreateInput): Promise<Like>
  delete(id: number): Promise<Like>
  findById(id: number): Promise<Like | null>
  findManyByUserId(userId: number): Promise<Like[]>
  findManyByPostId(postId: number): Promise<Like[]>
  findManyByCommentId(commentId: number): Promise<Like[]>
}