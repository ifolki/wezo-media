import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const messages = await prisma.message.findMany({
      include: {
        project: true,
        sender: true
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(messages)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
