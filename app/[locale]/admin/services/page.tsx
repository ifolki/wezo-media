
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  Package, 
  Plus, 
  Settings,
  Eye,
  EyeOff,
  Trash2,
  GripVertical,
  Loader2,
  Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Link } from '@/navigation'
import { toast } from 'sonner'

export default function AdminServicesPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  async function fetchServices() {
    try {
      const resp = await fetch('/api/admin/services')
      if (resp.ok) {
        const data = await resp.json()
        setServices(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (id: string, current: boolean) => {
    try {
      const resp = await fetch(`/api/admin/services/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current })
      })
      if (resp.ok) {
        toast.success('Service status updated')
        fetchServices()
      }
    } catch (e) {
      toast.error('Failed to update status')
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
        <div>
          <h1 className="text-3xl font-black text-white">{t('admin.services')}</h1>
          <p className="text-text-muted mt-2">{isAr ? 'إدارة الخدمات المعروضة على المنصة.' : 'Manage available services on the platform.'}</p>
        </div>
        <Link href="/admin/services/new">
          <Button className="h-14 px-8 rounded-2xl gradient-brand font-black text-lg gap-2 shadow-lg shadow-brand-orange/20 hover:scale-105 active:scale-95 transition-all">
            <Plus className="w-6 h-6" />
            {isAr ? 'إضافة خدمة' : 'Add Service'}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 px-2">
        {services.length > 0 ? (
          services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="glass-card border-white/5 p-6 hover:border-brand-orange/20 transition-all group flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="hidden md:flex cursor-grab active:cursor-grabbing text-white/10 hover:text-white/40 transition-colors">
                  <GripVertical className="w-6 h-6" />
                </div>
                
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-brand-orange/5 transition-colors overflow-hidden">
                  {service.image ? (
                    <img src={service.image} alt={service.nameEn} className="w-full h-full object-cover" />
                  ) : (
                    <Briefcase className="w-10 h-10 text-brand-orange/50" />
                  )}
                </div>

                <div className="flex-grow space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black text-white">{isAr ? service.nameAr : service.nameEn}</h3>
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-text-muted text-[10px] font-bold uppercase tracking-widest px-2">
                      {service.category}
                    </Badge>
                  </div>
                  <p className="text-text-muted text-sm line-clamp-2 leading-relaxed max-w-2xl">
                    {isAr ? service.descAr : service.descEn}
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-8 border-t md:border-t-0 border-white/5 pt-6 md:pt-0">
                  <div className="flex flex-col items-center gap-2">
                    <Switch 
                      checked={service.isActive} 
                      onCheckedChange={() => toggleStatus(service.id, service.isActive)}
                    />
                    <span className="text-[10px] font-black uppercase text-text-muted tracking-tighter">
                      {service.isActive ? (isAr ? 'نشط' : 'Active') : (isAr ? 'مخفي' : 'Hidden')}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link href={`/admin/services/${service.id}`}>
                      <Button variant="ghost" size="icon" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-brand-orange transition-all">
                        <Settings className="w-6 h-6" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="w-14 h-14 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500/50 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 className="w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-40 glass-card rounded-[3.5rem] border-2 border-dashed border-white/5 space-y-6">
            <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 mx-auto flex items-center justify-center">
               <Briefcase className="w-12 h-12 text-text-muted/30" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-black text-white">{isAr ? 'لا توجد خدمات حالياً' : 'No services found'}</p>
              <p className="text-text-muted">{isAr ? 'ابدأ بإضافة أول خدمة لشركتك.' : 'Start by adding your first company service.'}</p>
            </div>
            <Link href="/admin/services/new">
               <Button className="gradient-brand h-14 px-8 rounded-2xl font-black">{isAr ? 'إضافة خدمة' : 'Add Service'}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
