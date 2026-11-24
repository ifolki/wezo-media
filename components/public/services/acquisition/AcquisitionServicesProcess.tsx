'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Sliders, 
  Layers, 
  MessageCircle, 
  BarChart3, 
  ChevronDown, 
  Sparkles, 
  AlertCircle,
  Briefcase,
  PenTool,
  Rocket,
  LineChart,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

interface Props {
  locale: string
}

export default function AcquisitionServicesProcess({ locale }: Props) {
  const t = useTranslations('meta_ads_service.services_process')
  const isAr = locale === 'ar'
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight

  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null)

  const toggleDetails = (idx: number) => {
    setOpenCardIndex(prev => (prev === idx ? null : idx))
  }

  const services = [
    {
      icon: Sliders,
      title: t('card1_title'),
      desc: t('card1_desc'),
      toggleText: t('card1_toggle'),
      details: t('card1_details'),
    },
    {
      icon: Layers,
      title: t('card2_title'),
      desc: t('card2_desc'),
      toggleText: t('card2_toggle'),
      details: t('card2_details'),
    },
    {
      icon: MessageCircle,
      title: t('card3_title'),
      desc: t('card3_desc'),
      toggleText: t('card3_toggle'),
      details: t('card3_details'),
    },
    {
      icon: BarChart3,
      title: t('card4_title'),
      desc: t('card4_desc'),
      toggleText: t('card4_toggle'),
      details: t('card4_details'),
    }
  ]

  const steps = [
    {
      num: t('step1_num'),
      icon: Briefcase,
      title: t('step1_title'),
      desc: t('step1_desc'),
    },
    {
      num: t('step2_num'),
      icon: PenTool,
      title: t('step2_title'),
      desc: t('step2_desc'),
    },
    {
      num: t('step3_num'),
      icon: Rocket,
      title: t('step3_title'),
      desc: t('step3_desc'),
    },
    {
      num: t('step4_num'),
      icon: LineChart,
      title: t('step4_title'),
      desc: t('step4_desc'),
    }
  ]

  return (
    <section id="methodologie" className="py-12 md:py-16 bg-[#F6F5F0] text-[#111118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            {t('subtitle')}
          </p>
        </div>

        {/* Part A: 4 Synthetic Service Cards with Collapsible Accordion Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {services.map((srv, idx) => {
            const Icon = srv.icon
            const isOpen = openCardIndex === idx
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="rounded-2xl border border-[#E7E5DF] bg-white p-5 sm:p-6 shadow-xs hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-900 leading-tight">
                      {srv.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                    {srv.desc}
                  </p>
                </div>

                {/* Collapsible Details Trigger */}
                <div className="pt-3 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => toggleDetails(idx)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-neutral-700 hover:text-brand-orange transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{srv.toggleText}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-orange' : 'text-neutral-400'}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-2 text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200/60 leading-relaxed mt-2">
                          {srv.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Part B: Compact 4-Step Execution Flow */}
        <div className="rounded-2xl bg-white border border-[#E7E5DF] p-6 sm:p-8 shadow-xs mb-8">
          <div className="text-center max-w-xl mx-auto mb-7">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900">
              {t('process_title')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {steps.map((st, sIdx) => {
              const Icon = st.icon
              return (
                <div 
                  key={sIdx}
                  className="relative p-4 rounded-xl bg-[#FBFBFA] border border-neutral-200/70 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center font-bold text-xs">
                        {st.num}
                      </div>
                      <Icon className="w-4 h-4 text-neutral-400" />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 mb-1 leading-snug">
                      {st.title}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Part C: Media Spend Transparency Notice */}
        <div className="rounded-xl bg-neutral-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-brand-orange shrink-0" />
            <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed">
              {t('disclaimer_spend')}
            </p>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-white/10 px-2.5 py-1 rounded shrink-0">
            {isAr ? 'شفافية 100%' : 'Direct Meta'}
          </span>
        </div>

      </div>
    </section>
  )
}
