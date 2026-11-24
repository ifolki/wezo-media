import { growthSectorsData } from '@/lib/config/growth'
import GrowthLanding from '@/components/public/GrowthLanding'

export const dynamic = 'force-dynamic'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  // Optimized commercial SEO titles and descriptions distinct from homepage & services
  const title = isAr
    ? 'منظومة استقطاب العملاء وتوليد المبيعات للشركات بالمغرب'
    : isFr
    ? 'Système d’Acquisition Client & Génération de Leads au Maroc'
    : 'Client Acquisition System & B2B Lead Generation in Morocco'

  const description = isAr
    ? 'بناء وإدارة منظومة متكاملة لاكتساب العملاء المؤهلين ونمو المبيعات بالمغرب: حملات إعلانية موجهة، صفحات هبوط عالية التحويل، وتأهيل مباشر للفرص التجارية عبر واتساب.'
    : isFr
    ? 'Déployez un système prévisible d’acquisition de prospects qualifiés et de croissance B2B au Maroc : publicités ciblées, créatifs performants, landing pages et qualification WhatsApp.'
    : 'Build a predictable client acquisition and B2B growth engine in Morocco: targeted paid advertising, high-converting landing pages, creative assets, and qualified WhatsApp funnels.'

  const canonicalUrl = `https://www.wezomedia.ma/${locale}/growth`

  return {
    title: {
      absolute: `${title} | WEZO MEDIA`,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: 'https://www.wezomedia.ma/ar/growth',
        fr: 'https://www.wezomedia.ma/fr/growth',
        en: 'https://www.wezomedia.ma/en/growth',
        'x-default': 'https://www.wezomedia.ma/ar/growth',
      },
    },
    openGraph: {
      title: `${title} | WEZO MEDIA`,
      description,
      url: canonicalUrl,
      siteName: 'WEZO MEDIA',
      locale: isAr ? 'ar_MA' : isFr ? 'fr_MA' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.wezomedia.ma/assets/agency/office.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | WEZO MEDIA`,
      description,
      images: ['https://www.wezomedia.ma/assets/agency/office.jpg'],
    },
  }
}

export default async function GeneralGrowthPage({ params: { locale } }: Props) {
  const config = growthSectorsData['general']
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const currentUrl = `https://www.wezomedia.ma/${locale}/growth`
  const title = isAr
    ? 'منظومة استقطاب العملاء وتوليد المبيعات للشركات بالمغرب'
    : isFr
    ? 'Système d’Acquisition Client & Génération de Leads au Maroc'
    : 'Client Acquisition System & B2B Lead Generation in Morocco'

  const description = isAr
    ? 'بناء وإدارة منظومة متكاملة لاكتساب العملاء المؤهلين ونمو المبيعات بالمغرب: حملات إعلانية موجهة، صفحات هبوط عالية التحويل، وتأهيل مباشر للفرص التجارية عبر واتساب.'
    : isFr
    ? 'Déployez un système prévisible d’acquisition de prospects qualifiés et de croissance B2B au Maroc : publicités ciblées, créatifs performants, landing pages et qualification WhatsApp.'
    : 'Build a predictable client acquisition and B2B growth engine in Morocco: targeted paid advertising, high-converting landing pages, creative assets, and qualified WhatsApp funnels.'

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
        name: title,
        item: currentUrl,
      },
    ],
  }

  const growthServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${currentUrl}#service`,
    name: title,
    description,
    serviceType: 'B2B Client Acquisition System',
    url: currentUrl,
    provider: {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.wezomedia.ma/#organization',
      name: 'WEZO MEDIA',
      url: 'https://www.wezomedia.ma',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Morocco',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(growthServiceSchema) }}
      />
      <GrowthLanding config={config} locale={locale} />
    </>
  )
}
