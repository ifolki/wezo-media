import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const products = await prisma.digitalProduct.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(products)
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
    const product = await prisma.digitalProduct.create({
      data: {
        nameAr: body.nameAr,
        nameEn: body.nameEn,
        descAr: body.descAr,
        descEn: body.descEn,
        price: parseFloat(body.price),
        currency: body.currency || 'USD',
        image: body.image,
        fileUrl: body.fileUrl,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
