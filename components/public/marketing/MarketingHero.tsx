'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Sparkles, MessageCircle, ArrowRight, CheckCircle2, ShieldCheck, TrendingUp, Search, Compass, Layers, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config/site'
import { Link } from '@/navigation'

interface Props {
  locale: string
}

export default function MarketingHero({ locale }: Props) {
  const t = useTranslations('marketing_service.hero')
  const tb = useTranslations('marketing_service.breadcrumbs')
  const isAr = locale === 'ar'

  const whatsappMessage = encodeURIComponent(
    isAr
      ? 'السلام عليكم WEZO MEDIA، بغيت نناقش التسويق الرقمي ديال مشروعي.'
      : locale === 'en'
      ? 'Hello WEZO MEDIA, I would like to discuss digital marketing for my project.'
      : 'Bonjour WEZO MEDIA, je souhaite discuter du marketing digital de mon projet.'
  )

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`

  const flowSteps = [
    { num: '01', title: t('flow_step1'), icon: Search },
    { num: '02', title: t('flow_step2'), icon: Compass },
    { num: '03', title: t('flow_step3'), icon: Layers },
    { num: '04', title: t('flow_step4'), icon: TrendingUp },
    { num: '05', title: t('flow_step5'), icon: BarChart3 }
  ]

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-[#F6F5F0] text-[#111118]">
      {/* Subtle Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#D5D1C7 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Subtle Warm Ambient Glow */}
      <div className="absolute top-10 start-1/4 w-[500px] h-[500px] bg-brand-orange/5 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#6B6B78]">
            <li>
              <Link href="/" className="hover:text-brand-orange transition-colors">
                {tb('home')}
              </Link>
            </li>
            <li className="text-[#A5A5B2]">/</li>
            <li>
              <Link href="/services" className="hover:text-brand-orange transition-colors">
                {tb('services')}
              </Link>
            </li>
            <li className="text-[#A5A5B2]">/</li>
            <li className="text-brand-orange font-black" aria-current="page">
              {tb('marketing')}
            </li>
          </ol>
        </nav>

        {/* Hero Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Commercial Positioning */}
          <div className="lg:col-span-7 space-y-6 text-start">
            
            {/* Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-orange/30 bg-brand-orange/10 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-xs md:text-sm font-black tracking-wider uppercase text-brand-orange">
                {t('eyebrow')}
              </span>
            </motion.div>

            {/* Semantic Single H1 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-black leading-[1.12] tracking-tight text-[#111118]">
                {t('h1')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl font-bold text-brand-orange">
                {t('h1_sub')}
              </p>
            </motion.div>

            {/* Supporting Value Message */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-[#3E3E4B] leading-relaxed max-w-2xl font-normal"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <a href="#project-request" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 sm:h-15 px-8 sm:px-9 rounded-2xl text-base sm:text-lg font-black gradient-brand text-white hover:opacity-95 shadow-[0_12px_36px_rgba(255,107,43,0.35)] hover:scale-[1.02] active:scale-95 transition-all gap-3">
                  <Sparkles className="w-5 h-5 text-white shrink-0" />
                  <span>{t('cta_primary')}</span>
                </Button>
              </a>

              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-14 sm:h-15 px-7 sm:px-8 rounded-2xl text-base sm:text-lg font-bold border-[#DDD9CE] bg-white hover:bg-[#EFECE3] hover:border-emerald-500/50 text-[#111118] hover:text-emerald-700 shadow-sm active:scale-95 transition-all gap-3"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{t('cta_secondary')}</span>
                </Button>
              </a>
            </motion.div>

            {/* Trust Line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-1 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#555562]"
            >
              <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
              <span>{t('trust_line')}</span>
            </motion.div>
          </div>

          {/* Right Column: Visual Operating Model Architecture Card */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-3xl border border-[#E0DCCE] bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden"
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-6 border-b border-[#F0ECE1]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white shadow-md">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-[#777785]">
                      WEZO Framework
                    </div>
                    <div className="text-sm font-black text-[#111118]">
                      Integrated Growth Cycle
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {isAr ? 'منهجية معتمدة' : 'Standardisé'}
                </span>
              </div>

              {/* 5 Operating Phases Interactive Timeline */}
              <div className="space-y-4 pt-6">
                {flowSteps.map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={step.num}
                      initial={{ opacity: 0, x: isAr ? 15 : -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                      className="group flex items-center gap-4 p-3 rounded-2xl bg-[#F9F8F5] border border-[#EBE7DC] hover:border-brand-orange/40 hover:bg-white hover:shadow-md transition-all cursor-default"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#E2DDD0] group-hover:border-brand-orange/40 flex items-center justify-center text-xs font-black text-[#444450] group-hover:text-brand-orange shrink-0">
                        {step.num}
                      </div>

                      <div className="flex-grow flex items-center justify-between">
                        <span className="text-sm font-black text-[#1F1F2A] group-hover:text-brand-orange transition-colors">
                          {step.title}
                        </span>
                        <Icon className="w-4 h-4 text-[#8C8C9A] group-hover:text-brand-orange transition-colors" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Bottom Assurance Note */}
              <div className="mt-6 pt-5 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#6B6B78] font-bold">
                <span className="flex items-center gap-1.5 text-brand-orange">
                  <span className="w-2 h-2 rounded-full bg-brand-orange" />
                  {isAr ? 'لا نبيع باقات معزولة' : 'Pas de prestations isolées'}
                </span>
                <span className="text-[#888896]">
                  100% Stratégie & Exécution
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
