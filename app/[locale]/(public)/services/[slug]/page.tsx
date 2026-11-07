import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowLeft, ArrowRight, AlertCircle, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import { getStaticServiceDetails, staticServicesData } from '@/lib/config/services'
import { getServiceBySlugWithHierarchy } from '@/lib/services-hierarchy'

interface Props {
  params: {
    locale: string
    slug: string
  }
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const normalizedSlug = (slug || '').toLowerCase().trim()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const { service } = await getServiceBySlugWithHierarchy(normalizedSlug)
  const staticData = staticServicesData[normalizedSlug]

  if (!service && !staticData) {
    return {
      title: 'Service Not Found | WEZO MEDIA',
    }
  }

  const titleBase = isAr
    ? staticData?.nameAr || service?.nameAr || service?.nameEn
    : isFr
      ? staticData?.nameFr || service?.nameFr || service?.nameEn
      : staticData?.nameEn || service?.nameEn || service?.nameAr

  const description = isAr
    ? staticData?.descAr || service?.descAr || service?.descEn
    : isFr
      ? staticData?.descFr || service?.descFr || service?.descEn
      : staticData?.descEn || service?.descEn || service?.descAr

  return {
    title: {
      absolute: `${titleBase} | WEZO MEDIA`,
    },
    description,
    alternates: {
      canonical: `https://www.wezomedia.ma/${locale}/services/${normalizedSlug}`,
      languages: {
        ar: `https://www.wezomedia.ma/ar/services/${normalizedSlug}`,
        fr: `https://www.wezomedia.ma/fr/services/${normalizedSlug}`,
        en: `https://www.wezomedia.ma/en/services/${normalizedSlug}`,
        'x-default': `https://www.wezomedia.ma/ar/services/${normalizedSlug}`,
      },
    },
  }
}

export default async function ServiceDetailsPage({ params: { locale, slug } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'
  const normalizedSlug = (slug || '').toLowerCase().trim()

  const { service: dbService, parentService, siblingServices, dbOffline } =
    await getServiceBySlugWithHierarchy(normalizedSlug)

  // If service exists in DB and was explicitly unpublished (isActive: false), return 404
  if (dbService && dbService.isActive === false) {
    notFound()
  }

  const staticDetails = getStaticServiceDetails(normalizedSlug)

  // If neither DB nor static config knows this slug, return 404
  if (!dbService && !staticServicesData[normalizedSlug]) {
    notFound()
  }

  const service = dbService || {
    id: `fallback-${normalizedSlug}`,
    slug: staticDetails.slug,
    nameAr: staticDetails.nameAr,
    nameEn: staticDetails.nameEn,
    nameFr: staticDetails.nameFr,
    descAr: staticDetails.descAr,
    descEn: staticDetails.descEn,
    descFr: staticDetails.descFr,
    category: staticDetails.categoryKey,
  }

  // Localized values helper with requested -> English -> Arabic fallback
  const getLocalized = (ar?: string, en?: string, fr?: string) => {
    if (isAr) return ar || en || ''
    if (isFr) return fr || en || ''
    return en || ar || ''
  }

  // Prefer specialized SEO titles/descriptions so every service page has rich, distinct copy
  const serviceTitle = getLocalized(
    staticServicesData[normalizedSlug]?.nameAr || service.nameAr,
    staticServicesData[normalizedSlug]?.nameEn || service.nameEn,
    staticServicesData[normalizedSlug]?.nameFr || service.nameFr
  )

  const serviceDesc = getLocalized(
    staticServicesData[normalizedSlug]?.descAr || service.descAr,
    staticServicesData[normalizedSlug]?.descEn || service.descEn,
    staticServicesData[normalizedSlug]?.descFr || service.descFr
  )

  const getCategoryLabel = (catKey: string) => {
    switch (catKey) {
      case 'DIGITAL_MARKETING':
        return isAr ? 'الإعلانات والنمو' : isFr ? 'Publicité et Croissance' : 'Advertising & Growth'
      case 'VIDEO_PRODUCTION':
        return isAr ? 'الإبداع والفيديو' : isFr ? 'Création et Vidéo' : 'Creative & Video'
      case 'WEB_DEVELOPMENT':
        return isAr ? 'المواقع والتجارة الإلكترونية' : isFr ? 'Sites Web et E-commerce' : 'Websites & E-commerce'
      case 'ARTIST_SERVICES':
        return isAr ? 'الهوية والتصميم والتواصل' : isFr ? 'Branding & Social' : 'Branding & Social'
      case 'AUDIO_PRODUCTION':
        return isAr ? 'الإنتاج الصوتي والموسيقي' : isFr ? 'Audio & Music' : 'Audio & Music'
      default:
        return isAr ? 'خدمات متخصصة' : isFr ? 'Prestations' : 'Services'
    }
  }

  const categoryName = getCategoryLabel(service.category || staticDetails.categoryKey)

  // Specialized deliverables list per service (avoids generic repeated bullet points)
  const deliverablesList = isAr
    ? staticDetails.deliverablesAr || []
    : isFr
      ? staticDetails.deliverablesFr || staticDetails.deliverablesEn || []
      : staticDetails.deliverablesEn || []

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight

  return (
    <main className="min-h-screen pb-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden bg-brand-secondary/30 text-start">
        {dbOffline && (
          <div className="absolute top-4 inset-x-0 max-w-md mx-auto z-50">
            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm mx-4">
              <AlertCircle className="w-4 h-4" />
              <span>
                {isAr
                  ? 'تصفح النسخة المحفوظة'
                  : isFr
                    ? 'Version mise en cache'
                    : 'Viewing cached version'}
              </span>
            </div>
          </div>
        )}

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] -z-10" />

        <div className="container mx-auto px-4 space-y-6">
          {/* Hierarchical Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-text-muted text-sm font-bold"
          >
            <Link href="/services" className="hover:text-brand-orange transition-colors">
              {isAr ? 'الخدمات' : 'Services'}
            </Link>
            <span>/</span>
            {parentService ? (
              <>
                <Link
                  href={`/services/${parentService.slug}`}
                  className="hover:text-brand-orange transition-colors text-white/80"
                >
                  {getLocalized(parentService.nameAr, parentService.nameEn, parentService.nameFr)}
                </Link>
                <span>/</span>
                <span className="text-brand-orange">{serviceTitle}</span>
              </>
            ) : (
              <span className="text-brand-orange">{categoryName}</span>
            )}
          </nav>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-4xl">
            {serviceTitle}
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-3xl leading-relaxed">
            {serviceDesc}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link href={`/get-quote?service=${service.slug}`}>
              <Button size="lg" className="gradient-brand font-black px-8 py-6 text-base rounded-2xl shadow-xl">
                {isAr
                  ? 'اطلب عرض سعر لهذه الخدمة'
                  : isFr
                    ? 'Demander un devis pour ce service'
                    : 'Request a quote for this service'}
              </Button>
            </Link>
            {parentService && (
              <Link href={`/services/${parentService.slug}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/15 hover:bg-white/5 text-white font-bold px-6 py-6 text-base rounded-2xl"
                >
                  {isAr
                    ? `استكشف قسم: ${parentService.nameAr}`
                    : isFr
                      ? `Pôle : ${parentService.nameFr}`
                      : `Explore: ${parentService.nameEn}`}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Specialized Deliverables & Features Checklist */}
      <section className="py-24 text-start">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-black text-white">
                {isAr
                  ? `ماذا تشمل خدمة «${serviceTitle}»؟`
                  : isFr
                    ? `Que comprend la prestation « ${serviceTitle} » ?`
                    : `What is included in ${serviceTitle}?`}
              </h2>
              <div className="space-y-4">
                {deliverablesList.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-brand-orange shrink-0 mt-1" />
                    <span className="text-base md:text-lg text-text-muted leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-4">
                <Link href={`/get-quote?service=${service.slug}`}>
                  <Button size="lg" className="gradient-brand font-black px-10 py-7 text-lg rounded-2xl shadow-xl">
                    {isAr
                      ? 'طلب عرض سعر للخدمة'
                      : isFr
                        ? 'Demander un devis personnalisé'
                        : 'Request service quote'}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 rounded-3xl glass-card overflow-hidden border border-white/5">
                  <img
                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400"
                    alt={serviceTitle}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="h-40 rounded-3xl gradient-brand p-8 text-white flex flex-col justify-end text-start">
                  <div className="text-3xl font-black">100%</div>
                  <div className="text-sm font-bold">
                    {isAr
                      ? 'مخرجات مخصصة لمشروعك'
                      : isFr
                        ? 'Livrables sur-mesure'
                        : 'Tailored Execution'}
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="h-40 rounded-3xl glass-card border border-white/5 p-8 flex flex-col justify-end text-start">
                  <div className="text-3xl font-black text-white">ROI</div>
                  <div className="text-sm text-text-muted">
                    {isAr
                      ? 'تركيز كامل على النتائج والنمو'
                      : isFr
                        ? 'Orienté résultats et croissance'
                        : 'Engineered for Measurable Growth'}
                  </div>
                </div>
                <div className="h-64 rounded-3xl glass-card overflow-hidden border border-white/5">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400"
                    alt={serviceTitle}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Work Steps Roadmap */}
      {staticDetails.workSteps && staticDetails.workSteps.length > 0 && (
        <section className="py-24 text-start border-t border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-16 text-center">
              {isAr
                ? 'خطوات العمل ومراحل التنفيذ'
                : isFr
                  ? 'Méthodologie et Étapes d’Exécution'
                  : 'Work Process and Execution Steps'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staticDetails.workSteps.map((step: any, idx: number) => (
                <div
                  key={idx}
                  className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-6 relative overflow-hidden h-full"
                >
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

      {/* Specialized Packages Grid */}
      {staticDetails.packages && staticDetails.packages.length > 0 && (
        <section className="py-24 bg-brand-secondary/30 text-start">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-16">
              {isAr
                ? 'باقات ونطاقات العمل المقترحة'
                : isFr
                  ? 'Forfaits et Scopes Proposés'
                  : 'Suggested Project Scopes'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
              {staticDetails.packages.map((pack: any, idx: number) => {
                const featuresList = getLocalized(
                  pack.featuresAr.join('||'),
                  pack.featuresEn.join('||'),
                  pack.featuresFr.join('||')
                ).split('||')

                return (
                  <div
                    key={idx}
                    className={`glass-card p-10 rounded-[2.5rem] border-white/5 relative text-center flex flex-col ${
                      pack.isPopular ? 'border-brand-orange/40 glow-orange md:-translate-y-4' : ''
                    }`}
                  >
                    {pack.isPopular && (
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                        {isAr ? 'الأكثر طلباً' : isFr ? 'Le Plus Populaire' : 'Most Popular'}
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
                      <Button
                        className={`w-full h-14 rounded-2xl font-bold ${
                          pack.isPopular
                            ? 'gradient-brand text-white'
                            : 'border-white/10 hover:bg-white/5 text-white'
                        }`}
                        variant={pack.isPopular ? 'default' : 'outline'}
                      >
                        {isAr
                          ? 'طلب عرض سعر لهذا النطاق'
                          : isFr
                            ? 'Demander un devis pour ce forfait'
                            : 'Request quote for this scope'}
                      </Button>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Specialized Sub-Services / Sibling Services for Internal SEO */}
      {siblingServices && siblingServices.length > 0 && (
        <section className="py-20 text-start border-t border-white/5">
          <div className="container mx-auto px-4 space-y-8">
            <div className="flex items-center gap-3">
              <Layers className="w-6 h-6 text-brand-orange" />
              <h2 className="text-2xl md:text-3xl font-black text-white">
                {parentService
                  ? isAr
                    ? 'خدمات متخصصة أخرى ضمن نفس القسم'
                    : isFr
                      ? 'Autres prestations spécialisées associées'
                      : 'Related Specialized Services'
                  : isAr
                    ? 'التخصصات الفرعية التابعة لهذه الخدمة'
                    : isFr
                      ? 'Prestations spécialisées incluses dans ce pôle'
                      : 'Specialized Sub-Services Under This Pillar'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siblingServices.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/services/${rel.slug}`}
                  className="glass-card p-6 rounded-2xl border border-white/5 hover:border-brand-orange/30 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors">
                      {getLocalized(rel.nameAr, rel.nameEn, rel.nameFr)}
                    </h3>
                    <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                      {getLocalized(rel.descAr, rel.descEn, rel.descFr)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-orange">
                    <span>
                      {isAr ? 'استكشف التفاصيل' : isFr ? 'Voir la prestation' : 'Explore service'}
                    </span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
