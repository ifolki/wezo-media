
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt-ts'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await hash('Amin123!', 12)
  const user = await prisma.user.create({
    data: {
      name: 'Amin',
      email: 'amin@wezo-media.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    }
  })
  console.log('User created:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
