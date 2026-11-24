import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AcquisitionHero from '@/components/public/services/acquisition/AcquisitionHero'
import AcquisitionProblemSolution from '@/components/public/services/acquisition/AcquisitionProblemSolution'
import AcquisitionServicesProcess from '@/components/public/services/acquisition/AcquisitionServicesProcess'
import AcquisitionPackages from '@/components/public/services/acquisition/AcquisitionPackages'
import AcquisitionProofFAQ from '@/components/public/services/acquisition/AcquisitionProofFAQ'
import AcquisitionCTA from '@/components/public/services/acquisition/AcquisitionCTA'
import AcquisitionWhatsAppFloating from '@/components/public/services/acquisition/AcquisitionWhatsAppFloating'
import AcquisitionStructuredData from '@/components/public/services/acquisition/AcquisitionStructuredData'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta_ads_service.meta' })
  const canonicalUrl = `https://www.wezomedia.ma/${locale}/services/meta-ads-management`

  return {
    title: {
      absolute: t('title'),
    },
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar': 'https://www.wezomedia.ma/ar/services/meta-ads-management',
        'fr': 'https://www.wezomedia.ma/fr/services/meta-ads-management',
        'en': 'https://www.wezomedia.ma/en/services/meta-ads-management',
        'x-default': 'https://www.wezomedia.ma/ar/services/meta-ads-management',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: canonicalUrl,
      siteName: 'WEZO MEDIA',
      locale: locale === 'ar' ? 'ar_MA' : locale === 'fr' ? 'fr_MA' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://www.wezomedia.ma/assets/agency/office.jpg',
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://www.wezomedia.ma/assets/agency/office.jpg'],
    },
  }
}

export default async function MetaAdsServicePage({ params: { locale } }: Props) {
  const tFaq = await getTranslations({ locale, namespace: 'meta_ads_service.proof_faq' })

  const faqItems = [
    { q: tFaq('q1'), a: tFaq('a1') },
    { q: tFaq('q2'), a: tFaq('a2') },
    { q: tFaq('q3'), a: tFaq('a3') },
    { q: tFaq('q4'), a: tFaq('a4') },
    { q: tFaq('q5'), a: tFaq('a5') },
    { q: tFaq('q6'), a: tFaq('a6') },
    { q: tFaq('q7'), a: tFaq('a7') },
  ]

  return (
    <main className="min-h-screen bg-[#F6F5F0] text-[#111118] selection:bg-brand-orange selection:text-white">
      {/* 0. JSON-LD Structured Data (Breadcrumbs, Service & FAQ) */}
      <AcquisitionStructuredData locale={locale} faqItems={faqItems} />

      {/* 1. Hero Section & Value Proposition */}
      <AcquisitionHero locale={locale} />

      {/* 2. Client Problems & WEZO Integrated Solution (Dual Confrontation) */}
      <AcquisitionProblemSolution locale={locale} />

      {/* 3. Services & 4-Step Execution Workflow (with Collapsible Contractual Details) */}
      <AcquisitionServicesProcess locale={locale} />

      {/* 4. Service Packages (3 Tiers, max 5 bullets, no public prices + Media spend note) */}
      <AcquisitionPackages locale={locale} />

      {/* 5. Verified Client Achievements & Strategic FAQ (Closed by default) */}
      <AcquisitionProofFAQ locale={locale} />

      {/* 6. Final High-Converting Call-to-Action with Reassurance */}
      <AcquisitionCTA locale={locale} />

      {/* Floating WhatsApp Action (Mobile-optimized compact icon) */}
      <AcquisitionWhatsAppFloating locale={locale} />
    </main>
  )
}
