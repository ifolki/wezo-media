'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { CheckCircle2, XCircle, Users, Sparkles, AlertTriangle } from 'lucide-react'

interface Props {
  locale: string
}

export default function MarketingTarget({ locale }: Props) {
  const t = useTranslations('marketing_service.target')
  const isAr = locale === 'ar'

  const suitableItems = [
    t('suitable_items.0'),
    t('suitable_items.1'),
    t('suitable_items.2'),
    t('suitable_items.3'),
    t('suitable_items.4')
  ]

  const unsuitableItems = [
    t('unsuitable_items.0'),
    t('unsuitable_items.1'),
    t('unsuitable_items.2'),
    t('unsuitable_items.3')
  ]

  return (
    <section className="py-20 md:py-28 bg-[#F6F5F0] text-[#111118] relative">
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-xs font-black uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-base sm:text-lg text-[#555562] leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Two-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Column 1: Suitable (Green/Orange Trust accents) */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-emerald-500/30 bg-white p-8 sm:p-10 shadow-[0_16px_40px_rgba(16,185,129,0.06)] space-y-6"
          >
            <div className="flex items-center gap-3 pb-6 border-b border-[#F0ECE1]">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#111118]">
                {t('suitable_title')}
              </h3>
            </div>

            <ul className="space-y-4 text-start">
              {suitableItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#2E2E38] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2: Unsuitable (Neutral subtle border with clear boundaries) */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-[#DDD8CA] bg-[#FDFCF9] p-8 sm:p-10 shadow-sm space-y-6"
          >
            <div className="flex items-center gap-3 pb-6 border-b border-[#EDE9DE]">
              <div className="w-10 h-10 rounded-2xl bg-[#ECE7DC] border border-[#DDD8CA] flex items-center justify-center text-[#7A7A88]">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#111118]">
                {t('unsuitable_title')}
              </h3>
            </div>

            <ul className="space-y-4 text-start">
              {unsuitableItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-[#5C5C6A] leading-relaxed">
                  <XCircle className="w-4 h-4 text-[#9999A6] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
