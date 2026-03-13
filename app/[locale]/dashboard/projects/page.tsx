'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  FolderKanban, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  CheckCircle2
} from 'lucide-react'
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
  const isAr = t('welcome') === 'أهلاً بك'

  // Placeholder data
  const projects: any[] = []

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
      case 'IN_PROGRESS': return 'bg-brand-orange/10 text-brand-orange border-brand-orange/20'
      case 'REVIEW': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'COMPLETED': return 'bg-green-500/10 text-green-400 border-green-500/20'
      default: return 'bg-gray-500/10 text-gray-400'
    }
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative flex-grow max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors rtl:left-auto rtl:right-4" />
          <Input 
            placeholder={isAr ? 'البحث عن مشروع...' : 'Search projects...'} 
            className="h-14 bg-white/5 border-white/5 ps-12 rtl:ps-4 rtl:pe-12 rounded-2xl focus:border-brand-orange/50 transition-all"
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
          className="rounded-[3rem] border-2 border-dashed border-white/5 p-32 text-center space-y-8 bg-white/[0.01]"
        >
          <div className="w-24 h-24 rounded-[2rem] bg-white/5 mx-auto flex items-center justify-center animate-float">
            <FolderKanban className="w-12 h-12 text-text-muted" />
          </div>
          <div className="space-y-3 max-w-md mx-auto">
            <h3 className="text-2xl font-black text-white">{isAr ? 'لا توجد مشاريع نشطة' : 'No active projects'}</h3>
            <p className="text-text-muted text-lg">
              {isAr ? 'ابدأ بتحويل فكرتك إلى واقع، اطلب خدمتك الأولى الآن وسنبهرك بالنتيجة.' : 'Start turning your idea into reality, request your first service now and we will amaze you.'}
            </p>
          </div>
          <RequestServiceModal>
            <Button size="lg" className="gradient-brand h-16 px-10 rounded-2xl font-black text-xl shadow-2xl">
              {isAr ? 'اطلب مشروعك الأول' : 'Request Your First Project'}
            </Button>
          </RequestServiceModal>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* List existing projects here when data is available */}
        </div>
      )}
    </div>
  )
}
