import type { Metadata } from 'next'
import HeroV2 from '@/components/public/home/HeroV2'
import ChallengesSection from '@/components/public/home/ChallengesSection'
import ExpertisesSection from '@/components/public/home/ExpertisesSection'
import MethodSection from '@/components/public/home/MethodSection'
import ProjectsSection from '@/components/public/home/ProjectsSection'
import TiersSection from '@/components/public/home/TiersSection'
import FinalCtaV2 from '@/components/public/home/FinalCtaV2'
import HomeWhatsAppFloating from '@/components/public/home/HomeWhatsAppFloating'
import { siteConfig } from '@/lib/config/site'
import { getAllServicesWithHierarchy } from '@/lib/services-hierarchy'
import { AlertCircle } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const title = isAr
    ? 'وكالة التواصل والتسويق الرقمي في المغرب | WEZO MEDIA'
    : isFr
    ? 'Agence de Communication Digitale au Maroc | WEZO MEDIA'
    : 'Digital Marketing & Communication Agency in Morocco | WEZO MEDIA'

  const description = isAr
    ? 'وكالة WEZO MEDIA للتواصل والتسويق الرقمي وشريك النمو للشركات في المغرب. استراتيجية رقمية، مواقع إلكترونية ومتاجر، هوية بصرية، إعلانات ممولة وأتمتة ذكية للأعمال.'
    : isFr
    ? 'WEZO MEDIA accompagne les entreprises au Maroc en communication digitale, publicité Meta Ads, création de sites web, branding et automatisation.'
    : 'WEZO MEDIA is a digital communication and marketing agency in Morocco helping businesses grow through branding, websites, paid ads, video, and automation.'

  const canonicalUrl = `https://www.wezomedia.ma/${locale}`

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar': 'https://www.wezomedia.ma/ar',
        'fr': 'https://www.wezomedia.ma/fr',
        'en': 'https://www.wezomedia.ma/en',
        'x-default': 'https://www.wezomedia.ma/ar',
      },
    },
    openGraph: {
      title,
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
      title,
      description,
      images: ['https://www.wezomedia.ma/assets/agency/office.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function Home({ params: { locale } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'
  
  const { services: allServices, dbOffline } = await getAllServicesWithHierarchy()
  const featuredServices = allServices.filter((s) => s.isActive && s.showInCatalog)

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': 'https://www.wezomedia.ma/#organization',
    name: 'WEZO MEDIA',
    url: `https://www.wezomedia.ma/${locale}`,
    logo: 'https://www.wezomedia.ma/assets/logo/logo-normal.png',
    image: 'https://www.wezomedia.ma/assets/agency/office.jpg',
    description: isAr
      ? 'وكالة WEZO MEDIA للتواصل والتسويق الرقمي وشريك النمو للشركات في المغرب. استراتيجية رقمية، مواقع إلكترونية ومتاجر، هوية بصرية، إعلانات ممولة وأتمتة ذكية للأعمال.'
      : isFr
      ? 'WEZO MEDIA accompagne les entreprises au Maroc en communication digitale, publicité Meta Ads, création de sites web, branding et automatisation.'
      : 'WEZO MEDIA is a digital communication and marketing agency in Morocco helping businesses grow through branding, websites, paid ads, video, and automation.',
    telephone: siteConfig.phoneInternational,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'BD Moustapha El Maani N 22',
      addressLocality: 'Casablanca',
      addressRegion: 'Casablanca-Settat',
      addressCountry: 'MA',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Morocco',
    },
    knowsLanguage: ['fr', 'ar', 'en'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isAr
        ? 'خدمات التواصل والتسويق الرقمي'
        : isFr
        ? 'Services de Communication Digitale & Croissance'
        : 'Digital Communication & Growth Services',
      itemListElement: featuredServices.map((srv) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: isAr ? srv.nameAr : isFr ? srv.nameFr : srv.nameEn,
          description: isAr ? srv.descAr : isFr ? srv.descFr : srv.descEn,
          url: `https://www.wezomedia.ma/${locale}/services/${srv.slug}`,
        },
      })),
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.linkedin,
      siteConfig.social.tiktok,
      siteConfig.social.youtube,
    ],
  }

  return (
    <main className="flex flex-col w-full relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {dbOffline && (
        <div className="absolute top-4 inset-x-0 max-w-md mx-auto z-50">
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm mx-4">
            <AlertCircle className="w-4 h-4" />
            <span>{isAr ? 'تصفح غير متصل بالخادم' : 'Viewing offline cached version'}</span>
          </div>
        </div>
      )}
      {/* Section 1: Hero Premium */}
      <HeroV2 />

      {/* Section 2: Les Défis de Votre Entreprise & Notre Réponse */}
      <ChallengesSection locale={locale} />

      {/* Section 3: Nos 6 Pôles d'Expertise Digitale */}
      <ExpertisesSection />

      {/* Section 4: Notre Méthode en 4 Étapes */}
      <MethodSection locale={locale} />

      {/* Section 5: Nos Réalisations Concrètes (Portfolio Vérifié) */}
      <ProjectsSection locale={locale} />

      {/* Section 6: Accompagnement Sur Mesure (Sans Tarifs Publics) */}
      <TiersSection locale={locale} />

      {/* Section 7: Contact & CTA Final */}
      <FinalCtaV2 />

      {/* Floating WhatsApp Action for Instant Access */}
      <HomeWhatsAppFloating />
    </main>
  )
}
