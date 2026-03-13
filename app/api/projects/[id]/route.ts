
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const project = await prisma.project.findUnique({
      where: { 
        id: params.id,
        clientId: session.user.id // Ensure only owner can see
      },
      include: { 
        service: true,
        files: true,
        messages: {
          include: { sender: true },
          orderBy: { createdAt: 'asc' }
        },
        updates: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Fetch project detail error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
