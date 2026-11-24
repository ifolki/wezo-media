'use client'

import {
  Sparkles,
  ArrowRight,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/navigation'
import { siteConfig } from '@/lib/config/site'
import { trackRequestQuote, trackWhatsAppClick } from '@/lib/analytics/gtag'
import WezoCoreOrb from './WezoCoreOrb'

export default function HeroV2() {
  const t = useTranslations('home_v2.hero')
  const locale = useLocale()
  const isAr = locale === 'ar'

  const whatsappMessage = encodeURIComponent(
    isAr
      ? 'السلام عليكم WEZO MEDIA، أريد الاستفسار عن خدمات الوكالة ومناقشة مشروعي.'
      : locale === 'en'
      ? 'Hello WEZO MEDIA, I would like to inquire about your services and discuss my project.'
      : 'Bonjour WEZO MEDIA, je souhaite me renseigner sur vos services et échanger sur mon projet.'
  )

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[580px] lg:min-h-[calc(90vh-80px)] flex items-center pt-8 pb-14 sm:pt-12 sm:pb-16 lg:py-16 overflow-hidden bg-brand-dark text-text-primary"
    >
      {/* Subtle Architectural Grid & Ambient Gradient Lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(245,246,248,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,246,248,0.02)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,#000_50%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 start-1/4 w-[500px] h-[500px] -z-10 bg-brand-orange/[0.07] blur-[150px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 end-1/6 w-[450px] h-[450px] -z-10 bg-brand-red/[0.06] blur-[150px] rounded-full pointer-events-none"
      />

      <div className="container-custom w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-8 xl:gap-12">
          {/* 1. PRIMARY COLUMN: Commercial Positioning & CRO Hierarchy (7 Cols Desktop) */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-start relative z-10 max-w-2xl mx-auto lg:mx-0">
            {/* Eyebrow Pill */}
            <div className="inline-flex self-center lg:self-start items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-brand-orange/25 bg-brand-secondary/80 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-brand-orange">
                {t('eyebrow')}
              </span>
            </div>

            {/* H1 Main Heading: Single semantic H1 on page */}
            <div className="space-y-4">
              <h1
                id="hero-heading"
                className={
                  isAr
                    ? 'font-cairo font-extrabold text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[2.95rem] leading-[1.3] tracking-normal text-balance'
                    : 'font-syne font-bold text-3xl sm:text-4xl md:text-[2.65rem] lg:text-[3.05rem] leading-[1.14] tracking-[-0.02em] text-balance'
                }
              >
                <span className="text-text-primary block">{t('title_line1')}</span>
                <span className="bg-gradient-to-r from-brand-orange via-[#F45B27] to-brand-red bg-clip-text text-transparent block mt-1 pt-0.5 pb-1">
                  {t('title_line2')}
                </span>
              </h1>

              {/* Value Proposition */}
              <p className="text-base sm:text-lg md:text-xl text-text-primary/95 leading-relaxed font-semibold max-w-[56ch] mx-auto lg:mx-0">
                {t('subtitle')}
              </p>

              {/* Supporting Capabilities Description */}
              <p className="text-sm sm:text-base text-text-muted leading-relaxed font-normal max-w-[58ch] mx-auto lg:mx-0">
                {t('description')}
              </p>
            </div>

            {/* Dual Conversion CTAs + WhatsApp Link */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Link
                href="/get-quote"
                aria-label={t('cta_primary')}
                className="w-full sm:w-auto"
                onClick={() => {
                  trackRequestQuote({
                    ctaLocation: 'hero_v2_primary',
                    locale,
                  })
                }}
              >
                <Button className="w-full sm:w-auto h-12 sm:h-13 px-7 sm:px-8 rounded-xl text-sm sm:text-base font-bold gradient-brand hover:opacity-95 shadow-[0_10px_28px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 gap-2.5 text-white border border-white/10">
                  <Sparkles className="w-4 h-4 text-white shrink-0" />
                  <span>{t('cta_primary')}</span>
                </Button>
              </Link>

              <a
                href="#expertises"
                aria-label={t('cta_secondary')}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 sm:h-13 px-6 sm:px-7 rounded-xl text-sm sm:text-base font-semibold border border-white/12 bg-brand-secondary/70 hover:bg-brand-secondary hover:border-brand-orange/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 gap-2 text-text-primary group"
                >
                  <span>{t('cta_secondary')}</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 shrink-0" />
                </Button>
              </a>
            </div>

            {/* Bottom Trust Row & Direct WhatsApp Touchpoint */}
            <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2.5 text-xs sm:text-[13px] text-text-muted">
              {/* WhatsApp Quick Chat */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick({
                    ctaLocation: 'hero_v2_whatsapp',
                    locale,
                  })
                }}
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors py-0.5 group/wa"
              >
                <span className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover/wa:scale-105 transition-transform">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                </span>
                <span>{t('whatsapp_label')}</span>
              </a>

              <span className="hidden sm:inline-block text-white/20">•</span>

              {/* Verified Trust Strip */}
              <div className="inline-flex items-center gap-2 text-text-muted font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/80 shrink-0" />
                <span>{t('trust_row')}</span>
              </div>
            </div>
          </div>

          {/* 2. SECONDARY COLUMN: WEZO CORE Dynamic Constellation Orb (5 Cols Desktop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            <WezoCoreOrb />
          </div>
        </div>
      </div>
    </section>
  )
}
