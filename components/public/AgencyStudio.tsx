'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Film, Users, TrendingUp } from 'lucide-react'

export default function AgencyStudio() {
  const t = useTranslations('agency_studio')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const prefersReducedMotion = Boolean(useReducedMotion())

  const features = [
    {
      icon: Film,
      title: t('feature_1_title'),
      desc: t('feature_1_desc'),
      color: 'bg-brand-orange/12 text-brand-orange border border-brand-orange/25',
    },
    {
      icon: Users,
      title: t('feature_2_title'),
      desc: t('feature_2_desc'),
      color: 'bg-brand-red/12 text-brand-red border border-brand-red/25',
    },
    {
      icon: TrendingUp,
      title: t('feature_3_title'),
      desc: t('feature_3_desc'),
      color: 'bg-emerald-500/12 text-emerald-400 border border-emerald-500/25',
    },
  ]

  return (
    <section className="py-24 lg:py-28 bg-brand-dark text-text-primary relative overflow-hidden">
      {/* Background radial glow */}
      <div
        aria-hidden="true"
        className="absolute start-[-10%] top-[30%] w-[500px] h-[500px] -z-10 bg-brand-orange/[0.05] blur-[140px] rounded-full pointer-events-none"
      />

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] items-center gap-12 lg:gap-16">
          {/* Left Column: Office Image Showcasing Frame */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center group"
          >
            {/* Outer glowing ambient background behind image */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tr from-brand-orange/10 via-transparent to-brand-red/5 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10"
            />

            {/* Custom Styled Mockup Frame for the Image */}
            <div className="relative w-full rounded-[2rem] overflow-hidden border border-white/[0.08] bg-brand-secondary/75 p-2.5 md:p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
              <div className="relative rounded-[1.5rem] overflow-hidden aspect-[4/3]">
                <img
                  src="/assets/agency/office.jpg"
                  alt={
                    isAr
                      ? 'استوديو ومقر وكالة WEZO MEDIA للتواصل والتسويق الرقمي بالدار البيضاء'
                      : locale === 'fr'
                        ? 'Studio créatif et siège de WEZO MEDIA, agence de communication digitale à Casablanca'
                        : 'WEZO MEDIA Digital Communication & Marketing Agency Studio in Casablanca'
                  }
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  loading="lazy"
                />

                {/* Overlay subtle color grading */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Copy & Interactive Features */}
          <div className="space-y-8 text-start">
            <div className="space-y-4">
              {/* Badge */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-brand-orange/25 bg-brand-secondary/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                <span className="text-[11px] font-bold tracking-widest text-brand-orange uppercase">
                  {t('badge')}
                </span>
              </motion.div>

              {/* Header */}
              <motion.h2
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.6 }}
                className={
                  isAr
                    ? 'font-cairo font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.35] tracking-normal text-text-primary'
                    : 'font-syne font-bold text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight text-text-primary'
                }
              >
                <span>{t('title_prefix')} </span>
                <span className="bg-gradient-to-r from-brand-orange to-brand-red bg-clip-text text-transparent inline-block pt-1 pb-1.5">
                  {t('title_highlight')}
                </span>
              </motion.h2>

              {/* Narrative description */}
              <motion.p
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.16, duration: 0.6 }}
                className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed font-normal"
              >
                {t('description')}
              </motion.p>
            </div>

            {/* In-House Studio Features List */}
            <div className="space-y-4">
              {features.map((feat, i) => {
                const Icon = feat.icon
                return (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.22 + i * 0.08, duration: 0.5 }}
                    className="flex gap-4 p-4 sm:p-5 rounded-2xl border border-white/[0.07] bg-brand-secondary/55 hover:bg-brand-secondary/85 hover:border-brand-orange/30 transition-all duration-300"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${feat.color} flex items-center justify-center shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 text-start">
                      <h3
                        className={
                          isAr
                            ? 'font-cairo font-bold text-base sm:text-lg text-text-primary'
                            : 'font-syne font-bold text-base sm:text-lg text-text-primary'
                        }
                      >
                        {feat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                        {feat.desc}
                      </p>
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
