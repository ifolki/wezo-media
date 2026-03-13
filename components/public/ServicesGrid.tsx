'use client'

import { motion } from 'framer-motion'
import { Music, Video, Megaphone, Globe, Disc, Users, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

const services = [
  { id: 'audio', icon: Music, color: '#FF6B2B' },
  { id: 'video', icon: Video, color: '#FF2D78' },
  { id: 'marketing', icon: Megaphone, color: '#4ADE80' },
  { id: 'web', icon: Globe, color: '#60A5FA' },
  { id: 'distribution', icon: Disc, color: '#A855F7' },
  { id: 'artist', icon: Users, color: '#FACC15' },
]

export default function ServicesGrid() {
  const t = useTranslations('services')

  return (
    <section className="py-40 relative overflow-hidden bg-[#0A0A0F]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-32 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 rounded-full glass-card border-brand-orange/20 text-brand-orange font-black text-sm uppercase tracking-widest"
          >
            {t('title')}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white px-4"
          >
            {t('subtitle')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative p-12 rounded-[3.5rem] glass-card overflow-hidden hover:border-brand-orange/30 transition-all duration-500 hover:-translate-y-4 shadow-2xl"
            >
              <div 
                className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-10 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: service.color }}
              />

              <div className="relative z-10 space-y-10">
                <div 
                  className="w-20 h-20 rounded-[1.75rem] flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-2xl group-hover:border-white/20"
                  style={{ color: service.color }}
                >
                  <service.icon className="w-10 h-10" />
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-black text-white group-hover:text-brand-orange transition-colors">
                    {t(`categories.${service.id}`)}
                  </h3>
                  <p className="text-text-muted text-lg leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                    {t('subtitle').substring(0, 100)}...
                  </p>
                </div>

                <Link 
                  href={`/services/${service.id}`}
                  className="inline-flex items-center gap-3 text-brand-orange font-black text-lg group/link pt-6"
                >
                  <span>{t('learnMore')}</span>
                  <ChevronRight className="w-6 h-6 transition-transform group-hover/link:translate-x-2 rtl:group-hover/link:-translate-x-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
