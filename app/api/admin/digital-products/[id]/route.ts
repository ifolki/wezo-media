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
    const body = await req.json()
    const product = await prisma.digitalProduct.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json(product)
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
    await prisma.digitalProduct.delete({
      where: { id: params.id },
    })
    return new NextResponse('Deleted', { status: 200 })
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
