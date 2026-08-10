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
    const pages = await prisma.page.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(pages)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const body = await req.json()
    const page = await prisma.page.create({
      data: {
        slug: body.slug,
        titleAr: body.titleAr,
        titleEn: body.titleEn,
        titleFr: body.titleFr || '',
        contentAr: body.contentAr,
        contentEn: body.contentEn,
        contentFr: body.contentFr || '',
        isPublished: body.isPublished ?? false,
      },
    })
    return NextResponse.json(page)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
