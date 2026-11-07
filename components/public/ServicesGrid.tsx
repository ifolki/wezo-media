'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Music,
  Video,
  Megaphone,
  Globe,
  Bot,
  Palette,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import { trackRequestQuote } from '@/lib/analytics/gtag'
import {
  createCardRevealVariant,
  createFadeUpVariant,
  createStaggerContainer,
} from '@/lib/motion-tokens'
import { staticServicesData } from '@/lib/config/services'

interface SubServiceLink {
  id: string
  slug: string
  nameAr: string
  nameFr: string
  nameEn: string
  isActive?: boolean
}

interface PillarServiceItem {
  id: string
  slug: string
  category?: string
  nameAr: string
  nameFr: string
  nameEn: string
  descAr: string
  descFr: string
  descEn: string
  subServices?: SubServiceLink[]
}

interface ServicesGridProps {
  services?: PillarServiceItem[]
  locale: string
}

const LEGACY_HIDDEN_SLUGS = new Set(['web', 'video', 'audio'])

const allStaticServices = Object.values(staticServicesData)

const fallbackPillars: PillarServiceItem[] = allStaticServices
  .filter((s) => s.showInCatalog && !s.parentSlug && !LEGACY_HIDDEN_SLUGS.has(s.slug))
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
  .slice(0, 6)
  .map((pillar) => ({
    id: `srv-${pillar.slug}`,
    slug: pillar.slug,
    category: pillar.categoryKey,
    nameAr: pillar.nameAr,
    nameFr: pillar.nameFr,
    nameEn: pillar.nameEn,
    descAr: pillar.descAr,
    descFr: pillar.descFr,
    descEn: pillar.descEn,
    subServices: allStaticServices
      .filter(
        (sub) =>
          sub.parentSlug === pillar.slug &&
          sub.showInCatalog !== false &&
          !LEGACY_HIDDEN_SLUGS.has(sub.slug)
      )
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
      .map((sub) => ({
        id: `sub-${sub.slug}`,
        slug: sub.slug,
        nameAr: sub.nameAr,
        nameFr: sub.nameFr,
        nameEn: sub.nameEn,
        isActive: true,
      })),
  }))

export default function ServicesGrid({ services, locale }: ServicesGridProps) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'
  const prefersReducedMotion = Boolean(useReducedMotion())

  const activePillars: PillarServiceItem[] =
    services && services.length >= 6 ? services.slice(0, 6) : fallbackPillars

  const getLocalized = (item: any, prefixName: string) => {
    if (isAr) return item[`${prefixName}Ar`] || item[`${prefixName}En`]
    if (isFr) return item[`${prefixName}Fr`] || item[`${prefixName}En`]
    return item[`${prefixName}En`] || item[`${prefixName}Ar`]
  }

  const getCategoryTag = (slug: string, catKey?: string) => {
    if (slug === 'whatsapp-lead-automation') {
      return isAr ? 'الأتمتة والذكاء الاصطناعي' : isFr ? 'Automatisation & IA' : 'Automation & AI'
    }
    switch (catKey) {
      case 'DIGITAL_MARKETING':
        return isAr ? 'النمو والإعلانات' : isFr ? 'Acquisition & Ads' : 'Growth & Paid Ads'
      case 'WEB_DEVELOPMENT':
        return isAr ? 'المواقع والمتاجر' : isFr ? 'Web & E-commerce' : 'Web & E-commerce'
      case 'VIDEO_PRODUCTION':
        return isAr ? 'الإنتاج المرئي' : isFr ? 'Studio Vidéo' : 'Video Production'
      case 'ARTIST_SERVICES':
        return isAr ? 'الهوية والمحتوى' : isFr ? 'Branding & Social' : 'Branding & Content'
      case 'AUDIO_PRODUCTION':
        return isAr ? 'الاستوديو الصوتي' : isFr ? 'Studio Audio' : 'Audio Studio'
      default:
        return isAr ? 'حلول متكاملة' : isFr ? 'Expertise Clé' : 'Core Pillar'
    }
  }

  const getServiceIcon = (slug: string) => {
    if (slug === 'whatsapp-lead-automation' || slug.includes('crm') || slug.includes('ai')) {
      return <Bot className="w-6 h-6 text-brand-red" />
    }
    if (slug.includes('video') || slug.includes('reels')) {
      return <Video className="w-6 h-6 text-brand-orange" />
    }
    if (slug.includes('audio') || slug.includes('music')) {
      return <Music className="w-6 h-6 text-brand-orange" />
    }
    if (slug.includes('web') || slug.includes('ecommerce')) {
      return <Globe className="w-6 h-6 text-brand-orange" />
    }
    if (slug.includes('brand')) {
      return <Palette className="w-6 h-6 text-brand-orange" />
    }
    return <Megaphone className="w-6 h-6 text-brand-orange" />
  }

  /**
   * Premium Bento Grid Span Map (12-column architectural layout on lg screens):
   * Row 1: Pillar 01 (7 cols) + Pillar 02 (5 cols)
   * Row 2: Pillar 03 (4 cols) + Pillar 04 (4 cols) + Pillar 05 (4 cols) -> or balanced 2x3 with featured spans
   * Let's use an asymmetrical Luxury Bento Grid where all 6 cards feel cohesive:
   * Index 0 (Marketing): lg:col-span-7
   * Index 1 (Web): lg:col-span-5
   * Index 2 (Video): lg:col-span-5
   * Index 3 (Branding): lg:col-span-7
   * Index 4 (Automation): lg:col-span-6
   * Index 5 (Audio): lg:col-span-6
   */
  const getBentoSpanClass = (index: number) => {
    switch (index) {
      case 0:
        return 'md:col-span-1 lg:col-span-7'
      case 1:
        return 'md:col-span-1 lg:col-span-5'
      case 2:
        return 'md:col-span-1 lg:col-span-5'
      case 3:
        return 'md:col-span-1 lg:col-span-7'
      case 4:
        return 'md:col-span-1 lg:col-span-6'
      case 5:
        return 'md:col-span-1 lg:col-span-6'
      default:
        return 'md:col-span-1 lg:col-span-6'
    }
  }

  const ArrowIcon = isAr ? ArrowLeft : ArrowRight
  const headerContainer = createStaggerContainer(0.08, 0.02, prefersReducedMotion)
  const headerItem = createFadeUpVariant(18, 0.6, prefersReducedMotion)

  return (
    <section
      id="services"
      aria-labelledby="services-bento-heading"
      className="py-20 lg:py-24 relative overflow-hidden bg-brand-dark text-start scroll-mt-20"
    >
      {/* Subtle Ambient Aura */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 start-1/2 -translate-x-1/2 w-[680px] h-[380px] bg-brand-orange/[0.04] blur-[160px] rounded-full pointer-events-none -z-10"
      />

      <div className="container-custom mx-auto">
        {/* Section Header */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-14"
        >
          <div className="space-y-3.5 max-w-3xl">
            <motion.div
              variants={headerItem}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-secondary border border-brand-orange/25 text-brand-orange font-bold text-xs uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isAr
                  ? 'منظومة الخدمات الرقمية المتكاملة'
                  : isFr
                    ? 'Nos 6 Pôles d’Expertise Digitale'
                    : 'Our 6 Core Digital Growth Pillars'}
              </span>
            </motion.div>

            <motion.h2
              id="services-bento-heading"
              variants={headerItem}
              className={
                isAr
                  ? 'font-cairo font-extrabold text-3xl sm:text-4xl lg:text-[2.75rem] text-text-primary leading-[1.3] tracking-normal'
                  : 'font-syne font-bold text-3xl sm:text-4xl lg:text-[2.65rem] text-text-primary leading-[1.14] tracking-tight'
              }
            >
              {isAr
                ? 'ركائز متكاملة للتواصل والتسويق الرقمي'
                : isFr
                  ? 'Services de Communication & Croissance Digitale'
                  : 'Integrated Communication & Digital Growth Services'}
            </motion.h2>

            <motion.p
              variants={headerItem}
              className="text-text-muted text-sm sm:text-base leading-relaxed max-w-2xl"
            >
              {isAr
                ? 'من الهوية البصرية وتطوير المواقع إلى الحملات الإعلانية، الإنتاج المرئي والأتمتة الذكية لتنمية أعمالك.'
                : isFr
                  ? 'De l’identité de marque au développement web, en passant par la publicité Meta & Google Ads, la vidéo et l’automatisation CRM.'
                  : 'From brand identity and web development to Meta & Google Ads, commercial video production, and CRM automation.'}
            </motion.p>
          </div>

          <motion.div variants={headerItem} className="shrink-0">
            <Link href="/services">
              <Button
                variant="outline"
                className="h-11 px-5 rounded-xl border-white/12 bg-brand-secondary/75 hover:bg-brand-secondary hover:border-brand-orange/45 text-text-primary font-bold text-xs sm:text-sm gap-2 transition-all duration-200 group"
              >
                <span>
                  {isAr
                    ? 'تصفح دليل الخدمات الكامل'
                    : isFr
                      ? 'Voir tout le catalogue'
                      : 'View Full Services Catalog'}
                </span>
                <ArrowIcon className="w-4 h-4 text-brand-orange transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* 6 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {activePillars.map((pillar, index) => {
            const fallbackMatch = fallbackPillars.find((f) => f.slug === pillar.slug)
            const validDbSubs = (pillar.subServices || []).filter(
              (sub) =>
                sub.isActive !== false &&
                !LEGACY_HIDDEN_SLUGS.has(sub.slug) &&
                Boolean(staticServicesData[sub.slug])
            )

            const visibleSubServices =
              validDbSubs.length > 0 ? validDbSubs : fallbackMatch?.subServices || []

            const cardVariants = createCardRevealVariant(index, prefersReducedMotion)

            return (
              <motion.article
                key={pillar.id || pillar.slug}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className={`${getBentoSpanClass(
                  index
                )} group relative rounded-[1.5rem] p-6 sm:p-7 lg:p-8 bg-brand-secondary/85 border border-white/[0.08] hover:border-brand-orange/35 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_14px_38px_rgba(0,0,0,0.28)] flex flex-col justify-between overflow-hidden h-full`}
              >
                {/* Subtle Top Border Highlight on Hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-orange via-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Top Content Block */}
                <div className="relative z-10 space-y-5">
                  {/* Card Top Bar: Animated Icon Box + Pillar Index & Category Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-dark border border-white/10 group-hover:border-brand-orange/40 group-hover:scale-105 transition-all duration-300">
                      {getServiceIcon(pillar.slug)}
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-dark/80 border border-white/[0.07] text-[11px] font-bold text-text-muted tracking-wide">
                      <span className="text-brand-orange font-black">0{index + 1}</span>
                      <span>•</span>
                      <span>{getCategoryTag(pillar.slug, pillar.category)}</span>
                    </span>
                  </div>

                  {/* Pillar Title & Description */}
                  <div className="space-y-2.5">
                    <Link href={`/services/${pillar.slug}`} className="block group/title">
                      <h3
                        className={
                          isAr
                            ? 'font-cairo font-bold text-xl sm:text-[1.35rem] text-text-primary group-hover/title:text-brand-orange transition-colors duration-200 leading-snug'
                            : 'font-syne font-bold text-xl sm:text-[1.3rem] text-text-primary group-hover/title:text-brand-orange transition-colors duration-200 leading-snug'
                        }
                      >
                        {getLocalized(pillar, 'name')}
                      </h3>
                    </Link>

                    <p className="text-text-muted text-sm sm:text-[15px] leading-[1.68] font-normal">
                      {getLocalized(pillar, 'desc')}
                    </p>
                  </div>

                  {/* Specialized Sub-Services SEO Chips */}
                  {visibleSubServices.length > 0 && (
                    <div className="pt-3.5 border-t border-white/[0.06] space-y-2">
                      <span className="block text-[10.5px] font-bold uppercase tracking-wider text-text-muted/85">
                        {isAr
                          ? 'التخصصات الفرعية:'
                          : isFr
                            ? 'Prestations incluses :'
                            : 'Specialized Capabilities:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {visibleSubServices.map((sub) => (
                          <Link
                            key={sub.id || sub.slug}
                            href={`/services/${sub.slug}`}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-dark/85 hover:bg-brand-orange/15 border border-white/[0.08] hover:border-brand-orange/40 text-xs font-medium text-text-primary/90 hover:text-white transition-all duration-200"
                          >
                            <CheckCircle2 className="w-3 h-3 text-brand-orange shrink-0" />
                            <span>{getLocalized(sub, 'name')}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Bottom Action Bar: Explore Service + Direct Request Quote CTA */}
                <div className="relative z-10 pt-5 mt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <Link
                    href={`/services/${pillar.slug}`}
                    className="inline-flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-bold text-text-primary hover:text-brand-orange transition-colors py-1.5 group/explore"
                  >
                    <span>
                      {isAr
                        ? 'استكشف تفاصيل الخدمة'
                        : isFr
                          ? 'Découvrir le service'
                          : 'Explore Service'}
                    </span>
                    <ArrowIcon className="w-4 h-4 text-brand-orange transition-transform duration-200 group-hover/explore:translate-x-1 rtl:group-hover/explore:-translate-x-1" />
                  </Link>

                  <Link
                    href={`/get-quote?service=${pillar.slug}`}
                    onClick={() => {
                      trackRequestQuote({
                        ctaLocation: `homepage_bento_${pillar.slug}`,
                        serviceName: pillar.slug,
                        locale,
                      })
                    }}
                  >
                    <Button
                      size="sm"
                      className="w-full sm:w-auto h-9 px-4 rounded-lg gradient-brand hover:opacity-95 text-white font-bold text-xs shadow-[0_6px_16px_rgba(249,115,22,0.2)] transition-all duration-200"
                    >
                      {isAr
                        ? 'اطلب دراسة مشروعك'
                        : isFr
                          ? 'Demander un devis'
                          : 'Request Proposal'}
                    </Button>
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
