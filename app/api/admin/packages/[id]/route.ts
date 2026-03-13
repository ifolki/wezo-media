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
    
    const pkg = await prisma.package.update({
      where: { id },
      data: {
        nameAr: body.nameAr,
        nameEn: body.nameEn,
        nameFr: body.nameFr,
        price: parseFloat(body.price),
        currency: body.currency,
        features: body.features,
        isPopular: body.isPopular,
        serviceId: body.serviceId,
      },
    })
    return NextResponse.json(pkg)
  } catch (error) {
    console.error(error)
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
    await prisma.package.delete({
      where: { id }
    })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
