'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  Globe, 
  Search, 
  Layout, 
  FileText, 
  Image as ImageIcon,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function AdminPagesPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'

  // Demo Data
  const [pages, setPages] = useState([
    { id: '1', titleAr: 'الرئيسية', titleEn: 'Home', path: '/', status: 'Published', lastEdit: '2026-03-01' },
    { id: '2', titleAr: 'من نحن', titleEn: 'About Us', path: '/about', status: 'Published', lastEdit: '2026-03-05' },
    { id: '3', titleAr: 'اتصل بنا', titleEn: 'Contact', path: '/contact', status: 'Published', lastEdit: '2026-03-10' },
    { id: '4', titleAr: 'سياسة الخصوصية', titleEn: 'Privacy Policy', path: '/privacy', status: 'Draft', lastEdit: '2026-03-12' },
  ])

  return (
    <div className="space-y-8 pb-10 text-start">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white">{isAr ? 'إدارة الصفحات' : 'Pages Management'}</h1>
          <p className="text-text-muted font-medium">
            {isAr ? 'إدارة محتوى صفحات الموقع الثابتة' : 'Manage static website pages content'}
          </p>
        </div>
        <Button className="h-14 px-8 rounded-2xl gradient-brand font-black text-lg gap-2 shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
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
                      <span dir="ltr">{page.path}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <Badge className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
                      page.status === 'Published' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                      'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {page.status === 'Published' ? (isAr ? 'منشورة' : 'Published') : (isAr ? 'مسودة' : 'Draft')}
                    </Badge>
                  </td>
                  <td className="px-8 py-6 text-text-muted text-sm whitespace-nowrap font-medium">
                    {page.lastEdit}
                  </td>
                  <td className="px-8 py-6 text-end">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 text-white hover:text-brand-orange hover:bg-brand-orange/10 transition-all">
                         <Edit className="w-4 h-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                         <Trash2 className="w-4 h-4" />
                       </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        </Card>
      </div>
    </div>
  )
}
