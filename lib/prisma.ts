import { PrismaClient } from "@prisma/client"

const getDatabaseUrl = () => {
  const base = process.env.DATABASE_URL || ""
  const targetSchema = process.env.PRISMA_SCHEMA_OVERRIDE || (process.env.NODE_ENV === "test" ? "test_showcase" : undefined)
  if (!targetSchema || !base) return base

  if (base.includes("schema=")) {
    return base.replace(/schema=[^&]+/, `schema=${targetSchema}`)
  }
  return base.includes("?") ? `${base}&schema=${targetSchema}` : `${base}?schema=${targetSchema}`
}

const prismaClientSingleton = () => {
  const url = getDatabaseUrl()
  return new PrismaClient({
    datasources: url ? { db: { url } } : undefined,
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export { prisma }
export default prisma

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma

