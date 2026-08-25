import prisma from "@/lib/prisma"
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'
import { Music, Video, Megaphone, Globe, Disc, Users, AlertCircle } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

const categoriesConfig = [
  { key: "DIGITAL_MARKETING", nameAr: "الإعلانات والنمو", nameEn: "Advertising & Growth", nameFr: "Publicité et Croissance", descAr: "حملات إعلانية واكتساب عملاء وتنمية المبيعات.", descEn: "Performance advertising and sales acquisition.", descFr: "Publicité et acquisition client." },
  { key: "VIDEO_PRODUCTION", nameAr: "الإبداع والفيديو", nameEn: "Creative & Video", nameFr: "Création et Vidéo", descAr: "إنتاج محتوى فيديو إعلاني وإبداعي لجذب الانتباه.", descEn: "Content creation and commercial video hooks.", descFr: "Production vidéo et créations visuelles." },
  { key: "WEB_DEVELOPMENT", nameAr: "المواقع والتجارة الإلكترونية", nameEn: "Websites & E-commerce", nameFr: "Sites Web et E-commerce", descAr: "تصميم وتطوير صفحات الهبوط والمتاجر الرقمية.", descEn: "Landing pages and complete digital storefronts.", descFr: "Boutiques en ligne et pages de capture." },
  { key: "ARTIST_SERVICES", nameAr: "الهوية والتصميم والتواصل", nameEn: "Branding & Social", nameFr: "Branding et Social", descAr: "تصميم الهويات البصرية والتواجد الاجتماعي.", descEn: "Logos, brand guides, and social media retainers.", descFr: "Chartes graphiques et réseaux sociaux." },
  { key: "AUDIO_PRODUCTION", nameAr: "الإنتاج الصوتي والموسيقي", nameEn: "Audio & Music", nameFr: "Audio et Musique", descAr: "تسجيل، تلحين، وتوزيع الأعمال الفنية والاستوديو.", descEn: "Studio tracking, music production, and mixing.", descFr: "Production musicale et enregistrement studio." }
]

export default async function ServicesPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'services' })
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  let services: any[] = []
  let dbOffline = false

  try {
    services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
  } catch (error) {
    console.error("Database offline fallback in services listing:", error)
    services = [
      { id: "marketing-id", slug: "meta-ads-management", nameAr: "إدارة إعلانات ميتا", nameEn: "Meta Ads Management", nameFr: "Meta Ads Management", descAr: "إنشاء وإدارة وتحسين حملات Facebook وInstagram.", descEn: "Strategy, launch and optimization of Facebook and Instagram campaigns.", descFr: "Gestion des campagnes Facebook et Instagram.", category: "DIGITAL_MARKETING" },
      { id: "video-id", slug: "ai-advertising-video", nameAr: "فيديو إعلاني بالذكاء الاصطناعي", nameEn: "AI Advertising Video", nameFr: "AI Advertising Video", descAr: "إنتاج فيديو إعلاني متكامل باستخدام الذكاء الاصطناعي.", descEn: "Concept, voice synthesis, and visual rendering leveraging AI.", descFr: "Production vidéo publicitaire complète via IA.", category: "VIDEO_PRODUCTION" },
      { id: "web-id", slug: "landing-page", nameAr: "صفحة هبوط احترافية", nameEn: "Conversion Landing Page", nameFr: "Landing page professionnelle", descAr: "صفحة ويب محسنة لرفع معدل التحويل.", descEn: "Responsive single-page layouts engineered to maximize ad conversions.", descFr: "Page de capture rapide.", category: "WEB_DEVELOPMENT" }
    ]
    dbOffline = true
  }

  // Get local names safely with fallback
  const getLocalizedName = (item: any) => {
    if (isAr) return item.nameAr || item.nameEn
    if (isFr) return item.nameFr || item.nameEn
    return item.nameEn || item.nameAr
  }

  const getLocalizedDesc = (item: any) => {
    if (isAr) return item.descAr || item.descriptionAr || item.descEn
    if (isFr) return item.descFr || item.descriptionFr || item.descEn
    return item.descEn || item.descriptionEn || item.descAr
  }

  // Helper icons
  const getServiceIcon = (slug: string) => {
    if (slug.includes('video')) return <Video className="w-8 h-8 text-brand-orange" />
    if (slug.includes('audio') || slug.includes('music')) return <Music className="w-8 h-8 text-brand-pink" />
    if (slug.includes('web') || slug.includes('landing') || slug.includes('store') || slug.includes('ecommerce')) return <Globe className="w-8 h-8 text-blue-500" />
    if (slug.includes('ads') || slug.includes('marketing') || slug.includes('audit')) return <Megaphone className="w-8 h-8 text-emerald-500" />
    return <Users className="w-8 h-8 text-purple-500" />
  }

  const categories = categoriesConfig.map(cat => {
    return {
      ...cat,
      services: services.filter(s => s.category === cat.key)
    }
  }).filter(cat => cat.services.length > 0)

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
            <div key={category.key} className="space-y-8 text-start">
              <div className="border-l-4 border-brand-orange pl-4 rtl:border-l-0 rtl:border-r-4 rtl:pr-4">
                <h2 className="text-3xl font-black text-white">{isAr ? category.nameAr : isFr ? category.nameFr : category.nameEn}</h2>
                <p className="text-text-muted mt-1">{isAr ? category.descAr : isFr ? category.descFr : category.descEn}</p>
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
