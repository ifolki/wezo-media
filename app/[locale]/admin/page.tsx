'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  FolderKanban, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Users,
  DollarSign,
  Package,
  Loader2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'

export default function AdminOverview() {
  const t = useTranslations('dashboard')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const resp = await fetch('/api/admin/stats')
        if (resp.ok) {
          const json = await resp.json()
          setData(json)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const locale = useLocale()
  const isAr = locale === 'ar'

  const stats = [
    { label: t('admin.users'), value: (!data || data.dbOffline) ? (isAr ? 'غير متوفر' : 'Unavailable') : (data.users ?? 0), icon: Users, color: '#FF6B2B' },
    { label: t('admin.orders'), value: (!data || data.dbOffline) ? (isAr ? 'غير متوفر' : 'Unavailable') : (data.projects ?? 0), icon: FolderKanban, color: '#FF2D78' },
    { label: t('admin.finances'), value: (!data || data.dbOffline) ? (isAr ? 'غير متوفر' : 'Unavailable') : `$${data.revenue ?? 0}`, icon: DollarSign, color: '#4ADE80' },
    { label: t('admin.packages'), value: (!data || data.dbOffline) ? (isAr ? 'غير متوفر' : 'Unavailable') : (data.pending ?? 0), icon: AlertCircle, color: '#60A5FA' },
  ]

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-10 pb-10 text-start">
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
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-white">{t('admin.orders')}</h2>
            <Link href="/admin/orders">
              <Button variant="ghost" className="text-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 font-bold gap-2">
                 {isAr ? 'عرض الكل' : 'View All'}
                 <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
             {/* Empty State */}
             <div className="rounded-[2.5rem] border-2 border-dashed border-white/5 p-20 text-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-white/5 mx-auto flex items-center justify-center">
                   <FolderKanban className="w-10 h-10 text-text-muted" />
                </div>
                <div className="space-y-2">
                   <p className="text-xl font-bold text-white">{isAr ? 'لا توجد مشاريع حالياً' : 'No projects yet'}</p>
                </div>
                <Link href="/admin/orders">
                    <Button className="gradient-brand h-14 px-8 rounded-2xl font-black text-lg">
                       {isAr ? 'إدارة الطلبات' : 'Manage Orders'}
                    </Button>
                 </Link>
             </div>
          </div>
        </div>

        {/* Sidebar Widget */}
        <div className="space-y-8">
           <Card className="glass-card border-brand-orange/20 overflow-hidden text-start">
              <CardHeader className="gradient-brand text-white p-8">
                 <CardTitle className="text-xl font-black">{isAr ? 'إجراءات سريعة' : 'Quick Actions'}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                 <Button className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold justify-start px-6 gap-4">
                    <Users className="w-5 h-5 text-brand-orange" />
                    {isAr ? 'إضافة مستخدم' : 'Add User'}
                 </Button>
                 <Button className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold justify-start px-6 gap-4">
                    <Package className="w-5 h-5 text-brand-orange" />
                    {isAr ? 'إضافة خدمة' : 'Add Service'}
                 </Button>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  )
}
