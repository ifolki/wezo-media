import { Client } from '@notionhq/client'
import prisma from '@/lib/prisma'

// Initialize Notion Client (Server-only module)
const token = process.env.NOTION_TOKEN
const databaseId = process.env.NOTION_LEADS_DATABASE_ID
const dataSourceId = process.env.NOTION_LEADS_DATA_SOURCE_ID

const notion = token ? new Client({ auth: token }) : null

/**
 * Maps Lead data to Notion database properties schema dynamically
 */
export function mapLeadToNotionProperties(lead: any) {
  const properties: Record<string, any> = {}

  // 1. الاسم / المشروع (Title) - Name + business name
  properties['الاسم / المشروع'] = {
    title: [
      {
        text: {
          content: `${lead.name} - ${lead.businessName}`
        }
      }
    ]
  }

  // 2. الهاتف (Phone)
  if (lead.phone) {
    properties['الهاتف'] = {
      phone_number: lead.phone
    }
  }

  // 3. واتساب (Phone)
  if (lead.whatsapp) {
    properties['واتساب'] = {
      phone_number: lead.whatsapp
    }
  }

  // 4. البريد (Email)
  if (lead.email) {
    properties['البريد'] = {
      email: lead.email
    }
  }

  // 5. اسم المشروع (Rich text)
  properties['اسم المشروع'] = {
    rich_text: [
      {
        text: {
          content: lead.businessName
        }
      }
    ]
  }

  // 6. النشاط (Rich text)
  properties['النشاط'] = {
    rich_text: [
      {
        text: {
          content: lead.industry
        }
      }
    ]
  }

  // 7. المدينة (Rich text)
  properties['المدينة'] = {
    rich_text: [
      {
        text: {
          content: lead.city
        }
      }
    ]
  }

  // 8. الهدف (Rich text)
  properties['الهدف'] = {
    rich_text: [
      {
        text: {
          content: lead.objective
        }
      }
    ]
  }

  return properties
}

/**
 * Main function to synchronize a Lead to Notion without db writeback
 */
export async function syncLeadToNotion(leadId: string): Promise<{ success: boolean; error?: string }> {
  // Fetch full lead data including requested service
  const lead = await prisma.lead.findUnique({
    where: { id: leadId },
    include: { requestedService: true }
  })

  if (!lead) {
    return { success: false, error: 'Lead not found in local database' }
  }

  // Safety checks for API Credentials
  if (!notion) {
    return { success: false, error: 'Notion SDK not initialized (missing NOTION_TOKEN)' }
  }

  if (!dataSourceId && !databaseId) {
    return { success: false, error: 'Notion target identifier is missing' }
  }

  try {
    const properties = mapLeadToNotionProperties(lead)
    const parentObj = dataSourceId 
      ? { data_source_id: dataSourceId }
      : { database_id: databaseId }

    // Create new page in Notion
    await notion.pages.create({
      parent: parentObj as any,
      properties: properties
    })

    return { success: true }
  } catch (error: any) {
    console.error('Notion Sync failed for lead ID:', leadId, error)
    return { success: false, error: error?.message || String(error) }
  }
}

/**
 * Sync Project structure (noop for MVP)
 */
export async function syncProjectToNotion(project: any, client: any, service: any): Promise<{ success: boolean; error?: string }> {
  return { success: true }
}

/**
 * Sync Raw Lead (noop for MVP)
 */
export async function syncRawLeadToNotion(rawLead: any) {
  return { success: true }
}

/**
 * Retry Sync Lead
 */
export async function retryNotionSync(leadId: string) {
  return syncLeadToNotion(leadId)
}

export async function retryFailedNotionLead(leadId: string) {
  return syncLeadToNotion(leadId)
}

export async function fetchLeadsFromNotion(): Promise<any[]> {
  return []
}
