import type { Metadata } from 'next'
import { portfolioProjects } from '@/lib/config/portfolio'

export function generatePortfolioMetadata(slug: string, locale: string): Metadata {
  const project = portfolioProjects.find((p) => p.slug === slug)
  if (!project) {
    return {
      title: 'Projet Portfolio | WEZO MEDIA',
    }
  }

  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const categoryLabel = isAr
    ? project.categoryLabelAr
    : isFr
    ? project.categoryLabelFr
    : project.categoryLabelEn

  const titleText = isAr
    ? `${project.title} — دراسة حالة ونتائج المشروع (${categoryLabel})`
    : isFr
    ? `${project.title} — Étude de cas & Réalisation (${categoryLabel})`
    : `${project.title} — Case Study & Project Deliverables (${categoryLabel})`

  const descriptionText = isAr
    ? `${project.highlightAr} تفاصيل تنفيذ استراتيجية ${categoryLabel} لـ ${project.title} بواسطة وكالة WEZO MEDIA.`
    : isFr
    ? `${project.highlightFr} Réalisation et accompagnement en ${categoryLabel} par WEZO MEDIA pour ${project.title}.`
    : `${project.highlightEn} Project execution and deliverables in ${categoryLabel} by WEZO MEDIA for ${project.title}.`

  const canonicalUrl = `https://www.wezomedia.ma/${locale}/portfolio/${slug}`
  const imageUrl = project.img.startsWith('http')
    ? project.img
    : `https://www.wezomedia.ma${project.img}`

  return {
    title: {
      absolute: `${titleText} | WEZO MEDIA`,
    },
    description: descriptionText,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: `https://www.wezomedia.ma/ar/portfolio/${slug}`,
        fr: `https://www.wezomedia.ma/fr/portfolio/${slug}`,
        en: `https://www.wezomedia.ma/en/portfolio/${slug}`,
        'x-default': `https://www.wezomedia.ma/ar/portfolio/${slug}`,
      },
    },
    openGraph: {
      title: `${titleText} | WEZO MEDIA`,
      description: descriptionText,
      url: canonicalUrl,
      siteName: 'WEZO MEDIA',
      locale: isAr ? 'ar_MA' : isFr ? 'fr_MA' : 'en_US',
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titleText} | WEZO MEDIA`,
      description: descriptionText,
      images: [imageUrl],
    },
  }
}

export function getPortfolioStructuredData(slug: string, locale: string) {
  const project = portfolioProjects.find((p) => p.slug === slug)
  if (!project) return null

  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const categoryLabel = isAr
    ? project.categoryLabelAr
    : isFr
    ? project.categoryLabelFr
    : project.categoryLabelEn

  const titleText = isAr
    ? `${project.title} — دراسة حالة ونتائج المشروع (${categoryLabel})`
    : isFr
    ? `${project.title} — Étude de cas & Réalisation (${categoryLabel})`
    : `${project.title} — Case Study & Project Deliverables (${categoryLabel})`

  const descriptionText = isAr
    ? `${project.highlightAr} تفاصيل تنفيذ استراتيجية ${categoryLabel} لـ ${project.title} بواسطة وكالة WEZO MEDIA.`
    : isFr
    ? `${project.highlightFr} Réalisation et accompagnement en ${categoryLabel} par WEZO MEDIA pour ${project.title}.`
    : `${project.highlightEn} Project execution and deliverables in ${categoryLabel} by WEZO MEDIA for ${project.title}.`

  const currentUrl = `https://www.wezomedia.ma/${locale}/portfolio/${slug}`
  const imageUrl = project.img.startsWith('http')
    ? project.img
    : `https://www.wezomedia.ma${project.img}`

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${currentUrl}#work`,
    headline: titleText,
    name: project.title,
    description: descriptionText,
    image: imageUrl,
    url: currentUrl,
    genre: categoryLabel,
    inLanguage: locale,
    creator: {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.wezomedia.ma/#organization',
      name: 'WEZO MEDIA',
      url: 'https://www.wezomedia.ma',
    },
    provider: {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.wezomedia.ma/#organization',
      name: 'WEZO MEDIA',
      url: 'https://www.wezomedia.ma',
    },
  }
}

export { PortfolioJsonLd } from '@/components/public/portfolio/PortfolioJsonLd'
