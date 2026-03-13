'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const stats = [
  { id: 'projects', value: '500+' },
  { id: 'clients', value: '230+' },
  { id: 'satisfaction', value: '99%' },
  { id: 'experience', value: '12+' },
]

export default function Stats() {
  const t = useTranslations('stats')

  return (
    <section className="py-24 relative border-y border-white/5 bg-[#0D0D14] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150px] bg-brand-orange/5 blur-[120px] -z-10" />

      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center space-y-3 relative group"
            >
              <div className="text-5xl md:text-7xl lg:text-8xl font-black gradient-text tracking-tighter group-hover:scale-110 transition-transform duration-700">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-black text-brand-orange/70 uppercase tracking-[0.3em] font-display">
                {t(stat.id)}
              </div>
              
              {/* Vertical Divider for desktop */}
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute -right-[15%] lg:-right-[30%] top-1/2 -translate-y-1/2 w-[1px] h-20 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
