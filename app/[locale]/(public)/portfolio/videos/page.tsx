import { Metadata } from 'next'
import prisma from '@/lib/prisma'
import ShowcaseGallery from '@/components/public/showcase/ShowcaseGallery'
import { Link } from '@/navigation'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

interface ShowcasePageProps {
  params: {
    locale: string
  }
  searchParams?: {
    category?: string
    sector?: string
    project?: string
    video?: string
  }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: ShowcasePageProps): Promise<Metadata> {
  const { locale } = params
  const isAr = locale === 'ar'
  const isEn = locale === 'en'

  const title = isAr
    ? 'معرض الفيديوهات الإعلانية والأعمال | WEZO SHOWCASE'
    : isEn
    ? 'Advertising Video Portfolio & Showcase | WEZO SHOWCASE'
    : 'Portfolio Vidéos Publicitaires & Réalisations | WEZO SHOWCASE'

  const description = isAr
    ? 'استكشف نماذج أعمال وفيديوهات WEZO MEDIA الإعلانية: ريلز احترافية 9:16، فيديوهات منتجات، ومحتوى UGC عالي التحويل للمقاولات في المغرب.'
    : isEn
    ? 'Explore WEZO MEDIA advertising videos and creative portfolio: professional 9:16 reels, product videos, corporate media, and high-converting UGC in Morocco.'
    : 'Découvrez les réalisations publicitaires de WEZO MEDIA : Reels 9:16 percutants, vidéos UGC, spots produits et campagnes vidéo à fort ROI au Maroc.'

  return {
    title: {
      absolute: `${title} | WEZO MEDIA`,
    },
    description,
    alternates: {
      canonical: `https://www.wezomedia.ma/${locale}/portfolio/videos`,
      languages: {
        'fr': 'https://www.wezomedia.ma/fr/portfolio/videos',
        'ar': 'https://www.wezomedia.ma/ar/portfolio/videos',
        'en': 'https://www.wezomedia.ma/en/portfolio/videos',
        'x-default': 'https://www.wezomedia.ma/fr/portfolio/videos',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.wezomedia.ma/${locale}/portfolio/videos`,
      siteName: 'WEZO MEDIA',
      locale: isAr ? 'ar_MA' : isEn ? 'en_US' : 'fr_MA',
      type: 'website',
      images: ['https://www.wezomedia.ma/assets/showcase/video-placeholder.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.wezomedia.ma/assets/showcase/video-placeholder.webp'],
    },
  }
}

export default async function ShowcasePage({ params }: ShowcasePageProps) {
  const { locale } = params
  const isAr = locale === 'ar'

  // Fetch published videos, categories, and sectors
  const [videos, categories, sectors] = await Promise.all([
    prisma.showcaseVideo.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        category: true,
        sector: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    }),
    prisma.videoCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
    prisma.videoSector.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    }),
  ])

  // JSON-LD Schemas: BreadcrumbList & ItemList with VideoObject
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isAr ? 'الرئيسية' : 'Accueil',
        item: `https://www.wezomedia.ma/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isAr ? 'معرض الأعمال' : 'Portfolio',
        item: `https://www.wezomedia.ma/${locale}/portfolio`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'WEZO SHOWCASE',
        item: `https://www.wezomedia.ma/${locale}/portfolio/videos`,
      },
    ],
  }

  const videoListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: videos.slice(0, 10).map((v, i) => ({
      '@type': 'VideoObject',
      position: i + 1,
      name: v.titleFr || v.clientName,
      description: v.descFr || `Vidéo publicitaire réalisée pour ${v.clientName} par WEZO MEDIA`,
      thumbnailUrl: [v.thumbnailUrl || 'https://www.wezomedia.ma/assets/showcase/video-placeholder.webp'],
      uploadDate: (v.completionDate || v.createdAt).toISOString(),
      embedUrl: v.provider === 'YOUTUBE' 
        ? `https://www.youtube-nocookie.com/embed/${v.videoId}`
        : v.videoUrl,
      publisher: {
        '@type': 'Organization',
        name: 'WEZO MEDIA',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.wezomedia.ma/assets/logo/logo-normal.png',
        },
      },
    })),
  }

  return (
    <main className="min-h-screen pb-20 bg-[#0A0A0F] text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {videos.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoListSchema) }}
        />
      )}

      {/* Hero Header exactly as reference mockup */}
      <section className="relative pt-36 pb-12 overflow-hidden text-center">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-orange/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-brand-pink/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container-custom relative z-10 space-y-4">
          {/* Breadcrumb pill */}
          <div className="inline-flex items-center gap-2">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-muted hover:text-white transition-colors"
            >
              {isAr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isAr ? 'العودة لمعرض الأعمال العام' : 'Tous nos projets'}</span>
            </Link>
          </div>

          {/* Title Header matching reference image: WEZO (white) SHOWCASE (orange) */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight">
            <span>WEZO </span>
            <span className="text-brand-orange">SHOWCASE</span>
          </h1>

          {/* Subtitle matching reference: Nos réalisations publicitaires */}
          <p className="text-lg sm:text-2xl text-text-muted max-w-2xl mx-auto font-medium">
            {isAr
              ? 'نماذج أعمالنا في الإنتاج السمعي البصري والإعلاني'
              : 'Nos réalisations publicitaires'}
          </p>
        </div>
      </section>

      {/* Main Gallery with Filters, Grid, and Lightbox */}
      <ShowcaseGallery
        initialVideos={videos}
        initialCategories={categories}
        initialSectors={sectors}
        locale={locale}
      />
    </main>
  )
}
