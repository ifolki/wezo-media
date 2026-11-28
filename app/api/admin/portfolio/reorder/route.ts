import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { items } = await req.json();

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Expected items array with id and order' }, { status: 400 });
    }

    // Batch update order
    await prisma.$transaction(
      items.map(item =>
        prisma.showcaseVideo.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/admin/portfolio/reorder:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
