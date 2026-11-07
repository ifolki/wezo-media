import type { Metadata } from 'next'
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Link } from "@/navigation"
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getStaticSolutionDetails } from '@/lib/config/solutions'
import { staticServicesData } from '@/lib/config/services'

interface Props {
  params: {
    locale: string
    slug: string
  }
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const staticSolution = getStaticSolutionDetails(slug)
  if (!staticSolution) {
    return {
      title: { absolute: 'Solution Not Found | WEZO MEDIA' },
    }
  }

  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const titleBase = isAr
    ? staticSolution.nameAr
    : isFr
    ? staticSolution.nameFr
    : staticSolution.nameEn

  const description = isAr
    ? staticSolution.descriptionAr
    : isFr
    ? staticSolution.descriptionFr
    : staticSolution.descriptionEn

  const normalizedSlug = staticSolution.slug

  return {
    title: {
      absolute: `${titleBase} | WEZO MEDIA`,
    },
    description,
    alternates: {
      canonical: `https://www.wezomedia.ma/${locale}/solutions/${normalizedSlug}`,
      languages: {
        ar: `https://www.wezomedia.ma/ar/solutions/${normalizedSlug}`,
        fr: `https://www.wezomedia.ma/fr/solutions/${normalizedSlug}`,
        en: `https://www.wezomedia.ma/en/solutions/${normalizedSlug}`,
        'x-default': `https://www.wezomedia.ma/ar/solutions/${normalizedSlug}`,
      },
    },
  }
}

export default async function SolutionDetailsPage({ params: { locale, slug } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const staticSolution = getStaticSolutionDetails(slug)
  if (!staticSolution) {
    return notFound()
  }

  // Fetch from DB the related services in staticSolution.serviceSlugs to resolve DB properties
  let dbServices: any[] = []
  let dbOffline = false

  try {
    dbServices = await prisma.service.findMany({
      where: {
        slug: { in: staticSolution.serviceSlugs },
        isActive: true
      }
    })
  } catch (error) {
    console.error("Database query failed for solution services. Fallback active:", error)
    dbOffline = true
    dbServices = staticSolution.serviceSlugs.map((sSlug) => {
      const staticSrv = staticServicesData[sSlug]
      return {
        id: `offline-${sSlug}`,
        slug: sSlug,
        nameAr: staticSrv?.nameAr || sSlug.split('-').join(' '),
        nameEn: staticSrv?.nameEn || sSlug.split('-').join(' '),
        nameFr: staticSrv?.nameFr || sSlug.split('-').join(' '),
        descAr: staticSrv?.descAr || 'خدمة متميزة مخصصة لمساعدتك على النمو والتميز الرقمي.',
        descEn: staticSrv?.descEn || 'Bespoke service designed to scale your operations.',
        descFr: staticSrv?.descFr || 'Prestation sur-mesure conçue pour développer votre activité.',
        category: staticSrv?.categoryKey || 'DIGITAL_MARKETING'
      }
    })
  }

  const getLocalized = (ar: string, en: string, fr?: string) => {
    if (isAr) return ar || en
    if (isFr) return fr || en
    return en || ar
  }

  const solutionTitle = getLocalized(staticSolution.nameAr, staticSolution.nameEn, staticSolution.nameFr)
  const solutionDesc = getLocalized(staticSolution.descriptionAr, staticSolution.descriptionEn, staticSolution.descriptionFr)

  // Map database or static services in order of serviceSlugs array
  const servicesList = staticSolution.serviceSlugs.map(sSlug => {
    const dbSrv = dbServices.find(s => s.slug === sSlug)
    const staticSrv = staticServicesData[sSlug]
    const service = dbSrv || (staticSrv ? {
      id: `static-${sSlug}`,
      slug: sSlug,
      nameAr: staticSrv.nameAr,
      nameEn: staticSrv.nameEn,
      nameFr: staticSrv.nameFr,
      descAr: staticSrv.descAr,
      descEn: staticSrv.descEn,
      descFr: staticSrv.descFr,
      category: staticSrv.categoryKey,
    } : null)
    if (!service) return null
    return {
      service,
      isPrimary: sSlug === staticSolution.primaryServiceSlug
    }
  }).filter(Boolean) as { service: any; isPrimary: boolean }[]

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Header */}
      <section className="relative py-32 overflow-hidden bg-brand-secondary/30 text-start">
        {dbOffline && (
          <div className="absolute top-4 inset-x-0 max-w-md mx-auto z-50">
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm mx-4">
              <AlertCircle className="w-4 h-4" />
              <span>{isAr ? 'تصفح غير متصل بالخادم' : isFr ? 'Version mise en cache' : 'Viewing offline cached version'}</span>
            </div>
          </div>
        )}

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] -z-10" />

        <div className="container mx-auto px-4 space-y-6">
          <div className="flex items-center gap-2 text-text-muted text-sm font-bold">
            <Link href="/solutions" className="hover:text-brand-orange transition-colors">
              {isAr ? 'الحلول الرقمية' : isFr ? 'Solutions Digitales' : 'Solutions'}
            </Link>
            <span>/</span>
            <span className="text-brand-orange">{solutionTitle}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            {solutionTitle}
          </h1>
          <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
            {solutionDesc}
          </p>
        </div>
      </section>

      {/* Services attached layout */}
      <section className="py-24 text-start">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-white mb-16 text-center">
            {isAr
              ? 'الخدمات المشمولة في هذا الحل'
              : isFr
              ? 'Prestations Incluses dans cette Solution'
              : 'Included Services in this Solution'}
          </h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            {servicesList.map((rel, idx) => {
              const service = rel.service
              const sTitle = getLocalized(service.nameAr, service.nameEn, service.nameFr)
              const sDesc = getLocalized(service.descAr, service.descEn, service.descFr)

              return (
                <div key={service.id} className={`glass-card p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col md:flex-row gap-8 items-start justify-between ${rel.isPrimary ? 'border-brand-orange/40 glow-orange' : ''}`}>
                  {rel.isPrimary && (
                    <span className="absolute top-0 right-10 bg-brand-orange text-white px-4 py-1 rounded-b-xl text-xs font-bold uppercase tracking-wide">
                      {isAr ? 'الخدمة الأساسية' : isFr ? 'Service Principal' : 'Primary Service'}
                    </span>
                  )}
                  
                  <div className="space-y-4 flex-grow">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-bold text-lg text-brand-orange">
                      {idx + 1}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white hover:text-brand-orange transition-colors">
                        {sTitle}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed max-w-xl">
                        {sDesc}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pt-4 md:pt-0 self-end md:self-center">
                    <Link href={`/services/${service.slug}`}>
                      <Button className="h-12 px-6 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white gap-2">
                        <span>{isAr ? 'استكشف الخدمة بالتفصيل' : isFr ? 'Découvrir le service' : 'View Service Details'}</span>
                        <span>→</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
