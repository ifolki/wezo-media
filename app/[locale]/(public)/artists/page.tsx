import type { Metadata } from 'next'
import ArtistsClient from '@/components/public/artists/ArtistsClient'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const titleText = isAr
    ? 'خدمات الفنانين والتوزيع الموسيقي | WEZO MEDIA'
    : isFr
    ? 'Services Artistes & Distribution Musicale | WEZO MEDIA'
    : 'Artist Services & Global Music Distribution | WEZO MEDIA'

  const descriptionText = isAr
    ? 'خدمات متكاملة للفنانين وصناع الموسيقى بالمغرب: إنتاج موسيقي، تسجيل استوديو، توزيع رقمي على سبوتيفاي وأنغامي، وحماية وإدارة الحقوق الفنية.'
    : isFr
    ? 'Accompagnement complet pour artistes au Maroc : production musicale, mixage studio, distribution sur Spotify et Apple Music, et monétisation des droits.'
    : 'Turnkey services for artists in Morocco: studio music production, mixing, worldwide distribution across Spotify and Apple Music, and royalties management.'

  const canonicalUrl = `https://www.wezomedia.ma/${locale}/artists`

  return {
    title: {
      absolute: titleText,
    },
    description: descriptionText,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ar: 'https://www.wezomedia.ma/ar/artists',
        fr: 'https://www.wezomedia.ma/fr/artists',
        en: 'https://www.wezomedia.ma/en/artists',
        'x-default': 'https://www.wezomedia.ma/ar/artists',
      },
    },
    openGraph: {
      title: titleText,
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
      title: titleText,
      description: descriptionText,
      images: ['https://www.wezomedia.ma/assets/agency/office.jpg'],
    },
  }
}

export default function ArtistsPage() {
  return <ArtistsClient />
}
