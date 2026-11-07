'use client'

import { motion } from 'framer-motion'
import { Search, Compass, Layers, TrendingUp } from 'lucide-react'
import { useTranslations } from 'next-intl'

const processSteps = [
  { key: 'step1', icon: Search, color: '#FF6B2B' },
  { key: 'step2', icon: Compass, color: '#FF2D78' },
  { key: 'step3', icon: Layers, color: '#4ADE80' },
  { key: 'step4', icon: TrendingUp, color: '#60A5FA' },
]

export default function WorkProcess() {
  const t = useTranslations('process')

  return (
    <section className="py-20 lg:py-24 bg-[#141C2B] border-y border-white/[0.06] relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16 space-y-3.5">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-[2.65rem] font-black text-text-primary leading-tight"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-text-muted"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] inset-x-[12%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="relative z-10 text-center space-y-6 group"
            >
              <div className="relative mx-auto w-24 h-24">
                <div 
                  className="absolute inset-0 rounded-full blur-xl opacity-10 group-hover:opacity-25 transition-opacity"
                  style={{ backgroundColor: step.color }}
                />
                <div className="relative w-full h-full rounded-2xl bg-brand-secondary/85 border border-white/10 flex items-center justify-center group-hover:border-brand-orange/45 transition-all duration-300 group-hover:-translate-y-0.5 shadow-xl">
                  <step.icon className="w-9 h-9 transition-transform duration-300 group-hover:scale-105" style={{ color: step.color }} />
                  <div className="absolute -top-2 -end-2 w-7 h-7 rounded-full gradient-brand flex items-center justify-center text-white font-bold text-xs shadow-lg ring-2 ring-[#141C2B]">
                    0{i + 1}
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 px-2">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-brand-orange transition-colors">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  {t(`steps.${step.key}.desc`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
