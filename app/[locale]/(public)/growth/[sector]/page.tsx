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
    title: `${title} | WEZO MEDIA`,
    description: desc
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
