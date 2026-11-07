'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/navigation'
import { portfolioProjects } from '@/lib/config/portfolio'

const FEATURED_HOMEPAGE_SLUGS = ['mangeo-app', 'cabinet-dentaire', 'gama-pro']

export default function FeaturedPortfolio() {
  const t = useTranslations('portfolio')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  // Select the 3 featured projects in the requested order: Mangeo App, Cabinet Dentaire, Gama Pro
  const latestProjects = FEATURED_HOMEPAGE_SLUGS.map((slug) =>
    portfolioProjects.find((p) => p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p))

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

  const getProjectTags = (project: any): string[] => {
    if (isAr && project.tagsAr) return project.tagsAr
    if (isFr && project.tagsFr) return project.tagsFr
    return project.tags || []
  }

  return (
    <section className="py-20 lg:py-24 relative group/section overflow-hidden bg-brand-dark text-start">
      {/* Background Ambient Glow */}
      <div className="absolute right-0 top-1/3 w-[480px] h-[480px] bg-brand-orange/[0.04] blur-[160px] rounded-full pointer-events-none" />

      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 lg:mb-16 gap-6">
          <div className="space-y-3.5 max-w-2xl text-start">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/25 bg-brand-secondary text-brand-orange text-xs font-bold uppercase tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
              <span>{isAr ? 'قصص نجاح رقمية حقيقية' : isFr ? 'Études de cas réelles' : 'Proven Digital Success'}</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, x: isAr ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={
                isAr
                  ? 'font-cairo font-extrabold text-3xl sm:text-4xl lg:text-[2.65rem] text-text-primary leading-[1.25]'
                  : 'font-syne font-bold text-3xl sm:text-4xl lg:text-[2.6rem] text-text-primary leading-[1.14] tracking-tight'
              }
            >
              {t('title')}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, x: isAr ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base text-text-muted leading-relaxed font-normal"
            >
              {t('subtitle')}
            </motion.p>
          </div>
          
          <Link href="/portfolio">
            <Button 
              variant="outline" 
              className="h-11 px-6 rounded-xl border-white/12 bg-brand-secondary/75 hover:bg-brand-secondary hover:border-brand-orange/45 font-bold text-xs sm:text-sm group gap-2 text-text-primary"
            >
              <span>{t('viewAll')}</span>
              <ArrowUpRight className="w-4 h-4 text-brand-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:group-hover:-translate-x-0.5" />
            </Button>
          </Link>
        </div>

        {/* 3 Real Portfolio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch">
          {latestProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group relative rounded-[1.5rem] overflow-hidden bg-brand-secondary/85 border border-white/[0.08] hover:border-brand-orange/35 transition-all duration-300 hover:-translate-y-0.5 shadow-[0_14px_38px_rgba(0,0,0,0.3)] flex flex-col h-full"
            >
              <Link href={`/portfolio/${project.slug}`} className="flex flex-col h-full">
                {/* Project Image Frame */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-brand-dark">
                  <img 
                    src={project.img} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary via-brand-dark/15 to-transparent" />
                  
                  {/* Category Pill Top Start */}
                  <div className="absolute top-4 start-4 z-10">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-text-primary bg-brand-dark/85 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                      <Layers className="w-3 h-3 text-brand-orange" />
                      {getCategoryLabel(project)}
                    </span>
                  </div>

                  {/* Measurable Result Badge Top End (If available) */}
                  {project.metrics && (
                    <div className="absolute top-4 end-4 z-10">
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-400 bg-brand-dark/90 border border-emerald-500/30 px-2.5 py-1 rounded-full backdrop-blur-md">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        {project.metrics}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Content Card Body */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-5">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-brand-orange transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <div className="w-9 h-9 rounded-xl bg-brand-dark border border-white/10 flex items-center justify-center shrink-0 text-text-primary group-hover:bg-brand-orange group-hover:text-white transition-all duration-200">
                        <ArrowUpRight className="w-4 h-4 rtl:scale-x-[-1]" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-2">
                      {getHighlight(project)}
                    </p>
                  </div>

                  {/* Capabilities / Service Tags */}
                  <div className="pt-3.5 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {getProjectTags(project).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-[11px] font-semibold text-text-primary/80 bg-brand-dark/80 border border-white/[0.07] px-2.5 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
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
