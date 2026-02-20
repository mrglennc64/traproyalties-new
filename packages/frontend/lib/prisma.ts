import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create libSQL client
const libsql = createClient({
  url: process.env.DATABASE_URL || "file:./dev.db",
})

// Use 'as any' to bypass TypeScript type checking
const adapter = new (PrismaLibSql as any)(libsql)

// Use 'as any' for PrismaClient as well
export const prisma = globalForPrisma.prisma ?? new (PrismaClient as any)({
  adapter,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma as PrismaClient

export default prisma
