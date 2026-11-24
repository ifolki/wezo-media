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

export default function ContactClient() {
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
        formId: 'contact_form',
        serviceInterest: 'contact',
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-bold text-sm uppercase tracking-widest mb-2"
          >
            {t('title')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white"
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: isAr ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card p-8 rounded-3xl space-y-6">
              <h2 className="text-2xl font-black text-white">{t('info_title')}</h2>
              <p className="text-text-muted">{t('info_desc')}</p>

              <div className="space-y-4 pt-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">{t('email_label')}</div>
                    <div className="text-sm font-bold text-white group-hover:text-brand-orange transition-colors">
                      {siteConfig.email}
                    </div>
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.phone}`}
                  onClick={() => trackPhoneClick({ ctaLocation: 'contact_page', locale })}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">{t('phone_label')}</div>
                    <div className="text-sm font-bold text-white group-hover:text-brand-orange transition-colors" dir="ltr">
                      {siteConfig.phone}
                    </div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick({ ctaLocation: 'contact_page', locale })}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-400 font-semibold">WhatsApp</div>
                    <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors" dir="ltr">
                      +{siteConfig.whatsapp}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted">{t('address_label')}</div>
                    <div className="text-sm font-bold text-white">{address}</div>
                  </div>
                </div>
              </div>

              {socialLinks.length > 0 && (
                <div className="pt-6 border-t border-white/10">
                  <div className="text-xs text-text-muted mb-3">{t('follow_us')}</div>
                  <div className="flex gap-2">
                    {socialLinks.map((s, idx) => {
                      const Icon = s.icon
                      return (
                        <a
                          key={idx}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-brand-orange hover:text-white flex items-center justify-center text-text-muted transition-colors"
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isAr ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 md:p-12 rounded-3xl">
              <h2 className="text-2xl font-black text-white mb-2">{t('form_title')}</h2>
              <p className="text-text-muted mb-8">{t('form_desc')}</p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {isAr ? 'تم إرسال رسالتك بنجاح' : isFr ? 'Message envoyé avec succès' : 'Message sent successfully'}
                  </h3>
                  <p className="text-text-muted max-w-md mx-auto">
                    {isAr
                      ? 'شكراً لتواصلك معنا. سيقوم فريقنا بمراجعة رسالتك والتواصل معك في أقرب وقت.'
                      : isFr
                      ? 'Merci de nous avoir contactés. Notre équipe reviendra vers vous dans les plus brefs délais.'
                      : 'Thank you for reaching out. Our team will review your message and contact you promptly.'}
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', phone: '', email: '', subject: '', message: '' })
                    }}
                    variant="outline"
                    className="mt-4"
                  >
                    {isAr ? 'إرسال رسالة أخرى' : isFr ? 'Envoyer un autre message' : 'Send another message'}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-sm font-bold text-white">
                        {isAr ? 'الاسم الكامل *' : isFr ? 'Nom complet *' : 'Full Name *'}
                      </Label>
                      <Input
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isAr ? 'محمد العلمي' : 'Mohammed El Alami'}
                        required
                        className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-brand-orange"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-phone" className="text-sm font-bold text-white">
                        {isAr ? 'رقم الهاتف / واتساب *' : isFr ? 'Téléphone / WhatsApp *' : 'Phone / WhatsApp *'}
                      </Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+212 6XX-XXXXXX"
                        required
                        dir="ltr"
                        className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="contact-email" className="text-sm font-bold text-white">
                        {isAr ? 'البريد الإلكتروني' : isFr ? 'Email' : 'Email Address'}
                      </Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@entreprise.ma"
                        dir="ltr"
                        className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-brand-orange"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-subject" className="text-sm font-bold text-white">
                        {isAr ? 'الموضوع أو اسم الشركة' : isFr ? 'Sujet ou Entreprise' : 'Subject or Company'}
                      </Label>
                      <Input
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={isAr ? 'مشروع جديد / استفسار' : 'Nouveau Projet / Demande'}
                        className="bg-white/5 border-white/10 text-white rounded-xl h-12 focus:border-brand-orange"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-sm font-bold text-white">
                      {isAr ? 'الرسالة أو تفاصيل المشروع *' : isFr ? 'Message ou détails du projet *' : 'Message or Project Details *'}
                    </Label>
                    <Textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isAr
                          ? 'صف لنا مشروعك، أهدافك، والخدمات التي تحتاجها...'
                          : isFr
                          ? 'Décrivez votre projet, vos objectifs et vos besoins...'
                          : 'Describe your project, objectives, and needs...'
                      }
                      rows={5}
                      required
                      className="bg-white/5 border-white/10 text-white rounded-xl focus:border-brand-orange resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-14 rounded-xl gradient-brand text-white font-bold text-base shadow-xl hover:opacity-95 transition-opacity"
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{isAr ? 'جاري الإرسال...' : isFr ? 'Envoi en cours...' : 'Sending...'}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        <span>{isAr ? 'إرسال الرسالة' : isFr ? 'Envoyer le message' : 'Send Message'}</span>
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
