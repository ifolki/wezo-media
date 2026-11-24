'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  ArrowRight, 
  ArrowLeft,
  ChevronRight, 
  ChevronLeft,
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  Layers, 
  MessageCircle, 
  Target,
  TrendingUp
} from 'lucide-react'
import { Link } from '@/navigation'
import { trackRequestQuote, trackServiceView } from '@/lib/analytics/gtag'

interface Props {
  locale: string
}

export default function AcquisitionHero({ locale }: Props) {
  const t = useTranslations('meta_ads_service.hero')
  const tb = useTranslations('meta_ads_service.breadcrumbs')
  const isAr = locale === 'ar'
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight
  const ChevronIcon = isAr ? ChevronLeft : ChevronRight

  useEffect(() => {
    trackServiceView({
      serviceName: 'Acquisition Meta Ads',
      serviceSlug: 'meta-ads-management',
      locale,
      pagePath: typeof window !== 'undefined' ? window.location.pathname : `/${locale}/services/meta-ads-management`,
    })
  }, [locale])

  return (
    <section className="relative pt-4 pb-10 md:pt-8 md:pb-14 overflow-hidden bg-[#F6F5F0] text-[#111118]">
      {/* Background subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D5D1C7 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle warm ambient gradient */}
      <div className="absolute top-6 start-1/4 w-[400px] h-[400px] bg-brand-orange/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav 
          aria-label="Fil d'Ariane"
          className="flex items-center gap-1.5 text-xs text-neutral-500 mb-5 flex-wrap"
        >
          <Link href="/" className="hover:text-brand-orange transition-colors">
            {tb('home')}
          </Link>
          <ChevronIcon className="w-3.5 h-3.5 text-neutral-400" />
          <Link href="/services" className="hover:text-brand-orange transition-colors">
            {tb('services')}
          </Link>
          <ChevronIcon className="w-3.5 h-3.5 text-neutral-400" />
          <Link href="/services/marketing" className="hover:text-brand-orange transition-colors">
            {tb('marketing')}
          </Link>
          <ChevronIcon className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-neutral-900 font-semibold" aria-current="page">
            {tb('current')}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('badge')}</span>
            </motion.div>

            {/* Approved H1 Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight leading-[1.2] text-[#111118]"
            >
              {t('title')}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal max-w-2xl"
            >
              {t('subtitle')}
            </motion.p>

            {/* Feature Pills (3 pills) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              <div className="inline-flex items-center gap-2 text-xs text-neutral-700 bg-white border border-[#E7E5DF] rounded-lg px-3 py-1.5 shadow-xs">
                <Sliders className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span className="font-medium">{t('pill_ads_manager')}</span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-neutral-700 bg-white border border-[#E7E5DF] rounded-lg px-3 py-1.5 shadow-xs">
                <Layers className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                <span className="font-medium">{t('pill_creatives')}</span>
              </div>
              <div className="inline-flex items-center gap-2 text-xs text-neutral-700 bg-white border border-[#E7E5DF] rounded-lg px-3 py-1.5 shadow-xs">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium">{t('pill_funnel')}</span>
              </div>
            </motion.div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Link
                href="/get-quote?service=meta-ads-management"
                onClick={() => {
                  trackRequestQuote({
                    ctaLocation: 'meta_ads_hero_primary',
                    serviceName: 'meta-ads-management',
                    locale,
                  })
                }}
                className="inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-6 py-3.5 text-sm sm:text-base rounded-xl shadow-md shadow-brand-orange/20 transition-all hover:translate-y-[-1px]"
              >
                <span>{t('cta_quote')}</span>
                <ArrowIcon className="w-4 h-4 ms-2" />
              </Link>

              <a 
                href="#formules"
                className="inline-flex items-center justify-center border border-neutral-300 hover:border-neutral-800 bg-white hover:bg-neutral-50 text-neutral-800 font-semibold px-5 py-3.5 text-sm sm:text-base rounded-xl transition-all"
              >
                <span>{t('cta_packages')}</span>
              </a>
            </motion.div>

            {/* Reassurance Micro-Copy */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-xs text-neutral-500 flex items-center gap-1.5 pt-0.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('reassurance')}</span>
            </motion.p>
          </div>

          {/* Slim Visual Cockpit Column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="relative rounded-2xl bg-white border border-[#E7E5DF] p-5 shadow-lg shadow-black/5"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    {isAr ? 'مسار الاستقطاب المباشر' : 'Système d\'Acquisition'}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                  Meta Ads Manager
                </span>
              </div>

              {/* 3 Step Flow */}
              <div className="space-y-2.5 my-3.5">
                {/* Step 1 */}
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/70">
                  <div className="w-7 h-7 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 font-bold text-xs">
                    01
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-neutral-900 leading-tight">
                      {t('flow_step1_title')}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate">
                      {t('flow_step1_desc')}
                    </p>
                  </div>
                  <Target className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/70">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0 font-bold text-xs">
                    02
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-neutral-900 leading-tight">
                      {t('flow_step2_title')}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate">
                      {t('flow_step2_desc')}
                    </p>
                  </div>
                  <Sparkles className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    03
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-950 leading-tight">
                      {t('flow_step3_title')}
                    </p>
                    <p className="text-[11px] text-emerald-700 truncate">
                      {t('flow_step3_desc')}
                    </p>
                  </div>
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                </div>
              </div>

              {/* Bottom Card Summary */}
              <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t('flow_footer')}</span>
                </span>
                <span className="font-semibold text-neutral-900">WEZO</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
