import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'
import {
  Music,
  Video,
  Megaphone,
  Globe,
  Bot,
  Palette,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  getAllServicesWithHierarchy,
  LEGACY_HIDDEN_CHIP_SLUGS,
  EnrichedService,
} from '@/lib/services-hierarchy'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const title = isAr
    ? 'خدماتنا المتكاملة للنمو الرقمي والإنتاج | WEZO MEDIA'
    : isFr
      ? 'Nos Services Digitaux, Web, Vidéo & Acquisition | WEZO MEDIA'
      : 'Our Digital Marketing, Web, Video & Audio Services | WEZO MEDIA'

  const description = isAr
    ? 'اكتشف ركائز خدمات WEZO MEDIA الست: التسويق الرقمي وإدارة الإعلانات، تطوير المواقع والمتاجر، الإنتاج المرئي، الهوية البصرية، أتمتة واتساب وCRM، والإنتاج الصوتي.'
    : isFr
      ? 'Découvrez les 6 pôles d’expertise WEZO MEDIA : Marketing digital & Ads, Sites web & E-commerce, Production vidéo, Identité visuelle, Automatisation WhatsApp/CRM et Studio Audio.'
      : 'Explore WEZO MEDIA’s 6 core service pillars: Paid Ads & Acquisition, Websites & E-commerce, Commercial Video, Brand Identity, WhatsApp/CRM Automation, and Studio Audio.'

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: `https://www.wezomedia.ma/${locale}/services`,
      languages: {
        ar: 'https://www.wezomedia.ma/ar/services',
        fr: 'https://www.wezomedia.ma/fr/services',
        en: 'https://www.wezomedia.ma/en/services',
        'x-default': 'https://www.wezomedia.ma/ar/services',
      },
    },
  }
}

export default async function ServicesPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'services' })
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const { services, dbOffline } = await getAllServicesWithHierarchy()

  // Filter for published Catalog Pillars (6 Core Services)
  const catalogPillars = services.filter((s) => s.isActive && s.showInCatalog)

  const getLocalizedName = (item: EnrichedService) => {
    if (isAr) return item.nameAr || item.nameEn
    if (isFr) return item.nameFr || item.nameEn
    return item.nameEn || item.nameAr
  }

  const getLocalizedDesc = (item: EnrichedService) => {
    if (isAr) return item.descAr || item.descEn
    if (isFr) return item.descFr || item.descEn
    return item.descEn || item.descAr
  }

  const getCategoryLabel = (slug: string, catKey: string) => {
    if (slug === 'whatsapp-lead-automation') {
      return isAr ? 'الأتمتة والذكاء الاصطناعي' : isFr ? 'Automatisation & IA' : 'Automation & AI'
    }
    switch (catKey) {
      case 'DIGITAL_MARKETING':
        return isAr ? 'الإعلانات والنمو' : isFr ? 'Publicité & Acquisition' : 'Advertising & Growth'
      case 'WEB_DEVELOPMENT':
        return isAr ? 'المواقع والتجارة الإلكترونية' : isFr ? 'Web & E-commerce' : 'Websites & E-commerce'
      case 'VIDEO_PRODUCTION':
        return isAr ? 'الإنتاج المرئي والإعلاني' : isFr ? 'Production Vidéo & Créas' : 'Video & Ad Creatives'
      case 'ARTIST_SERVICES':
        return isAr ? 'الهوية البصرية والمحتوى' : isFr ? 'Branding & Réseaux Sociaux' : 'Branding & Social Media'
      case 'AUDIO_PRODUCTION':
        return isAr ? 'الاستوديو الصوتي والفنانين' : isFr ? 'Studio Audio & Artistes' : 'Audio Studio & Artists'
      default:
        return isAr ? 'خدمات متخصصة' : isFr ? 'Prestations' : 'Specialized Services'
    }
  }

  const getServiceIcon = (slug: string) => {
    if (slug === 'whatsapp-lead-automation' || slug.includes('crm') || slug.includes('ai-business')) {
      return <Bot className="w-8 h-8 text-emerald-400" />
    }
    if (slug.includes('video') || slug.includes('reels') || slug.includes('ugc')) {
      return <Video className="w-8 h-8 text-brand-orange" />
    }
    if (slug.includes('audio') || slug.includes('music') || slug.includes('artist')) {
      return <Music className="w-8 h-8 text-brand-pink" />
    }
    if (slug.includes('web') || slug.includes('landing') || slug.includes('ecommerce')) {
      return <Globe className="w-8 h-8 text-blue-400" />
    }
    if (slug.includes('brand') || slug.includes('social') || slug.includes('design') || slug.includes('content')) {
      return <Palette className="w-8 h-8 text-purple-400" />
    }
    return <Megaphone className="w-8 h-8 text-brand-orange" />
  }

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen pb-24">
      {/* Hero Header */}
      <section className="py-20 bg-brand-secondary/30 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-orange/10 blur-[140px] -z-10" />
        {dbOffline && (
          <div className="absolute top-4 inset-x-0 max-w-md mx-auto z-50 px-4">
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                {isAr
                  ? 'يتم عرض النسخة المحفوظة للخدمات'
                  : isFr
                    ? 'Affichage de la version mise en cache'
                    : 'Viewing cached services catalog'}
              </span>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 text-center space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isAr
                ? '6 ركائز متكاملة لنمو أعمالك'
                : isFr
                  ? '6 Pôles d’Expertise Clés en Main'
                  : '6 Core Growth & Production Pillars'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* 6 Core Pillars Grid with Specialized SEO Sub-Service Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalogPillars.map((pillar, index) => {
              const visibleSubServices = (pillar.subServices || []).filter(
                (sub) => sub.isActive && !LEGACY_HIDDEN_CHIP_SLUGS.has(sub.slug)
              )

              return (
                <div
                  key={pillar.id}
                  className="glass-card p-8 md:p-10 rounded-[2.5rem] border border-white/5 hover:border-brand-orange/30 transition-all flex flex-col justify-between gap-8 group relative overflow-hidden text-start"
                >
                  {/* Top Badge + Icon */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-brand-orange/30 transition-colors">
                        {getServiceIcon(pillar.slug)}
                      </div>
                      <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-text-muted">
                        0{index + 1} • {getCategoryLabel(pillar.slug, pillar.category)}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-3">
                      <Link href={`/services/${pillar.slug}`}>
                        <h2 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors leading-snug">
                          {getLocalizedName(pillar)}
                        </h2>
                      </Link>
                      <p className="text-text-muted leading-relaxed text-sm">
                        {getLocalizedDesc(pillar)}
                      </p>
                    </div>

                    {/* Specialized SEO Sub-Services Chips (Internal Linking to dedicated SEO pages) */}
                    {visibleSubServices.length > 0 && (
                      <div className="pt-4 border-t border-white/5 space-y-3">
                        <p className="text-xs font-bold text-white/70 uppercase tracking-wider">
                          {isAr
                            ? 'التخصصات المشمولة:'
                            : isFr
                              ? 'Prestations spécialisées incluses :'
                              : 'Specialized Services Included:'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {visibleSubServices.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/services/${sub.slug}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-brand-orange/15 border border-white/10 hover:border-brand-orange/40 text-xs font-medium text-white/85 hover:text-white transition-all"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                              <span>{getLocalizedName(sub)}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                    <Link href={`/services/${pillar.slug}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl border-white/10 hover:bg-white/5 text-white font-bold text-sm gap-2"
                      >
                        <span>
                          {isAr
                            ? 'تفاصيل الخدمة والباقات'
                            : isFr
                              ? 'Détails & Forfaits'
                              : 'Details & Packages'}
                        </span>
                        <ArrowIcon className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href={`/get-quote?service=${pillar.slug}`}>
                      <Button className="w-full sm:w-auto h-12 px-5 rounded-xl gradient-brand text-white font-bold text-sm">
                        {isAr ? 'اطلب عرض سعر' : isFr ? 'Devis' : 'Get Quote'}
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bottom Consultation CTA Banner */}
      <section className="container mx-auto px-4 pt-8">
        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-brand-orange/20 bg-gradient-to-br from-brand-orange/10 via-transparent to-brand-pink/5 flex flex-col lg:flex-row items-center justify-between gap-8 text-start">
          <div className="space-y-3 max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-black text-white">
              {isAr
                ? 'هل تبحث عن نظام نمو متكامل أو غير متأكد من الخدمة الأنسب؟'
                : isFr
                  ? 'Vous cherchez un système complet ou hésitez sur le service adapté ?'
                  : 'Need a full growth system or not sure which service fits best?'}
            </h3>
            <p className="text-text-muted text-sm md:text-base leading-relaxed">
              {isAr
                ? 'اختر «لست متأكداً — أحتاج استشارة» في استمارة العرض، أو استكشف باقات الحلول الجاهزة لدينا.'
                : isFr
                  ? 'Sélectionnez « Besoin de conseil » dans notre formulaire de devis ou découvrez nos packs solutions clés en main.'
                  : 'Select "Need consultation" in our quote form or explore our turnkey growth solutions.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link href="/get-quote?service=need-consultation">
              <Button className="h-14 px-8 rounded-2xl gradient-brand text-white font-black text-base shadow-lg shadow-brand-orange/20">
                {isAr
                  ? 'احصل على استشارة وعرض سعر'
                  : isFr
                    ? 'Demander un conseil & devis'
                    : 'Request Consultation & Quote'}
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                variant="outline"
                className="h-14 px-8 rounded-2xl border-white/15 hover:bg-white/5 text-white font-bold text-base"
              >
                {isAr ? 'تصفح الحلول المتكاملة' : isFr ? 'Voir les Solutions' : 'Explore Solutions'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
