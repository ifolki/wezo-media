import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const packages = await prisma.package.findMany({
      include: { service: true },
      orderBy: { price: 'asc' },
    })
    return NextResponse.json(packages)
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
    const pkg = await prisma.package.create({
      data: {
        nameAr: body.nameAr,
        nameEn: body.nameEn,
        nameFr: body.nameFr || '',
        price: parseFloat(body.price),
        currency: body.currency || 'USD',
        features: body.features || [],
        isPopular: body.isPopular || false,
        serviceId: body.serviceId,
      },
    })
    return NextResponse.json(pkg)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
