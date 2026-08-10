import { Client } from '@notionhq/client'
import prisma from '@/lib/prisma'

// Initialize Notion Client (Server-only module)
const token = process.env.NOTION_TOKEN
const databaseId = process.env.NOTION_LEADS_DATABASE_ID
const dataSourceId = process.env.NOTION_LEADS_DATA_SOURCE_ID

const notion = token ? new Client({ auth: token }) : null

/**
 * Validates if the string is a correct URL format
 */
function isValidUrl(str: string | null | undefined): boolean {
  if (!str) return false
  try {
    new URL(str)
    return true
  } catch {
    return false
  }
}

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

  // 2. الحالة (Select) - جديد
  properties['الحالة'] = {
    select: {
      name: 'جديد'
    }
  }

  // 3. الأولوية (Select) - متوسطة
  properties['الأولوية'] = {
    select: {
      name: 'متوسطة'
    }
  }

  // 4. الهاتف (Phone)
  if (lead.phone) {
    properties['الهاتف'] = {
      phone_number: lead.phone
    }
  }

  // 5. واتساب (Phone)
  if (lead.whatsapp) {
    properties['واتساب'] = {
      phone_number: lead.whatsapp
    }
  }

  // 6. البريد (Email)
  if (lead.email) {
    properties['البريد'] = {
      email: lead.email
    }
  }

  // 7. اسم المشروع (Rich text)
  properties['اسم المشروع'] = {
    rich_text: [
      {
        text: {
          content: lead.businessName
        }
      }
    ]
  }

  // 8. النشاط (Rich text)
  properties['النشاط'] = {
    rich_text: [
      {
        text: {
          content: lead.industry
        }
      }
    ]
  }

  // 9. المدينة (Rich text)
  properties['المدينة'] = {
    rich_text: [
      {
        text: {
          content: lead.city
        }
      }
    ]
  }

  // 10. الخدمة المطلوبة (Rich text)
  const serviceName = lead.requestedService 
    ? (lead.locale === 'ar' ? lead.requestedService.nameAr : lead.locale === 'fr' ? lead.requestedService.nameFr || lead.requestedService.nameEn : lead.requestedService.nameEn)
    : 'غير محدد'
  
  properties['الخدمة المطلوبة'] = {
    rich_text: [
      {
        text: {
          content: serviceName
        }
      }
    ]
  }

  // 11. الهدف (Rich text)
  properties['الهدف'] = {
    rich_text: [
      {
        text: {
          content: lead.objective || ''
        }
      }
    ]
  }

  // 12. الميزانية (Rich text)
  const budgetMinStr = lead.budgetMin !== null ? String(lead.budgetMin) : 'غير محدد'
  const budgetMaxStr = lead.budgetMax !== null ? String(lead.budgetMax) : 'غير محدد'
  properties['الميزانية'] = {
    rich_text: [
      {
        text: {
          content: `${budgetMinStr} - ${budgetMaxStr} MAD`
        }
      }
    ]
  }

  // 13. موعد البداية (Date)
  if (lead.desiredStartDate) {
    try {
      const dateVal = new Date(lead.desiredStartDate)
      if (!isNaN(dateVal.getTime())) {
        properties['موعد البداية'] = {
          date: {
            start: dateVal.toISOString().split('T')[0]
          }
        }
      }
    } catch {
      // Omit if invalid date
    }
  }

  // 14. رابط الصفحة أو الموقع (URL)
  if (lead.websiteUrl && isValidUrl(lead.websiteUrl)) {
    properties['رابط الصفحة أو الموقع'] = {
      url: lead.websiteUrl
    }
  }

  // 15. تفاصيل الطلب (Rich text)
  properties['تفاصيل الطلب'] = {
    rich_text: [
      {
        text: {
          content: lead.message || lead.objective || ''
        }
      }
    ]
  }

  // 16. المصدر (Select) - الموقع
  properties['المصدر'] = {
    select: {
      name: 'الموقع'
    }
  }

  // 17. اللغة (Select) - AR/FR/EN
  properties['اللغة'] = {
    select: {
      name: String(lead.locale || 'AR').toUpperCase()
    }
  }

  // 18. UTM Source (Rich text)
  if (lead.utmSource) {
    properties['UTM Source'] = {
      rich_text: [
        {
          text: {
            content: lead.utmSource
          }
        }
      ]
    }
  }

  // 19. UTM Campaign (Rich text)
  if (lead.utmCampaign) {
    properties['UTM Campaign'] = {
      rich_text: [
        {
          text: {
            content: lead.utmCampaign
          }
        }
      ]
    }
  }

  // 20. Website Lead ID (Rich text)
  properties['Website Lead ID'] = {
    rich_text: [
      {
        text: {
          content: lead.id
        }
      }
    ]
  }

  return properties
}

/**
 * Searches the Notion database for an existing page with matching Website Lead ID
 */
export async function findNotionLeadByWebsiteId(leadId: string): Promise<string | null> {
  if (!notion) return null

  try {
    let response: any = null

    if (dataSourceId) {
      // Use dataSources.query endpoint supported by current Notion SDK version
      response = await (notion.dataSources as any).query({
        data_source_id: dataSourceId,
        filter: {
          property: 'Website Lead ID',
          rich_text: {
            equals: leadId
          }
        }
      })
    } else if (databaseId) {
      // Fallback bypass for database query if only databaseId is provided
      response = await (notion as any).databases.query({
        database_id: databaseId,
        filter: {
          property: 'Website Lead ID',
          rich_text: {
            equals: leadId
          }
        }
      })
    } else {
      return null
    }

    if (response && response.results && response.results.length > 0) {
      return response.results[0].id
    }
    return null
  } catch (error) {
    console.error('Error querying Notion by Lead ID:', error)
    return null
  }
}

/**
 * Main function to synchronize a Lead to Notion
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
    const errMsg = 'Notion SDK not initialized (missing process.env.NOTION_TOKEN)'
    await updateLocalSyncStatus(leadId, 'FAILED', errMsg, lead.notionRetryCount + 1)
    return { success: false, error: errMsg }
  }

  if (!dataSourceId && !databaseId) {
    const errMsg = 'Notion target identifier is missing (missing NOTION_LEADS_DATA_SOURCE_ID or NOTION_LEADS_DATABASE_ID)'
    await updateLocalSyncStatus(leadId, 'FAILED', errMsg, lead.notionRetryCount + 1)
    return { success: false, error: errMsg }
  }

  try {
    // 1. Idempotency Check: search if page already synced locally or exists on Notion side
    let pageId = lead.notionPageId

    if (!pageId) {
      pageId = await findNotionLeadByWebsiteId(leadId)
    }

    const properties = mapLeadToNotionProperties(lead)

    if (pageId) {
      // Lead already has a page, update it
      await notion.pages.update({
        page_id: pageId,
        properties: properties
      })

      await prisma.lead.update({
        where: { id: leadId },
        data: {
          notionPageId: pageId,
          notionSyncStatus: 'SYNCED',
          notionSyncedAt: new Date(),
          notionSyncError: null
        }
      })
    } else {
      // Create parent mapping block
      const parentObj = dataSourceId 
        ? { data_source_id: dataSourceId }
        : { database_id: databaseId }

      // Create new page in Notion
      const response = await notion.pages.create({
        parent: parentObj as any,
        properties: properties
      })

      await prisma.lead.update({
        where: { id: leadId },
        data: {
          notionPageId: response.id,
          notionSyncStatus: 'SYNCED',
          notionSyncedAt: new Date(),
          notionSyncError: null
        }
      })
    }

    return { success: true }
  } catch (error: any) {
    console.error('Notion Sync failed for lead ID:', leadId, error)
    const sanitizedError = error?.message || String(error)
    await updateLocalSyncStatus(leadId, 'FAILED', sanitizedError, lead.notionRetryCount + 1)
    return { success: false, error: sanitizedError }
  }
}

/**
 * Manual/Job Retry function for failed Notion lead syncs
 */
export async function retryFailedNotionLead(leadId: string): Promise<{ success: boolean; error?: string }> {
  const lead = await prisma.lead.findUnique({
    where: { id: leadId }
  })

  if (!lead) {
    return { success: false, error: 'Lead not found in local database' }
  }

  if (lead.notionRetryCount >= 3) {
    return { success: false, error: 'Max retry attempts (3) exceeded' }
  }

  return syncLeadToNotion(leadId)
}

/**
 * Updates the Lead sync status tracking columns in the local database
 */
async function updateLocalSyncStatus(leadId: string, status: 'FAILED', errorMsg: string, retryCount: number) {
  try {
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        notionSyncStatus: status,
        notionSyncError: errorMsg.slice(0, 500), // refined truncate
        notionRetryCount: retryCount
      }
    })
  } catch (dbErr) {
    console.error('Failed to update local lead sync status in DB:', dbErr)
  }
}

/**
 * Synchronizes a Client Dashboard Project creation request to the Notion Leads database
 */
export async function syncProjectToNotion(project: any, client: any, service: any): Promise<{ success: boolean; error?: string }> {
  if (!notion) {
    return { success: false, error: 'Notion SDK not initialized (missing NOTION_TOKEN)' }
  }

  if (!dataSourceId && !databaseId) {
    return { success: false, error: 'Notion target identifier is missing' }
  }

  try {
    const properties: Record<string, any> = {}

    // 1. الاسم / المشروع (Title) - Client Name + Project Title
    properties['الاسم / المشروع'] = {
      title: [
        {
          text: {
            content: `${client.name || 'عميل'} - ${project.title || 'طلب خدمة'}`
          }
        }
      ]
    }

    // 2. الحالة (Select) - جديد
    properties['الحالة'] = {
      select: {
        name: 'جديد'
      }
    }

    // 3. الأولوية (Select) - متوسطة
    properties['الأولوية'] = {
      select: {
        name: 'متوسطة'
      }
    }

    // 4. الهاتف (Phone)
    if (client.phone) {
      properties['الهاتف'] = {
        phone_number: client.phone
      }
      properties['واتساب'] = {
        phone_number: client.phone
      }
    }

    // 5. البريد (Email)
    if (client.email) {
      properties['البريد'] = {
        email: client.email
      }
    }

    // 6. اسم المشروع (Rich text)
    properties['اسم المشروع'] = {
      rich_text: [
        {
          text: {
            content: project.title || ''
          }
        }
      ]
    }

    // 7. الخدمة المطلوبة (Rich text)
    const serviceName = service 
      ? (service.nameAr || service.nameEn)
      : 'غير محدد'
    
    properties['الخدمة المطلوبة'] = {
      rich_text: [
        {
          text: {
            content: serviceName
          }
        }
      ]
    }

    // 8. تفاصيل الطلب (Rich text)
    properties['تفاصيل الطلب'] = {
      rich_text: [
        {
          text: {
            content: project.description || ''
          }
        }
      ]
    }

    // 9. المصدر (Select) - لوحة التحكم
    properties['المصدر'] = {
      select: {
        name: 'لوحة التحكم'
      }
    }

    // 10. اللغة (Select) - AR
    properties['اللغة'] = {
      select: {
        name: 'AR'
      }
    }

    // Create page in Notion
    const parentObj = dataSourceId 
      ? { data_source_id: dataSourceId }
      : { database_id: databaseId }

    await notion.pages.create({
      parent: parentObj as any,
      properties: properties
    })

    return { success: true }
  } catch (error: any) {
    console.error('Notion Sync failed for dashboard project:', project.id, error)
    return { success: false, error: error?.message || String(error) }
  }
}

/**
 * Synchronizes raw lead data directly to Notion when the PostgreSQL database is offline
 */
export async function syncRawLeadToNotion(leadData: any): Promise<{ success: boolean; error?: string }> {
  if (!notion) {
    return { success: false, error: 'Notion SDK not initialized (missing NOTION_TOKEN)' }
  }

  if (!dataSourceId && !databaseId) {
    return { success: false, error: 'Notion target identifier is missing' }
  }

  try {
    // Retrieve requested service from database if possible, else use raw ID
    let service = null
    if (leadData.requestedServiceId) {
      try {
        service = await prisma.service.findUnique({
          where: { id: leadData.requestedServiceId }
        })
      } catch {
        // DB is offline, service is null
      }
    }

    const properties = mapLeadToNotionProperties({
      ...leadData,
      requestedService: service
    })

    const parentObj = dataSourceId 
      ? { data_source_id: dataSourceId }
      : { database_id: databaseId }

    await notion.pages.create({
      parent: parentObj as any,
      properties: properties
    })

    return { success: true }
  } catch (error: any) {
    console.error('Notion Sync failed for raw lead:', leadData.id, error)
    return { success: false, error: error?.message || String(error) }
  }
}

/**
 * Fetches leads directly from Notion when the database is offline
 */
export async function fetchLeadsFromNotion(): Promise<any[]> {
  if (!notion || (!databaseId && !dataSourceId)) return []

  try {
    const parentId = databaseId || dataSourceId
    console.log('Querying Notion database with ID:', parentId)
    const response = await (notion as any).databases.query({
      database_id: parentId!,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending'
        }
      ],
      page_size: 50
    })
    console.log('Notion query returned response count:', response?.results?.length)

    const leads: any[] = []

    for (const page of response.results as any[]) {
      const props = page.properties

      // Extract title/name
      let name = 'عميل غير معروف'
      const titleProp = props['الاسم / المشروع'] || props['Name'] || props['name'] || props['title'] || props['Title']
      if (titleProp && titleProp.title && titleProp.title.length > 0) {
        name = titleProp.title[0].text.content
      }

      // Extract phone
      let phone = 'غير متوفر'
      const phoneProp = props['الهاتف'] || props['Phone'] || props['phone'] || props['الهاتف (Phone)']
      if (phoneProp && phoneProp.phone_number) {
        phone = phoneProp.phone_number
      }

      // Extract whatsapp
      let whatsapp = ''
      const whatsappProp = props['واتساب'] || props['WhatsApp'] || props['whatsapp']
      if (whatsappProp && whatsappProp.phone_number) {
        whatsapp = whatsappProp.phone_number
      }

      // Extract email
      let email = 'غير متوفر'
      const emailProp = props['البريد'] || props['Email'] || props['email'] || props['البريد الإلكتروني']
      if (emailProp && emailProp.email) {
        email = emailProp.email
      }

      // Extract businessName
      let businessName = 'غير محدد'
      const bizProp = props['اسم المشروع'] || props['المشروع'] || props['Business Name'] || props['business']
      if (bizProp && bizProp.rich_text && bizProp.rich_text.length > 0) {
        businessName = bizProp.rich_text[0].text.content
      }

      // Extract requested service slug/name
      let serviceName = 'غير محدد'
      const serviceProp = props['الخدمة المطلوبة'] || props['الخدمة'] || props['Service'] || props['service']
      if (serviceProp && serviceProp.rich_text && serviceProp.rich_text.length > 0) {
        serviceName = serviceProp.rich_text[0].text.content
      }

      // Extract status
      let notionSyncStatus = 'SYNCED'
      const statusProp = props['الحالة'] || props['Status'] || props['status']
      let status = 'NEW'
      if (statusProp && statusProp.select && statusProp.select.name) {
        const notionStatusName = statusProp.select.name
        if (notionStatusName === 'جديد' || notionStatusName === 'New') status = 'NEW'
        if (notionStatusName === 'قيد المتابعة' || notionStatusName === 'In Progress') status = 'CONTACTED'
        if (notionStatusName === 'مكتمل' || notionStatusName === 'Completed') status = 'CONVERTED'
        if (notionStatusName === 'ملغى' || notionStatusName === 'Cancelled') status = 'ARCHIVED'
      }

      leads.push({
        id: page.id,
        name,
        phone,
        whatsapp,
        email,
        businessName,
        industry: 'غير محدد',
        city: 'غير محدد',
        objective: 'غير محدد',
        budgetMin: null,
        budgetMax: null,
        message: null,
        locale: 'ar',
        notionSyncStatus,
        notionPageId: page.id,
        notionSyncedAt: new Date(page.created_time),
        createdAt: new Date(page.created_time),
        source: 'Notion Sync',
        status,
        requestedService: {
          id: 'notion-service',
          slug: 'service',
          nameAr: serviceName,
          nameEn: serviceName,
          nameFr: serviceName
        }
      })
    }

    return leads
  } catch (error) {
    console.error('Failed to fetch leads from Notion:', error)
    return []
  }
}



