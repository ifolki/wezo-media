import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [categories, sectors] = await Promise.all([
      prisma.videoCategory.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        include: {
          _count: {
            select: {
              videos: {
                where: { status: 'PUBLISHED' },
              },
            },
          },
        },
      }),
      prisma.videoSector.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
        include: {
          _count: {
            select: {
              videos: {
                where: { status: 'PUBLISHED' },
              },
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      categories: categories.map(c => ({
        id: c.id,
        slug: c.slug,
        nameAr: c.nameAr,
        nameFr: c.nameFr,
        nameEn: c.nameEn,
        count: c._count.videos,
      })),
      sectors: sectors.map(s => ({
        id: s.id,
        slug: s.slug,
        nameAr: s.nameAr,
        nameFr: s.nameFr,
        nameEn: s.nameEn,
        count: s._count.videos,
      })),
    });
  } catch (error) {
    console.error('Error in GET /api/showcase/categories:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
