
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { 
        client: true,
        service: true,
        files: true,
        messages: { include: { sender: true }, orderBy: { createdAt: 'asc' } },
        updates: { orderBy: { createdAt: 'desc' } }
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { status, priority, budget, paymentEnabled, dueDate } = body

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        status,
        priority,
        budget,
        paymentEnabled,
        dueDate: dueDate ? new Date(dueDate) : undefined
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
