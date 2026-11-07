'use client'

import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import {
  Sparkles,
  ArrowRight,
  Globe,
  TrendingUp,
  Bot,
  Layers,
  Target,
  Zap,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/navigation'
import { trackRequestQuote } from '@/lib/analytics/gtag'
import {
  MOTION_EASING,
  createStaggerContainer,
  createFadeUpVariant,
} from '@/lib/motion-tokens'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'
  const prefersReducedMotion = Boolean(useReducedMotion())

  // Subtle interactive pointer parallax for desktop WEZO CORE composition
  const visualRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 75, damping: 26, mass: 0.7 })
  const springY = useSpring(mouseY, { stiffness: 75, damping: 26, mass: 0.7 })

  const coreRotateX = useTransform(springY, [-0.5, 0.5], [4, -4])
  const coreRotateY = useTransform(springX, [-0.5, 0.5], [-5, 5])
  const hubShiftX = useTransform(springX, [-0.5, 0.5], [-8, 8])
  const hubShiftY = useTransform(springY, [-0.5, 0.5], [-8, 8])
  const outerShiftX = useTransform(springX, [-0.5, 0.5], [6, -6])
  const outerShiftY = useTransform(springY, [-0.5, 0.5], [6, -6])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !visualRef.current) return
    const rect = visualRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handlePointerLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const containerVariants = createStaggerContainer(0.08, 0.04, prefersReducedMotion)
  const itemVariants = createFadeUpVariant(18, 0.65, prefersReducedMotion)

  const secondaryCtaLabel = isAr
    ? 'اكتشف خدماتنا'
    : isFr
      ? 'Découvrir nos services'
      : 'Explore Our Services'

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[580px] lg:min-h-[calc(92vh-80px)] flex items-center pt-8 pb-16 sm:pt-12 sm:pb-20 lg:py-16 xl:py-20 overflow-hidden bg-brand-dark text-text-primary"
    >
      {/* Subtle Architectural Constellation Grid & Luxury Ambient Lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(245,246,248,0.022)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,246,248,0.022)_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_55%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-28 start-1/4 w-[520px] h-[520px] -z-10 bg-brand-orange/[0.06] blur-[150px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 end-1/5 w-[480px] h-[480px] -z-10 bg-brand-red/[0.05] blur-[150px] rounded-full pointer-events-none"
      />

      <div className="container-custom w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-10 xl:gap-14">
          {/* Primary Column: Refined Editorial Positioning (7 Cols Desktop) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col space-y-6 lg:space-y-7 text-center lg:text-start relative z-10 max-w-2xl mx-auto lg:mx-0"
          >
            {/* Editorial Eyebrow Line & Pill */}
            <motion.div
              variants={itemVariants}
              className="inline-flex self-center lg:self-start items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-brand-secondary/70 backdrop-blur-xl"
            >
              <span className="w-5 h-[1.5px] bg-gradient-to-r from-brand-orange to-brand-red rounded-full" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-brand-orange">
                {t('eyebrow')}
              </span>
            </motion.div>

            {/* Main H1 — Balanced, Controlled Proportions for AR / FR / EN */}
            <div className="space-y-4 sm:space-y-5">
              {/* 3. Main H1 — Balanced, Controlled Proportions for AR / FR / EN */}
              <motion.h1
                id="hero-heading"
                variants={itemVariants}
                className={
                  isAr
                    ? 'font-cairo font-extrabold text-3xl sm:text-4xl md:text-[2.75rem] lg:text-[3.1rem] xl:text-[3.45rem] leading-[1.35] tracking-normal text-balance'
                    : 'font-syne font-bold text-[1.95rem] sm:text-4xl md:text-[2.55rem] lg:text-[2.75rem] xl:text-[3.15rem] 2xl:text-[3.35rem] leading-[1.15] tracking-[-0.02em] text-balance'
                }
              >
                <span className="block text-text-primary">{t('title_line1')}</span>{' '}
                <span className="bg-gradient-to-r from-brand-orange via-[#F45B27] to-brand-red bg-clip-text text-transparent block mt-3 sm:mt-3.5 pt-1 pb-2">
                  {t('title_line2')}
                </span>
              </motion.h1>

              {/* Secondary Lead Text */}
              <motion.p
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl text-text-primary/95 max-w-[56ch] mx-auto lg:mx-0 leading-[1.5] font-semibold"
              >
                {t('subtitle')}
              </motion.p>

              {/* Description — Comfortable Reading Measure */}
              <motion.p
                variants={itemVariants}
                className="text-sm sm:text-base md:text-[1.0625rem] lg:text-[1.125rem] text-text-muted max-w-[58ch] mx-auto lg:mx-0 leading-[1.75] font-normal"
              >
                {t('description')}
              </motion.p>
            </div>

            {/* Dual Conversion CTAs — Refined Proportions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-1"
            >
              <Link
                href="/get-quote"
                aria-label={t('ctaPrimary')}
                className="w-full sm:w-auto"
                onClick={() => {
                  trackRequestQuote({
                    ctaLocation: 'homepage_hero_primary',
                    locale,
                  })
                }}
              >
                <Button className="w-full sm:w-auto h-12 sm:h-13 px-7 sm:px-8 rounded-xl text-sm sm:text-base font-bold gradient-brand hover:opacity-95 shadow-[0_10px_28px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 gap-2.5 text-white border border-white/10">
                  <Sparkles className="w-4 h-4 text-white shrink-0" />
                  <span>{t('ctaPrimary')}</span>
                </Button>
              </Link>

              <a
                href="#services"
                aria-label={secondaryCtaLabel}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-12 sm:h-13 px-7 sm:px-8 rounded-xl text-sm sm:text-base font-semibold border border-white/12 bg-brand-secondary/60 hover:bg-brand-secondary hover:border-brand-orange/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 gap-2.5 backdrop-blur-xl text-text-primary group"
                >
                  <span>{secondaryCtaLabel}</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1 shrink-0" />
                </Button>
              </a>
            </motion.div>

            {/* Executive Capabilities Strip */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs sm:text-[13px] text-text-muted border-t border-white/[0.06]"
            >
              <span className="inline-flex items-center gap-2 text-text-primary/85 font-medium pt-3">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span>{t('tagline')}</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Secondary Column: WEZO CORE — Organic Connected Agency Constellation (5 Cols Desktop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            <motion.div
              ref={visualRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: MOTION_EASING.luxuryOut, delay: 0.15 }}
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      rotateX: coreRotateX,
                      rotateY: coreRotateY,
                      transformPerspective: 1100,
                    }
              }
              className="relative w-full max-w-[340px] xs:max-w-[390px] sm:max-w-[460px] aspect-square flex items-center justify-center select-none"
            >
              {/* Soft Atmospheric Radial Aura */}
              <div
                aria-hidden="true"
                className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-brand-orange/15 via-brand-red/10 to-transparent blur-3xl pointer-events-none"
              />

              {/* Curvilinear Orbital Constellation & Organic Bezier Filaments */}
              <svg
                viewBox="0 0 480 480"
                fill="none"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <defs>
                  <linearGradient id="wezoOrbitRing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#F5F6F8" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#E63B35" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="wezoCurveA" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F97316" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#F97316" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="wezoCurveB" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#E63B35" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#E63B35" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Outer Celestial Trajectory Arc */}
                <circle
                  cx="240"
                  cy="240"
                  r="206"
                  stroke="rgba(245, 246, 248, 0.05)"
                  strokeWidth="1"
                />
                <ellipse
                  cx="240"
                  cy="240"
                  rx="185"
                  ry="128"
                  transform="rotate(-24 240 240)"
                  stroke="url(#wezoOrbitRing)"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                />
                <ellipse
                  cx="240"
                  cy="240"
                  rx="185"
                  ry="128"
                  transform="rotate(32 240 240)"
                  stroke="rgba(245, 246, 248, 0.06)"
                  strokeWidth="1"
                />

                {/* Inner Resonance Halo */}
                <circle
                  cx="240"
                  cy="240"
                  r="98"
                  stroke="url(#wezoOrbitRing)"
                  strokeWidth="1"
                  strokeOpacity="0.6"
                />

                {/* Smooth Curvilinear Bezier Filaments from Core (240,240) to 4 Satellites */}
                {/* Top-Left Filament */}
                <motion.path
                  d="M 240 240 Q 170 215 98 112"
                  stroke="url(#wezoCurveA)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
                />
                {/* Top-Right Filament */}
                <motion.path
                  d="M 240 240 Q 310 210 382 118"
                  stroke="url(#wezoCurveB)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.35 }}
                />
                {/* Bottom-Left Filament */}
                <motion.path
                  d="M 240 240 Q 168 272 102 368"
                  stroke="url(#wezoCurveB)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.5 }}
                />
                {/* Bottom-Right Filament */}
                <motion.path
                  d="M 240 240 Q 312 275 378 364"
                  stroke="url(#wezoCurveA)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.65 }}
                />

                {/* Subtle Constellation Anchor Dots */}
                <circle cx="98" cy="112" r="3" fill="#F97316" fillOpacity="0.8" />
                <circle cx="382" cy="118" r="3" fill="#E63B35" fillOpacity="0.8" />
                <circle cx="102" cy="368" r="3" fill="#E63B35" fillOpacity="0.8" />
                <circle cx="378" cy="364" r="3" fill="#F97316" fillOpacity="0.8" />

                {/* Gentle Light Pulses Along Filaments */}
                {!prefersReducedMotion && (
                  <>
                    <motion.circle
                      r="2.75"
                      fill="#F97316"
                      animate={{
                        cx: [240, 178, 98],
                        cy: [240, 205, 112],
                        opacity: [0, 0.95, 0],
                      }}
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                    <motion.circle
                      r="2.75"
                      fill="#E63B35"
                      animate={{
                        cx: [240, 304, 382],
                        cy: [240, 202, 118],
                        opacity: [0, 0.95, 0],
                      }}
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 1.1,
                      }}
                    />
                    <motion.circle
                      r="2.75"
                      fill="#F97316"
                      animate={{
                        cx: [240, 176, 102],
                        cy: [240, 276, 368],
                        opacity: [0, 0.95, 0],
                      }}
                      transition={{
                        duration: 4.0,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2.0,
                      }}
                    />
                    <motion.circle
                      r="2.75"
                      fill="#E63B35"
                      animate={{
                        cx: [240, 306, 378],
                        cy: [240, 278, 364],
                        opacity: [0, 0.95, 0],
                      }}
                      transition={{
                        duration: 4.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2.8,
                      }}
                    />
                  </>
                )}
              </svg>

              {/* Central Sculpted WEZO CORE Hub */}
              <motion.div
                style={
                  prefersReducedMotion
                    ? undefined
                    : { x: hubShiftX, y: hubShiftY }
                }
                className="relative z-20 w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[1.5px] bg-gradient-to-br from-brand-orange via-brand-red to-brand-orange/30 shadow-[0_16px_60px_rgba(249,115,22,0.22)] flex items-center justify-center"
              >
                <div className="w-full h-full rounded-full bg-brand-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center p-3.5 text-center border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(249,115,22,0.2),transparent_70%)] pointer-events-none" />
                  <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center mb-2 shadow-[0_6px_18px_rgba(249,115,22,0.35)]">
                    <Zap className="w-4 h-4 text-white fill-white" />
                  </div>
                  <span className="text-[11px] font-black tracking-[0.14em] uppercase text-text-primary font-syne">
                    {t('ecosystem.core_title')}
                  </span>
                  <span className="text-[9.5px] font-semibold text-brand-orange flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                    {t('ecosystem.core_sub')}
                  </span>
                </div>
              </motion.div>

              {/* Satellite Nodes Layer */}
              <motion.div
                style={
                  prefersReducedMotion
                    ? undefined
                    : { x: outerShiftX, y: outerShiftY }
                }
                className="absolute inset-0 pointer-events-none"
              >
                {/* 1. Top-Start Node: Web & Digital Experiences */}
                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="pointer-events-auto absolute top-2 start-0 z-30 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-brand-secondary/92 border border-white/[0.09] hover:border-brand-orange/40 shadow-[0_14px_34px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-colors duration-300 flex items-center gap-3 w-[170px] sm:w-[224px]"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-orange/12 border border-brand-orange/25 flex items-center justify-center text-brand-orange shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-start">
                    <div className="text-[11.5px] sm:text-xs font-bold text-text-primary leading-snug">
                      {t('ecosystem.web')}
                    </div>
                    <div className="text-[10.5px] text-text-primary/70 leading-snug mt-0.5 line-clamp-1">
                      {t('ecosystem.web_sub')}
                    </div>
                  </div>
                </motion.div>

                {/* 2. Top-End Node: Performance & Optimization */}
                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
                  transition={{
                    duration: 6.0,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.7,
                  }}
                  className="pointer-events-auto absolute top-4 end-0 z-30 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-brand-secondary/92 border border-white/[0.09] hover:border-brand-orange/40 shadow-[0_14px_34px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-colors duration-300 flex items-center gap-3 w-[170px] sm:w-[224px]"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/12 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-start">
                    <div className="text-[11.5px] sm:text-xs font-bold text-text-primary leading-snug">
                      {t('ecosystem.analytics')}
                    </div>
                    <div className="text-[10.5px] text-text-primary/70 leading-snug mt-0.5 line-clamp-1">
                      {t('ecosystem.analytics_sub')}
                    </div>
                  </div>
                </motion.div>

                {/* 3. Bottom-Start Node: AI & CRM Automation */}
                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
                  transition={{
                    duration: 6.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2,
                  }}
                  className="pointer-events-auto absolute bottom-4 start-0 z-30 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-brand-secondary/92 border border-white/[0.09] hover:border-brand-red/40 shadow-[0_14px_34px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-colors duration-300 flex items-center gap-3 w-[170px] sm:w-[224px]"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-red/12 border border-brand-red/25 flex items-center justify-center text-brand-red shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-start">
                    <div className="text-[11.5px] sm:text-xs font-bold text-text-primary leading-snug">
                      {t('ecosystem.automation')}
                    </div>
                    <div className="text-[10.5px] text-text-primary/70 leading-snug mt-0.5 line-clamp-1">
                      {t('ecosystem.automation_sub')}
                    </div>
                  </div>
                </motion.div>

                {/* 4. Bottom-End Node: Brand Identity & Studio */}
                <motion.div
                  animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
                  transition={{
                    duration: 5.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.7,
                  }}
                  className="pointer-events-auto absolute bottom-2 end-0 z-30 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl bg-brand-secondary/92 border border-white/[0.09] hover:border-brand-orange/40 shadow-[0_14px_34px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-colors duration-300 flex items-center gap-3 w-[170px] sm:w-[224px]"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-orange/12 border border-brand-orange/25 flex items-center justify-center text-brand-orange shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 text-start">
                    <div className="text-[11.5px] sm:text-xs font-bold text-text-primary leading-snug">
                      {t('ecosystem.branding')}
                    </div>
                    <div className="text-[10.5px] text-text-primary/70 leading-snug mt-0.5 line-clamp-1">
                      {t('ecosystem.branding_sub')}
                    </div>
                  </div>
                </motion.div>

                {/* 5. Mid-Start Orbital Tag: Acquisition & Ads */}
                <div className="pointer-events-auto absolute top-1/2 -start-1 sm:-start-3 -translate-y-1/2 z-30 hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/30 bg-brand-dark/95 backdrop-blur-md text-[11.5px] font-semibold text-text-primary shadow-lg">
                  <Target className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>{t('ecosystem.ads')}</span>
                </div>

                {/* 6. Mid-End Orbital Tag: Digital Strategy */}
                <div className="pointer-events-auto absolute top-1/2 -end-1 sm:-end-3 -translate-y-1/2 z-30 hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-brand-dark/95 backdrop-blur-md text-[11.5px] font-semibold text-text-primary shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>{t('ecosystem.strategy')}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Smooth Architectural Section Transition Divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-brand-dark"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </section>
  )
}
