'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Compass,
  Target,
  Globe,
  Layers,
  Bot,
  TrendingUp,
  Zap,
  Sparkles,
} from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface PillarItem {
  id: string
  titleKey: string
  subKey: string
  icon: React.ComponentType<{ className?: string }>
  badgeColor: string
  iconColor: string
  borderColor: string
  desktopPosition: string
  floatAnim: {
    y?: number[]
    x?: number[]
    duration: number
    delay: number
  }
}

export default function WezoCoreOrb() {
  const t = useTranslations('home_v2.hero.ecosystem')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const prefersReducedMotion = useReducedMotion()

  const pillars: PillarItem[] = [
    {
      id: 'strategy',
      titleKey: 'pillar_strategy',
      subKey: 'pillar_strategy_sub',
      icon: Compass,
      badgeColor: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      desktopPosition: 'top-1/2 -translate-y-1/2 -start-3 xl:-start-6',
      floatAnim: { x: [0, -4, 0], duration: 5.2, delay: 0.2 },
    },
    {
      id: 'ads',
      titleKey: 'pillar_ads',
      subKey: 'pillar_ads_sub',
      icon: Target,
      badgeColor: 'bg-brand-orange/15',
      iconColor: 'text-brand-orange',
      borderColor: 'border-brand-orange/30',
      desktopPosition: 'top-1/2 -translate-y-1/2 -end-3 xl:-end-6',
      floatAnim: { x: [0, 4, 0], duration: 5.6, delay: 0.8 },
    },
    {
      id: 'web',
      titleKey: 'pillar_web',
      subKey: 'pillar_web_sub',
      icon: Globe,
      badgeColor: 'bg-blue-500/15',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      desktopPosition: 'top-2 start-1 xl:start-4',
      floatAnim: { y: [0, -6, 0], duration: 5.0, delay: 0 },
    },
    {
      id: 'analytics',
      titleKey: 'pillar_analytics',
      subKey: 'pillar_analytics_sub',
      icon: TrendingUp,
      badgeColor: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      desktopPosition: 'top-2 end-1 xl:end-4',
      floatAnim: { y: [0, 6, 0], duration: 5.8, delay: 0.5 },
    },
    {
      id: 'automation',
      titleKey: 'pillar_automation',
      subKey: 'pillar_automation_sub',
      icon: Bot,
      badgeColor: 'bg-purple-500/15',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      desktopPosition: 'bottom-2 start-1 xl:start-4',
      floatAnim: { y: [0, -5, 0], duration: 6.2, delay: 1.1 },
    },
    {
      id: 'branding',
      titleKey: 'pillar_branding',
      subKey: 'pillar_branding_sub',
      icon: Layers,
      badgeColor: 'bg-brand-red/15',
      iconColor: 'text-brand-red',
      borderColor: 'border-brand-red/30',
      desktopPosition: 'bottom-2 end-1 xl:end-4',
      floatAnim: { y: [0, 5, 0], duration: 5.4, delay: 1.4 },
    },
  ]

  return (
    <div className="relative w-full flex items-center justify-center select-none">
      {/* 1. DESKTOP CONSTELLATION VIEW (Hidden on Mobile/Tablet < 1024px) */}
      <div className="hidden lg:flex relative w-full max-w-[480px] xl:max-w-[530px] aspect-square items-center justify-center">
        {/* Ambient Radial Core Glows */}
        <div
          aria-hidden="true"
          className="absolute w-72 h-72 rounded-full bg-brand-orange/15 blur-[90px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute w-60 h-60 rounded-full bg-brand-red/10 blur-[80px] pointer-events-none"
        />

        {/* Concentric Ambient Orbit Rings */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-white/[0.04] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-8 rounded-full border border-brand-orange/[0.12] border-dashed animate-[spin_100s_linear_infinite_reverse] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-20 rounded-full border border-white/[0.06] animate-[spin_80s_linear_infinite] pointer-events-none"
        />

        {/* SVG Delicate Radial Connection Circuit Lines */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 500 500"
        >
          <defs>
            <radialGradient id="wezo-core-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.7" />
              <stop offset="60%" stopColor="#E63B35" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#101827" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#E63B35" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Symmetrical connecting rays from center (250,250) */}
          <line x1="250" y1="250" x2="80" y2="75" stroke="url(#line-grad)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="250" y1="250" x2="420" y2="75" stroke="url(#line-grad)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="250" y1="250" x2="50" y2="250" stroke="url(#line-grad)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="250" y1="250" x2="450" y2="250" stroke="url(#line-grad)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="250" y1="250" x2="80" y2="425" stroke="url(#line-grad)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="250" y1="250" x2="420" y2="425" stroke="url(#line-grad)" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* Node pulse dots */}
          <circle cx="80" cy="75" r="3" fill="#F97316" opacity="0.8" />
          <circle cx="420" cy="75" r="3" fill="#10B981" opacity="0.8" />
          <circle cx="50" cy="250" r="3" fill="#F59E0B" opacity="0.8" />
          <circle cx="450" cy="250" r="3" fill="#F97316" opacity="0.8" />
          <circle cx="80" cy="425" r="3" fill="#A855F7" opacity="0.8" />
          <circle cx="420" cy="425" r="3" fill="#E63B35" opacity="0.8" />
        </svg>

        {/* CENTRAL WEZO CORE EMBLEM */}
        <motion.div
          initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-20 w-32 h-32 xl:w-36 xl:h-36 rounded-3xl p-[1.5px] bg-gradient-to-tr from-brand-orange via-brand-red to-brand-orange shadow-[0_0_50px_rgba(249,115,22,0.35)] flex items-center justify-center group"
        >
          <div className="w-full h-full rounded-[22px] bg-[#0E131F]/95 flex flex-col items-center justify-center p-3 text-center border border-white/15 backdrop-blur-xl relative overflow-hidden">
            {/* Subtle inner light reflection */}
            <div
              aria-hidden="true"
              className="absolute -top-10 -end-10 w-20 h-20 bg-brand-orange/20 rounded-full blur-xl pointer-events-none"
            />

            <div className="w-9 h-9 xl:w-10 xl:h-10 rounded-xl gradient-brand flex items-center justify-center mb-2 shadow-md shadow-brand-orange/30 text-white">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>

            <span className="text-xs xl:text-[13px] font-black tracking-wider uppercase text-white font-syne">
              {t('core_title')}
            </span>

            <span className="text-[9px] font-bold text-brand-orange flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t('core_sub')}</span>
            </span>
          </div>
        </motion.div>

        {/* 6 SURROUNDING ORBITAL CARDS */}
        {pillars.map((pillar) => {
          const Icon = pillar.icon
          return (
            <motion.div
              key={pillar.id}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      ...(pillar.floatAnim.y ? { y: pillar.floatAnim.y } : {}),
                      ...(pillar.floatAnim.x ? { x: pillar.floatAnim.x } : {}),
                    }
              }
              transition={{
                duration: pillar.floatAnim.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: pillar.floatAnim.delay,
              }}
              className={`absolute ${pillar.desktopPosition} z-30 p-2.5 xl:p-3 rounded-2xl bg-[#101827]/95 border border-white/10 hover:border-brand-orange/40 hover:shadow-[0_10px_28px_rgba(249,115,22,0.18)] shadow-[0_12px_32px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-all duration-300 w-[172px] xl:w-[192px] group text-start`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className={`w-6 h-6 xl:w-7 xl:h-7 rounded-lg ${pillar.badgeColor} border ${pillar.borderColor} flex items-center justify-center ${pillar.iconColor} shrink-0`}
                >
                  <Icon className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted truncate">
                  WEZO {isAr ? 'خدمة' : 'PILIER'}
                </span>
              </div>
              <div className="text-xs xl:text-[13px] font-bold text-white tracking-tight leading-snug line-clamp-1">
                {t(pillar.titleKey)}
              </div>
              <div className="text-[10px] text-text-muted font-medium mt-0.5 truncate">
                {t(pillar.subKey)}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* 2. MOBILE & TABLET RESPONSIVE VIEW (< 1024px) */}
      <div className="lg:hidden w-full max-w-lg mx-auto pt-2 pb-1">
        {/* Central Core Console Badge */}
        <div className="relative flex flex-col items-center justify-center text-center mb-6">
          {/* Subtle Ambient Backing Glow */}
          <div
            aria-hidden="true"
            className="absolute w-44 h-44 rounded-full bg-brand-orange/15 blur-3xl pointer-events-none"
          />

          <div className="relative z-10 inline-flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-brand-orange/20 via-white/[0.08] to-brand-red/20 border border-white/15 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md shadow-brand-orange/30">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <div className="text-start">
                <div className="font-syne font-black text-sm text-white tracking-wider flex items-center gap-2">
                  <span>{t('core_title')}</span>
                  <span className="text-[9px] font-bold text-brand-orange px-2 py-0.5 rounded-full bg-brand-orange/15 border border-brand-orange/30">
                    {t('core_badge')}
                  </span>
                </div>
                <div className="text-[11px] text-text-muted flex items-center gap-1.5 mt-0.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t('core_sub')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtly connected tech stem */}
          <div className="w-px h-4 bg-gradient-to-b from-brand-orange/50 to-white/10 my-1" />
        </div>

        {/* 6 Responsive Grid Cards (2 Cols on Mobile, 3 Cols on Tablet) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-start">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.id}
                className="p-3 rounded-xl bg-[#101827]/90 border border-white/10 hover:border-brand-orange/30 transition-colors shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg ${pillar.badgeColor} border ${pillar.borderColor} flex items-center justify-center ${pillar.iconColor} shrink-0`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <Sparkles className="w-3 h-3 text-white/20" />
                </div>
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-white tracking-tight leading-snug line-clamp-1">
                    {t(pillar.titleKey)}
                  </div>
                  <div className="text-[10px] text-text-muted mt-0.5 font-medium truncate">
                    {t(pillar.subKey)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
