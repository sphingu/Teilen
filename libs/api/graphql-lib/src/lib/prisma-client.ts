import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

export const getPrismaClient = () => {
  if (!prisma) {
    prisma = new PrismaClient()
    // prisma.$connect()  // not necessary
  }

  return prisma
}
