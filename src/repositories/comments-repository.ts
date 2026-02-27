import type { Prisma, Comment } from '@/@types/prisma/client.js'

export interface CommentsRepository {
  create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>
  findById(id: number): Promise<Comment | null>
  list(): Promise<Comment[]>
  findManyByUserId(userId: number): Promise<Comment[]>
  findManyByPostId(postId: number): Promise<Comment[]>
  delete(id: number): Promise<Comment>
  update(id: number, data: Prisma.CommentUncheckedUpdateInput): Promise<Comment>
}