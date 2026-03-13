'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Rocket, CheckCircle2, ChevronRight, ChevronLeft, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RequestServiceModal({ children }: { children?: React.ReactNode }) {
  const [step, setStep] = useState(1)
  const [open, setOpen] = useState(false)
  const t = useTranslations('dashboard')
  const s = useTranslations('services')

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const reset = () => {
    setStep(1)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <div className="contents">
            {children || (
              <Button className="gradient-brand border-none hover:opacity-90 font-bold px-6">
                {t('new_request')}
              </Button>
            )}
          </div>
        }
      />
      <DialogContent className="bg-brand-card border-white/5 sm:max-w-[600px] overflow-hidden p-0 rounded-[2.5rem]">
        <div className="p-8 space-y-8">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black text-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-orange/20">
                <Rocket className="text-white w-6 h-6" />
              </div>
              {t('new_request')}
            </DialogTitle>
          </DialogHeader>

          {/* Progress Indicator */}
          <div className="flex justify-between relative px-2">
             <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2" />
             {[1, 2, 3].map((i) => (
               <div 
                 key={i} 
                 className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-black transition-all duration-500 shadow-xl ${
                   step >= i ? 'gradient-brand text-white scale-110' : 'bg-brand-dark text-text-muted border border-white/5'
                 }`}
               >
                 {step > i ? <CheckCircle2 className="w-7 h-7" /> : <span className="text-lg">{i}</span>}
               </div>
             ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-text-muted uppercase tracking-widest px-1">الاسم / Name</Label>
                    <Input className="h-14 bg-brand-dark/50 border-white/5 focus:border-brand-orange rounded-2xl" placeholder="..." />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-text-muted uppercase tracking-widest px-1">الإيميل / Email</Label>
                    <Input className="h-14 bg-brand-dark/50 border-white/5 focus:border-brand-orange rounded-2xl" type="email" placeholder="..." />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-text-muted uppercase tracking-widest px-1">الهاتف / Phone</Label>
                  <Input className="h-14 bg-brand-dark/50 border-white/5 focus:border-brand-orange rounded-2xl" placeholder="..." />
                </div>
                <Button onClick={nextStep} className="w-full h-16 rounded-2xl gradient-brand font-black text-lg gap-3 shadow-2xl hover:scale-[1.02] transition-all">
                   الخطوة التالية
                  <ChevronRight className="w-6 h-6 rtl:rotate-180" />
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-text-muted uppercase tracking-widest px-1">الخدمة / Service</Label>
                  <Select>
                    <SelectTrigger className="h-14 bg-brand-dark/50 border-white/5 rounded-2xl text-white">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-card border-white/10 text-white rounded-2xl">
                      <SelectItem value="audio">{s('categories.audio')}</SelectItem>
                      <SelectItem value="video">{s('categories.video')}</SelectItem>
                      <SelectItem value="marketing">{s('categories.marketing')}</SelectItem>
                      <SelectItem value="web">{s('categories.web')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-bold text-text-muted uppercase tracking-widest px-1">التفاصيل / Details</Label>
                  <Textarea className="bg-brand-dark/50 border-white/5 rounded-2xl min-h-[150px] p-4 text-white" placeholder="..." />
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="flex-1 h-16 rounded-2xl border-white/10 text-white font-bold gap-2">
                    <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
                    السابق
                  </Button>
                  <Button onClick={nextStep} className="flex-[2] h-16 rounded-2xl gradient-brand font-black text-lg gap-3 shadow-2xl">
                    إرسال الطلب
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 py-12"
              >
                <div className="w-24 h-24 rounded-full gradient-brand mx-auto flex items-center justify-center shadow-2xl ring-8 ring-white/5 animate-bounce">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-white">تم بنجاح!</h3>
                  <p className="text-text-muted text-lg max-w-xs mx-auto">
                    شكراً لاختيارك WEZO MEDIA. سنتواصل معك قريباً جداً.
                  </p>
                </div>
                <Button onClick={reset} className="w-full h-16 rounded-2xl gradient-brand font-black text-lg shadow-2xl">
                  {t('home') === 'Home' ? 'Close' : 'إغلاق'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}
