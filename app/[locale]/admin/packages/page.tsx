'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  Package, 
  Plus, 
  Search, 
  Settings, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Edit2,
  Trash2,
  Loader2,
  DollarSign
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import PackageModal from '@/components/admin/PackageModal'

export default function PackagesPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPkg, setSelectedPkg] = useState<any>(null)

  useEffect(() => {
    fetchPackages()
  }, [])

  async function fetchPackages() {
    try {
      const resp = await fetch('/api/admin/packages')
      if (resp.ok) {
        const data = await resp.json()
        setPackages(data)
      }
    } catch (e) {
      toast.error('Failed to load packages')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (pkg: any) => {
    setSelectedPkg(pkg)
    setIsModalOpen(true)
  }

  const handleNew = () => {
    setSelectedPkg(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return
    try {
      const resp = await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' })
      if (resp.ok) {
        toast.success('Package deleted')
        fetchPackages()
      }
    } catch (e) {
      toast.error('Failed to delete package')
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
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1 text-start">
          <h1 className="text-3xl font-black text-white">{t('admin.packages')}</h1>
          <p className="text-text-muted font-medium">
            {isAr ? 'إدارة باقات التسعير والميزات لكل خدمة' : 'Manage pricing packages and features for each service'}
          </p>
        </div>
        <Button 
          onClick={handleNew}
          className="gradient-brand h-14 px-8 rounded-2xl font-black text-lg gap-2 shadow-lg shadow-brand-orange/20"
        >
          <Plus className="w-6 h-6" />
          {isAr ? 'باقة جديدة' : 'New Package'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 px-2">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="glass-card border-white/5 p-6 hover:border-brand-pink/20 transition-all group flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-brand-pink/5 transition-colors">
                <Package className="w-10 h-10 text-brand-pink/50" />
              </div>

              <div className="flex-grow space-y-3 text-start">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-black text-white">{isAr ? pkg.nameAr : pkg.nameEn}</h3>
                  {pkg.isPopular && (
                    <Badge className="bg-brand-pink text-white font-black px-3 py-1 animate-pulse">
                      {isAr ? 'الأكثر طلباً' : 'Popular'}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[10px] text-text-muted border-white/10 uppercase tracking-widest font-bold">
                    {isAr ? pkg.service?.nameAr : pkg.service?.nameEn}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {(pkg.features as string[] || []).slice(0, 3).map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-text-muted text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-green-400/50" />
                      {f}
                    </div>
                  ))}
                  {(pkg.features as string[] || []).length > 3 && (
                    <span className="text-brand-orange text-xs font-bold">
                      +{(pkg.features as string[] || []).length - 3} {isAr ? 'أكثر' : 'more'}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-10">
                <div className="text-center md:text-end">
                   <p className="text-3xl font-black text-white">{pkg.price} <span className="text-sm text-text-muted uppercase">{pkg.currency}</span></p>
                   <p className="text-[10px] text-text-muted font-black uppercase tracking-widest mt-1">{isAr ? 'سعر الباقة' : 'Package Price'}</p>
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEdit(pkg)}
                    className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  >
                    <Edit2 className="w-6 h-6" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDelete(pkg.id)}
                    className="w-14 h-14 rounded-2xl bg-red-500/5 border border-red-500/10 text-red-500/50 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {packages.length === 0 && (
          <div className="text-center py-40 glass-card rounded-[3.5rem] border-2 border-dashed border-white/5">
             <Package className="w-16 h-16 text-text-muted/20 mx-auto mb-6" />
             <p className="text-xl font-bold text-text-muted">{isAr ? 'لا توجد باقات حالياً' : 'No packages found'}</p>
          </div>
        )}
      </div>

      <PackageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPackages}
        pkg={selectedPkg}
      />
    </div>
  )
}
