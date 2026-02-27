import type { Prisma, User } from '@/@types/prisma/client.js'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  findById(publicId: string): Promise<User | null>
  delete(id: number): Promise<User>
  list(): Promise<User[]>
  update(id: number, data: Prisma.UserUpdateInput): Promise<User>
}