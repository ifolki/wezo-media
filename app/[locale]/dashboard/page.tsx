'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  FolderKanban, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import RequestServiceModal from '@/components/shared/RequestServiceModal'

export default function DashboardOverview() {
  const t = useTranslations('dashboard')
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAr = t('welcome') === 'أهلاً بك'

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch('/api/projects/my')
        const json = await resp.json()
        setData(json)
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const stats = [
    { label: t('my_projects'), value: data?.stats?.total || 0, icon: FolderKanban, color: '#FF6B2B' },
    { label: t('status.in_progress'), value: data?.stats?.inProgress || 0, icon: Clock, color: '#FF2D78' },
    { label: t('status.completed'), value: data?.stats?.completed || 0, icon: CheckCircle2, color: '#4ADE80' },
    { label: t('status.pending'), value: data?.stats?.pending || 0, icon: AlertCircle, color: '#60A5FA' },
  ]

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  const recentProjects = data?.projects?.slice(0, 5) || []

  return (
    <div className="space-y-10 pb-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-card border-white/5 hover:border-white/10 transition-all group overflow-hidden relative">
              <div 
                className="absolute top-0 left-0 w-1 h-full" 
                style={{ backgroundColor: stat.color }}
              />
              <CardContent className="p-8 flex items-center justify-between">
                <div className="space-y-2 text-start">
                  <p className="text-text-muted font-bold text-sm uppercase tracking-wider">{stat.label}</p>
                  <p className="text-4xl font-black text-white">{stat.value}</p>
                </div>
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Projects */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-white">{t('my_projects')}</h2>
            <Link href="/dashboard/projects">
              <Button variant="ghost" className="text-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 font-bold gap-2">
                 {isAr ? 'عرض الكل' : 'View All'}
                 <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
             {recentProjects.length > 0 ? (
                recentProjects.map((project: any, i: number) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link href={`/dashboard/projects/${project.id}`}>
                      <Card className="glass-card border-white/5 hover:border-brand-orange/20 transition-all group p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                              <FolderKanban className="w-7 h-7 text-brand-orange" />
                            </div>
                            <div className="text-start">
                              <h3 className="text-lg font-bold text-white group-hover:text-brand-orange transition-colors">{project.title}</h3>
                              <p className="text-text-muted text-sm">{project.service?.nameAr || project.serviceId}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                              project.status === 'COMPLETED' ? 'bg-green-500/10 text-green-500' :
                              project.status === 'IN_PROGRESS' ? 'bg-brand-orange/10 text-brand-orange animate-pulse' :
                              'bg-white/5 text-text-muted'
                            }`}>
                              {isAr ? (
                                project.status === 'PENDING' ? 'في الانتظار' :
                                project.status === 'IN_PROGRESS' ? 'قيد التنفيذ' :
                                project.status === 'COMPLETED' ? 'مكتمل' : project.status
                              ) : project.status}
                            </span>
                            <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-brand-orange transition-all group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))
             ) : (
                /* Empty State */
                <div className="rounded-[2.5rem] border-2 border-dashed border-white/5 p-20 text-center space-y-6">
                   <div className="w-20 h-20 rounded-3xl bg-white/5 mx-auto flex items-center justify-center">
                      <FolderKanban className="w-10 h-10 text-text-muted" />
                   </div>
                   <div className="space-y-2">
                      <p className="text-xl font-bold text-white">{isAr ? 'لا توجد مشاريع حالياً' : 'No projects yet'}</p>
                      <p className="text-text-muted">{isAr ? 'ابدأ رحلتك معنا بطلب أول خدمة لك الآن.' : 'Start your journey with us by requesting your first service.'}</p>
                   </div>
                   <RequestServiceModal>
                      <Button className="gradient-brand h-14 px-8 rounded-2xl font-black text-lg">
                         {isAr ? 'اطلب خدمة الآن' : 'Request Service Now'}
                      </Button>
                   </RequestServiceModal>
                </div>
             )}
          </div>
        </div>

        {/* Sidebar Widget */}
        <div className="space-y-8">
           <Card className="glass-card border-brand-orange/20 overflow-hidden text-start">
              <CardHeader className="gradient-brand text-white p-8">
                 <CardTitle className="text-xl font-black">{isAr ? 'تحتاج مساعدة؟' : 'Need Help?'}</CardTitle>
                 <p className="text-white/80 text-sm font-medium mt-2">
                   {isAr ? 'مدير حسابك متاح للرد على أي استفسار.' : 'Your account manager is available to answer any questions.'}
                 </p>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                 <Button className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold">
                    {isAr ? 'تواصل معنا' : 'Contact Us'}
                 </Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
