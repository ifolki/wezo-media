import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 'site-settings' },
    })
    return NextResponse.json(settings || { phone: null })
  } catch (error) {
    console.error("Settings retrieval failed, returning fallback:", error);
    return NextResponse.json({ phone: null })
  }
}
