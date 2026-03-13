'use client'

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
  Save
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSession } from 'next-auth/react'

export default function SettingsPage() {
  const t = useTranslations('dashboard')
  const { data: session } = useSession()
  const isAr = t('welcome') === 'أهلاً بك'

  return (
    <div className="max-w-4xl space-y-8 pb-20 text-start">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="glass-card border-white/5 overflow-hidden">
          <CardHeader className="bg-white/[0.02] p-8 border-b border-white/5">
             <CardTitle className="text-2xl font-black text-white">{t('settings')}</CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-12">
             {/* Profile Section */}
             <div className="space-y-8">
                <div className="flex items-center gap-8">
                   <div className="relative group">
                      <Avatar className="w-24 h-24 rounded-3xl border-4 border-white/5 ring-4 ring-brand-orange/20">
                         <AvatarImage src={session?.user?.image || ''} />
                         <AvatarFallback className="bg-gradient-brand text-2xl text-white font-black">{session?.user?.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white border-4 border-brand-dark hover:scale-110 transition-transform shadow-xl">
                         <Camera className="w-5 h-5" />
                      </button>
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-xl font-black text-white">{session?.user?.name}</h4>
                      <p className="text-text-muted">{session?.user?.email}</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                   <div className="space-y-3">
                      <Label className="text-white font-bold text-lg px-1">{isAr ? 'الاسم الكامل' : 'Full Name'}</Label>
                      <div className="relative">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted rtl:left-auto rtl:right-4" />
                         <Input defaultValue={session?.user?.name || ''} className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-lg" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <Label className="text-white font-bold text-lg px-1">{isAr ? 'البريد الإلكتروني' : 'Email Address'}</Label>
                      <div className="relative">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted rtl:left-auto rtl:right-4" />
                         <Input disabled defaultValue={session?.user?.email || ''} className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-lg opacity-50" />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <Label className="text-white font-bold text-lg px-1">{isAr ? 'رقم الهاتف' : 'Phone Number'}</Label>
                      <div className="relative">
                         <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted rtl:left-auto rtl:right-4" />
                         <Input placeholder="+212 ..." className="h-14 bg-white/5 border-white/10 rounded-2xl ps-12 rtl:ps-4 rtl:pe-12 text-lg" />
                      </div>
                   </div>
                </div>
             </div>

             <div className="w-full h-[1px] bg-white/5" />

             {/* Save Button */}
             <div className="flex justify-end pt-4">
                <Button className="h-16 px-12 rounded-2xl gradient-brand font-black text-xl gap-3 shadow-xl hover:scale-105 active:scale-95 transition-all">
                   <Save className="w-6 h-6" />
                   {isAr ? 'حفظ التغييرات' : 'Save Changes'}
                </Button>
             </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
