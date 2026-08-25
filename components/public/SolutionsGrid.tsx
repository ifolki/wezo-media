'use client'

import { motion } from 'framer-motion'
import { Target, Sparkles, TrendingUp, Lightbulb } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

interface SolutionsGridProps {
  solutions: any[]
  locale: string
}

export default function SolutionsGrid({ solutions, locale }: SolutionsGridProps) {
  const t = useTranslations('nav')
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const getLocalized = (item: any, prefixName: string) => {
    if (isAr) return item[`${prefixName}Ar`] || item[`${prefixName}En`]
    if (isFr) return item[`${prefixName}Fr`] || item[`${prefixName}En`]
    return item[`${prefixName}En`] || item[`${prefixName}Ar`]
  }

  const getSolutionIcon = (slug: string) => {
    switch (slug) {
      case 'launch-my-business':
        return <Lightbulb className="w-10 h-10 text-brand-orange" />
      case 'get-more-customers':
        return <TrendingUp className="w-10 h-10 text-emerald-500" />
      default:
        return <Target className="w-10 h-10 text-brand-pink" />
    }
  }

  if (!solutions || solutions.length === 0) return null

  return (
    <section className="py-24 relative overflow-hidden bg-[#07070B] text-start">
      <div className="container-custom mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-bold text-xs uppercase tracking-wider"
          >
            {isAr ? 'ماذا تريد أن تحقق لمشروعك؟' : 'What do you want to achieve?'}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            {isAr ? 'حلول أعمال متكاملة بالنتائج' : 'Outcome-Driven Solutions'}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[2.5rem] glass-card overflow-hidden hover:border-brand-orange/30 transition-all duration-500 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-105 transition-transform duration-500">
                  {getSolutionIcon(sol.slug)}
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors">
                    {getLocalized(sol, 'name')}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {getLocalized(sol, 'description')}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Link 
                  href={`/solutions/${sol.slug}`}
                  className="inline-flex items-center gap-2 text-brand-orange font-bold text-sm"
                >
                  <span>{isAr ? 'استكشف الحل التجاري' : 'Explore Solution'}</span>
                  <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
