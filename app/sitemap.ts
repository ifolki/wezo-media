import { MetadataRoute } from 'next'
import { portfolioProjects } from '@/lib/config/portfolio'
import { staticServicesData } from '@/lib/config/services'
import { staticSolutionsData } from '@/lib/config/solutions'

export default function sitemap(): MetadataRoute.Sitemap {
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

  // 1. Static Routes across all locales
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: now,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/services/marketing' || route === '/get-quote' ? 0.9 : 0.8,
      })
    }

    // 2. Service Details Routes
    for (const slug of Object.keys(staticServicesData)) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }

    // 3. Solution Details Routes
    for (const slug of Object.keys(staticSolutionsData)) {
      entries.push({
        url: `${baseUrl}/${locale}/solutions/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.75,
      })
    }

    // 4. Portfolio Case Studies
    for (const project of portfolioProjects) {
      entries.push({
        url: `${baseUrl}/${locale}/portfolio/${project.slug}`,
        lastModified: new Date(project.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  }

  return entries
}
