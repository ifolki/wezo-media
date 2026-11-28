import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('category');
    const sectorSlug = searchParams.get('sector');
    const projectSlug = searchParams.get('project');
    const videoSlug = searchParams.get('video');
    const aspect = searchParams.get('aspect');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const where: any = {
      status: 'PUBLISHED',
    };

    if (categorySlug && categorySlug !== 'all') {
      where.category = { slug: categorySlug };
    }

    if (sectorSlug && sectorSlug !== 'all') {
      where.sector = { slug: sectorSlug };
    }

    if (projectSlug) {
      where.projectSlug = projectSlug;
    }

    if (videoSlug) {
      where.slug = videoSlug;
    }

    if (aspect) {
      where.aspectRatio = aspect;
    }

    if (search && search.trim().length > 0) {
      const q = search.trim();
      where.OR = [
        { clientName: { contains: q, mode: 'insensitive' } },
        { projectName: { contains: q, mode: 'insensitive' } },
        { titleAr: { contains: q, mode: 'insensitive' } },
        { titleFr: { contains: q, mode: 'insensitive' } },
        { titleEn: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [videos, total] = await Promise.all([
      prisma.showcaseVideo.findMany({
        where,
        include: {
          category: {
            select: { id: true, slug: true, nameAr: true, nameFr: true, nameEn: true },
          },
          sector: {
            select: { id: true, slug: true, nameAr: true, nameFr: true, nameEn: true },
          },
        },
        orderBy: [
          { order: 'asc' },
          { createdAt: 'desc' },
        ],
        take: limit,
        skip: offset,
      }),
      prisma.showcaseVideo.count({ where }),
    ]);

    return NextResponse.json({
      videos,
      total,
      limit,
      offset,
      hasMore: offset + videos.length < total,
    });
  } catch (error) {
    console.error('Error in GET /api/showcase/videos:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
