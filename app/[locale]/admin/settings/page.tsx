'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { 
  Settings, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Save,
  Loader2,
  Globe
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export default function SettingsPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: ''
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    try {
      const resp = await fetch('/api/admin/settings')
      if (resp.ok) {
        const json = await resp.json()
        setData(json)
      }
    } catch (e) {
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const resp = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (resp.ok) {
        toast.success(isAr ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully')
      }
    } catch (e) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
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
    <div className="space-y-10 pb-20 max-w-5xl mx-auto text-start">
      <div className="px-2">
        <h1 className="text-3xl font-black text-white">{t('admin.settings')}</h1>
        <p className="text-text-muted mt-2">{isAr ? 'تخصيص معلومات الشركة وإعدادات الموقع.' : 'Customize company information and website settings.'}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 px-2">
        {/* Company Info */}
        <Card className="glass-card border-white/5 overflow-hidden">
          <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center">
                 <Building2 className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-white">{isAr ? 'معلومات الشركة' : 'Company Information'}</CardTitle>
                <CardDescription>{isAr ? 'البيانات الأساسية التي تظهر في الموقع والمنصة.' : 'Basic information displayed on the website and platform.'}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-white font-bold">{isAr ? 'اسم الشركة' : 'Company Name'}</Label>
              <div className="relative group">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                <Input 
                  value={data.companyName}
                  onChange={e => setData({...data, companyName: e.target.value})}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 text-white" 
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                <Input 
                  type="email"
                  value={data.email}
                  onChange={e => setData({...data, email: e.target.value})}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 text-white" 
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold">{isAr ? 'رقم الهاتف' : 'Phone Number'}</Label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                <Input 
                  value={data.phone}
                  onChange={e => setData({...data, phone: e.target.value})}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 text-white" 
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold">{isAr ? 'العنوان' : 'Address'}</Label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-orange transition-colors" />
                <Input 
                  value={data.address}
                  onChange={e => setData({...data, address: e.target.value})}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 text-white" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="glass-card border-white/5 overflow-hidden">
          <CardHeader className="p-8 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center">
                 <Globe className="w-6 h-6 text-brand-pink" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-white">{isAr ? 'روابط التواصل الاجتماعي' : 'Social Media Links'}</CardTitle>
                <CardDescription>{isAr ? 'روابط حسابات الشركة على منصات التواصل.' : 'Links to company accounts on social platforms.'}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-white font-bold">Facebook</Label>
              <div className="relative group">
                <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-pink transition-colors" />
                <Input 
                  value={data.facebook}
                  onChange={e => setData({...data, facebook: e.target.value})}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 text-white" 
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold">Instagram</Label>
              <div className="relative group">
                <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-pink transition-colors" />
                <Input 
                  value={data.instagram}
                  onChange={e => setData({...data, instagram: e.target.value})}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 text-white" 
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold">Twitter (X)</Label>
              <div className="relative group">
                <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-pink transition-colors" />
                <Input 
                  value={data.twitter}
                  onChange={e => setData({...data, twitter: e.target.value})}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 text-white" 
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-white font-bold">LinkedIn</Label>
              <div className="relative group">
                <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-brand-pink transition-colors" />
                <Input 
                  value={data.linkedin}
                  onChange={e => setData({...data, linkedin: e.target.value})}
                  className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 text-white" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button 
            disabled={saving}
            className="h-16 px-12 rounded-2xl gradient-brand font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all gap-3"
          >
            {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
            {isAr ? 'حفظ التغييرات' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
