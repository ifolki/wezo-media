
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(posts)
  } catch (error) {
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
      titleAr, titleEn, titleFr, 
      contentAr, contentEn, contentFr, 
      slug, 
      excerptAr, excerptEn, excerptFr, 
      coverImage, tags, isPublished 
    } = body

    const post = await prisma.blogPost.create({
      data: {
        titleAr,
        titleEn,
        titleFr,
        contentAr,
        contentEn,
        contentFr,
        slug,
        excerptAr,
        excerptEn,
        excerptFr,
        coverImage,
        tags: tags || [],
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
