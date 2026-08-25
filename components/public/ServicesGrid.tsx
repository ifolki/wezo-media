'use client'

import { motion } from 'framer-motion'
import { Music, Video, Megaphone, Globe, Users, ChevronRight } from 'lucide-react'
import { Link } from '@/navigation'

interface ServicesGridProps {
  services: any[]
  locale: string
}

export default function ServicesGrid({ services, locale }: ServicesGridProps) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const getLocalized = (item: any, prefixName: string) => {
    if (isAr) return item[`${prefixName}Ar`] || item[`${prefixName}En`]
    if (isFr) return item[`${prefixName}Fr`] || item[`${prefixName}En`]
    return item[`${prefixName}En`] || item[`${prefixName}Ar`]
  }

  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'video':
        return <Video className="w-10 h-10 text-brand-orange" />
      case 'audio':
        return <Music className="w-10 h-10 text-[#FF4D80]" />
      case 'web':
        return <Globe className="w-10 h-10 text-blue-500" />
      case 'marketing':
        return <Megaphone className="w-10 h-10 text-emerald-500" />
      default:
        return <Users className="w-10 h-10 text-purple-500" />
    }
  }

  if (!services || services.length === 0) return null

  return (
    <section className="py-40 relative overflow-hidden bg-[#0A0A0F] text-start">
      <div className="container-custom mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-32 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-6 py-2 rounded-full glass-card border-brand-orange/20 text-brand-orange font-black text-sm uppercase tracking-widest"
          >
            {isAr ? 'الخدمات الرقمية المتطورة' : 'Our Specialized Services'}
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white px-4"
          >
            {isAr ? 'نساعدك على النمو في السوق الرقمي' : 'Accelerate Your Digital Presence'}
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
              <div className="relative z-10 space-y-10">
                <div 
                  className="w-20 h-20 rounded-[1.75rem] flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-2xl group-hover:border-white/20"
                >
                  {getServiceIcon(service.slug)}
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-black text-white group-hover:text-brand-orange transition-colors">
                    {getLocalized(service, 'name')}
                  </h3>
                  <p className="text-text-muted text-lg leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity line-clamp-3">
                    {getLocalized(service, 'desc') || service.descriptionAr || service.descriptionEn}
                  </p>
                </div>

                <Link 
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-3 text-brand-orange font-black text-lg group/link pt-6"
                >
                  <span>{isAr ? 'استكشف الخدمة بالتفصيل' : 'Explore Service'}</span>
                  <ChevronRight className="w-6 h-6 transition-transform group-hover/link:translate-x-2' rtl:group-hover/link:-translate-x-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
