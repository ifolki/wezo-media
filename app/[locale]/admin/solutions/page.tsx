'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  Plus, 
  Trash2, 
  Settings,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import SolutionModal from '@/components/admin/SolutionModal'

export default function AdminSolutionsPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'

  const [solutions, setSolutions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSolution, setSelectedSolution] = useState<any>(null)

  useEffect(() => {
    fetchSolutions()
  }, [])

  async function fetchSolutions() {
    try {
      const resp = await fetch('/api/admin/solutions')
      if (resp.ok) {
        const data = await resp.json()
        setSolutions(data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (id: string, current: boolean) => {
    try {
      const resp = await fetch(`/api/admin/solutions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current })
      })
      if (resp.ok) {
        toast.success('Solution status updated')
        fetchSolutions()
      }
    } catch (e) {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm(isAr ? 'هل أنت متأكد من الحذف؟' : 'Are you sure you want to delete?')) return
    try {
      const resp = await fetch(`/api/admin/solutions/${id}`, { method: 'DELETE' })
      if (resp.ok) {
        toast.success('Solution deleted successfully')
        fetchSolutions()
      }
    } catch (e) {
      toast.error('Failed to delete solution')
    }
  }

  const openEdit = (sol: any) => {
    setSelectedSolution(sol)
    setIsModalOpen(true)
  }

  const openNew = () => {
    setSelectedSolution(null)
    setIsModalOpen(true)
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">
            {isAr ? 'إدارة الحلول الرقمية' : 'Manage Digital Solutions'}
          </h1>
          <p className="text-text-muted mt-1">
            {isAr ? 'إعداد الحزم والحلول الاستراتيجية الموجهة للعملاء' : 'Configure strategic bundles and outcomes for clients'}
          </p>
        </div>

        <Button onClick={openNew} className="gradient-brand font-black rounded-2xl h-12 px-6 gap-2">
          <Plus className="w-5 h-5" />
          <span>{isAr ? 'إضافة حل تجاري' : 'Add Solution'}</span>
        </Button>
      </div>

      {solutions.length === 0 ? (
        <Card className="p-12 text-center bg-brand-card/30 border-white/5 rounded-3xl">
          <p className="text-text-muted">{isAr ? 'لم يتم إضافة أي حلول تجارية بعد.' : 'No digital solutions configured yet.'}</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((sol) => (
            <motion.div key={sol.id} layout>
              <Card className="p-8 bg-brand-card/50 border-white/5 rounded-[2rem] hover:border-white/10 transition-all flex flex-col justify-between h-full gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {isAr ? sol.nameAr : sol.nameEn}
                      </h3>
                      <span className="text-xs font-mono text-brand-orange">/{sol.slug}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" onClick={() => openEdit(sol)} className="h-9 w-9 text-text-muted hover:text-white hover:bg-white/5 rounded-xl">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(sol.id)} className="h-9 w-9 text-text-muted hover:text-red-500 hover:bg-red-500/5 rounded-xl">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-text-muted text-sm line-clamp-3">
                    {isAr ? sol.descriptionAr : sol.descriptionEn}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="outline" className="border-white/10 text-text-muted rounded-lg font-bold">
                      {isAr ? `${sol.services?.length || 0} خدمات` : `${sol.services?.length || 0} Services`}
                    </Badge>
                    {sol.isFeatured && (
                      <Badge className="bg-brand-pink/10 text-brand-pink border-brand-pink/20 rounded-lg font-bold">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {isAr ? 'مميز' : 'Featured'}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={sol.isActive}
                      onCheckedChange={() => toggleStatus(sol.id, sol.isActive)}
                    />
                    <span className="text-xs text-text-muted font-bold">
                      {sol.isActive ? (isAr ? 'نشط' : 'Active') : (isAr ? 'معطل' : 'Inactive')}
                    </span>
                  </div>
                  
                  <span className="text-xs text-text-muted">
                    {isAr ? `الترتيب: ${sol.order}` : `Order: ${sol.order}`}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <SolutionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchSolutions}
        solution={selectedSolution}
      />
    </div>
  )
}
