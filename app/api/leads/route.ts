import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
import { syncLeadToNotion, syncRawLeadToNotion } from '@/lib/integrations/notion/leads'

// Simple IP-based Rate Limiter Store in Memory
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3 // Max 3 submissions per IP per minute
const ipStore = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = ipStore.get(ip) || []
  // Filter timestamps within the sliding window
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }
  
  recentTimestamps.push(now)
  ipStore.set(ip, recentTimestamps)
  return false
}

// Zod Input Validation Schema
const leadInputSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(5, 'Phone number is too short'),
  whatsapp: z.string().min(5, 'WhatsApp number is too short'),
  email: z.string().optional().or(z.literal('')),
  businessName: z.string().min(1, 'Business name is required'),
  industry: z.string().min(1, 'Industry is required'),
  city: z.string().min(1, 'City is required'),
  websiteUrl: z.string().optional().or(z.literal('')),
  objective: z.string().min(2, 'Objective must be specified'),
  budgetMin: z.union([z.string(), z.number()]).optional(),
  budgetMax: z.union([z.string(), z.number()]).optional(),
  message: z.string().optional(),
  locale: z.string().default('ar'),
  requestedServiceId: z.string().optional().nullable(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  utmContent: z.string().optional().nullable(),
  referrer: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  honeypot: z.string().optional() // Bot trap field
})

export async function POST(req: Request) {
  // 1. IP Rate Limiting
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  try {
    const body = await req.json()

    // 2. Honeypot check: If the hidden honeypot field has any value, discard as spam quietly
    if (body.honeypot && body.honeypot.trim() !== '') {
      console.warn('Bot submission blocked via honeypot trap from IP:', ip)
      return NextResponse.json({ 
        success: true, 
        message: 'Request filtered as spam.',
        mock: true 
      })
    }

    // 3. Input Validation with Zod
    const validationResult = leadInputSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Parse budgets to numbers
    const budgetMinVal = data.budgetMin ? parseFloat(String(data.budgetMin)) : null
    const budgetMaxVal = data.budgetMax ? parseFloat(String(data.budgetMax)) : null

    // 4. Save to local database (Prisma)
    let lead;
    try {
      lead = await prisma.lead.create({
        data: {
          name: data.name,
          phone: data.phone,
          whatsapp: data.whatsapp,
          email: data.email || null,
          businessName: data.businessName,
          industry: data.industry,
          city: data.city,
          websiteUrl: data.websiteUrl || null,
          objective: data.objective,
          budgetMin: budgetMinVal,
          budgetMax: budgetMaxVal,
          message: data.message || null,
          locale: data.locale,
          requestedServiceId: data.requestedServiceId || null,
          utmSource: data.utmSource || null,
          utmMedium: data.utmMedium || null,
          utmCampaign: data.utmCampaign || null,
          utmContent: data.utmContent || null,
          referrer: data.referrer || null,
          source: data.source || 'Website Form',
          status: 'NEW'
        }
      })
    } catch (dbError) {
      console.error('Database connection failed while creating lead:', dbError)
      return NextResponse.json(
        {
          success: false,
          code: 'DATABASE_UNAVAILABLE',
          message: 'Service temporarily unavailable. Please try again shortly.'
        },
        { status: 503 }
      )
    }

    // 5. Try to sync to Notion (non-blocking for client success page response)
    // We run it within the request pipeline but catch errors locally.
    try {
      await syncLeadToNotion(lead.id)
    } catch (notionError) {
      console.error('Notion Sync triggered exception during lead creation:', notionError)
    }

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Unexpected lead creation exception:', error)
    return NextResponse.json(
      { error: 'An unexpected server error occurred' },
      { status: 500 }
    )
  }
}
