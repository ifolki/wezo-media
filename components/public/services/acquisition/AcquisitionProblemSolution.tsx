'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  MousePointerClick, 
  RefreshCw, 
  Compass, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react'

interface Props {
  locale: string
}

export default function AcquisitionProblemSolution({ locale }: Props) {
  const t = useTranslations('meta_ads_service.problem_solution')
  const isAr = locale === 'ar'
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight

  const cards = [
    {
      icon: MousePointerClick,
      problemBadge: t('c1_problem_badge'),
      problemTitle: t('c1_problem_title'),
      problemDesc: t('c1_problem_desc'),
      solutionBadge: t('c1_solution_badge'),
      solutionTitle: t('c1_solution_title'),
      solutionDesc: t('c1_solution_desc'),
    },
    {
      icon: RefreshCw,
      problemBadge: t('c2_problem_badge'),
      problemTitle: t('c2_problem_title'),
      problemDesc: t('c2_problem_desc'),
      solutionBadge: t('c2_solution_badge'),
      solutionTitle: t('c2_solution_title'),
      solutionDesc: t('c2_solution_desc'),
    },
    {
      icon: Compass,
      problemBadge: t('c3_problem_badge'),
      problemTitle: t('c3_problem_title'),
      problemDesc: t('c3_problem_desc'),
      solutionBadge: t('c3_solution_badge'),
      solutionTitle: t('c3_solution_title'),
      solutionDesc: t('c3_solution_desc'),
    }
  ]

  return (
    <section className="py-12 md:py-16 bg-white border-y border-[#E7E5DF] text-[#111118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            {t('subtitle')}
          </p>
        </div>

        {/* 3 Dual Confrontation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="rounded-2xl border border-[#E7E5DF] bg-[#FBFBFA] p-5 sm:p-6 shadow-xs flex flex-col justify-between"
              >
                {/* Top: The Friction */}
                <div className="pb-4 border-b border-neutral-200/70">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/70">
                      {card.problemBadge}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-400" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1.5 leading-snug">
                    {card.problemTitle}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {card.problemDesc}
                  </p>
                </div>

                {/* Bottom: The WEZO Response */}
                <div className="pt-4 bg-emerald-50/40 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-5 sm:p-6 rounded-b-2xl border-t border-emerald-100">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{card.solutionBadge}</span>
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 mb-1 leading-snug">
                    {card.solutionTitle}
                  </h4>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    {card.solutionDesc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
