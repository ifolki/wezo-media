'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Rocket, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RequestServiceModal from '@/components/shared/RequestServiceModal'
import { useTranslations } from 'next-intl'

export default function ServiceDetailsPage() {
  const { slug } = useParams()
  const t = useTranslations('services')
  
  // Dynamic content based on slug would usually come from DB
  const serviceTitle = t(`categories.${slug}`) || 'Service Details'

  return (
    <main className="min-h-screen pb-20">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-brand-secondary/30">
        <div className="container mx-auto px-4 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 rounded-3xl gradient-brand mx-auto flex items-center justify-center mb-6 shadow-2xl"
          >
            <Rocket className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white">{serviceTitle}</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">نقدم أعلى مستويات الجودة الاحترافية في {serviceTitle} لضمان تميز علامتك التجارية.</p>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-8">
                <h2 className="text-4xl font-black text-white">ماذا تشمل هذه الخدمة؟</h2>
                <div className="space-y-4">
                   {[
                     'تحليل متكامل لمتطلبات المشروع',
                     'عملية إنتاج احترافية بأحدث المعدات',
                     'مراجعات غير محدودة لضمان الرضا',
                     'دعم فني مستمر بعد التسليم',
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4 items-center">
                        <CheckCircle2 className="w-6 h-6 text-brand-orange" />
                        <span className="text-lg text-text-muted">{item}</span>
                     </div>
                   ))}
                </div>
                <div className="pt-6">
                   <RequestServiceModal>
                      <Button size="lg" className="gradient-brand font-black px-10 py-7 text-lg rounded-2xl shadow-xl">اطلب هذه الخدمة الآن</Button>
                   </RequestServiceModal>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                   <div className="h-64 rounded-3xl glass-card overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                   </div>
                   <div className="h-40 rounded-3xl gradient-brand p-8 text-white flex flex-col justify-end">
                      <div className="text-3xl font-black">100%</div>
                      <div className="text-sm font-bold">دقة في التنفيذ</div>
                   </div>
                </div>
                <div className="space-y-4 pt-12">
                   <div className="h-40 rounded-3xl glass-card border-brand-orange/20 p-8 flex flex-col justify-end">
                      <div className="text-3xl font-black text-white">+500</div>
                      <div className="text-sm text-text-muted">مشروع منجز</div>
                   </div>
                   <div className="h-64 rounded-3xl glass-card overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Packages / Pricing */}
      <section className="py-24 bg-brand-secondary/30">
        <div className="container mx-auto px-4 text-center">
           <h2 className="text-4xl font-black text-white mb-16">باقات الأسعار</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'الباقة الأساسية', price: '99', features: ['مراحل محدودة', 'تسليم خلال 7 أيام', 'دعم عبر الإيميل'] },
                { name: 'الباقة الاحترافية', price: '299', popular: true, features: ['عملية كاملة', 'تسليم خلال 3 أيام', 'دعم هاتف وإيميل', 'ملفات المصدر'] },
                { name: 'باقة الشركات', price: '999', features: ['تخصيص كامل', 'مدير مشروع خاص', 'دعم 24/7', 'استشارة استراتيجية'] },
              ].map((pack, i) => (
                <div key={i} className={`glass-card p-10 rounded-[2.5rem] border-white/5 relative ${pack.popular ? 'border-brand-orange/40 glow-orange -translate-y-4' : ''}`}>
                   {pack.popular && <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white px-6 py-1 rounded-full text-xs font-bold uppercase">الأكثر طلباً</span>}
                   <h3 className="text-2xl font-bold text-white mb-4">{pack.name}</h3>
                   <div className="text-5xl font-black gradient-text mb-8">${pack.price}</div>
                   <ul className="space-y-4 mb-10">
                      {pack.features.map((f, idx) => (
                        <li key={idx} className="text-text-muted flex items-center justify-center gap-2">
                           <ChevronRight className="w-4 h-4 text-brand-orange" />
                           {f}
                        </li>
                      ))}
                   </ul>
                   <Button className={`w-full font-black py-7 rounded-2xl ${pack.popular ? 'gradient-brand' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>اختر هذه الباقة</Button>
                </div>
              ))}
           </div>
        </div>
      </section>
    </main>
  )
}
