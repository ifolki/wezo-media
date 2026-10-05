'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react'

interface Props {
  locale: string
}

export default function MarketingFAQ({ locale }: Props) {
  const t = useTranslations('marketing_service.faq')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    { q: t('q1'), a: t('a1') },
    { q: t('q2'), a: t('a2') },
    { q: t('q3'), a: t('a3') },
    { q: t('q4'), a: t('a4') },
    { q: t('q5'), a: t('a5') },
    { q: t('q6'), a: t('a6') },
    { q: t('q7'), a: t('a7') }
  ]

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx))
  }

  return (
    <section className="py-20 md:py-28 bg-[#F6F5F0] text-[#111118] relative">
      <div className="container-custom max-w-4xl">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-base sm:text-lg text-[#555562] leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 text-start">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#DDD8CA] bg-white transition-all overflow-hidden shadow-sm hover:border-brand-orange/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-start flex items-center justify-between gap-4 font-black text-sm sm:text-base text-[#111118] hover:text-brand-orange transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-xl bg-[#F6F5F0] border border-[#E5E0D2] flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-orange' : 'text-[#6C6C7A]'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#4E4E5C] leading-relaxed border-t border-[#F0ECE1]">
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
    </section>
  )
}
