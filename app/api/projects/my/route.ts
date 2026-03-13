
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const projects = await prisma.project.findMany({
      where: { clientId: session.user.id },
      include: { service: true },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate stats
    const stats = {
      total: projects.length,
      inProgress: projects.filter(p => p.status === 'IN_PROGRESS').length,
      completed: projects.filter(p => p.status === 'COMPLETED').length,
      pending: projects.filter(p => p.status === 'PENDING').length,
    }

    return NextResponse.json({ projects, stats })
  } catch (error) {
    console.error('Fetch projects error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
