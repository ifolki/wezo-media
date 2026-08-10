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
    let settings = await prisma.settings.findUnique({
      where: { id: 'site-settings' },
    })
    
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: 'site-settings',
          companyName: 'Wezo Media',
        }
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const body = await req.json()
    const settings = await prisma.settings.upsert({
      where: { id: 'site-settings' },
      update: body,
      create: {
        id: 'site-settings',
        ...body
      }
    })
    return NextResponse.json(settings)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
