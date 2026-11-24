import { siteConfig } from '@/lib/config/site'

interface Props {
  locale: string
  faqItems: { q: string; a: string }[]
}

export default function AcquisitionStructuredData({ locale, faqItems }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const baseUrl = 'https://www.wezomedia.ma'
  const currentUrl = `${baseUrl}/${locale}/services/meta-ads-management`

  // 1. BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : isFr ? 'Accueil' : 'Home',
        item: `${baseUrl}/${locale}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'الخدمات' : isFr ? 'Services' : 'Services',
        item: `${baseUrl}/${locale}/services`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: isAr ? 'التسويق الرقمي' : isFr ? 'Marketing Digital' : 'Digital Marketing',
        item: `${baseUrl}/${locale}/services/marketing`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: isAr ? 'إعلانات Meta واستقطاب العملاء' : isFr ? 'Acquisition Meta Ads' : 'Meta Ads Acquisition',
        item: currentUrl
      }
    ]
  }

  // 2. Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Meta Advertising & Client Acquisition',
    name: isAr 
      ? 'حملات إعلانية ممولة على فيسبوك وإنستغرام لجلب عملاء مؤهلين'
      : isFr
      ? 'Campagnes Facebook & Instagram et Acquisition de Prospects Qualifiés'
      : 'Facebook & Instagram Paid Advertising and Client Acquisition',
    description: isAr
      ? 'إدارة حملات Meta الإعلانية المصممة لنمو شركتك بالمغرب: استراتيجية الاستهداف، تصميم إعلانات جذابة، مسار تحويل مباشر عبر واتساب وتحسين مستمر للمردودية.'
      : isFr
      ? 'Campagnes publicitaires Facebook & Instagram pensées pour votre rentabilité : stratégie d\'audience, création visuelle percutante, parcours WhatsApp et optimisation continue.'
      : 'Results-driven Facebook & Instagram ad campaigns designed for businesses in Morocco: audience strategy, compelling creatives, WhatsApp funnels, and continuous optimization.',
    provider: {
      '@type': 'Organization',
      name: 'WEZO MEDIA',
      url: baseUrl,
      telephone: siteConfig.phone,
      email: siteConfig.email,
      logo: `${baseUrl}/assets/logo/logo-normal.png`,
      sameAs: [
        siteConfig.social.instagram,
        siteConfig.social.facebook,
        siteConfig.social.linkedin
      ]
    },
    areaServed: {
      '@type': 'Country',
      name: 'Morocco'
    },
    url: currentUrl
  }

  // 3. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
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
