import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { CheckCircle2, Rocket, ArrowLeft, ArrowRight, AlertCircle, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RequestServiceModal from '@/components/shared/RequestServiceModal'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'
import { getStaticServiceDetails } from '@/lib/config/services'

interface Props {
  params: {
    locale: string
    slug: string
  }
}

export default async function ServiceDetailsPage({ params: { locale, slug } }: Props) {
  const t = await getTranslations({ locale, namespace: 'services' })
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  let service = null
  let dbOffline = false

  try {
    service = await prisma.service.findUnique({
      where: { slug: slug.toLowerCase().trim() }
    })
  } catch (error) {
    console.error("Database query failed for service details. Fallback active:", error)
    dbOffline = true
  }

  // Resolve service data from database or static fallback config
  if (!service) {
    const staticData = getStaticServiceDetails(slug)
    service = {
      id: 'fallback-id',
      slug: staticData.slug,
      nameAr: staticData.nameAr,
      nameEn: staticData.nameEn,
      nameFr: staticData.nameFr,
      descAr: staticData.descAr,
      descEn: staticData.descEn,
      descFr: staticData.descFr,
      category: staticData.categoryKey
    }
  }

  // Load static configurations for Packages and Work Steps
  const staticDetails = getStaticServiceDetails(slug)

  // Localized values helpers with requested -> English -> Arabic fallback
  const getLocalized = (ar: string, en: string, fr?: string) => {
    if (isAr) return ar || en
    if (isFr) return fr || en
    return en || ar
  }

  const serviceTitle = getLocalized(service.nameAr, service.nameEn, service.nameFr)
  const serviceDesc = getLocalized(service.descAr, service.descEn, service.descFr)

  // Mapping category name statically
  const getCategoryLabel = (catKey: string) => {
    switch (catKey) {
      case 'DIGITAL_MARKETING': return isAr ? 'الإعلانات والنمو' : isFr ? 'Publicité et Croissance' : 'Advertising & Growth'
      case 'VIDEO_PRODUCTION': return isAr ? 'الإبداع والفيديو' : isFr ? 'Création et Vidéo' : 'Creative & Video'
      case 'WEB_DEVELOPMENT': return isAr ? 'المواقع والتجارة الإلكترونية' : isFr ? 'Sites Web et E-commerce' : 'Websites & E-commerce'
      case 'ARTIST_SERVICES': return isAr ? 'الهوية والتصميم والتواصل' : isFr ? 'Branding & Social' : 'Branding & Social'
      case 'AUDIO_PRODUCTION': return isAr ? 'الإنتاج الصوتي والموسيقي' : isFr ? 'Audio & Music' : 'Audio & Music'
      default: return isAr ? 'خدمات عامة' : isFr ? 'Prestations' : 'Services'
    }
  }

  const categoryName = getCategoryLabel(service.category || staticDetails.categoryKey)

  return (
    <main className="min-h-screen pb-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-brand-secondary/30 text-start">
        {dbOffline && (
          <div className="absolute top-4 inset-x-0 max-w-md mx-auto z-50">
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm mx-4">
              <AlertCircle className="w-4 h-4" />
              <span>{isAr ? 'تصفح غير متصل بالخادم' : 'Viewing offline cached version'}</span>
            </div>
          </div>
        )}
        
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] -z-10" />

        <div className="container mx-auto px-4 space-y-6">
          <div className="flex items-center gap-2 text-text-muted text-sm font-bold">
            <Link href="/services" className="hover:text-brand-orange transition-colors">
              {isAr ? 'الخدمات' : 'Services'}
            </Link>
            <span>/</span>
            <span className="text-brand-orange">{categoryName}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            {serviceTitle}
          </h1>
          <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
            {serviceDesc}
          </p>
        </div>
      </section>

      {/* Details & Features checklist */}
      <section className="py-24 text-start">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-white">
                {isAr ? 'ماذا تشمل هذه الخدمة؟' : 'What is included in this service?'}
              </h2>
              <div className="space-y-4">
                {[
                  isAr ? 'تحليل متكامل لمتطلبات المشروع وأهدافك التجارية' : 'Comprehensive analysis of project and business requirements',
                  isAr ? 'تنفيذ وتطوير احترافي بواسطة متخصصين' : 'Professional development and execution by senior experts',
                  isAr ? 'مراجعات وتعديلات متكاملة لضمان أعلى جودة' : 'Integrative revisions to guarantee supreme output standards',
                  isAr ? 'دعم فني واستشارة مستمرة بعد تسليم المشروع' : 'Continuous support and consultative follow-ups post-delivery'
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                    <span className="text-lg text-text-muted">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6">
                <Link href={`/get-quote?service=${service.slug}`}>
                  <Button size="lg" className="gradient-brand font-black px-10 py-7 text-lg rounded-2xl shadow-xl">
                    {isAr ? 'طلب عرض سعر للخدمة' : 'Request service quote'}
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 rounded-3xl glass-card overflow-hidden border border-white/5">
                  <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="h-40 rounded-3xl gradient-brand p-8 text-white flex flex-col justify-end text-start">
                  <div className="text-3xl font-black">100%</div>
                  <div className="text-sm font-bold">{isAr ? 'دقة في التنفيذ' : 'Execution Precision'}</div>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="h-40 rounded-3xl glass-card border border-white/5 p-8 flex flex-col justify-end text-start">
                  <div className="text-3xl font-black text-white">+500</div>
                  <div className="text-sm text-text-muted">{isAr ? 'مشروع منجز' : 'Delivered Projects'}</div>
                </div>
                <div className="h-64 rounded-3xl glass-card overflow-hidden border border-white/5">
                  <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Static Work Steps Roadmap */}
      {staticDetails.workSteps && staticDetails.workSteps.length > 0 && (
        <section className="py-24 text-start">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black text-white mb-16 text-center">
              {isAr ? 'خطوات العمل ومراحل التنفيذ' : 'Work Process and Execution Steps'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staticDetails.workSteps.map((step: any, idx: number) => (
                <div key={idx} className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-6 relative overflow-hidden h-full">
                  <div className="absolute top-4 right-4 text-7xl font-black text-white/5 select-none">
                    0{idx + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                      {getLocalized(step.titleAr, step.titleEn, step.titleFr)}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {getLocalized(step.descAr, step.descEn, step.descFr)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Static Packages Grid */}
      {staticDetails.packages && staticDetails.packages.length > 0 && (
        <section className="py-24 bg-brand-secondary/30 text-start">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-black text-white mb-16">
              {isAr ? 'باقات العمل المقترحة' : 'Suggested Project Scopes'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
              {staticDetails.packages.map((pack: any, idx: number) => {
                const featuresList = getLocalized(pack.featuresAr.join('||'), pack.featuresEn.join('||'), pack.featuresFr.join('||')).split('||');

                return (
                  <div key={idx} className={`glass-card p-10 rounded-[2.5rem] border-white/5 relative text-center flex flex-col ${pack.isPopular ? 'border-brand-orange/40 glow-orange md:-translate-y-4' : ''}`}>
                    {pack.isPopular && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-6">
                      {getLocalized(pack.nameAr, pack.nameEn, pack.nameFr)}
                    </h3>
                    <ul className="space-y-4 mb-10 flex-grow text-start">
                      {featuresList.map((feature: string, fIdx: number) => (
                        <li key={fIdx} className="text-text-muted flex gap-2 items-start">
                          <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={`/get-quote?service=${service.slug}`}>
                      <Button className={`w-full h-14 rounded-2xl font-bold ${pack.isPopular ? 'gradient-brand text-white' : 'border-white/10 hover:bg-white/5 text-white'}`} variant={pack.isPopular ? 'default' : 'outline'}>
                        {isAr ? 'طلب عرض سعر للمستوى' : 'Request quote for level'}
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
