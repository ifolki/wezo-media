import QuoteForm from '@/components/public/QuoteForm'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { getAllServicesWithHierarchy } from '@/lib/services-hierarchy'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'quote' })
  return {
    title: {
      absolute: `${t('title')} | WEZO MEDIA`,
    },
    description: t('subtitle'),
    alternates: {
      canonical: `https://www.wezomedia.ma/${locale}/get-quote`,
      languages: {
        ar: 'https://www.wezomedia.ma/ar/get-quote',
        fr: 'https://www.wezomedia.ma/fr/get-quote',
        en: 'https://www.wezomedia.ma/en/get-quote',
        'x-default': 'https://www.wezomedia.ma/ar/get-quote',
      },
    },
  }
}

export default async function GetQuotePage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'quote' })

  const { services } = await getAllServicesWithHierarchy()
  const activeServices = services.filter((s) => s.isActive)

  return (
    <main className="min-h-screen pb-24">
      {/* Header section with gradient background accent */}
      <section className="relative py-20 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] -z-10" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-[#FF4D80]/10 blur-[100px] -z-10" />

        <div className="container mx-auto px-4 text-center space-y-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Interactive Form Step Section */}
      <section className="px-4 md:px-0">
        <Suspense fallback={<div className="text-white text-center py-10">Loading...</div>}>
          <QuoteForm services={activeServices} />
        </Suspense>
      </section>
    </main>
  )
}
