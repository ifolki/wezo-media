'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { useTranslations } from 'next-intl'

const feedbackList = [
  { name: 'Sami Mansour', company: 'Tech Solutions', stars: 5 },
  { name: 'Laila Hassan', company: 'Artist', stars: 5 },
  { name: 'Adam Wright', company: 'Global Brands', stars: 5 },
]

export default function Testimonials() {
  const t = useTranslations('testimonials')
  const s = useTranslations('stats')

  return (
    <section className="py-32 overflow-hidden bg-brand-dark relative">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-pink/5 blur-[120px] rounded-full -translate-x-1/2" />
      
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-2/5 space-y-10 text-start">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1]">
                {t('title')} <span className="gradient-text">{t('brand')}</span>
              </h2>
              <p className="text-xl md:text-2xl text-text-muted leading-relaxed font-bold">
                {t('subtitle')}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <div className="px-8 py-4 rounded-3xl glass-card border-brand-orange/20 shadow-2xl">
                <span className="text-3xl font-black text-white block">+200</span>
                <p className="text-sm font-bold text-brand-orange uppercase tracking-widest">{t('satisfied')}</p>
              </div>
              <div className="px-8 py-4 rounded-3xl glass-card border-brand-pink/20 shadow-2xl">
                <span className="text-3xl font-black text-white block">4.9/5</span>
                <p className="text-sm font-bold text-brand-pink uppercase tracking-widest">{t('rating')}</p>
              </div>
            </div>
          </div>

          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {feedbackList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-10 rounded-[3rem] border-white/5 relative group hover:border-brand-orange/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              >
                <Quote className="absolute top-8 end-10 w-16 h-16 text-white/5 group-hover:text-brand-orange/10 transition-colors" />
                
                <div className="flex gap-1.5 mb-8">
                  {[...Array(item.stars)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-brand-orange text-brand-orange" />
                  ))}
                </div>

                <p className="text-lg text-text-primary leading-relaxed mb-10 relative z-10 font-bold opacity-90">
                   "Wezo Media transformed our digital presence. Their attention to detail and creative vision is unmatched."
                </p>

                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl gradient-brand p-1 shadow-xl">
                    <div className="w-full h-full rounded-xl bg-brand-dark flex items-center justify-center font-black text-xl text-white">
                      {item.name[0]}
                    </div>
                  </div>
                  <div className="text-start">
                    <h4 className="text-xl font-black text-white">{item.name}</h4>
                    <p className="text-sm font-bold text-text-muted uppercase tracking-widest">{item.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
