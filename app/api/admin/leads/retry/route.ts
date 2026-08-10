import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { retryFailedNotionLead } from '@/lib/integrations/notion/leads'

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user || (session.user.role !== 'ADMIN' && session.user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { leadId } = body

    if (!leadId) {
      return NextResponse.json({ error: 'Missing leadId parameter' }, { status: 400 })
    }

    const result = await retryFailedNotionLead(leadId)

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: result.error || 'Sync retry failed' }, { status: 500 })
    }
  } catch (error: any) {
    console.error('Admin lead retry error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}
