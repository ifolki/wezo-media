'use client'

import {
  Megaphone,
  Globe,
  Video,
  Palette,
  Bot,
  Music,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { trackRequestQuote } from '@/lib/analytics/gtag'

export default function ExpertisesSection() {
  const t = useTranslations('home_v2.expertises')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight

  const services = [
    {
      key: 'marketing',
      icon: Megaphone,
      color: 'text-brand-orange bg-brand-orange/15 border-brand-orange/30',
      href: '/services/marketing',
      quoteService: 'marketing',
    },
    {
      key: 'web',
      icon: Globe,
      color: 'text-blue-400 bg-blue-500/15 border-blue-500/30',
      href: '/services/business-website',
      quoteService: 'business-website',
    },
    {
      key: 'video',
      icon: Video,
      color: 'text-brand-red bg-brand-red/15 border-brand-red/30',
      href: '/services/reels-social-video',
      quoteService: 'reels-social-video',
    },
    {
      key: 'branding',
      icon: Palette,
      color: 'text-purple-400 bg-purple-500/15 border-purple-500/30',
      href: '/services/brand-identity',
      quoteService: 'brand-identity',
    },
    {
      key: 'automation',
      icon: Bot,
      color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
      href: '/services/whatsapp-lead-automation',
      quoteService: 'whatsapp-lead-automation',
    },
    {
      key: 'production',
      icon: Music,
      color: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
      href: '/services/video',
      quoteService: 'video',
    },
  ]

  return (
    <section
      id="expertises"
      aria-labelledby="expertises-heading"
      className="py-14 sm:py-16 lg:py-20 bg-brand-dark text-start relative overflow-hidden scroll-mt-20"
    >
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-brand-orange/[0.03] blur-[140px] rounded-full pointer-events-none -z-10"
      />

      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-secondary border border-brand-orange/25 text-brand-orange font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('badge')}</span>
            </div>

            <h2
              id="expertises-heading"
              className={
                isAr
                  ? 'font-cairo font-extrabold text-2xl sm:text-3xl lg:text-[2.35rem] text-text-primary leading-[1.3]'
                  : 'font-syne font-bold text-2xl sm:text-3xl lg:text-[2.35rem] text-text-primary leading-tight'
              }
            >
              {t('title')}
            </h2>

            <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              {t('subtitle')}
            </p>
          </div>

          <div className="shrink-0">
            <Link href="/services">
              <Button
                variant="outline"
                className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl border-white/12 bg-brand-secondary/80 hover:bg-brand-secondary hover:border-brand-orange/40 text-text-primary font-bold text-xs sm:text-sm gap-2 transition-all group"
              >
                <span>{t('view_catalog')}</span>
                <ArrowIcon className="w-4 h-4 text-brand-orange transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* 6 Balanced Modular Service Cards (3x2 Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {services.map((srv, idx) => {
            const Icon = srv.icon
            const title = t(`items.${srv.key}.title`)
            const category = t(`items.${srv.key}.category`)
            const desc = t(`items.${srv.key}.desc`)

            return (
              <article
                key={srv.key}
                className="group relative rounded-2xl p-5 sm:p-6 bg-brand-secondary/80 border border-white/[0.08] hover:border-brand-orange/35 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_28px_rgba(0,0,0,0.22)] hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle Top Border Glow on Hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-orange via-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="space-y-3.5">
                  {/* Top Bar: Icon + Category Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl ${srv.color} border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-dark/80 border border-white/[0.07] text-[11px] font-semibold text-text-muted">
                      <span className="text-brand-orange font-bold font-mono">0{idx + 1}</span>
                      <span>•</span>
                      <span>{category}</span>
                    </span>
                  </div>

                  {/* Service Title */}
                  <Link href={srv.href} className="block group/title">
                    <h3
                      className={
                        isAr
                          ? 'font-cairo font-bold text-base sm:text-lg text-text-primary group-hover/title:text-brand-orange transition-colors leading-snug line-clamp-1'
                          : 'font-syne font-bold text-base sm:text-lg text-text-primary group-hover/title:text-brand-orange transition-colors leading-snug line-clamp-1'
                      }
                    >
                      {title}
                    </h3>
                  </Link>

                  {/* Commercial Value Description */}
                  <p className="text-xs sm:text-[13px] text-text-muted leading-relaxed font-normal">
                    {desc}
                  </p>
                </div>

                {/* Bottom Action Strip: Clean 'En savoir plus' + Subtle 'Devis dédié' */}
                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-2 text-xs">
                  <Link
                    href={srv.href}
                    className="inline-flex items-center gap-1.5 font-bold text-text-primary hover:text-brand-orange transition-colors py-1 group/link"
                  >
                    <span>{t('explore_service')}</span>
                    <ArrowIcon className="w-3.5 h-3.5 text-brand-orange transition-transform duration-200 group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1" />
                  </Link>

                  <Link
                    href={`/get-quote?service=${srv.quoteService}`}
                    onClick={() => {
                      trackRequestQuote({
                        ctaLocation: `expertises_card_${srv.quoteService}`,
                        serviceName: srv.quoteService,
                        locale,
                      })
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-text-muted hover:text-brand-orange transition-colors py-1 px-2 rounded-lg hover:bg-white/[0.04]"
                    title={t('preselect_quote')}
                  >
                    <span>{t('preselect_quote')}</span>
                    <span className="text-brand-orange">›</span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* Unified High-Conversion Bottom CTA Banner (Single Primary Action) */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-secondary/90 via-[#161E2D] to-brand-secondary/90 border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.3)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
          <div className="space-y-1.5 max-w-xl">
            <h3
              className={
                isAr
                  ? 'font-cairo font-bold text-lg sm:text-xl text-white'
                  : 'font-syne font-bold text-lg sm:text-xl text-white'
              }
            >
              {t('cta_bottom_title')}
            </h3>
            <p className="text-xs sm:text-sm text-text-muted font-normal leading-relaxed">
              {t('cta_bottom_subtitle')}
            </p>
          </div>

          <Link
            href="/get-quote"
            onClick={() => {
              trackRequestQuote({
                ctaLocation: 'expertises_bottom_primary',
                locale,
              })
            }}
            className="w-full sm:w-auto shrink-0"
          >
            <Button className="w-full sm:w-auto h-12 px-7 rounded-xl text-sm font-bold gradient-brand hover:opacity-95 shadow-[0_10px_28px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all text-white border border-white/10 gap-2.5">
              <Sparkles className="w-4 h-4 text-white shrink-0" />
              <span>{t('cta_bottom_btn')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
