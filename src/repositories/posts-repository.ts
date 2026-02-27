import type { Prisma, Post } from '@/@types/prisma/client.js'

export interface PostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>
  list(): Promise<Post[]>
  findById(id: number): Promise<Post | null>
  update(id: number, data: Prisma.PostUncheckedUpdateInput): Promise<Post>
  delete(id: number): Promise<Post>
  findByUserId(userId: number): Promise<Post[]>
}