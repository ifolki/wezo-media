import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config/site'
import ContactClient from '@/components/public/contact/ContactClient'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const titleText = isAr
    ? 'تواصل معنا | وكالة WEZO MEDIA بالدار البيضاء'
    : isFr
    ? 'Contactez-nous | WEZO MEDIA Casablanca'
    : 'Contact Us | WEZO MEDIA Casablanca'

  const descriptionText = isAr
    ? 'تواصل مع فريق WEZO MEDIA بالدار البيضاء لمناقشة مشروعك الرقمي، استشارات التسويق، الإعلانات الممولة، أو طلب عرض سعر مخصص.'
    : isFr
    ? 'Contactez l’équipe WEZO MEDIA à Casablanca pour échanger sur vos projets digitaux, campagnes publicitaires, création de sites web ou obtenir un devis.'
    : 'Contact WEZO MEDIA team in Casablanca to discuss your digital projects, advertising campaigns, web development or request a consultation.'

  const canonicalUrl = `https://www.wezomedia.ma/${locale}/contact`

  return {
    title: {
      absolute: `${titleText} | WEZO MEDIA`,
    },
    description: descriptionText,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: 'https://www.wezomedia.ma/ar/contact',
        fr: 'https://www.wezomedia.ma/fr/contact',
        en: 'https://www.wezomedia.ma/en/contact',
        'x-default': 'https://www.wezomedia.ma/ar/contact',
      },
    },
    openGraph: {
      title: `${titleText} | WEZO MEDIA`,
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
      title: `${titleText} | WEZO MEDIA`,
      description: descriptionText,
      images: ['https://www.wezomedia.ma/assets/agency/office.jpg'],
    },
  }
}

export default function ContactPage({ params: { locale } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const titleText = isAr
    ? 'تواصل معنا | وكالة WEZO MEDIA بالدار البيضاء'
    : isFr
    ? 'Contactez-nous | WEZO MEDIA Casablanca'
    : 'Contact Us | WEZO MEDIA Casablanca'

  const descriptionText = isAr
    ? 'تواصل مع فريق WEZO MEDIA بالدار البيضاء لمناقشة مشروعك الرقمي، استشارات التسويق، الإعلانات الممولة، أو طلب عرض سعر مخصص.'
    : isFr
    ? 'Contactez l’équipe WEZO MEDIA à Casablanca pour échanger sur vos projets digitaux, campagnes publicitaires, création de sites web ou obtenir un devis.'
    : 'Contact WEZO MEDIA team in Casablanca to discuss your digital projects, advertising campaigns, web development or request a consultation.'

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
        name: isAr ? 'تواصل معنا' : isFr ? 'Contact' : 'Contact Us',
        item: `https://www.wezomedia.ma/${locale}/contact`,
      },
    ],
  }

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `https://www.wezomedia.ma/${locale}/contact#webpage`,
    url: `https://www.wezomedia.ma/${locale}/contact`,
    name: titleText,
    description: descriptionText,
    inLanguage: locale,
    mainEntity: {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://www.wezomedia.ma/#organization',
      name: 'WEZO MEDIA',
      url: 'https://www.wezomedia.ma',
      logo: 'https://www.wezomedia.ma/assets/logo/logo-normal.png',
      telephone: siteConfig.phoneInternational,
      email: siteConfig.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'BD Moustapha El Maani N 22',
        addressLocality: 'Casablanca',
        addressRegion: 'Casablanca-Settat',
        addressCountry: 'MA',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: siteConfig.phoneInternational,
        contactType: 'customer service',
        availableLanguage: ['Arabic', 'French', 'English'],
        areaServed: 'MA',
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactClient />
    </>
  )
}
