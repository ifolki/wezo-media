
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Package, 
  Plus, 
  Settings,
  Eye,
  EyeOff,
  Trash2,
  GripVertical,
  Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

export default function AdminServicesPage() {
  const t = useTranslations('dashboard')
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const isAr = t('welcome') === 'أهلاً بك'

  useEffect(() => {
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
    fetchServices()
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
        <div>
          <h1 className="text-3xl font-black text-white">{t('admin.packages')}</h1>
          <p className="text-text-muted mt-2">{isAr ? 'إدارة الخدمات المعروضة على المنصة.' : 'Manage available services on the platform.'}</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl gradient-brand font-black text-lg gap-2 shadow-lg">
          <Plus className="w-6 h-6" />
          {isAr ? 'إضافة خدمة' : 'Add Service'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.length > 0 ? (
          services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="glass-card border-white/5 p-6 hover:border-brand-orange/20 transition-all group flex items-center gap-6">
                <div className="cursor-grab active:cursor-grabbing text-white/10 hover:text-white/40 transition-colors">
                  <GripVertical className="w-6 h-6" />
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                  <Package className="w-8 h-8 text-brand-orange" />
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-white">{isAr ? service.nameAr : service.nameEn}</h3>
                    <span className="text-[10px] bg-white/5 text-text-muted px-2 py-0.5 rounded uppercase tracking-tighter">
                      {service.category}
                    </span>
                  </div>
                  <p className="text-text-muted text-sm line-clamp-1 mt-1">
                    {isAr ? service.descAr : service.descEn}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-1">
                    <Switch checked={service.isActive} />
                    <span className="text-[8px] font-black uppercase text-text-muted">
                      {service.isActive ? (isAr ? 'نشط' : 'Active') : (isAr ? 'مخفي' : 'Hidden')}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-white/10">
                      <Settings className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white/[0.01] rounded-[3rem] border-2 border-dashed border-white/5">
            <p className="text-text-muted text-lg">{isAr ? 'لا توجد خدمات.' : 'No services found.'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
