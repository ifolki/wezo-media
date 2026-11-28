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

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const video = await prisma.showcaseVideo.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        sector: true,
      },
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (error) {
    console.error('Error in GET /api/admin/portfolio/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const current = await prisma.showcaseVideo.findUnique({ where: { id: params.id } });
    if (!current) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    const body = await req.json();
    const {
      clientName,
      projectName,
      videoUrl,
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
      status,
      order,
      completionDate,
    } = body;

    const updateData: any = {};

    if (clientName !== undefined) updateData.clientName = clientName.trim();
    if (projectName !== undefined) {
      updateData.projectName = projectName.trim();
      updateData.projectSlug = slugify(projectName);
    }
    if (titleAr !== undefined) updateData.titleAr = titleAr?.trim() || null;
    if (titleFr !== undefined) updateData.titleFr = titleFr?.trim() || null;
    if (titleEn !== undefined) updateData.titleEn = titleEn?.trim() || null;
    if (descAr !== undefined) updateData.descAr = descAr?.trim() || null;
    if (descFr !== undefined) updateData.descFr = descFr?.trim() || null;
    if (descEn !== undefined) updateData.descEn = descEn?.trim() || null;
    if (aspectRatio !== undefined) updateData.aspectRatio = aspectRatio;
    if (categoryId !== undefined) updateData.categoryId = categoryId || null;
    if (sectorId !== undefined) updateData.sectorId = sectorId || null;
    if (isFeatured !== undefined) updateData.isFeatured = Boolean(isFeatured);
    if (status !== undefined) updateData.status = status;
    if (order !== undefined) updateData.order = parseInt(order, 10);
    if (completionDate !== undefined) updateData.completionDate = completionDate ? new Date(completionDate) : null;
    if (customThumbnail !== undefined) updateData.customThumbnail = customThumbnail?.trim() || null;

    // If video URL changed, revalidate and check duplicate
    if (videoUrl && videoUrl !== current.videoUrl) {
      const parsed = parseAndValidateVideo(videoUrl);
      if (!parsed.success || !parsed.provider || !parsed.videoId) {
        return NextResponse.json({ error: parsed.error || 'Invalid video URL' }, { status: 400 });
      }

      // Check duplicate by Provider + Video ID (excluding self)
      const duplicate = await prisma.showcaseVideo.findFirst({
        where: {
          id: { not: params.id },
          provider: parsed.provider as any,
          videoId: parsed.videoId,
        },
      });

      if (duplicate) {
        return NextResponse.json(
          { error: `This video (${parsed.provider} ID: ${parsed.videoId}) already exists in another project ("${duplicate.clientName}").` },
          { status: 409 }
        );
      }

      updateData.provider = parsed.provider;
      updateData.videoUrl = parsed.cleanUrl || videoUrl;
      updateData.videoId = parsed.videoId;
      updateData.thumbnailUrl = customThumbnail?.trim() || parsed.thumbnailUrl || current.thumbnailUrl;
      if (!aspectRatio && parsed.suggestedAspect) {
        updateData.aspectRatio = parsed.suggestedAspect;
      }
    } else if (customThumbnail !== undefined) {
      updateData.thumbnailUrl = customThumbnail?.trim() || current.thumbnailUrl;
    }

    const updated = await prisma.showcaseVideo.update({
      where: { id: params.id },
      data: updateData,
      include: {
        category: true,
        sector: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error in PUT /api/admin/portfolio/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.showcaseVideo.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'Video deleted' });
  } catch (error) {
    console.error('Error in DELETE /api/admin/portfolio/[id]:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
