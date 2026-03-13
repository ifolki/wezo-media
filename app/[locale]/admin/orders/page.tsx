
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  FolderKanban, 
  Search, 
  Filter,
  MoreVertical,
  Calendar,
  User,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Link } from '@/navigation'

export default function AdminOrdersPage() {
  const t = useTranslations('dashboard')
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const isAr = t('welcome') === 'أهلاً بك'

  useEffect(() => {
    async function fetchProjects() {
      try {
        const resp = await fetch('/api/admin/projects')
        if (resp.ok) {
          const data = await resp.json()
          setProjects(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10 text-start">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-3xl font-black text-white">{t('admin.orders')}</h1>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <Input 
            placeholder={isAr ? 'البحث عن طلب...' : 'Search orders...'} 
            className="h-12 bg-white/5 border-white/5 ps-12 rounded-xl focus:border-brand-orange/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.length > 0 ? (
          projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="glass-card border-white/5 p-6 hover:border-brand-orange/20 transition-all group">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                      <FolderKanban className="w-8 h-8 text-brand-orange" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-orange transition-colors">{project.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-text-muted text-sm">
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          {project.client.name}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-end hidden sm:block">
                      <p className="text-white font-black">{project.budget ? `$${project.budget}` : (isAr ? 'لم يحدد' : 'Not set')}</p>
                      <p className="text-text-muted text-xs uppercase tracking-widest">{project.priority}</p>
                    </div>
                    <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                      project.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' :
                      project.status === 'IN_PROGRESS' ? 'bg-brand-orange/10 text-brand-orange' :
                      'bg-white/5 text-text-muted'
                    }`}>
                      {project.status}
                    </span>
                    <Link href={`/admin/orders/${project.id}`}>
                      <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-brand-orange hover:text-white transition-all">
                        <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white/[0.01] rounded-[3rem] border-2 border-dashed border-white/5">
            <p className="text-text-muted text-lg">{isAr ? 'لا توجد طلبات بعد.' : 'No orders yet.'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
