import { siteConfig } from '@/lib/config/site'

interface Props {
  locale: string
  faqItems: { q: string; a: string }[]
}

export default function MarketingStructuredData({ locale, faqItems }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const baseUrl = 'https://www.wezomedia.ma'
  const currentUrl = `${baseUrl}/${locale}/services/marketing`

  // 1. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': isAr ? 'الرئيسية' : isFr ? 'Accueil' : 'Home',
        'item': `${baseUrl}/${locale}`
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': isAr ? 'الخدمات' : isFr ? 'Services' : 'Services',
        'item': `${baseUrl}/${locale}/services`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': isAr ? 'التسويق الرقمي' : isFr ? 'Marketing Digital' : 'Digital Marketing',
        'item': currentUrl
      }
    ]
  }

  // 2. Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Digital Marketing Agency',
    'name': isAr 
      ? 'وكالة تسويق رقمي في المغرب'
      : isFr
      ? 'Agence de marketing digital au Maroc'
      : 'Digital Marketing Agency in Morocco',
    'description': isAr
      ? 'استراتيجية تسويق رقمي متكاملة: صناعة المحتوى، الإعلانات الممولة، استقطاب العملاء، صفحات الويب وتتبع الأداء.'
      : isFr
      ? 'Accompagnement digital sur-mesure au Maroc : stratégie, contenu, publicité en ligne, acquisition et optimisation des conversions.'
      : 'Tailored digital marketing solutions for businesses in Morocco: strategy, content, paid ads, acquisition funnels, and conversion optimization.',
    'provider': {
      '@type': 'Organization',
      'name': 'WEZO MEDIA',
      'url': baseUrl,
      'telephone': siteConfig.phone,
      'email': siteConfig.email,
      'logo': `${baseUrl}/assets/logo/logo-normal.png`,
      'sameAs': [
        'https://www.instagram.com/wezomedia',
        'https://www.facebook.com/wezomedia'
      ]
    },
    'areaServed': {
      '@type': 'Country',
      'name': 'Morocco'
    },
    'url': currentUrl
  }

  // 3. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map(item => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
