import { defineConfig } from 'prisma/config'

export default defineConfig({
  // Define your database connection
  datasource: {
    url: process.env.DATABASE_URL || "file:./dev.db", // Use SQLite for development
  },
  // Schema location (relative to this config file)
  schema: './prisma/schema.prisma',
  // Optional: Migration settings
  migrations: {
    path: './prisma/migrations',
  },
})