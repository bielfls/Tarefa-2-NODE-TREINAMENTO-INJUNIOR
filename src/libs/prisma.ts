import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/@types/prisma/client.js"
import { env } from "@/env/index.js"

const connectionString = `${env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
export const prisma = new PrismaClient({ adapter })