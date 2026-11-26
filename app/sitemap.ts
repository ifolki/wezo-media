import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'
import { portfolioProjects } from '@/lib/config/portfolio'
import { staticServicesData } from '@/lib/config/services'
import { staticSolutionsData } from '@/lib/config/solutions'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.wezomedia.ma'
  const locales = ['ar', 'fr', 'en']
  const now = new Date()

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/services/marketing',
    '/solutions',
    '/portfolio',
    '/artists',
    '/blog',
    '/contact',
    '/get-quote',
    '/growth',
    '/privacy',
    '/terms',
  ]

  const entries: MetadataRoute.Sitemap = []
  const addedUrls = new Set<string>()

  const addEntry = (entry: MetadataRoute.Sitemap[number]) => {
    if (!addedUrls.has(entry.url)) {
      addedUrls.add(entry.url)
      entries.push(entry)
    }
  }

  // 1. Static Routes across all locales
  for (const locale of locales) {
    for (const route of staticRoutes) {
      addEntry({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/services/marketing' || route === '/get-quote' ? 0.9 : 0.8,
      })
    }

    // 2. Service Details Routes (all 26 services, avoiding duplicate /services/marketing)
    for (const slug of Object.keys(staticServicesData)) {
      if (slug === 'marketing') continue
      addEntry({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: staticServicesData[slug]?.showInCatalog ? 0.85 : 0.8,
      })
    }

    // 3. Solution Details Routes
    for (const slug of Object.keys(staticSolutionsData)) {
      addEntry({
        url: `${baseUrl}/${locale}/solutions/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
      })
    }

    // 4. Portfolio Case Studies
    for (const project of portfolioProjects) {
      addEntry({
        url: `${baseUrl}/${locale}/portfolio/${project.slug}`,
        lastModified: new Date(project.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  // 5. Dynamic Published Blog Posts (strictly published, with verified content in requested language)
  try {
    const publishedPosts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: {
        slug: true,
        titleAr: true,
        titleEn: true,
        titleFr: true,
        contentAr: true,
        contentEn: true,
        contentFr: true,
        publishedAt: true,
        createdAt: true,
      },
      orderBy: { publishedAt: 'desc' },
    })

    for (const post of publishedPosts) {
      const hasAr = Boolean(post.titleAr && post.titleAr.trim().length > 0 && post.contentAr && post.contentAr.trim().length > 0)
      const hasFr = Boolean(post.titleFr && post.titleFr.trim().length > 0 && post.contentFr && post.contentFr.trim().length > 0)
      const hasEn = Boolean(post.titleEn && post.titleEn.trim().length > 0 && post.contentEn && post.contentEn.trim().length > 0)
      const postLastMod = post.publishedAt || post.createdAt || now

      if (hasAr) {
        addEntry({
          url: `${baseUrl}/ar/blog/${post.slug}`,
          lastModified: new Date(postLastMod),
          changeFrequency: 'weekly',
          priority: 0.75,
        })
      }
      if (hasFr) {
        addEntry({
          url: `${baseUrl}/fr/blog/${post.slug}`,
          lastModified: new Date(postLastMod),
          changeFrequency: 'weekly',
          priority: 0.75,
        })
      }
      if (hasEn) {
        addEntry({
          url: `${baseUrl}/en/blog/${post.slug}`,
          lastModified: new Date(postLastMod),
          changeFrequency: 'weekly',
          priority: 0.75,
        })
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap generation:', error)
  }

  return entries
}
