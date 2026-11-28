import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '') || 'item';
}

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [categories, sectors] = await Promise.all([
      prisma.videoCategory.findMany({
        orderBy: { order: 'asc' },
        include: {
          _count: {
            select: { videos: true },
          },
        },
      }),
      prisma.videoSector.findMany({
        orderBy: { order: 'asc' },
        include: {
          _count: {
            select: { videos: true },
          },
        },
      }),
    ]);

    return NextResponse.json({ categories, sectors });
  } catch (error) {
    console.error('Error in GET /api/admin/portfolio/taxonomies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, nameAr, nameFr, nameEn, slug } = await req.json();

    if (!type || (type !== 'CATEGORY' && type !== 'SECTOR')) {
      return NextResponse.json({ error: 'Type must be CATEGORY or SECTOR' }, { status: 400 });
    }

    if (!nameFr && !nameEn && !nameAr) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const generatedSlug = slug?.trim() ? slugify(slug) : slugify(nameFr || nameEn || nameAr);

    if (type === 'CATEGORY') {
      const existing = await prisma.videoCategory.findUnique({ where: { slug: generatedSlug } });
      if (existing) {
        return NextResponse.json({ error: 'A category with this slug already exists' }, { status: 409 });
      }

      const lastCat = await prisma.videoCategory.findFirst({ orderBy: { order: 'desc' } });
      const created = await prisma.videoCategory.create({
        data: {
          slug: generatedSlug,
          nameAr: nameAr?.trim() || nameFr?.trim() || nameEn?.trim(),
          nameFr: nameFr?.trim() || nameEn?.trim() || nameAr?.trim(),
          nameEn: nameEn?.trim() || nameFr?.trim() || nameAr?.trim(),
          order: (lastCat?.order ?? -1) + 1,
        },
      });
      return NextResponse.json(created, { status: 201 });
    } else {
      const existing = await prisma.videoSector.findUnique({ where: { slug: generatedSlug } });
      if (existing) {
        return NextResponse.json({ error: 'A sector with this slug already exists' }, { status: 409 });
      }

      const lastSec = await prisma.videoSector.findFirst({ orderBy: { order: 'desc' } });
      const created = await prisma.videoSector.create({
        data: {
          slug: generatedSlug,
          nameAr: nameAr?.trim() || nameFr?.trim() || nameEn?.trim(),
          nameFr: nameFr?.trim() || nameEn?.trim() || nameAr?.trim(),
          nameEn: nameEn?.trim() || nameFr?.trim() || nameAr?.trim(),
          order: (lastSec?.order ?? -1) + 1,
        },
      });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (error) {
    console.error('Error in POST /api/admin/portfolio/taxonomies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!id || (type !== 'CATEGORY' && type !== 'SECTOR')) {
      return NextResponse.json({ error: 'Valid type and ID are required' }, { status: 400 });
    }

    if (type === 'CATEGORY') {
      await prisma.videoCategory.delete({ where: { id } });
    } else {
      await prisma.videoSector.delete({ where: { id } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/admin/portfolio/taxonomies:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
