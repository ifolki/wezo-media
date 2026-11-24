import type { Metadata } from 'next'
import PortfolioClient from '@/components/public/portfolio/PortfolioClient'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const titleText = isAr
    ? 'معرض الأعمال ودراسات الحالة | WEZO MEDIA'
    : isFr
    ? 'Nos Réalisations & Études de Cas | WEZO MEDIA'
    : 'Our Portfolio & Case Studies | WEZO MEDIA'

  const descriptionText = isAr
    ? 'اكتشف نماذج من أعمال ومشاريع WEZO MEDIA في المغرب: استراتيجيات التسويق الرقمي، تطوير المواقع والمتاجر، صناعة المحتوى المرئي، وبناء الهوية البصرية.'
    : isFr
    ? 'Découvrez les réalisations et études de cas de WEZO MEDIA au Maroc : campagnes publicitaires, sites web professionnels, identités de marque et production vidéo.'
    : 'Explore WEZO MEDIA portfolio and client case studies in Morocco: digital marketing, custom websites, brand identity, and video production.'

  const canonicalUrl = `https://www.wezomedia.ma/${locale}/portfolio`

  return {
    title: {
      absolute: titleText,
    },
    description: descriptionText,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: 'https://www.wezomedia.ma/ar/portfolio',
        fr: 'https://www.wezomedia.ma/fr/portfolio',
        en: 'https://www.wezomedia.ma/en/portfolio',
        'x-default': 'https://www.wezomedia.ma/ar/portfolio',
      },
    },
    openGraph: {
      title: titleText,
      description: descriptionText,
      url: canonicalUrl,
      siteName: 'WEZO MEDIA',
      locale: isAr ? 'ar_MA' : isFr ? 'fr_MA' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.wezomedia.ma/assets/agency/office.jpg',
          width: 1200,
          height: 630,
          alt: titleText,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleText,
      description: descriptionText,
      images: ['https://www.wezomedia.ma/assets/agency/office.jpg'],
    },
  }
}

export default function PortfolioPage({ params: { locale } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const titleText = isAr
    ? 'معرض الأعمال ودراسات الحالة'
    : isFr
    ? 'Nos Réalisations & Études de Cas'
    : 'Our Portfolio & Case Studies'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : isFr ? 'Accueil' : 'Home',
        item: `https://www.wezomedia.ma/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: titleText,
        item: `https://www.wezomedia.ma/${locale}/portfolio`,
      },
    ],
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `https://www.wezomedia.ma/${locale}/portfolio#collection`,
    url: `https://www.wezomedia.ma/${locale}/portfolio`,
    name: `${titleText} | WEZO MEDIA`,
    description: isAr
      ? 'نماذج من مشاريع ودراسات حالة وكالة WEZO MEDIA في المغرب'
      : isFr
      ? 'Réalisations et études de cas de l\'agence WEZO MEDIA au Maroc'
      : 'Client portfolio and case studies by WEZO MEDIA in Morocco',
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://www.wezomedia.ma/#website',
      name: 'WEZO MEDIA',
      url: 'https://www.wezomedia.ma',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <PortfolioClient />
    </>
  )
}
