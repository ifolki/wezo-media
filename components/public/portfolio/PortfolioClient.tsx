'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Play, ExternalLink } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import { portfolioProjects } from '@/lib/config/portfolio'
import { useLocale } from 'next-intl'

const categories = [
  { id: 'all', label_ar: 'الكل', label_fr: 'Tous', label_en: 'All' },
  { id: 'marketing', label_ar: 'تسويق', label_fr: 'Marketing', label_en: 'Marketing' },
  { id: 'web', label_ar: 'ويب', label_fr: 'Web', label_en: 'Web' },
  { id: 'music', label_ar: 'موسيقى', label_fr: 'Musique', label_en: 'Music' },
  { id: 'video', label_ar: 'فيديو', label_fr: 'Vidéo', label_en: 'Video' },
]

export default function PortfolioClient() {
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = portfolioProjects.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory
    const matchesQuery =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())))
    return matchesCat && matchesQuery
  })

  const headingText = isAr
    ? 'معرض الأعمال ودراسات الحالة'
    : isFr
    ? 'Nos Réalisations & Études de Cas'
    : 'Our Portfolio & Case Studies'

  const subtitleText = isAr
    ? 'نشارككم قصص النجاح والمشاريع التي نفخر بإنجازها لعملائنا في المغرب.'
    : isFr
    ? 'Découvrez une sélection de nos réalisations et projets concrets accompagnés par WEZO MEDIA.'
    : 'Explore our selected projects, case deliverables, and growth achievements in Morocco.'

  const searchPlaceholder = isAr
    ? 'ابحث في المشاريع أو المجالات...'
    : isFr
    ? 'Rechercher un projet ou un domaine...'
    : 'Search projects or categories...'

  return (
    <main className="min-h-screen pb-20">
      <section className="py-20 bg-brand-secondary/30">
        <div className="container mx-auto px-4 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-bold text-sm uppercase tracking-widest mb-2"
          >
            PORTFOLIO
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={
              isAr
                ? 'font-cairo font-black text-4xl sm:text-5xl md:text-6xl text-white'
                : 'font-syne font-bold text-4xl sm:text-5xl md:text-6xl text-white'
            }
          >
            {headingText}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
          >
            {subtitleText}
          </motion.p>
        </div>
      </section>

      <section className="py-8 sticky top-20 z-30 bg-brand-dark/90 backdrop-blur-lg border-b border-white/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => {
              const label = isAr ? cat.label_ar : isFr ? cat.label_fr : cat.label_en
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 sm:px-6 py-2 rounded-full font-bold text-sm transition-all ${
                    activeCategory === cat.id
                      ? 'gradient-brand text-white shadow-lg'
                      : 'glass-card text-text-muted hover:text-white'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-10 bg-brand-card border-white/10 text-white rounded-xl focus:border-brand-orange"
              placeholder={searchPlaceholder}
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const categoryLabel = isAr
                  ? project.categoryLabelAr
                  : isFr
                  ? project.categoryLabelFr
                  : project.categoryLabelEn

                return (
                  <Link key={project.id} href={project.slug ? `/portfolio/${project.slug}` : '#'}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="group relative h-80 overflow-hidden rounded-[2rem] glass-card cursor-pointer"
                    >
                      <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex flex-col justify-end p-7 text-start space-y-1.5 translate-y-3 group-hover:translate-y-0 transition-transform">
                        <span className="text-brand-orange text-xs font-bold uppercase tracking-wider">
                          {categoryLabel}
                        </span>
                        <h3 className="text-2xl font-black text-white">{project.title}</h3>
                        <p className="text-xs text-text-muted line-clamp-1">
                          {isAr ? project.highlightAr : isFr ? project.highlightFr : project.highlightEn}
                        </p>
                        <div className="flex justify-end gap-3 pt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                            <Play className="w-4 h-4 fill-current" />
                          </Button>
                          <Button size="icon" className="rounded-full bg-white/10 hover:bg-white/20">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  )
}
