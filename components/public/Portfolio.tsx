'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/navigation'
import { getLatestProjects } from '@/lib/config/portfolio'

export default function FeaturedPortfolio() {
  const t = useTranslations('portfolio')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  // Fetch the latest published real projects directly from the portfolio data source
  const latestProjects = getLatestProjects(3)

  const getCategoryLabel = (project: any) => {
    if (isAr) return project.categoryLabelAr || project.category
    if (isFr) return project.categoryLabelFr || project.category
    return project.categoryLabelEn || project.category
  }

  const getHighlight = (project: any) => {
    if (isAr) return project.highlightAr
    if (isFr) return project.highlightFr
    return project.highlightEn
  }

  return (
    <section className="py-32 relative group/section overflow-hidden bg-[#07070A] text-start">
      {/* Background Ambient Glow */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-brand-orange/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl text-start">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              <span>{isAr ? 'قصص نجاح رقمية حقيقية' : isFr ? 'Études de cas réelles' : 'Proven Digital Success'}</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, x: isAr ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white"
            >
              {t('title')}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, x: isAr ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-text-muted leading-relaxed font-normal"
            >
              {t('subtitle')}
            </motion.p>
          </div>
          
          <Link href="/portfolio">
            <Button 
              variant="outline" 
              className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 hover:border-brand-orange/40 font-bold text-base md:text-lg group gap-2.5 glass-card"
            >
              <span>{t('viewAll')}</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* 3 Real Portfolio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-[2.5rem] overflow-hidden glass-card border-white/10 hover:border-brand-orange/30 transition-all duration-500 shadow-2xl flex flex-col"
            >
              <Link href={`/portfolio/${project.slug}`} className="flex flex-col h-full">
                {/* Project Image Frame */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden bg-brand-dark">
                  <img 
                    src={project.img} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-dark/20 to-transparent" />
                  
                  {/* Category Pill Top Start */}
                  <div className="absolute top-5 start-5 z-10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-black/60 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md">
                      <Layers className="w-3.5 h-3.5 text-brand-orange" />
                      {getCategoryLabel(project)}
                    </span>
                  </div>

                  {/* Measurable Result Badge Top End (If available) */}
                  {project.metrics && (
                    <div className="absolute top-5 end-5 z-10">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1.5 rounded-full backdrop-blur-md">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        {project.metrics}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Content Card Body */}
                <div className="p-8 flex flex-col justify-between flex-1 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors">
                        {project.title}
                      </h3>
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white group-hover:bg-brand-orange group-hover:text-white transition-all group-hover:rotate-45">
                        <ArrowUpRight className="w-5 h-5 rtl:scale-x-[-1]" />
                      </div>
                    </div>

                    <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
                      {getHighlight(project)}
                    </p>
                  </div>

                  {/* Capabilities / Service Tags */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-[11px] font-bold text-white/70 bg-white/[0.04] border border-white/5 px-2.5 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[11px] font-bold text-brand-orange bg-brand-orange/10 px-2 py-1 rounded-lg">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
