import { PrismaPg } from '@prisma/adapter-pg'

import { PrismaClient } from '../prisma/generated/'
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
// Global Prisma client instance
let prisma: PrismaClient

declare global {
  var __prisma: PrismaClient | undefined
}

// Prevent multiple instances in development
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({ adapter, log: ['warn', 'error'] })
  }
  prisma = global.__prisma
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

export { prisma }
export default prisma
