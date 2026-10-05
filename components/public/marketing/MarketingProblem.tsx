'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { AlertCircle, Target, Film, Layout, RefreshCw, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react'
import { trackRequestQuote } from '@/lib/analytics/gtag'

interface Props {
  locale: string
}

export default function MarketingProblem({ locale }: Props) {
  const t = useTranslations('marketing_service.problem')
  const isAr = locale === 'ar'

  const cases = [
    {
      key: 'business_a',
      icon: Target,
      accentColor: 'border-blue-500/30 text-blue-600 bg-blue-50',
      iconBg: 'bg-blue-600/10 text-blue-600'
    },
    {
      key: 'business_b',
      icon: Film,
      accentColor: 'border-pink-500/30 text-pink-600 bg-pink-50',
      iconBg: 'bg-pink-600/10 text-pink-600'
    },
    {
      key: 'business_c',
      icon: Layout,
      accentColor: 'border-amber-500/30 text-amber-600 bg-amber-50',
      iconBg: 'bg-amber-600/10 text-amber-600'
    },
    {
      key: 'business_d',
      icon: RefreshCw,
      accentColor: 'border-emerald-500/30 text-emerald-600 bg-emerald-50',
      iconBg: 'bg-emerald-600/10 text-emerald-600'
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-y border-[#EBE7DC] text-[#111118] relative">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-xs font-black uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-base sm:text-lg text-[#555562] leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* 4 Diagnostic Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.div
                key={c.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="rounded-3xl border border-[#E8E4DA] bg-[#FDFCF9] hover:bg-white hover:border-brand-orange/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all p-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Bar with Tag and Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-3 py-1 rounded-full border border-[#DDD9CE] bg-white text-[#444452]">
                      {t(`${c.key}.tag`)}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.iconBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Initial Status */}
                  <p className="text-sm font-bold text-[#2A2A35] leading-snug">
                    {t(`${c.key}.status`)}
                  </p>

                  {/* Bottleneck identification */}
                  <div className="p-3.5 rounded-2xl bg-[#F4F1E8] border border-[#E5E0D2] space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#777785] block">
                      {t(`${c.key}.bottleneck_label`)}
                    </span>
                    <p className="text-xs font-black text-[#D32F2F]">
                      {t(`${c.key}.bottleneck`)}
                    </p>
                  </div>
                </div>

                {/* WEZO Intervention */}
                <div className="pt-5 mt-5 border-t border-[#EDE9DE] space-y-2">
                  <span className="text-[11px] font-black text-brand-orange flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    {t(`${c.key}.solution_label`)}
                  </span>
                  <p className="text-xs text-[#4E4E5C] font-medium leading-relaxed">
                    {t(`${c.key}.solution`)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Strategic Statement Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-3xl gradient-brand p-[1px] shadow-[0_20px_50px_rgba(255,107,43,0.15)]"
        >
          <div className="rounded-[23px] bg-[#111118] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl text-start">
              <span className="text-xs font-black tracking-widest uppercase text-brand-orange flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                {t('statement_title')}
              </span>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                {t('statement_desc')}
              </p>
            </div>

              <a 
                href="#project-request" 
                className="shrink-0 w-full sm:w-auto"
                onClick={() => {
                  trackRequestQuote({
                    ctaLocation: 'marketing_problem_statement',
                    serviceName: 'marketing',
                    locale,
                  })
                }}
              >
                <button className="w-full sm:w-auto h-13 px-7 rounded-2xl bg-white text-[#111118] hover:bg-white/90 font-black text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                  <span>{isAr ? 'ابدأ بتشخيص مشروعك' : 'Demander votre diagnostic'}</span>
                  <ArrowRight className="w-4 h-4 text-brand-orange rtl:rotate-180" />
                </button>
              </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
