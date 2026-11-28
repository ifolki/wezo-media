import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { parseAndValidateVideo } from '@/lib/video/providers';

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
    .replace(/-+$/, '') || 'video';
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const categoryId = searchParams.get('categoryId');
    const sectorId = searchParams.get('sectorId');
    const search = searchParams.get('search');

    const where: any = {};

    if (status && status !== 'ALL') {
      where.status = status;
    }

    if (categoryId && categoryId !== 'ALL') {
      where.categoryId = categoryId;
    }

    if (sectorId && sectorId !== 'ALL') {
      where.sectorId = sectorId;
    }

    if (search && search.trim().length > 0) {
      const q = search.trim();
      where.OR = [
        { clientName: { contains: q, mode: 'insensitive' } },
        { projectName: { contains: q, mode: 'insensitive' } },
        { titleAr: { contains: q, mode: 'insensitive' } },
        { titleFr: { contains: q, mode: 'insensitive' } },
        { titleEn: { contains: q, mode: 'insensitive' } },
        { videoId: { contains: q, mode: 'insensitive' } },
      ];
    }

    const videos = await prisma.showcaseVideo.findMany({
      where,
      include: {
        category: true,
        sector: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error in GET /api/admin/portfolio:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      clientName,
      videoUrl,
      projectName,
      titleAr,
      titleFr,
      titleEn,
      descAr,
      descFr,
      descEn,
      customThumbnail,
      aspectRatio,
      categoryId,
      sectorId,
      isFeatured,
      status, // Default DRAFT unless explicitly requested
      completionDate,
    } = body;

    // Mandatory fields validation
    if (!clientName || typeof clientName !== 'string' || clientName.trim().length === 0) {
      return NextResponse.json({ error: 'Client/Project Name is required' }, { status: 400 });
    }

    if (!videoUrl || typeof videoUrl !== 'string' || videoUrl.trim().length === 0) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
    }

    // Parse and validate video with security checks
    const parsed = parseAndValidateVideo(videoUrl);
    if (!parsed.success || !parsed.provider || !parsed.videoId) {
      return NextResponse.json({ error: parsed.error || 'Invalid video URL' }, { status: 400 });
    }

    // Check duplicate video by Provider + Video ID (User constraint)
    const existingVideo = await prisma.showcaseVideo.findUnique({
      where: {
        provider_videoId: {
          provider: parsed.provider as any,
          videoId: parsed.videoId,
        },
      },
    });

    if (existingVideo) {
      return NextResponse.json(
        { error: `This video (${parsed.provider} ID: ${parsed.videoId}) already exists in the showcase under "${existingVideo.clientName}".` },
        { status: 409 }
      );
    }

    // Generate unique slug
    const baseSlug = slugify(titleFr || titleEn || clientName);
    let finalSlug = baseSlug;
    let counter = 1;
    while (await prisma.showcaseVideo.findUnique({ where: { slug: finalSlug } })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Project slug for grouping multiple videos under one project
    const projectSlug = projectName ? slugify(projectName) : slugify(clientName);

    // Resolve thumbnail
    const defaultPlaceholder = '/assets/showcase/video-placeholder.webp';
    const resolvedThumbnail = customThumbnail?.trim() || parsed.thumbnailUrl || defaultPlaceholder;

    // Get max order to append at the end
    const lastVideo = await prisma.showcaseVideo.findFirst({
      orderBy: { order: 'desc' },
      select: { order: true },
    });
    const nextOrder = (lastVideo?.order ?? -1) + 1;

    // Create video with DRAFT as default status unless specified
    const newVideo = await prisma.showcaseVideo.create({
      data: {
        slug: finalSlug,
        clientName: clientName.trim(),
        projectName: projectName?.trim() || clientName.trim(),
        projectSlug,
        titleAr: titleAr?.trim() || null,
        titleFr: titleFr?.trim() || clientName.trim(),
        titleEn: titleEn?.trim() || clientName.trim(),
        descAr: descAr?.trim() || null,
        descFr: descFr?.trim() || null,
        descEn: descEn?.trim() || null,
        provider: parsed.provider as any,
        videoUrl: parsed.cleanUrl || videoUrl.trim(),
        videoId: parsed.videoId,
        thumbnailUrl: resolvedThumbnail,
        customThumbnail: customThumbnail?.trim() || null,
        aspectRatio: (aspectRatio as any) || (parsed.suggestedAspect as any) || 'VERTICAL_9_16',
        order: nextOrder,
        isFeatured: Boolean(isFeatured),
        status: status && ['DRAFT', 'PUBLISHED', 'HIDDEN'].includes(status) ? status : 'DRAFT',
        categoryId: categoryId || null,
        sectorId: sectorId || null,
        completionDate: completionDate ? new Date(completionDate) : null,
      },
      include: {
        category: true,
        sector: true,
      },
    });

    return NextResponse.json(newVideo, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/portfolio:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
