import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { fetchLeadsFromNotion } from '@/lib/integrations/notion/leads'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query params for filtering
    const { searchParams } = new URL(req.url)
    const notionStatus = searchParams.get('notionStatus') // PENDING, SYNCED, FAILED
    
    const whereClause: any = {}
    if (notionStatus && notionStatus !== 'ALL') {
      whereClause.notionSyncStatus = notionStatus
    }

    let leads = []
    try {
      leads = await prisma.lead.findMany({
        where: whereClause,
        include: {
          requestedService: {
            select: {
              id: true,
              slug: true,
              nameAr: true,
              nameEn: true,
              nameFr: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    } catch (dbError) {
      console.error('Database connection failed while fetching leads, querying Notion fallback:', dbError)
      leads = await fetchLeadsFromNotion()
    }

    return NextResponse.json(leads)
  } catch (error: any) {
    console.error('Fetch admin leads error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
