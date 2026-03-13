
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
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white">{t('admin.orders')}</h1>
          <p className="text-text-muted font-medium">
            {isAr ? 'إدارة ومتابعة طلبات ومشاريع العملاء' : 'Manage and track client orders and projects'}
          </p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors rtl:left-auto rtl:right-4" />
            <Input 
              placeholder={isAr ? 'البحث عن مشروع...' : 'Search projects...'} 
              className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-white placeholder:text-white/20 focus:border-brand-orange/50 transition-all text-lg"
            />
          </div>
          <Button variant="outline" className="h-14 px-6 rounded-2xl border-white/10 bg-white/5 text-white font-bold gap-2">
            <Filter className="w-5 h-5 text-brand-pink" />
            <span className="hidden sm:inline">{isAr ? 'تصفية' : 'Filter'}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-2">
        {projects.length > 0 ? (
          projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="glass-card border-white/5 p-6 hover:border-brand-orange/20 transition-all group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
                <div className="flex items-start md:items-center gap-6 w-full md:w-auto">
                  <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-brand-orange/5 transition-colors">
                    <FolderKanban className="w-8 h-8 text-brand-orange" />
                  </div>
                  <div className="space-y-2 text-start">
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-orange transition-colors leading-tight">{project.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                      <span className="flex items-center gap-1.5 text-text-muted bg-white/5 px-2 py-1 rounded-lg">
                        <User className="w-3.5 h-3.5 text-brand-pink" />
                        {project.client?.name || 'Unknown'}
                      </span>
                      <span className="flex items-center gap-1.5 text-text-muted bg-white/5 px-2 py-1 rounded-lg">
                        <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                        {new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8 border-t md:border-t-0 border-white/5 pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="text-center md:text-end hidden sm:block">
                    <p className="text-xl font-black text-white">{project.budget ? `$${project.budget}` : (isAr ? 'لم يحدد' : 'Not set')}</p>
                    <p className="text-text-muted text-[10px] uppercase tracking-widest font-bold mt-1">{project.priority || 'MEDIUM'}</p>
                  </div>
                  
                  <Badge className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shrink-0 ${
                    project.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                    project.status === 'IN_PROGRESS' ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20' :
                    project.status === 'REVIEW' ? 'bg-brand-pink/10 text-brand-pink border-brand-pink/20' :
                    'bg-white/5 text-text-muted border-white/10'
                  }`}>
                    {project.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3 inline-block mx-1" />}
                    {project.status === 'IN_PROGRESS' && <Loader2 className="w-3 h-3 inline-block mx-1 animate-spin" />}
                    {project.status === 'REVIEW' && <AlertCircle className="w-3 h-3 inline-block mx-1" />}
                    {project.status === 'PENDING' && <Clock className="w-3 h-3 inline-block mx-1" />}
                    {project.status}
                  </Badge>

                  <Link href={`/admin/orders/${project.id}`}>
                    <Button variant="ghost" size="icon" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-brand-orange hover:text-white transition-all">
                      <ArrowRight className="w-6 h-6 rtl:rotate-180" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-40 glass-card rounded-[3.5rem] border-2 border-dashed border-white/5 flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 flex items-center justify-center">
              <FolderKanban className="w-12 h-12 text-text-muted/30" />
            </div>
            <p className="text-xl font-bold text-text-muted">{isAr ? 'لا توجد مشاريع بعد.' : 'No projects yet.'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
