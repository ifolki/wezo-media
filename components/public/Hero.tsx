'use client'

import { motion, useReducedMotion } from 'framer-motion'
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
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/navigation'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'
  const prefersReducedMotion = useReducedMotion()

  return (
    <section 
      aria-labelledby="hero-heading"
      className="relative min-h-[calc(100vh-80px)] flex items-center pt-28 pb-16 lg:py-32 overflow-hidden bg-[#07070A] text-white"
    >
      {/* Background Matrix Grid & Radial Glows */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#14141E_1px,transparent_1px),linear-gradient(to_bottom,#14141E_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
      <div className="absolute top-1/4 start-1/4 w-[500px] h-[500px] -z-10 bg-brand-orange/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 end-1/4 w-[500px] h-[500px] -z-10 bg-brand-pink/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
          
          {/* Left Column: Commercial Positioning (7 Cols Desktop) */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-start relative z-10">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex self-center lg:self-start items-center gap-2.5 px-4 py-2 rounded-full border border-brand-orange/20 bg-brand-orange/10 backdrop-blur-xl shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs md:text-sm font-bold tracking-wider text-brand-orange">
                {t('eyebrow')}
              </span>
            </motion.div>

            {/* Main H1 - Single H1 on Homepage */}
            <div className="space-y-6">
              <motion.h1
                id="hero-heading"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.2rem] font-black leading-[1.12] tracking-tight font-syne"
              >
                {isAr ? (
                  <>
                    <span className="block text-white">حلول رقمية متكاملة</span>
                    <span className="bg-gradient-to-r from-brand-orange via-[#FF4D80] to-[#FF8FA3] bg-clip-text text-transparent block mt-1">
                      لنمو مشروعك
                    </span>
                  </>
                ) : isFr ? (
                  <>
                    <span className="block text-white">Des solutions digitales intégrées</span>
                    <span className="bg-gradient-to-r from-brand-orange via-[#FF4D80] to-[#FF8FA3] bg-clip-text text-transparent block mt-1">
                      pour développer votre entreprise
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block text-white">Integrated digital solutions</span>
                    <span className="bg-gradient-to-r from-brand-orange via-[#FF4D80] to-[#FF8FA3] bg-clip-text text-transparent block mt-1">
                      to grow your business
                    </span>
                  </>
                )}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
              >
                {t('description')}
              </motion.p>
            </div>

            {/* CTAs with clear touch targets */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link href="/get-quote" aria-label={t('ctaPrimary')}>
                <Button className="h-14 sm:h-16 px-8 sm:px-10 rounded-2xl text-base sm:text-lg font-black gradient-brand hover:opacity-95 shadow-[0_12px_40px_rgba(255,107,43,0.3)] hover:scale-[1.02] active:scale-95 transition-all gap-3 text-white">
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>{t('ctaPrimary')}</span>
                </Button>
              </Link>

              <a href="#solutions" aria-label={t('ctaSecondary')}>
                <Button
                  variant="outline"
                  className="h-14 sm:h-16 px-8 sm:px-10 rounded-2xl text-base sm:text-lg font-bold border-white/10 hover:bg-white/5 hover:border-brand-orange/40 hover:scale-[1.02] active:scale-95 transition-all gap-2.5 glass-card text-white"
                >
                  <span>{t('ctaSecondary')}</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange rtl:rotate-180" />
                </Button>
              </a>
            </motion.div>

            {/* Capabilities Pill Strip (Tagline) */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-text-muted font-bold"
            >
              <span className="inline-flex items-center gap-1.5 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-brand-orange" />
                {t('tagline')}
              </span>
            </motion.div>
          </div>

          {/* Right Column: Animated Digital Ecosystem Visual (5 Cols Desktop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            <div className="relative w-full max-w-[480px] min-h-[380px] sm:min-h-[460px] flex items-center justify-center">
              
              {/* Concentric Ambient Orbit Rings */}
              <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_60s_linear_infinite] pointer-events-none" />
              <div className="absolute inset-6 rounded-full border border-brand-orange/10 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />
              
              {/* Central Glowing Growth Engine Core */}
              <motion.div
                initial={prefersReducedMotion ? { scale: 1 } : { scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-20 w-32 h-32 sm:w-36 sm:h-36 rounded-3xl p-1 bg-gradient-to-tr from-brand-orange via-[#FF4D80] to-brand-orange shadow-[0_0_60px_rgba(255,107,43,0.35)] flex items-center justify-center group"
              >
                <div className="w-full h-full rounded-[22px] bg-[#0E0E17] flex flex-col items-center justify-center p-3 text-center border border-white/10">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center mb-2 shadow-md">
                    <Zap className="w-5 h-5 text-white fill-white" />
                  </div>
                  <span className="text-[11px] font-black tracking-wider uppercase text-white font-syne">
                    WEZO CORE
                  </span>
                  <span className="text-[9px] font-bold text-brand-orange flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Growth Engine
                  </span>
                </div>
              </motion.div>

              {/* 1. Top-Start Node: Website & E-commerce */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { 
                  opacity: 1, 
                  y: [0, -8, 0],
                  x: [0, 4, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute -top-3 start-0 sm:start-2 z-30 p-3.5 sm:p-4 rounded-2xl glass-card border-white/10 hover:border-brand-orange/40 shadow-2xl backdrop-blur-xl group transition-colors max-w-[190px] sm:max-w-[210px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div className="flex gap-1 ms-auto">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                  </div>
                </div>
                <div className="text-xs font-black text-white">{isAr ? 'المواقع والتجارة' : 'Web & E-Commerce'}</div>
                <div className="text-[10px] text-text-muted mt-0.5 flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>High-Converting Funnels</span>
                </div>
              </motion.div>

              {/* 2. Top-End Node: Performance Analytics */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { 
                  opacity: 1, 
                  y: [0, 8, 0],
                  x: [0, -4, 0]
                }}
                transition={{ 
                  duration: 5.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5 
                }}
                className="absolute top-2 end-0 sm:end-2 z-30 p-3.5 sm:p-4 rounded-2xl glass-card border-white/10 hover:border-emerald-500/40 shadow-2xl backdrop-blur-xl group transition-colors max-w-[185px] sm:max-w-[200px]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    +280%
                  </span>
                </div>
                <div className="text-xs font-black text-white">{isAr ? 'الأداء والتحليلات' : 'Analytics & ROI'}</div>
                <div className="text-[10px] text-text-muted mt-0.5 font-bold">Performance Tracking</div>
              </motion.div>

              {/* 3. Bottom-Start Node: Automation & AI CRM */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { 
                  opacity: 1, 
                  y: [0, -7, 0],
                  x: [0, -3, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1 
                }}
                className="absolute bottom-1 start-1 sm:start-4 z-30 p-3.5 sm:p-4 rounded-2xl glass-card border-white/10 hover:border-[#FF4D80]/40 shadow-2xl backdrop-blur-xl group transition-colors max-w-[190px] sm:max-w-[210px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-[#FF4D80]/10 border border-[#FF4D80]/20 flex items-center justify-center text-[#FF4D80]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-black uppercase text-[#FF4D80] bg-[#FF4D80]/10 px-2 py-0.5 rounded-full">
                    Auto-Pilot
                  </span>
                </div>
                <div className="text-xs font-black text-white">{isAr ? 'الأتمتة والذكاء' : 'AI & CRM Automation'}</div>
                <div className="text-[10px] text-text-muted mt-0.5 font-bold">WhatsApp & Lead Flows</div>
              </motion.div>

              {/* 4. Bottom-End Node: Brand Identity & Media */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { 
                  opacity: 1, 
                  y: [0, 7, 0],
                  x: [0, 4, 0]
                }}
                transition={{ 
                  duration: 5.2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1.5 
                }}
                className="absolute -bottom-2 end-1 sm:end-4 z-30 p-3.5 sm:p-4 rounded-2xl glass-card border-white/10 hover:border-brand-orange/40 shadow-2xl backdrop-blur-xl group transition-colors max-w-[190px] sm:max-w-[210px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-[9px] font-black text-brand-orange uppercase">Creative</div>
                </div>
                <div className="text-xs font-black text-white">{isAr ? 'الهوية والمحتوى' : 'Branding & Content'}</div>
                <div className="text-[10px] text-text-muted mt-0.5 font-bold">Visual Strategy & Assets</div>
              </motion.div>

              {/* Floating Orbiting Tag: Multi-Channel Ads */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                animate={prefersReducedMotion ? { opacity: 1 } : {
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.04, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -start-3 sm:-start-6 -translate-y-1/2 z-35 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/70 backdrop-blur-md text-[10px] font-black text-white shadow-xl"
              >
                <Target className="w-3.5 h-3.5 text-brand-orange" />
                <span>Meta & Google Ads</span>
              </motion.div>

              {/* Floating Orbiting Tag: Strategy & Growth */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
                animate={prefersReducedMotion ? { opacity: 1 } : {
                  opacity: [0.8, 1, 0.8],
                  scale: [1, 1.04, 1]
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -end-3 sm:-end-6 -translate-y-1/2 z-35 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/70 backdrop-blur-md text-[10px] font-black text-white shadow-xl"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Digital Strategy</span>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
