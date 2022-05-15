import { PrismaClient } from '@prisma/client'

export interface Context {
  user: Express.User
  prisma: PrismaClient
}

declare global {
  namespace Express {
    interface User {
      id: string
      email: string
    }
  }
}
