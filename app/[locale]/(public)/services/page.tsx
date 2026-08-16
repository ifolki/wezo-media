import prisma from "@/lib/prisma"
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'
import { Music, Video, Megaphone, Globe, Disc, Users, AlertCircle } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

// Fallback data structure for database offline scenarios
const fallbackCategories = [
  {
    id: "cat-adv",
    slug: "advertising-growth",
    nameAr: "الإعلانات والنمو",
    nameEn: "Advertising & Growth",
    nameFr: "Publicité et Croissance",
    services: [
      { id: "marketing-id", slug: "marketing", nameAr: "التسويق الرقمي", nameEn: "Digital Marketing", nameFr: "Marketing Digital", descAr: "إدارة حملات إعلانية وتنشيط السوشيال ميديا.", descEn: "Ad campaign management and social media activation.", descFr: "Gestion de campagnes publicitaires." }
    ]
  },
  {
    id: "cat-creative",
    slug: "creative-video",
    nameAr: "الإبداع والفيديو",
    nameEn: "Creative & Video",
    nameFr: "Création et Vidéo",
    services: [
      { id: "video-id", slug: "video", nameAr: "الإنتاج المرئي", nameEn: "Video Production", nameFr: "Production Vidéo", descAr: "تصوير فيديو كليب، مونتاج، وإخراج.", descEn: "Music video shooting, editing, and directing.", descFr: "Tournage de clips vidéo." }
    ]
  },
  {
    id: "cat-web",
    slug: "websites-ecommerce",
    nameAr: "المواقع والتجارة الإلكترونية",
    nameEn: "Websites & E-commerce",
    nameFr: "Sites Web et E-commerce",
    services: [
      { id: "web-id", slug: "web", nameAr: "تطوير المواقع", nameEn: "Web Development", nameFr: "Développement Web", descAr: "بناء منصات ومواقع عصرية.", descEn: "Building modern platforms and websites.", descFr: "Développement de sites." }
    ]
  }
]

export default async function ServicesPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'services' })
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  let categories: any[] = []
  let dbOffline = false

  try {
    categories = await prisma.serviceCategory.findMany({
      where: { isActive: true },
      include: {
        services: {
          where: { isActive: true },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    })
  } catch (error) {
    console.error("Database offline fallback in services listing:", error)
    categories = fallbackCategories
    dbOffline = true
  }

  // Get local names safely with fallback
  const getLocalizedName = (item: any) => {
    if (isAr) return item.nameAr || item.nameEn || item.nameAr
    if (isFr) return item.nameFr || item.nameEn || item.nameAr
    return item.nameEn || item.nameAr
  }

  const getLocalizedDesc = (item: any) => {
    if (isAr) return item.descAr || item.descriptionAr || item.descEn || item.descriptionEn
    if (isFr) return item.descFr || item.descriptionFr || item.descEn || item.descriptionEn
    return item.descEn || item.descriptionEn || item.descAr || item.descriptionAr
  }

  // Helper icons
  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'video':
        return <Video className="w-8 h-8 text-brand-orange" />
      case 'audio':
        return <Music className="w-8 h-8 text-brand-pink" />
      case 'web':
        return <Globe className="w-8 h-8 text-blue-500" />
      case 'marketing':
        return <Megaphone className="w-8 h-8 text-emerald-500" />
      default:
        return <Users className="w-8 h-8 text-purple-500" />
    }
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <section className="py-20 bg-brand-secondary/30 relative">
        {dbOffline && (
          <div className="absolute top-4 inset-x-0 max-w-md mx-auto z-50">
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{isAr ? 'تصفح غير متصل بالخادم' : 'Viewing offline cached version'}</span>
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-black text-white capitalize">
            {t('title')}
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Categories sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 space-y-24">
          {categories.map((category) => (
            <div key={category.id} className="space-y-8 text-start">
              <div className="border-l-4 border-brand-orange pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pr-4">
                <h2 className="text-3xl font-black text-white">{getLocalizedName(category)}</h2>
                <p className="text-text-muted mt-1">{getLocalizedDesc(category)}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services?.map((service: any) => (
                  <Link key={service.id} href={`/services/${service.slug}`}>
                    <div className="glass-card p-10 rounded-[2.5rem] border-white/5 h-full space-y-6 hover:border-brand-orange/30 transition-all group">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 relative z-10">
                        {getServiceIcon(service.slug)}
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-brand-orange transition-colors">
                          {getLocalizedName(service)}
                        </h3>
                        <p className="text-text-muted leading-relaxed text-sm line-clamp-3">
                          {getLocalizedDesc(service)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
