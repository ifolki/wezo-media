import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import MarketingHero from '@/components/public/marketing/MarketingHero'
import MarketingProblem from '@/components/public/marketing/MarketingProblem'
import MarketingPillars from '@/components/public/marketing/MarketingPillars'
import MarketingProcess from '@/components/public/marketing/MarketingProcess'
import MarketingTarget from '@/components/public/marketing/MarketingTarget'
import MarketingCaseStudies from '@/components/public/marketing/MarketingCaseStudies'
import MarketingWhy from '@/components/public/marketing/MarketingWhy'
import MarketingLeadForm from '@/components/public/marketing/MarketingLeadForm'
import MarketingFAQ from '@/components/public/marketing/MarketingFAQ'
import MarketingWhatsAppFloating from '@/components/public/marketing/MarketingWhatsAppFloating'
import MarketingStructuredData from '@/components/public/marketing/MarketingStructuredData'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'marketing_service.meta' })
  const canonicalUrl = `https://www.wezomedia.ma/${locale}/services/marketing`

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'ar': 'https://www.wezomedia.ma/ar/services/marketing',
        'fr': 'https://www.wezomedia.ma/fr/services/marketing',
        'en': 'https://www.wezomedia.ma/en/services/marketing',
        'x-default': 'https://www.wezomedia.ma/ar/services/marketing',
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
          alt: 'WEZO MEDIA - Agence de Marketing Digital au Maroc',
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

export default async function MarketingServicePage({ params: { locale } }: Props) {
  const tFaq = await getTranslations({ locale, namespace: 'marketing_service.faq' })

  const faqItems = [
    { q: tFaq('q1'), a: tFaq('a1') },
    { q: tFaq('q2'), a: tFaq('a2') },
    { q: tFaq('q3'), a: tFaq('a3') },
    { q: tFaq('q4'), a: tFaq('a4') },
    { q: tFaq('q5'), a: tFaq('a5') },
    { q: tFaq('q6'), a: tFaq('a6') },
    { q: tFaq('q7'), a: tFaq('a7') }
  ]

  return (
    <main className="min-h-screen bg-[#F6F5F0] text-[#111118] selection:bg-brand-orange selection:text-white">
      {/* JSON-LD Structured Data */}
      <MarketingStructuredData locale={locale} faqItems={faqItems} />

      {/* 1. Hero Section */}
      <MarketingHero locale={locale} />

      {/* 2. Problem / Diagnostic Scenarios */}
      <MarketingProblem locale={locale} />

      {/* 3. 5 Strategic Intervention Pillars */}
      <MarketingPillars locale={locale} />

      {/* 4. The WEZO Method (6 Steps Timeline) */}
      <MarketingProcess locale={locale} />

      {/* 5. Target Audience Qualification (Who is this for?) */}
      <MarketingTarget locale={locale} />

      {/* 6. Real Verified Case Studies */}
      <MarketingCaseStudies locale={locale} />

      {/* 7. Why WEZO Operating Model */}
      <MarketingWhy locale={locale} />

      {/* 8. 5-Step Lead Generation Project Form */}
      <MarketingLeadForm locale={locale} />

      {/* 9. FAQ Section */}
      <MarketingFAQ locale={locale} />

      {/* 10. Secondary Floating WhatsApp Action */}
      <MarketingWhatsAppFloating locale={locale} />
    </main>
  )
}
