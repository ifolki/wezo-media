import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Try to run a simple database query
    await prisma.$queryRaw`SELECT 1`
    return NextResponse.json({ online: true })
  } catch (error) {
    console.error('Database connectivity check failed:', error)
    return NextResponse.json({ online: false })
  }
}
