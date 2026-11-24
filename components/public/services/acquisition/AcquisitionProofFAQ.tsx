'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Sparkles, 
  ShoppingBag, 
  GraduationCap, 
  HeartPulse, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown 
} from 'lucide-react'

interface Props {
  locale: string
}

export default function AcquisitionProofFAQ({ locale }: Props) {
  const t = useTranslations('meta_ads_service.proof_faq')
  const isAr = locale === 'ar'

  // FAQ closed by default as instructed
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(prev => (prev === idx ? null : idx))
  }

  const cases = [
    {
      title: t('c1_title'),
      category: t('c1_category'),
      icon: ShoppingBag,
      iconColor: 'bg-amber-500/10 text-amber-600',
      context: t('c1_context'),
      scope: t('c1_scope'),
    },
    {
      title: t('c2_title'),
      category: t('c2_category'),
      icon: GraduationCap,
      iconColor: 'bg-emerald-500/10 text-emerald-600',
      context: t('c2_context'),
      scope: t('c2_scope'),
    },
    {
      title: t('c3_title'),
      category: t('c3_category'),
      icon: HeartPulse,
      iconColor: 'bg-blue-500/10 text-blue-600',
      context: t('c3_context'),
      scope: t('c3_scope'),
    }
  ]

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
    { q: t('q7'), a: t('a7') },
  ]

  return (
    <section className="py-12 md:py-16 bg-[#F6F5F0] text-[#111118]">
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

        {/* Part A: 3 Real Case Studies */}
        <div className="mb-14">
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-5 text-center">
            {t('cases_title')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {cases.map((c, idx) => {
              const Icon = c.icon
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#E7E5DF] p-5 sm:p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                        {c.category}
                      </span>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${c.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="text-base font-extrabold text-neutral-900 mb-1.5">
                      {c.title}
                    </h4>

                    <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                      {c.context}
                    </p>

                    <div className="pt-3 border-t border-neutral-100 text-xs text-neutral-700 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{c.scope}</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                    <span>{isAr ? 'مشروع موثق' : 'Mission Réelle'}</span>
                    <span className="font-semibold text-brand-orange">WEZO</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Part B: FAQ Accordion (Closed by default) */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-5 text-center">
            {t('faq_title')}
          </h3>

          <div className="space-y-3 text-start">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#E7E5DF] bg-white transition-all overflow-hidden shadow-xs hover:border-neutral-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-neutral-900 hover:text-brand-orange transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="leading-snug">{faq.q}</span>
                    <div className={`w-7 h-7 rounded-lg bg-neutral-50 border border-[#E7E5DF] flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-orange' : 'text-neutral-400'}`}>
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
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
                        <div className="px-4 pb-4 sm:px-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 bg-[#FBFBFA]">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
