'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Youtube, Linkedin, Music2, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useTranslations, useLocale } from 'next-intl'
import { siteConfig } from '@/lib/config/site'
import { trackPhoneClick, trackWhatsAppClick, trackLeadSubmit } from '@/lib/analytics/gtag'

export default function ContactPage() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.message) {
      setErrorMsg(
        isAr
          ? 'يرجى ملء الاسم ورقم الهاتف والرسالة'
          : isFr
          ? 'Veuillez remplir le nom, le téléphone et le message'
          : 'Please fill in your name, phone number, and message'
      )
      return
    }

    setSubmitting(true)
    setErrorMsg(null)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          whatsapp: formData.phone,
          email: formData.email || '',
          businessName: formData.subject || (isAr ? 'رسالة تواصل عام' : 'Contact Inquiry'),
          industry: isAr ? 'استفسار مباشر' : 'Direct Contact',
          city: '-',
          objective: formData.message,
          message: formData.subject ? `${formData.subject}\n\n${formData.message}` : formData.message,
          locale,
          source: 'Contact Page',
        }),
      })
      const data = await res.json()
      if (!res.ok || data.success === false) {
        throw new Error(data.message || 'Submission failed')
      }
      trackLeadSubmit({
        formType: 'contact_form',
        serviceSlug: 'contact',
        city: '-',
        industry: 'Direct Contact',
        locale,
      })
      setSubmitted(true)
    } catch {
      setErrorMsg(
        isAr
          ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب.'
          : isFr
          ? 'Une erreur est survenue. Veuillez réessayer ou nous contacter sur WhatsApp.'
          : 'An error occurred. Please try again or reach us via WhatsApp.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const address = isAr ? siteConfig.addressAr : isFr ? siteConfig.addressFr : siteConfig.addressEn

  const socialLinks = [
    { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
    { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
    { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
    { icon: Music2, href: siteConfig.social.tiktok, label: 'TikTok' },
    { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
  ].filter(s => s.href && s.href !== '#')

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
                 <div className="space-y-6 text-start">
                    <h2 className="text-4xl font-black text-white">{t('info_title')}</h2>
                    <p className="text-xl text-text-muted">{t('info_desc')}</p>
                 </div>
                 
                 <div className="space-y-8">
                    {[
                      { icon: Mail, label: t('email_label'), value: siteConfig.email, dir: 'ltr', href: `mailto:${siteConfig.email}` },
                      { 
                        icon: Phone, 
                        label: t('phone_label'), 
                        value: siteConfig.whatsappFormatted, 
                        dir: 'ltr',
                        href: `tel:${siteConfig.phoneInternational}`,
                        onClick: () => trackPhoneClick({ ctaLocation: 'contact_page_phone', locale })
                      },
                      { 
                        icon: MessageCircle, 
                        label: isAr ? 'واتساب للأعمال' : isFr ? 'WhatsApp Business' : 'WhatsApp Business', 
                        value: siteConfig.whatsappFormatted, 
                        dir: 'ltr',
                        href: `https://wa.me/${siteConfig.whatsapp}`,
                        target: '_blank',
                        onClick: () => trackWhatsAppClick({ ctaLocation: 'contact_page_whatsapp', locale })
                      },
                      { icon: MapPin, label: t('address_label'), value: address },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 group">
                         <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center shrink-0 border-white/5 group-hover:border-brand-orange transition-all">
                            <item.icon className="w-8 h-8 text-brand-orange" />
                         </div>
                         <div className="text-start">
                            <div className="text-sm text-text-muted mb-1">{item.label}</div>
                            {item.href ? (
                              <a 
                                href={item.href}
                                target={item.target}
                                rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                                onClick={item.onClick}
                                className={`text-2xl font-bold text-white hover:text-brand-orange transition-colors ${item.dir === 'ltr' ? 'font-mono' : ''}`} 
                                dir={item.dir || 'auto'}
                              >
                                {item.value}
                              </a>
                            ) : (
                              <div className={`text-2xl font-bold text-white ${item.dir === 'ltr' ? 'font-mono' : ''}`} dir={item.dir || 'auto'}>{item.value}</div>
                            )}
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-6 text-start">
                    <h4 className="text-xl font-bold text-white">{t('follow_us')}</h4>
                    <div className="flex gap-4">
                       {socialLinks.map((social, i) => {
                         const Icon = social.icon
                         return (
                           <a
                             key={i}
                             href={social.href}
                             target="_blank"
                             rel="noopener noreferrer"
                             aria-label={social.label}
                             className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center hover:gradient-brand hover:text-white transition-all"
                           >
                             <Icon className="w-6 h-6" />
                           </a>
                         )
                       })}
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
                 
                 {submitted ? (
                   <div className="py-10 text-center space-y-4">
                     <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                       <CheckCircle2 className="w-9 h-9" />
                     </div>
                     <h4 className="text-2xl font-black text-white">
                       {isAr ? 'تم استلام رسالتك بنجاح!' : isFr ? 'Votre message a bien été envoyé !' : 'Your message has been sent!'}
                     </h4>
                     <p className="text-text-muted">
                       {isAr
                         ? 'شكراً لتواصلك مع WEZO MEDIA. سيتواصل معك فريقنا قريباً.'
                         : isFr
                         ? 'Merci de nous avoir contactés. Notre équipe vous répondra très prochainement.'
                         : 'Thank you for reaching out. Our team will get back to you shortly.'}
                     </p>
                   </div>
                 ) : (
                   <form onSubmit={handleSubmit} className="space-y-6">
                      {errorMsg && (
                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold">
                          {errorMsg}
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label className="text-white">{t('placeholders.name')} *</Label>
                            <Input
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                              placeholder={t('placeholders.name')}
                            />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-white">{t('phone_label')} / WhatsApp *</Label>
                            <Input
                              required
                              dir="ltr"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                              placeholder="+212 6..."
                            />
                         </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <Label className="text-white">{t('email_label')}</Label>
                            <Input
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                              type="email"
                              placeholder={t('placeholders.email')}
                            />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-white">{t('subject')}</Label>
                            <Input
                              value={formData.subject}
                              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                              className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                              placeholder={t('placeholders.subject')}
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <Label className="text-white">{t('message')} *</Label>
                         <Textarea
                           required
                           value={formData.message}
                           onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                           className="bg-brand-dark/50 border-white/10 min-h-[150px] rounded-2xl"
                           placeholder={t('placeholders.message')}
                         />
                      </div>
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full h-16 gradient-brand font-black text-xl rounded-2xl gap-3"
                      >
                         {submitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                           <>
                             {t('send_button')}
                             <Send className="w-6 h-6" />
                           </>
                         )}
                      </Button>
                   </form>
                 )}
              </motion.div>
           </div>
        </div>
      </section>
    </main>
  )
}
