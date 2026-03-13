import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { id } = params
    const body = await req.json()
    
    const page = await prisma.page.update({
      where: { id },
      data: {
        slug: body.slug,
        titleAr: body.titleAr,
        titleEn: body.titleEn,
        titleFr: body.titleFr,
        contentAr: body.contentAr,
        contentEn: body.contentEn,
        contentFr: body.contentFr,
        isPublished: body.isPublished,
      },
    })
    return NextResponse.json(page)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { id } = params
    await prisma.page.delete({
      where: { id }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
