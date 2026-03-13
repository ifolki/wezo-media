'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  FolderKanban, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Link } from '@/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import RequestServiceModal from '@/components/shared/RequestServiceModal'

export default function ProjectsPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'

  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const resp = await fetch('/api/projects/my')
        const data = await resp.json()
        setProjects(data.projects || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      case 'IN_PROGRESS': return 'bg-brand-orange/10 text-brand-orange border-brand-orange/20'
      case 'REVIEW': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'COMPLETED': return 'bg-green-500/10 text-green-400 border-green-500/20'
      default: return 'bg-gray-500/10 text-gray-400'
    }
  }

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
          <h1 className="text-3xl font-black text-white">{isAr ? 'مشاريعي' : 'My Projects'}</h1>
          <p className="text-text-muted font-medium">
            {isAr ? 'متابعة حالة وتفاصيل مشاريعك الحالية والسابقة' : 'Track the status and details of your current and past projects'}
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="relative flex-grow max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors rtl:left-auto rtl:right-4" />
          <Input 
            placeholder={isAr ? 'البحث عن مشروع...' : 'Search projects...'} 
            className="h-14 bg-white/5 border-white/10 ps-12 rtl:ps-4 rtl:pe-12 rounded-2xl text-white placeholder:text-white/20 focus:border-brand-orange/50 transition-all text-lg"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-14 px-6 rounded-2xl border-white/5 bg-white/5 gap-2 font-bold">
            <Filter className="w-5 h-5" />
            {isAr ? 'تصفية' : 'Filter'}
          </Button>
          <RequestServiceModal>
            <Button className="h-14 px-8 rounded-2xl gradient-brand font-black text-lg gap-2 shadow-lg shadow-brand-orange/20">
              <Plus className="w-6 h-6" />
              {isAr ? 'مشروع جديد' : 'New Project'}
            </Button>
          </RequestServiceModal>
        </div>
      </div>

      {/* Projects Content */}
      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-[3.5rem] border-2 border-dashed border-white/5 p-20 lg:p-32 text-center space-y-8 glass-card"
        >
          <div className="w-24 h-24 rounded-[2rem] bg-white/5 mx-auto flex items-center justify-center animate-float">
            <FolderKanban className="w-12 h-12 text-text-muted" />
          </div>
          <div className="space-y-3 max-w-md mx-auto">
            <h3 className="text-2xl font-black text-white">{isAr ? 'لا توجد مشاريع نشطة' : 'No active projects'}</h3>
            <p className="text-text-muted text-lg leading-relaxed">
              {isAr ? 'ابدأ بتحويل فكرتك إلى واقع، اطلب خدمتك الأولى الآن وسنبهرك بالنتيجة.' : 'Start turning your idea into reality, request your first service now and we will amaze you.'}
            </p>
          </div>
          <RequestServiceModal>
            <Button size="lg" className="gradient-brand h-16 px-10 rounded-2xl font-black text-xl shadow-2xl shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
              {isAr ? 'اطلب مشروعك الأول' : 'Request Your First Project'}
            </Button>
          </RequestServiceModal>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6 px-2">
           {projects.map((project: any, i: number) => (
             <motion.div
               key={project.id}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.05 }}
             >
               <Link href={`/dashboard/projects/${project.id}`}>
                 <Card className="glass-card border-white/5 hover:border-brand-orange/20 transition-all p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
                   <div className="flex items-start md:items-center gap-6 w-full md:w-auto">
                     <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-brand-orange/5 transition-colors">
                       <FolderKanban className="w-8 h-8 text-brand-orange" />
                     </div>
                     <div className="space-y-2">
                       <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors leading-tight">{project.title}</h3>
                       <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                         <span className="flex items-center gap-1.5 text-text-muted bg-white/5 px-2.5 py-1.5 rounded-lg">
                           <FolderKanban className="w-3.5 h-3.5 text-brand-pink" />
                           {project.service?.nameAr || project.serviceId || 'Service'}
                         </span>
                         <span className="flex items-center gap-1.5 text-text-muted bg-white/5 px-2.5 py-1.5 rounded-lg">
                           <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                           {new Date(project.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                         </span>
                       </div>
                     </div>
                   </div>

                   <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6 border-t md:border-t-0 border-white/5 pt-4 md:pt-0 mt-2 md:mt-0">
                     <Badge className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shrink-0 ${
                       project.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                       project.status === 'IN_PROGRESS' ? 'bg-brand-orange/10 text-brand-orange border-brand-orange/20 animate-pulse' :
                       project.status === 'REVIEW' ? 'bg-brand-pink/10 text-brand-pink border-brand-pink/20' :
                       'bg-white/5 text-text-muted border-white/10'
                     }`}>
                       {project.status === 'COMPLETED' && <CheckCircle2 className="w-3 h-3 inline-block mx-1" />}
                       {project.status === 'IN_PROGRESS' && <Loader2 className="w-3 h-3 inline-block mx-1 animate-spin" />}
                       {project.status === 'REVIEW' && <AlertCircle className="w-3 h-3 inline-block mx-1" />}
                       {project.status === 'PENDING' && <Clock className="w-3 h-3 inline-block mx-1" />}
                       {isAr ? (
                         project.status === 'PENDING' ? 'في الانتظار' :
                         project.status === 'IN_PROGRESS' ? 'قيد التنفيذ' :
                         project.status === 'COMPLETED' ? 'مكتمل' : project.status
                       ) : project.status}
                     </Badge>
                     <Button variant="ghost" size="icon" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-brand-orange hover:text-white transition-all">
                       <ArrowRight className="w-6 h-6 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                     </Button>
                   </div>
                 </Card>
               </Link>
             </motion.div>
           ))}
        </div>
      )}
    </div>
  )
}
