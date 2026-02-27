import { prisma } from '@/libs/prisma.js'
import type { Prisma } from '@/@types/prisma/client.js'

export class PrismaCommentsRepository {
  async create(data: Prisma.CommentUncheckedCreateInput) {
    return await prisma.comment.create({
        data
    })
  }

  async list() {
    return await prisma.comment.findMany()
  }

  async findById(id: number) {
    return await prisma.comment.findFirst({
        where: {id}
    })
  }

  async findManyByUserId(userId: number) {
    return await prisma.comment.findMany({
        where: {
            userId
        }
    })
  }

  async findManyByPostId(postId: number) {
    return await prisma.comment.findMany({
        where: {
            postId
        }
    })
  }

  async delete(id: number) {
    return await prisma.comment.delete({
        where: {
            id
        },
    })
  }

  async update(id: number, data: Prisma.CommentUncheckedUpdateInput) {
    return await prisma.comment.update({
        where: {id},
        data
    })
  }
}