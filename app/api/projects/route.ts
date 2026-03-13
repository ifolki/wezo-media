
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await auth()
    const body = await req.json()
    const { name, email, phone, serviceId, description } = body

    if (!email || !name || !serviceId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

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
    const service = await prisma.service.findUnique({
      where: { slug: serviceId }
    })

    // 3. Create the project
    const project = await prisma.project.create({
      data: {
        title: `${service?.nameEn || serviceId} - ${name}`,
        description,
        clientId,
        serviceId: service?.id || null,
        status: 'PENDING',
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Project creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
