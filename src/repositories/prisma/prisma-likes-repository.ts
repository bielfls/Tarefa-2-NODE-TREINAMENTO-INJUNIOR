import { prisma } from '@/libs/prisma.js'
import type { Prisma } from '@/@types/prisma/client.js'

export class PrismaLikesRepository {
  async create(data: Prisma.LikeUncheckedCreateInput) {
    return await prisma.like.create({
        data
    })
  }

  async delete(id: number) {
    return await prisma.like.delete({
        where: {
            id
        },
    })
  }

  async findById(id: number) {
    return await prisma.like.findFirst({
        where: {id}
    })
  }

  async findManyByUserId(userId: number) {
    return await prisma.like.findMany({
        where: {
            userId
        }
    })
  }

  async findManyByPostId(postId: number) {
    return await prisma.like.findMany({
        where: {
            postId
        }
    })
  }

  async findManyByCommentId(commentId: number) {
    return await prisma.like.findMany({
        where: {
            commentId
        }
    })
  }
}