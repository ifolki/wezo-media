import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { CheckCircle2, Rocket, ArrowLeft, ArrowRight, AlertCircle, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RequestServiceModal from '@/components/shared/RequestServiceModal'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'

interface Props {
  params: {
    locale: string
    slug: string
  }
}

// Fallback details data if database is offline
const fallbackServices: Record<string, any> = {
  marketing: {
    id: "marketing-id",
    slug: "marketing",
    nameAr: "التسويق الرقمي",
    nameEn: "Digital Marketing",
    nameFr: "Marketing Digital",
    descAr: "إدارة حملات إعلانية وتنشيط السوشيال ميديا.",
    descEn: "Ad campaign management and social media activation.",
    descFr: "Gestion de campagnes publicitaires.",
    categoryInfo: { nameAr: "الإعلانات والنمو", nameEn: "Advertising & Growth", nameFr: "Publicité et Croissance" },
    packages: [
      { id: "p1", nameAr: "الباقة الأساسية", nameEn: "Starter Package", nameFr: "Pack Starter", price: 99, features: ["مراحل محدودة", "تسليم خلال 7 أيام", "دعم عبر الإيميل"] },
      { id: "p2", nameAr: "الباقة الاحترافية", nameEn: "Professional Package", nameFr: "Pack Professionnel", price: 299, isPopular: true, features: ["عملية كاملة", "تسليم خلال 3 أيام", "دعم هاتف وإيميل"] }
    ],
    workSteps: [
      { id: "w1", titleAr: "التحليل والتخطيط", titleEn: "Audit & Analysis", descAr: "دراسة شاملة لمتطلبات المشروع والمنافسين.", descEn: "Comprehensive review of project requirements." },
      { id: "w2", titleAr: "إطلاق الحملة", titleEn: "Campaign Launch", descAr: "بناء الإعلانات وتدشين الترويج على المنصات.", descEn: "Building creatives and pushing ads live." }
    ]
  },
  video: {
    id: "video-id",
    slug: "video",
    nameAr: "الإنتاج المرئي",
    nameEn: "Video Production",
    nameFr: "Production Vidéo",
    descAr: "تصوير فيديو كليب، مونتاج، وإخراج.",
    descEn: "Music video shooting, editing, and directing.",
    descFr: "Tournage de clips vidéo.",
    categoryInfo: { nameAr: "الإبداع والفيديو", nameEn: "Creative & Video", nameFr: "Création et Vidéo" },
    packages: [
      { id: "v1", nameAr: "إنتاج كامل", nameEn: "Full Production", nameFr: "Production Complète", price: 1500, features: ["تصوير يوم واحد", "مونتاج كامل", "إخراج"] }
    ],
    workSteps: [
      { id: "wv1", titleAr: "السيناريو", titleEn: "Scriptwriting", descAr: "كتابة الأفكار ورسم لوحات المونتاج.", descEn: "Drafting concepts and storyboarding." }
    ]
  }
}

export default async function ServiceDetailsPage({ params: { locale, slug } }: Props) {
  const t = await getTranslations({ locale, namespace: 'services' })
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  let service = null
  let dbOffline = false

  try {
    service = await prisma.service.findFirst({
      where: { slug: slug.toLowerCase().trim() },
      include: {
        categoryInfo: true,
        packages: {
          where: { isActive: true },
          orderBy: { order: 'asc' }
        },
        workSteps: {
          orderBy: { order: 'asc' }
        }
      }
    })
  } catch (error) {
    console.error("Database query failed for service details. Fallback active:", error)
    dbOffline = true
    service = fallbackServices[slug.toLowerCase().trim()]
  }

  if (!service) {
    return notFound()
  }

  // Localized values helpers with requested -> English -> Arabic fallback
  const getLocalized = (ar: string, en: string, fr?: string) => {
    if (isAr) return ar || en || ar
    if (isFr) return fr || en || ar
    return en || ar
  }

  const serviceTitle = getLocalized(service.nameAr, service.nameEn, service.nameFr)
  const serviceDesc = getLocalized(service.descAr, service.descEn, service.descFr)
  const categoryName = service.categoryInfo 
    ? getLocalized(service.categoryInfo.nameAr, service.categoryInfo.nameEn, service.categoryInfo.nameFr)
    : ''

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
                <RequestServiceModal>
                  <Button size="lg" className="gradient-brand font-black px-10 py-7 text-lg rounded-2xl shadow-xl">
                    {isAr ? 'طلب عرض سعر للخدمة' : 'Request service quote'}
                  </Button>
                </RequestServiceModal>
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

      {/* Default Service Process Roadmap */}
      {service.workSteps && service.workSteps.length > 0 && (
        <section className="py-24 text-start">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-black text-white mb-16 text-center">
              {isAr ? 'خطوات العمل ومراحل التنفيذ' : 'Work Process and Execution Steps'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.workSteps.map((step: any, idx: number) => (
                <div key={step.id} className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-6 relative overflow-hidden h-full">
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

      {/* Packages / Pricing Grid */}
      {service.packages && service.packages.length > 0 && (
        <section className="py-24 bg-brand-secondary/30 text-start">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-black text-white mb-16">
              {isAr ? 'باقات الأسعار المقترحة' : 'Suggested Pricing Packages'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {service.packages.map((pack: any) => {
                const featuresList = Array.isArray(pack.features) 
                  ? pack.features 
                  : (typeof pack.features === 'string' ? JSON.parse(pack.features) : []);

                return (
                  <div key={pack.id} className={`glass-card p-10 rounded-[2.5rem] border-white/5 relative text-center flex flex-col ${pack.isPopular ? 'border-brand-orange/40 glow-orange md:-translate-y-4' : ''}`}>
                    {pack.isPopular && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {isAr ? 'الأكثر طلباً' : 'Most Popular'}
                      </span>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {getLocalized(pack.nameAr, pack.nameEn, pack.nameFr)}
                    </h3>
                    <div className="text-5xl font-black gradient-text mb-8">
                      ${pack.price}
                    </div>
                    <ul className="space-y-4 mb-10 flex-grow">
                      {featuresList.map((feature: string, idx: number) => (
                        <li key={idx} className="text-text-muted flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <RequestServiceModal>
                      <Button className={`w-full h-14 rounded-2xl font-bold ${pack.isPopular ? 'gradient-brand text-white' : 'border-white/10 hover:bg-white/5 text-white'}`} variant={pack.isPopular ? 'default' : 'outline'}>
                        {isAr ? 'اختيار هذه الباقة' : 'Choose this package'}
                      </Button>
                    </RequestServiceModal>
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
