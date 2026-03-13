
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    
    // Security check
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const [totalUsers, totalProjects, totalPayments, pendingProjects] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { status: 'PAID' }
      }),
      prisma.project.count({ where: { status: 'PENDING' } })
    ])

    return NextResponse.json({
      users: totalUsers,
      projects: totalProjects,
      revenue: totalPayments._sum.amount || 0,
      pending: pendingProjects
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
