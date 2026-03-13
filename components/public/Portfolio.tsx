'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'

const projects = [
  { id: 1, category: 'Production', title: 'Music Video Production', img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800' },
  { id: 2, category: 'Marketing', title: 'Brand Identity Design', img: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=800' },
  { id: 3, category: 'Web', title: 'Artist Portfolio Website', img: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800' },
]

export default function FeaturedPortfolio() {
  const t = useTranslations('portfolio')

  return (
    <section className="py-32 relative group/section overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4 max-w-2xl text-start">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black text-white"
            >
              {t('title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-text-muted"
            >
              {t('subtitle')}
            </motion.p>
          </div>
          
          <Link href="/portfolio">
            <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/10 hover:bg-white/5 font-bold text-lg group gap-2">
              <span>{t('viewAll')}</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform rtl:group-hover:-translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img 
                src={project.img} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                alt={project.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />
              
              <div className="absolute bottom-0 inset-x-0 p-10 space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-start">
                <span className="inline-block text-sm font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-4 py-2 rounded-full backdrop-blur-md">
                  {project.category}
                </span>
                <h3 className="text-3xl font-black text-white leading-tight">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
