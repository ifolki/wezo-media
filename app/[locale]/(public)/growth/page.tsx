import { getTranslations } from 'next-intl/server'
import { growthSectorsData } from '@/lib/config/growth'
import GrowthLanding from '@/components/public/GrowthLanding'

export const dynamic = 'force-dynamic'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'growth' })
  const config = growthSectorsData['general']
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const title = config.heroTitleEn
  const localizedTitle = isAr ? config.heroTitleAr : isFr ? config.heroTitleFr : title

  return {
    title: `${localizedTitle} | WEZO MEDIA`,
    description: isAr ? config.heroSubAr : isFr ? config.heroSubFr : config.heroSubEn
  }
}

export default async function GeneralGrowthPage({ params: { locale } }: Props) {
  const config = growthSectorsData['general']
  
  return (
    <GrowthLanding config={config} locale={locale} />
  )
}
