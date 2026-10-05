'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Search, 
  Compass, 
  Layers, 
  Cpu, 
  Rocket, 
  TrendingUp, 
  Workflow
} from 'lucide-react'

interface Props {
  locale: string
}

export default function MarketingProcess({ locale }: Props) {
  const t = useTranslations('marketing_service.process')
  const isAr = locale === 'ar'

  const steps = [
    {
      num: t('step1_num'),
      title: t('step1_title'),
      desc: t('step1_desc'),
      icon: Search
    },
    {
      num: t('step2_num'),
      title: t('step2_title'),
      desc: t('step2_desc'),
      icon: Compass
    },
    {
      num: t('step3_num'),
      title: t('step3_title'),
      desc: t('step3_desc'),
      icon: Layers
    },
    {
      num: t('step4_num'),
      title: t('step4_title'),
      desc: t('step4_desc'),
      icon: Cpu
    },
    {
      num: t('step5_num'),
      title: t('step5_title'),
      desc: t('step5_desc'),
      icon: Rocket
    },
    {
      num: t('step6_num'),
      title: t('step6_title'),
      desc: t('step6_desc'),
      icon: TrendingUp
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-y border-[#EBE7DC] text-[#111118] relative overflow-hidden">
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-xs font-black uppercase tracking-wider">
            <Workflow className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-base sm:text-lg text-[#555562] leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Desktop 6-Steps Grid with Flow Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="relative rounded-3xl border border-[#E8E4DA] bg-[#FDFCF9] hover:bg-white hover:border-brand-orange/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] p-7 transition-all flex flex-col justify-between group"
              >
                {/* Number Badge and Step Counter */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#DDD8CA] group-hover:border-brand-orange/40 flex items-center justify-center text-brand-orange shadow-sm transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black font-syne text-[#D5D0C2] group-hover:text-brand-orange transition-colors">
                    {s.num}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-3 text-start">
                  <h3 className="text-lg sm:text-xl font-black text-[#111118] group-hover:text-brand-orange transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555562] leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>

                {/* Step Connector Indicator */}
                <div className="mt-6 pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-[11px] font-bold text-[#8C8C9A]">
                  <span>{isAr ? `المرحلة ${idx + 1} من 6` : `Étape ${idx + 1} sur 6`}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/60" />
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
