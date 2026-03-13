'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Globe, 
  Bell,
  Camera,
  Save,
  Loader2,
  ShieldCheck,
  Building
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { NavigationMenu } from '@radix-ui/react-navigation-menu'

export default function SettingsPage() {
  const t = useTranslations('dashboard')
  const { data: session, update } = useSession()
  const isAr = t('welcome') === 'أهلاً بك'
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    phone: '',
    company: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success(isAr ? 'تم تحديث البيانات بنجاح' : 'Profile updated successfully')
      setSaving(false)
    }, 1500)
  }

  return (
    <div className="space-y-10 pb-20 max-w-4xl mx-auto text-start px-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-black text-white">{isAr ? 'إعدادات الحساب' : 'Account Settings'}</h1>
          <p className="text-text-muted mt-2 font-medium">{isAr ? 'إدارة وتعديل بيانات ملفك الشخصي إعدادات الأمان' : 'Manage and update your profile information and security settings'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 mt-10">
          <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader className="bg-white/[0.02] p-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 flex items-center justify-center">
                   <User className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">{isAr ? 'البيانات الشخصية' : 'Personal Information'}</CardTitle>
                  <CardDescription>{isAr ? 'المعلومات الأساسية لحسابك' : 'Your basic account information'}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
               {/* Profile Section */}
               <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                  <div className="relative group">
                     <Avatar className="w-32 h-32 rounded-3xl border-4 border-white/5 ring-4 ring-brand-orange/20 shadow-2xl">
                        <AvatarImage src={session?.user?.image || ''} className="object-cover" />
                        <AvatarFallback className="bg-gradient-brand text-4xl text-white font-black">{session?.user?.name?.[0] || 'U'}</AvatarFallback>
                     </Avatar>
                     <button type="button" className="absolute -bottom-2 -right-2 w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center text-white border-4 border-brand-dark hover:scale-110 active:scale-95 transition-all shadow-xl hover:shadow-brand-orange/20 cursor-pointer">
                        <Camera className="w-5 h-5" />
                     </button>
                  </div>
                  <div className="space-y-3 text-center sm:text-start flex-grow">
                     <h4 className="text-2xl font-black text-white">{session?.user?.name || 'User'}</h4>
                     <p className="text-text-muted font-medium">{session?.user?.email}</p>
                     <div className="pt-2">
                        <Button type="button" variant="outline" className="h-10 px-6 rounded-xl border-white/10 bg-white/5 font-bold hover:bg-brand-orange/10 hover:text-brand-orange transition-all">
                           {isAr ? 'إزالة الصورة' : 'Remove Image'}
                        </Button>
                     </div>
                  </div>
               </div>

               <div className="w-full h-[1px] bg-white/5" />

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <Label className="text-white font-bold text-base">{isAr ? 'الاسم الكامل' : 'Full Name'}</Label>
                     <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted rtl:left-auto rtl:right-4 group-focus-within:text-brand-orange transition-colors" />
                        <Input 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-lg text-white focus:border-brand-orange transition-all" 
                        />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <Label className="text-white font-bold text-base">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</Label>
                     <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted rtl:left-auto rtl:right-4 group-focus-within:text-brand-orange transition-colors" />
                        <Input 
                          disabled 
                          value={session?.user?.email || ''} 
                          className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-lg text-white/50 cursor-not-allowed" 
                        />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <Label className="text-white font-bold text-base">{isAr ? 'رقم الهاتف' : 'Phone Number'}</Label>
                     <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted rtl:left-auto rtl:right-4 group-focus-within:text-brand-orange transition-colors" />
                        <Input 
                          placeholder="+212 ..." 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-lg text-white focus:border-brand-orange transition-all text-left rtl:text-right" 
                          dir="ltr"
                        />
                     </div>
                  </div>
                  <div className="space-y-3">
                     <Label className="text-white font-bold text-base">{isAr ? 'الشركة / المؤسسة' : 'Company'}</Label>
                     <div className="relative group">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted rtl:left-auto rtl:right-4 group-focus-within:text-brand-orange transition-colors" />
                        <Input 
                          placeholder={isAr ? 'اسم الشركة (اختياري)' : 'Company name (Optional)'}
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-lg text-white focus:border-brand-orange transition-all" 
                        />
                     </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/5 overflow-hidden">
            <CardHeader className="bg-white/[0.02] p-8 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-pink/10 flex items-center justify-center">
                   <ShieldCheck className="w-6 h-6 text-brand-pink" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-white">{isAr ? 'الأمان وكلمة المرور' : 'Security & Password'}</CardTitle>
                  <CardDescription>{isAr ? 'قم بتحديث كلمة المرور الخاصة بك' : 'Update your account password'}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-3">
                 <Label className="text-white font-bold text-base">{isAr ? 'كلمة المرور الحالية' : 'Current Password'}</Label>
                 <div className="relative group max-w-md">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted rtl:left-auto rtl:right-4 group-focus-within:text-brand-pink transition-colors" />
                    <Input 
                      type="password"
                      placeholder="••••••••"
                      className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-lg text-white focus:border-brand-pink transition-all font-sans tracking-[0.3em] placeholder:tracking-normal" 
                    />
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <Label className="text-white font-bold text-base">{isAr ? 'كلمة المرور الجديدة' : 'New Password'}</Label>
                    <div className="relative group">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted rtl:left-auto rtl:right-4 group-focus-within:text-brand-pink transition-colors" />
                       <Input 
                         type="password"
                         placeholder="••••••••"
                         className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-lg text-white focus:border-brand-pink transition-all font-sans tracking-[0.3em] placeholder:tracking-normal" 
                       />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <Label className="text-white font-bold text-base">{isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'}</Label>
                    <div className="relative group">
                       <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted rtl:left-auto rtl:right-4 group-focus-within:text-brand-pink transition-colors" />
                       <Input 
                         type="password"
                         placeholder="••••••••"
                         className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-lg text-white focus:border-brand-pink transition-all font-sans tracking-[0.3em] placeholder:tracking-normal" 
                       />
                    </div>
                 </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
             <Button 
               type="submit"
               disabled={saving}
               className="h-16 px-12 rounded-2xl gradient-brand font-black text-xl gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all"
             >
                {saving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                {isAr ? 'حفظ التغييرات' : 'Save Changes'}
             </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
