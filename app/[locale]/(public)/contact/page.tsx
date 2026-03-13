'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function ContactPage() {
  return (
    <main className="min-h-screen pb-20">
      <section className="py-20 bg-brand-secondary/30">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-6xl font-black text-white">تواصل معنا</h1>
          <p className="text-xl text-text-muted">نحن هنا للإجابة على تساؤلاتكم ومساعدة مشاريعكم على النمو</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              {/* Contact Info */}
              <div className="space-y-12">
                 <div className="space-y-6">
                    <h2 className="text-4xl font-black text-white">معلومات الاتصال</h2>
                    <p className="text-xl text-text-muted">لا تتردد في الوصول إلينا عبر أي من القنوات التالية. فريقنا جاهز للرد عليك في أسرع وقت.</p>
                 </div>
                 
                 <div className="space-y-8">
                    {[
                      { icon: Mail, label: 'البريد الإلكتروني', value: 'info@wezomedia.com' },
                      { icon: Phone, label: 'رقم الهاتف', value: '0661094186', dir: 'ltr' },
                      { icon: MapPin, label: 'العنوان', value: 'BD moustapha el maani N 22 casablanca' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 group">
                         <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center shrink-0 border-white/5 group-hover:border-brand-orange transition-all">
                            <item.icon className="w-8 h-8 text-brand-orange" />
                         </div>
                         <div>
                            <div className="text-sm text-text-muted mb-1">{item.label}</div>
                            <div className={`text-2xl font-bold text-white ${item.dir === 'ltr' ? 'font-mono' : ''}`} dir={item.dir || 'rtl'}>{item.value}</div>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-6">
                    <h4 className="text-xl font-bold text-white">تابعنا على</h4>
                    <div className="flex gap-4">
                       {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                         <a key={i} href="#" className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center hover:gradient-brand hover:text-white transition-all">
                            <Icon className="w-6 h-6" />
                         </a>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-12 rounded-[3rem] border-white/5 shadow-2xl space-y-8"
              >
                 <div className="space-y-2">
                    <h3 className="text-3xl font-black text-white">أرسل لنا رسالة</h3>
                    <p className="text-text-muted">املأ النموذج أدناه وسنتواصل معك خلال 24 ساعة.</p>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <Label className="text-white">الاسم الكامل</Label>
                          <Input className="bg-brand-dark/50 border-white/10 py-6" placeholder="اكتب اسمك هنا" />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-white">البريد الإلكتروني</Label>
                          <Input className="bg-brand-dark/50 border-white/10 py-6" type="email" placeholder="example@email.com" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-white">الموضوع</Label>
                       <Input className="bg-brand-dark/50 border-white/10 py-6" placeholder="عن ماذا تود الاستفسار؟" />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-white">الرسالة</Label>
                       <Textarea className="bg-brand-dark/50 border-white/10 min-h-[150px]" placeholder="اكتب تفاصيل استفسارك هنا..." />
                    </div>
                    <Button className="w-full gradient-brand font-black py-8 text-xl rounded-2xl gap-3">
                       إرسال الرسالة
                       <Send className="w-6 h-6" />
                    </Button>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>
    </main>
  )
}
