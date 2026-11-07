import prisma from '@/lib/prisma'
import { staticServicesData, getStaticServiceDetails } from '@/lib/config/services'

export interface EnrichedService {
  id: string
  slug: string
  nameAr: string
  nameEn: string
  nameFr: string
  descAr: string
  descEn: string
  descFr: string
  category: string
  icon: string | null
  image: string | null
  isActive: boolean
  showInCatalog: boolean
  showInQuoteForm: boolean
  order: number
  parentServiceId: string | null
  parentSlug?: string | null
  subServices?: EnrichedService[]
}

export const CORE_PILLAR_SLUGS = [
  'marketing',
  'business-website',
  'reels-social-video',
  'brand-identity',
  'whatsapp-lead-automation',
  'music-production',
] as const

// Legacy duplicate slugs that remain published for SEO/foreign keys
// but should not clutter the visible sub-service chips inside the 6 pillar cards
export const LEGACY_HIDDEN_CHIP_SLUGS = new Set(['web', 'video', 'audio'])

/**
 * Enriches raw DB service records with hierarchy & visibility flags
 * when the database has not yet run the 20261027 migration, or merges
 * unified pillar titles/descriptions from staticServicesData.
 */
export function enrichServicesWithHierarchy(
  rawServices: any[],
  isPreMigrationFallback: boolean
): EnrichedService[] {
  const slugToId = new Map<string, string>()
  for (const s of rawServices) {
    if (s.slug && s.id) {
      slugToId.set(s.slug.toLowerCase().trim(), s.id)
    }
  }

  const enriched: EnrichedService[] = rawServices.map((s) => {
    const slug = (s.slug || '').toLowerCase().trim()
    const staticDef = staticServicesData[slug]

    const hasMigratedFlags =
      !isPreMigrationFallback &&
      typeof s.showInCatalog === 'boolean' &&
      typeof s.showInQuoteForm === 'boolean'

    const showInCatalog = hasMigratedFlags
      ? s.showInCatalog
      : Boolean(staticDef?.showInCatalog)

    const showInQuoteForm = hasMigratedFlags
      ? s.showInQuoteForm
      : Boolean(staticDef?.showInQuoteForm)

    const order =
      hasMigratedFlags && typeof s.order === 'number' && s.order > 0
        ? s.order
        : staticDef?.order ?? s.order ?? 99

    let parentServiceId: string | null = null
    if (hasMigratedFlags && s.parentServiceId !== undefined) {
      parentServiceId = s.parentServiceId
    } else if (staticDef?.parentSlug) {
      parentServiceId = slugToId.get(staticDef.parentSlug) || null
    }

    // For the 6 core pillars in pre-migration state, use the unified pillar naming
    // so /ar/services, /fr/services, /en/services and /get-quote show consistent pillar titles
    const isPillar = CORE_PILLAR_SLUGS.includes(slug as any)
    const nameAr =
      isPreMigrationFallback && isPillar && staticDef ? staticDef.nameAr : s.nameAr || staticDef?.nameAr || slug
    const nameEn =
      isPreMigrationFallback && isPillar && staticDef ? staticDef.nameEn : s.nameEn || staticDef?.nameEn || slug
    const nameFr =
      isPreMigrationFallback && isPillar && staticDef ? staticDef.nameFr : s.nameFr || staticDef?.nameFr || nameEn
    const descAr =
      isPreMigrationFallback && isPillar && staticDef ? staticDef.descAr : s.descAr || staticDef?.descAr || ''
    const descEn =
      isPreMigrationFallback && isPillar && staticDef ? staticDef.descEn : s.descEn || staticDef?.descEn || ''
    const descFr =
      isPreMigrationFallback && isPillar && staticDef ? staticDef.descFr : s.descFr || staticDef?.descFr || descEn

    return {
      id: s.id,
      slug,
      nameAr,
      nameEn,
      nameFr,
      descAr,
      descEn,
      descFr,
      category: s.category || staticDef?.categoryKey || 'DIGITAL_MARKETING',
      icon: s.icon ?? null,
      image: s.image ?? null,
      isActive: typeof s.isActive === 'boolean' ? s.isActive : true,
      showInCatalog,
      showInQuoteForm,
      order,
      parentServiceId,
      parentSlug: staticDef?.parentSlug ?? null,
    }
  })

  // Sort by order ascending
  enriched.sort((a, b) => a.order - b.order)

  // Attach subServices to each parent pillar
  const byId = new Map<string, EnrichedService>()
  for (const item of enriched) {
    item.subServices = []
    byId.set(item.id, item)
  }

  for (const item of enriched) {
    if (item.parentServiceId && byId.has(item.parentServiceId)) {
      byId.get(item.parentServiceId)!.subServices!.push(item)
    }
  }

  return enriched
}

/**
 * Fetches all services safely whether the DB has run the new migration or not,
 * and falls back to staticServicesData if the DB is unreachable.
 */
export async function getAllServicesWithHierarchy(): Promise<{
  services: EnrichedService[]
  dbOffline: boolean
  isPreMigrationFallback: boolean
}> {
  // 1. Try querying with the new migrated schema columns first
  try {
    const dbServices = await prisma.service.findMany({
      orderBy: { order: 'asc' },
    })
    return {
      services: enrichServicesWithHierarchy(dbServices, false),
      dbOffline: false,
      isPreMigrationFallback: false,
    }
  } catch (err: any) {
    const msg = String(err?.message || '')
    // 2. If the live DB has not yet applied the migration columns (showInCatalog, etc.),
    // query only the pre-existing columns without failing!
    if (
      msg.includes('showInCatalog') ||
      msg.includes('showInQuoteForm') ||
      msg.includes('parentServiceId') ||
      msg.includes('does not exist')
    ) {
      try {
        const legacyDbServices = await prisma.service.findMany({
          select: {
            id: true,
            slug: true,
            nameAr: true,
            nameEn: true,
            nameFr: true,
            descAr: true,
            descEn: true,
            descFr: true,
            category: true,
            icon: true,
            image: true,
            isActive: true,
            order: true,
            createdAt: true,
          },
          orderBy: { order: 'asc' },
        })
        return {
          services: enrichServicesWithHierarchy(legacyDbServices, true),
          dbOffline: false,
          isPreMigrationFallback: true,
        }
      } catch (innerErr) {
        console.error('Legacy DB query also failed, falling back to static config:', innerErr)
      }
    } else {
      console.error('Database offline fallback in getAllServicesWithHierarchy:', err)
    }
  }

  // 3. Offline static fallback if database is completely unreachable
  const staticList = Object.values(staticServicesData).map((s) => ({
    id: `static-${s.slug}`,
    slug: s.slug,
    nameAr: s.nameAr,
    nameEn: s.nameEn,
    nameFr: s.nameFr,
    descAr: s.descAr,
    descEn: s.descEn,
    descFr: s.descFr,
    category: s.categoryKey,
    icon: null,
    image: null,
    isActive: true,
    showInCatalog: Boolean(s.showInCatalog),
    showInQuoteForm: Boolean(s.showInQuoteForm),
    order: s.order ?? 99,
  }))

  return {
    services: enrichServicesWithHierarchy(staticList, true),
    dbOffline: true,
    isPreMigrationFallback: true,
  }
}

/**
 * Fetches a single service by slug safely (supports both post-migration and pre-migration DB)
 */
export async function getServiceBySlugWithHierarchy(slug: string): Promise<{
  service: EnrichedService | null
  parentService: EnrichedService | null
  siblingServices: EnrichedService[]
  dbOffline: boolean
}> {
  const normalized = (slug || '').toLowerCase().trim()
  const { services, dbOffline } = await getAllServicesWithHierarchy()

  const found = services.find((s) => s.slug === normalized) || null
  if (!found) {
    return { service: null, parentService: null, siblingServices: [], dbOffline }
  }

  const parentService = found.parentServiceId
    ? services.find((s) => s.id === found.parentServiceId) || null
    : null

  const siblingServices = parentService
    ? (parentService.subServices || []).filter(
        (sub) => sub.isActive && sub.slug !== found.slug && !LEGACY_HIDDEN_CHIP_SLUGS.has(sub.slug)
      )
    : (found.subServices || []).filter(
        (sub) => sub.isActive && !LEGACY_HIDDEN_CHIP_SLUGS.has(sub.slug)
      )

  return {
    service: found,
    parentService,
    siblingServices,
    dbOffline,
  }
}
