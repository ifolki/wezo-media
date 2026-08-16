import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

function isValidSlug(slug: string) {
  return /^[a-z0-9-]+$/.test(slug)
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const solutions = await prisma.solution.findMany({
      include: {
        services: {
          include: {
            service: true
          },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(solutions)
  } catch (error) {
    console.error('Fetch solutions error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
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

    if (!slug || !nameAr || !nameEn || !descriptionAr || !descriptionEn) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const cleanSlug = slug.toLowerCase().trim()
    if (!isValidSlug(cleanSlug)) {
      return NextResponse.json({ error: 'Invalid slug characters. Only alphanumeric and hyphens allowed.' }, { status: 400 })
    }

    // Check slug uniqueness
    const existing = await prisma.solution.findUnique({
      where: { slug: cleanSlug }
    })
    if (existing) {
      return NextResponse.json({ error: 'Slug already exists. Choose a unique slug.' }, { status: 400 })
    }

    const solution = await prisma.solution.create({
      data: {
        slug: cleanSlug,
        nameAr,
        nameEn,
        nameFr: nameFr || '',
        descriptionAr,
        descriptionEn,
        descriptionFr: descriptionFr || '',
        icon: icon || null,
        image: image || null,
        isActive: isActive ?? true,
        isFeatured: isFeatured ?? false,
        order: order ?? 0,
        services: {
          create: (attachedServices || []).map((s: any) => ({
            serviceId: s.serviceId,
            order: s.order ?? 0,
            isPrimary: s.isPrimary ?? false
          }))
        }
      },
      include: {
        services: true
      }
    })

    return NextResponse.json(solution)
  } catch (error) {
    console.error('Create solution error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
