import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { parseAndValidateVideo } from '@/lib/video/providers';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { url, excludeId } = await req.json();

    if (!url || typeof url !== 'string' || url.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'URL is required' }, { status: 400 });
    }

    const parsed = parseAndValidateVideo(url);
    if (!parsed.success || !parsed.provider || !parsed.videoId) {
      return NextResponse.json({ success: false, error: parsed.error || 'Invalid video URL' }, { status: 400 });
    }

    // Check duplicate in database
    const existing = await prisma.showcaseVideo.findFirst({
      where: {
        provider: parsed.provider as any,
        videoId: parsed.videoId,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true, clientName: true },
    });

    return NextResponse.json({
      success: true,
      provider: parsed.provider,
      videoId: parsed.videoId,
      cleanUrl: parsed.cleanUrl,
      embedUrl: parsed.embedUrl,
      thumbnailUrl: parsed.thumbnailUrl,
      suggestedAspect: parsed.suggestedAspect,
      isDuplicate: Boolean(existing),
      duplicateClientName: existing?.clientName || null,
    });
  } catch (error) {
    console.error('Error in POST /api/admin/portfolio/validate-url:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
