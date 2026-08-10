'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Film, Users, TrendingUp } from 'lucide-react'

export default function AgencyStudio() {
  const t = useTranslations('agency_studio')
  const prefersReducedMotion = useReducedMotion()

  const features = [
    {
      icon: Film,
      title: t('feature_1_title'),
      desc: t('feature_1_desc'),
      color: 'bg-brand-orange/10 text-brand-orange'
    },
    {
      icon: Users,
      title: t('feature_2_title'),
      desc: t('feature_2_desc'),
      color: 'bg-[#FF4D80]/10 text-[#FF4D80]'
    },
    {
      icon: TrendingUp,
      title: t('feature_3_title'),
      desc: t('feature_3_desc'),
      color: 'bg-emerald-500/10 text-emerald-500'
    }
  ]

  return (
    <section className="py-32 bg-[#07070A] text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute left-[-10%] top-[30%] w-[500px] h-[500px] -z-10 bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] items-center gap-16 lg:gap-20">
          
          {/* Left Column: Office Image Showcasing Frame */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex items-center justify-center group"
          >
            {/* Outer glowing ambient background behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 via-transparent to-brand-orange/5 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

            {/* Custom Styled Mockup Frame for the Image */}
            <div className="relative w-full rounded-[3.2rem] overflow-hidden border border-white/10 bg-brand-card p-3 md:p-4 shadow-[0_32px_64px_rgba(0,0,0,0.6)]">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3]">
                <img
                  src="/assets/agency/office.jpg"
                  alt="WEZO MEDIA Agency Creative Office HQ"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Overlay subtle color grading */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-85" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Copy & Interactive Features */}
          <div className="space-y-10 text-start">
            <div className="space-y-6">
              {/* Badge */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-[10px] md:text-xs font-black tracking-widest text-brand-orange uppercase">
                  {t('badge')}
                </span>
              </motion.div>

              {/* Header */}
              <motion.h2
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight"
              >
                {t('title_prefix')}
                <span className="bg-gradient-to-r from-brand-orange to-[#FF4D80] bg-clip-text text-transparent block md:inline-block">
                  {t('title_highlight')}
                </span>
              </motion.h2>

              {/* Narrative description */}
              <motion.p
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base md:text-lg text-text-muted leading-relaxed font-bold"
              >
                {t('description')}
              </motion.p>
            </div>

            {/* In-House Studio Features List */}
            <div className="space-y-6">
              {features.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    className="flex gap-5 p-5 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 active:scale-[0.99] transition-all"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${feat.color} flex items-center justify-center shrink-0 shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-2 text-start">
                      <h4 className="text-lg font-black text-white">{feat.title}</h4>
                      <p className="text-sm font-bold text-text-muted leading-relaxed">{feat.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
