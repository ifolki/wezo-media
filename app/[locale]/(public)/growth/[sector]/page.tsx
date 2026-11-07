import { notFound } from 'next/navigation'
import { growthSectorsData } from '@/lib/config/growth'
import GrowthLanding from '@/components/public/GrowthLanding'

export const dynamic = 'force-dynamic'

interface Props {
  params: {
    locale: string
    sector: string
  }
}

export async function generateMetadata({ params: { locale, sector } }: Props) {
  const config = growthSectorsData[sector]
  if (!config) return {}

  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const title = isAr ? config.heroTitleAr : isFr ? config.heroTitleFr : config.heroTitleEn
  const desc = isAr ? config.heroSubAr : isFr ? config.heroSubFr : config.heroSubEn

  return {
    title: {
      absolute: `${title} | WEZO MEDIA`,
    },
    description: desc,
    alternates: {
      canonical: `https://www.wezomedia.ma/${locale}/growth/${sector}`,
      languages: {
        ar: `https://www.wezomedia.ma/ar/growth/${sector}`,
        fr: `https://www.wezomedia.ma/fr/growth/${sector}`,
        en: `https://www.wezomedia.ma/en/growth/${sector}`,
        'x-default': `https://www.wezomedia.ma/ar/growth/${sector}`,
      },
    },
  }
}

export default async function SectorGrowthPage({ params: { locale, sector } }: Props) {
  const config = growthSectorsData[sector]
  
  if (!config) {
    return notFound()
  }

  return (
    <GrowthLanding config={config} locale={locale} />
  )
}
