import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

function isValidSlug(slug: string) {
  return /^[a-z0-9-]+$/.test(slug)
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const solution = await prisma.solution.findUnique({
      where: { id: params.id },
      include: {
        services: {
          include: {
            service: true
          },
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!solution) {
      return NextResponse.json({ error: 'Solution not found' }, { status: 404 })
    }

    return NextResponse.json(solution)
  } catch (error) {
    console.error('Fetch solution details error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { 
      slug, 
      nameAr, 
      nameEn, 
      nameFr, 
      descriptionAr, 
      descriptionEn, 
      descriptionFr, 
      icon, 
      image,
      isActive,
      isFeatured,
      order,
      attachedServices // Array of { serviceId: string, order?: number, isPrimary?: boolean }
    } = body

    // 1. Slug validations if updated
    let cleanSlug = undefined
    if (slug) {
      cleanSlug = slug.toLowerCase().trim()
      if (!isValidSlug(cleanSlug)) {
        return NextResponse.json({ error: 'Invalid slug characters' }, { status: 400 })
      }

      const existing = await prisma.solution.findFirst({
        where: { 
          slug: cleanSlug,
          NOT: { id: params.id }
        }
      })
      if (existing) {
        return NextResponse.json({ error: 'Slug already exists on another solution' }, { status: 400 })
      }
    }

    // 2. Perform update inside a Prisma Transaction
    const updatedSolution = await prisma.$transaction(async (tx) => {
      // If attachedServices is provided, clear existing mappings first
      if (attachedServices !== undefined) {
        await tx.solutionService.deleteMany({
          where: { solutionId: params.id }
        })
      }

      return await tx.solution.update({
        where: { id: params.id },
        data: {
          slug: cleanSlug,
          nameAr,
          nameEn,
          nameFr,
          descriptionAr,
          descriptionEn,
          descriptionFr,
          icon,
          image,
          isActive,
          isFeatured,
          order,
          services: attachedServices !== undefined ? {
            create: attachedServices.map((s: any) => ({
              serviceId: s.serviceId,
              order: s.order ?? 0,
              isPrimary: s.isPrimary ?? false
            }))
          } : undefined
        },
        include: {
          services: true
        }
      })
    })

    return NextResponse.json(updatedSolution)
  } catch (error) {
    console.error('Update solution error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Cascade delete is configured on database foreign keys, but we also ensure deletion in prisma schema
    await prisma.solution.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete solution error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
