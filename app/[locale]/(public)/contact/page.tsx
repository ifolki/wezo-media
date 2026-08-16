'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/config/site'

export default function ContactPage() {
  const t = useTranslations('contact')

  return (
    <main className="min-h-screen pb-20">
      <section className="py-20 bg-brand-secondary/30">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h1 className="text-6xl font-black text-white">{t('title')}</h1>
          <p className="text-xl text-text-muted">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
              {/* Contact Info */}
              <div className="space-y-12">
                 <div className="space-y-6">
                    <h2 className="text-4xl font-black text-white">{t('info_title')}</h2>
                    <p className="text-xl text-text-muted">{t('info_desc')}</p>
                 </div>
                 
                 <div className="space-y-8">
                    {[
                      { icon: Mail, label: t('email_label'), value: siteConfig.email },
                      { icon: Phone, label: t('phone_label'), value: siteConfig.phone, dir: 'ltr' },
                      { icon: MapPin, label: t('address_label'), value: 'BD moustapha el maani N 22 casablanca' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 group">
                         <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center shrink-0 border-white/5 group-hover:border-brand-orange transition-all">
                            <item.icon className="w-8 h-8 text-brand-orange" />
                         </div>
                         <div className="text-start">
                            <div className="text-sm text-text-muted mb-1">{item.label}</div>
                            <div className={`text-2xl font-bold text-white ${item.dir === 'ltr' ? 'font-mono' : ''}`} dir={item.dir || 'auto'}>{item.value}</div>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-6 text-start">
                    <h4 className="text-xl font-bold text-white">{t('follow_us')}</h4>
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
                className="glass-card p-12 rounded-[3rem] border-white/5 shadow-2xl space-y-8 text-start"
              >
                 <div className="space-y-2">
                    <h3 className="text-3xl font-black text-white">{t('form_title')}</h3>
                    <p className="text-text-muted">{t('form_desc')}</p>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <Label className="text-white">{t('placeholders.name')}</Label>
                          <Input className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl" placeholder={t('placeholders.name')} />
                       </div>
                       <div className="space-y-2">
                          <Label className="text-white">{t('email_label')}</Label>
                          <Input className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl" type="email" placeholder={t('placeholders.email')} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <Label className="text-white">{t('subject')}</Label>
                       <Input className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl" placeholder={t('placeholders.subject')} />
                    </div>
                    <div className="space-y-2">
                       <Label className="text-white">{t('message')}</Label>
                       <Textarea className="bg-brand-dark/50 border-white/10 min-h-[150px] rounded-2xl" placeholder={t('placeholders.message')} />
                    </div>
                    <Button className="w-full h-16 gradient-brand font-black text-xl rounded-2xl gap-3">
                       {t('send_button')}
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
