'use client'

import { motion } from 'framer-motion'
import { Lightbulb, FileText, Search, PlayCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

const processSteps = [
  { key: 'step1', icon: Lightbulb, color: '#FF6B2B' },
  { key: 'step2', icon: FileText, color: '#FF2D78' },
  { key: 'step3', icon: Search, color: '#4ADE80' },
  { key: 'step4', icon: PlayCircle, color: '#60A5FA' },
]

export default function WorkProcess() {
  const t = useTranslations('process')

  return (
    <section className="py-32 bg-brand-secondary/30 relative overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-muted"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[64px] inset-x-[10%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10 text-center space-y-8 group"
            >
              <div className="relative mx-auto w-32 h-32">
                <div 
                  className="absolute inset-0 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: step.color }}
                />
                <div className="relative w-full h-full rounded-full glass-card border-white/10 flex items-center justify-center group-hover:border-brand-orange/50 transition-all duration-500 group-hover:scale-110 shadow-2xl">
                  <step.icon className="w-12 h-12 transition-transform group-hover:scale-110" style={{ color: step.color }} />
                  <div className="absolute top-0 end-0 w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-black text-xl shadow-xl ring-4 ring-brand-dark -translate-y-2 translate-x-2 rtl:-translate-x-2">
                    {i + 1}
                  </div>
                </div>
              </div>

              <div className="space-y-4 px-4">
                <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors">
                  {t(`steps.${step.key}.title`)}
                </h3>
                <p className="text-text-muted leading-relaxed text-lg">
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
