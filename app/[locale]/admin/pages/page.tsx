'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  Globe, 
  Layout, 
  Edit,
  Trash2,
  Plus,
  Loader2
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import PageModal from '@/components/admin/PageModal'

export default function AdminPagesPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const [pages, setPages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState<any>(null)

  useEffect(() => {
    fetchPages()
  }, [])

  async function fetchPages() {
    try {
      const resp = await fetch('/api/admin/pages')
      if (resp.ok) {
        setPages(await resp.json())
      }
    } catch (e) {
      toast.error('Failed to load pages')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (page: any) => {
    setSelectedPage(page)
    setIsModalOpen(true)
  }

  const handleNew = () => {
    setSelectedPage(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return
    try {
      const resp = await fetch(`/api/admin/pages/${id}`, { method: 'DELETE' })
      if (resp.ok) {
        toast.success('Page deleted')
        fetchPages()
      }
    } catch (e) {
      toast.error('Failed to delete page')
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
          <h1 className="text-3xl font-black text-white">{isAr ? 'إدارة الصفحات' : 'Pages Management'}</h1>
          <p className="text-text-muted font-medium">
            {isAr ? 'إدارة محتوى صفحات الموقع الثابتة' : 'Manage static website pages content'}
          </p>
        </div>
        <Button 
          onClick={handleNew}
          className="h-14 px-8 rounded-2xl gradient-brand font-black text-lg gap-2 shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-6 h-6" />
          {isAr ? 'إنشاء صفحة' : 'Create Page'}
        </Button>
      </div>

      <div className="px-2">
        <Card className="glass-card border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="text-text-muted text-[10px] uppercase tracking-widest font-black border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-5 text-start whitespace-nowrap">{isAr ? 'عنوان الصفحة' : 'Page Title'}</th>
                <th className="px-8 py-5 text-start whitespace-nowrap">{isAr ? 'الرابط' : 'URL Path'}</th>
                <th className="px-8 py-5 text-start whitespace-nowrap">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="px-8 py-5 text-start whitespace-nowrap">{isAr ? 'آخر تعديل' : 'Last Edit'}</th>
                <th className="px-8 py-5 text-end whitespace-nowrap"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pages.map((page, i) => (
                <motion.tr
                  key={page.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange/10 transition-colors">
                        <Layout className="w-5 h-5" />
                      </div>
                      <p className="text-white font-bold text-lg group-hover:text-brand-orange transition-colors">
                        {isAr ? page.titleAr : page.titleEn}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-text-muted text-sm font-medium">
                      <Globe className="w-4 h-4 text-brand-pink" />
                      <span dir="ltr">/{page.slug}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                      page.isPublished ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {page.isPublished ? (isAr ? 'منشورة' : 'Published') : (isAr ? 'مسودة' : 'Draft')}
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-text-muted text-sm whitespace-nowrap font-medium">
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-end">
                    <div className="flex items-center justify-end gap-2">
                       <Button 
                        onClick={() => handleEdit(page)}
                        variant="ghost" 
                        size="icon" 
                        className="w-10 h-10 rounded-xl bg-white/5 text-white hover:text-brand-orange hover:bg-brand-orange/10 transition-all">
                         <Edit className="w-4 h-4" />
                       </Button>
                       <Button 
                        onClick={() => handleDelete(page.id)}
                        variant="ghost" 
                        size="icon" 
                        className="w-10 h-10 rounded-xl bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                         <Trash2 className="w-4 h-4" />
                       </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {pages.length === 0 && (
            <div className="py-20 text-center text-text-muted font-bold">
              {isAr ? 'لا توجد صفحات حالياً' : 'No pages found'}
            </div>
          )}
        </div>
        </Card>
      </div>

      <PageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPages}
        page={selectedPage}
      />
    </div>
  )
}
