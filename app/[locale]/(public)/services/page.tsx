'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Link } from '@/navigation'
import { Music, Video, Megaphone, Globe, Disc, Users, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const services = [
  { id: 'audio', icon: Music, color: '#FF6B2B', category: 'production' },
  { id: 'video', icon: Video, color: '#FF2D78', category: 'production' },
  { id: 'marketing', icon: Megaphone, color: '#4ADE80', category: 'marketing' },
  { id: 'web', icon: Globe, color: '#60A5FA', category: 'development' },
  { id: 'distribution', icon: Disc, color: '#A855F7', category: 'artist' },
  { id: 'artist', icon: Users, color: '#FACC15', category: 'artist' },
]

export default function ServicesPage() {
  const t = useTranslations('services')
  const n = useTranslations('nav')

  return (
    <main className="min-h-screen pb-20">
      {/* Header */}
      <section className="py-20 bg-brand-secondary/30">
        <div className="container mx-auto px-4 text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white"
          >
            {t('title')}
          </motion.h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-10 sticky top-20 z-30 bg-brand-dark/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 items-center justify-between">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList className="bg-brand-card border-white/5">
              <TabsTrigger value="all">كل الخدمات</TabsTrigger>
              <TabsTrigger value="production">الإنتاج</TabsTrigger>
              <TabsTrigger value="marketing">التسويق</TabsTrigger>
              <TabsTrigger value="development">التطوير</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <Input className="pl-10 bg-brand-card border-white/5" placeholder="ابحث عن خدمة..." />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/services/${service.id}`}>
                  <div className="glass-card p-10 rounded-[2.5rem] border-white/5 h-full space-y-6 hover:border-brand-orange/30 transition-all group">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative z-10" style={{ backgroundColor: `${service.color}15` }}>
                      <service.icon className="w-10 h-10" style={{ color: service.color }} />
                      <div className="absolute inset-0 blur-2xl opacity-20" style={{ backgroundColor: service.color }} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-white group-hover:text-brand-orange transition-colors">
                        {t(`categories.${service.id}`)}
                      </h3>
                      <p className="text-text-muted leading-relaxed">
                        نقدم حلولاً احترافية في {t(`categories.${service.id}`)} تضمن لك التميز في السوق الرقمي والوصول لطلبك بأفضل جودة.
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
