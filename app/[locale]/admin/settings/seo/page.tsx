'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  Globe, 
  Search, 
  BarChart3, 
  Share2, 
  Loader2, 
  Save,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export default function SeoSettingsPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const [saving, setSaving] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      toast.success('SEO Settings saved (Demo)')
      setSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-10 pb-20 max-w-5xl mx-auto text-start px-2">
      <div>
        <h1 className="text-3xl font-black text-white">{isAr ? 'إعدادات SEO' : 'SEO Settings'}</h1>
        <p className="text-text-muted mt-2">{isAr ? 'تحسين ظهور الموقع في محركات البحث.' : 'Optimize website visibility in search engines.'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card className="glass-card border-white/5 overflow-hidden">
          <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center">
                 <Search className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-white">{isAr ? 'البيانات الوصفية' : 'Meta Data'}</CardTitle>
                <CardDescription>{isAr ? 'العنوان والوصف الأساسي للموقع.' : 'Main title and description for the website.'}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-3">
              <Label className="text-white font-bold">{isAr ? 'عنوان الموقع (Meta Title)' : 'Site Title'}</Label>
              <Input 
                placeholder="Wezo Media | Digital Creative Agency"
                className="h-14 bg-white/5 border-white/10 rounded-2xl text-white" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold">{isAr ? 'وصف الموقع (Meta Description)' : 'Site Description'}</Label>
              <Textarea 
                placeholder="..."
                className="min-h-[120px] bg-white/5 border-white/10 rounded-2xl text-white resize-none" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold">{isAr ? 'الكلمات الدلالية' : 'Keywords'}</Label>
              <Input 
                placeholder="music, marketing, production, agency..."
                className="h-14 bg-white/5 border-white/10 rounded-2xl text-white" 
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/5 overflow-hidden">
          <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center">
                 <Share2 className="w-6 h-6 text-brand-pink" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-white">{isAr ? 'إحصائيات وتتبع' : 'Analytics & Tracking'}</CardTitle>
                <CardDescription>{isAr ? 'ربط الموقع مع Google Analytics وأدوات التتبع.' : 'Connect website with Google Analytics and tracking tools.'}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-3">
              <Label className="text-white font-bold">Google Analytics ID</Label>
              <Input 
                placeholder="G-XXXXXXXXXX"
                className="h-14 bg-white/5 border-white/10 rounded-2xl text-white" 
              />
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold">Facebook Pixel ID</Label>
              <Input 
                placeholder="XXXXXXXXXXXXXXX"
                className="h-14 bg-white/5 border-white/10 rounded-2xl text-white" 
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-4">
          <Button 
            disabled={saving}
            className="h-16 px-12 rounded-2xl gradient-brand font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all gap-3"
          >
            {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
            {isAr ? 'حفظ إعدادات SEO' : 'Save SEO Settings'}
          </Button>
        </div>
      </form>
    </div>
  )
}
