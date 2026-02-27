import type { User } from "@/@types/prisma/client.js"

type HTTPUser = {
    id: string
    name: string
    email: string
    foto: string
}

export class UserPresenter {
  static toHTTP(user: User): HTTPUser
  static toHTTP(users: User[]): HTTPUser[]
  static toHTTP(input: User | User[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((user) => this.toHTTP(user))
    }

    return {
      id: input.publicId,
      name: input.name,
      email: input.email,
      foto: input.foto
    }
  }
}