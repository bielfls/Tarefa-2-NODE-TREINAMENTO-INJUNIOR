import { prisma } from '@/libs/prisma.js'
import type { Prisma } from '@/@types/prisma/client.js'

export class PrismaPostsRepository {
  async create(data: Prisma.PostUncheckedCreateInput) {
    return await prisma.post.create({
        data
    })
  }

  async list() {
    return await prisma.post.findMany()
  }

  async findById(id: number) {
    return await prisma.post.findFirst({
        where: {id}
    })
  }

  async update(id: number, data: Prisma.PostUncheckedUpdateInput) {
    return await prisma.post.update({
        where: {id},
        data
    })
  }

  async delete(id: number) {
    return await prisma.post.delete({
        where: {
            id
        },
    })
  }

  async findByUserId(userId: number) {
    return await prisma.post.findMany({
        where: {
            userId
        }
    })
  }
}