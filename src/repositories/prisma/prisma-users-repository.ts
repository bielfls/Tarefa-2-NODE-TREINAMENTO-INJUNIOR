import { prisma } from '@/libs/prisma.js'
import type { Prisma } from '@/@types/prisma/client.js'

export class PrismaUsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })
    
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    
    return user
  }

  async findById(publicId: string) {
    const user = await prisma.user.findUnique({ where: { publicId }})
    
    return user
  }

  async delete(id: number) {
    return await prisma.user.delete({
        where: {
            id
        },
    })
  }

  async list() {
    return await prisma.user.findMany()
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
            id
        },
        data
    })
    
    return user
  }
}