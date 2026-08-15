
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { syncProjectToNotion } from '@/lib/integrations/notion/leads'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const session = await auth()
    const body = await req.json()
    const { name, email, phone, serviceId, description } = body

    if (!email || !name || !serviceId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let project;
    let service = null;
    
    try {
      // 1. Find or create the user (client)
      let clientId = session?.user?.id

      if (!clientId) {
        // Check if user exists by email
        let user = await prisma.user.findUnique({
          where: { email }
        })

        if (!user) {
          // Create a new client account (lead)
          user = await prisma.user.create({
            data: {
              name,
              email,
              phone,
              role: 'CLIENT',
              // They don't have a password yet, they can set it later or use Google
            }
          })
        }
        clientId = user.id
      }

      // 2. Find the service by slug
      service = await prisma.service.findUnique({
        where: { slug: serviceId }
      })

      // 3. Create the project
      project = await prisma.project.create({
        data: {
          title: `${service?.nameEn || serviceId} - ${name}`,
          description,
          clientId,
          serviceId: service?.id || null,
          status: 'PENDING',
        }
      })

      // Fetch client details
      const client = await prisma.user.findUnique({
        where: { id: clientId }
      })

      if (client) {
        syncProjectToNotion(project, client, service).catch(err => {
          console.error('Failed to sync project request to Notion:', err)
        })
      }
    } catch (dbError) {
      console.error('Database connection failed during project creation:', dbError)
      return NextResponse.json(
        {
          success: false,
          code: 'DATABASE_UNAVAILABLE',
          message: 'Service temporarily unavailable. Please try again shortly.'
        },
        { status: 503 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
