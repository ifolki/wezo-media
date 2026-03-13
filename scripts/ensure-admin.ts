
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt-ts'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await hash('Amin123!', 12)
  const user = await prisma.user.upsert({
    where: { email: 'admin@wezo-media.com' },
    update: {
        password: hashedPassword,
        role: 'SUPER_ADMIN'
    },
    create: {
      name: 'Admin',
      email: 'admin@wezo-media.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    }
  })
  console.log('Admin user ensured:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
