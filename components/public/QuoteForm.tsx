'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, ArrowRight, ArrowLeft, Send, Sparkles, Film, Music, Globe, Megaphone, User, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { siteConfig } from '@/lib/config/site'

interface Service {
  id: string
  slug: string
  nameAr: string
  nameEn: string
  nameFr: string
  descAr: string
  descEn: string
  descFr: string
}

interface QuoteFormProps {
  services: Service[]
}

export default function QuoteForm({ services }: QuoteFormProps) {
  const t = useTranslations('quote')
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isAr = locale === 'ar'

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [createdLead, setCreatedLead] = useState<any>(null)
  const [dbOffline, setDbOffline] = useState(false)

  const preselectedServiceId = searchParams ? searchParams.get('service') : null

  useEffect(() => {
    if (preselectedServiceId && services && services.length > 0) {
      const found = services.find(s => s.id === preselectedServiceId || s.slug === preselectedServiceId)
      if (found) {
        setFormData(prev => ({ ...prev, requestedServiceId: found.id }))
        setStep(2)
      }
    }
  }, [preselectedServiceId, services])

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    businessName: '',
    industry: '',
    city: '',
    websiteUrl: '',
    objective: '',
    budgetMin: '',
    budgetMax: '',
    message: '',
    requestedServiceId: ''
  })

  // Get service icon
  const getServiceIcon = (slug: string) => {
    switch (slug) {
      case 'video':
        return <Film className="w-8 h-8 text-brand-orange" />
      case 'audio':
        return <Music className="w-8 h-8 text-[#FF4D80]" />
      case 'web':
        return <Globe className="w-8 h-8 text-blue-500" />
      case 'marketing':
        return <Megaphone className="w-8 h-8 text-indigo-500" />
      default:
        return <User className="w-8 h-8 text-purple-500" />
    }
  }

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle Service Selection
  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, requestedServiceId: serviceId }))
    setStep(2)
  }

  // Form Step Validation
  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      return !!formData.requestedServiceId
    }
    if (currentStep === 2) {
      return !!formData.businessName && !!formData.industry && !!formData.city
    }
    if (currentStep === 3) {
      return !!formData.objective && !!formData.budgetMin && !!formData.budgetMax
    }
    if (currentStep === 4) {
      return !!formData.name && !!formData.phone && !!formData.whatsapp
    }
    return true
  }

  // Navigation handlers
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1)
    } else {
      toast.error(t('error_required'))
    }
  }

  const prevStep = () => {
    setStep(prev => prev - 1)
  }

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(4)) {
      toast.error(t('error_required'))
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale })
      })

      if (res.ok) {
        const data = await res.json()
        setCreatedLead(data.lead)
        setSubmitted(true)
        toast.success(isAr ? 'تم إرسال طلبك بنجاح!' : 'Your request has been sent successfully!')
      } else {
        const errorData = await res.json()
        if (res.status === 503 || errorData.code === 'DATABASE_UNAVAILABLE') {
          setDbOffline(true)
        } else if (errorData.details) {
          const detailMsgs = Object.entries(errorData.details)
            .map(([field, err]: [string, any]) => `${field}: ${err._errors.join(', ')}`)
            .join(' | ')
          toast.error(`${errorData.error}: ${detailMsgs}`)
        } else {
          toast.error(errorData.error || 'Something went wrong')
        }
      }
    } catch (err) {
      toast.error(isAr ? 'عذراً، حدث خطأ أثناء الإرسال.' : 'An error occurred during submission.')
    } finally {
      setLoading(false)
    }
  }

  // Navigation indicator width
  const progressPercent = (step / 4) * 100

  if (dbOffline) {
    const selectedService = services.find(s => s.id === formData.requestedServiceId)
    const serviceName = selectedService 
      ? (locale === 'ar' ? selectedService.nameAr : locale === 'fr' ? selectedService.nameFr : selectedService.nameEn)
      : ''

    let messageText = ''
    if (locale === 'ar') {
      messageText = `السلام عليكم WEZO MEDIA، أريد الاستفسار عن عرض سعر لمشروعي.\nالمشروع: ${formData.businessName}\nالخدمة: ${serviceName}\nتفاصيل: ${formData.objective}`
    } else if (locale === 'fr') {
      messageText = `Bonjour WEZO MEDIA, je souhaite demander un devis.\nProjet : ${formData.businessName}\nService : ${serviceName}\nDétails : ${formData.objective}`
    } else {
      messageText = `Hello WEZO MEDIA, I would like to request a quote.\nProject: ${formData.businessName}\nService: ${serviceName}\nDetails: ${formData.objective}`
    }

    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(messageText)}`

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto glass-card p-12 rounded-[2.5rem] border-red-500/20 shadow-2xl text-center space-y-8 text-start"
      >
        <div className="w-20 h-20 rounded-full bg-red-500/10 text-red-500 mx-auto flex items-center justify-center border border-red-500/20">
          <AlertCircle className="w-10 h-10 animate-pulse" />
        </div>
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-black text-white">
            {locale === 'ar' ? 'تعذر إرسال الطلب حالياً' : 'Request could not be sent'}
          </h2>
          <p className="text-text-muted leading-relaxed font-bold">
            {locale === 'ar' 
              ? 'تعذر إرسال الطلب حالياً. يمكنك المحاولة لاحقاً أو التواصل معنا مباشرة عبر WhatsApp.'
              : 'We are experiencing temporary technical difficulties. Please try again later or contact us directly via WhatsApp.'}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Button 
            onClick={() => window.open(whatsappUrl, '_blank')} 
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all"
          >
            {locale === 'ar' ? 'تواصل معنا مباشرة عبر واتساب 💬' : 'Contact us directly via WhatsApp 💬'}
          </Button>
          <Button 
            onClick={() => {
              setDbOffline(false)
              setStep(1)
            }} 
            variant="outline"
            className="w-full h-14 border-white/10 hover:bg-white/5 text-white rounded-2xl font-bold text-lg"
          >
            {locale === 'ar' ? 'العودة للمحاولة' : 'Back to Form'}
          </Button>
        </div>
      </motion.div>
    )
  }

  if (submitted) {
    const selectedService = services.find(s => s.id === formData.requestedServiceId)
    const serviceName = selectedService 
      ? (locale === 'ar' ? selectedService.nameAr : locale === 'fr' ? selectedService.nameFr : selectedService.nameEn)
      : ''

    const leadRef = createdLead?.id || 'WEZO-XXXX'

    // Clean formatted message for WhatsApp (no budgets, email, UTMs, or sensitive items)
    let messageText = ''
    if (locale === 'ar') {
      messageText = `السلام عليكم WEZO MEDIA، أرسلت الآن طلب عرض سعر.\nرقم الطلب: ${leadRef}\nالمشروع: ${formData.businessName}\nالخدمة: ${serviceName}`
    } else if (locale === 'fr') {
      messageText = `Bonjour WEZO MEDIA, je viens d’envoyer une demande de devis.\nRéférence : ${leadRef}\nProjet : ${formData.businessName}\nService : ${serviceName}`
    } else {
      messageText = `Hello WEZO MEDIA, I have just sent a quote request.\nReference: ${leadRef}\nProject: ${formData.businessName}\nService: ${serviceName}`
    }

    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(messageText)}`
    
    const whatsappButtonText = locale === 'ar' 
      ? 'تواصل معنا عبر واتساب 💬' 
      : locale === 'fr' 
        ? 'Contactez-nous via WhatsApp 💬' 
        : 'Contact us via WhatsApp 💬'

    // Track click event in Analytics
    const handleWhatsAppClick = () => {
      if (typeof window !== 'undefined') {
        console.log('Analytics event recorded: click_whatsapp_after_lead')
        if ((window as any).gtag) {
          ;(window as any).gtag('event', 'click_whatsapp_after_lead', {
            event_category: 'engagement',
            event_label: leadRef
          })
        }
      }
      window.open(whatsappUrl, '_blank')
    }

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto glass-card p-12 rounded-[2.5rem] border-white/5 shadow-2xl text-center space-y-8"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center border border-emerald-500/20">
          <Check className="w-10 h-10" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-white">{t('success_title')}</h2>
          <p className="text-text-muted leading-relaxed">{t('success_desc')}</p>
          <div className="bg-white/5 py-2 px-4 rounded-xl border border-white/5 w-fit mx-auto mt-2">
            <p className="text-xs text-text-muted font-bold">
              {isAr ? `رقم الطلب: ${leadRef}` : `Reference: ${leadRef}`}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button 
            onClick={handleWhatsAppClick} 
            className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all"
          >
            {whatsappButtonText}
          </Button>
          <Button 
            onClick={() => router.push('/')} 
            variant="outline"
            className="w-full h-14 border-white/10 hover:bg-white/5 text-white rounded-2xl font-bold text-lg"
          >
            {t('back_home')}
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-10 space-y-4">
        <div className="flex justify-between items-center text-sm font-bold text-text-muted">
          <span>{t('step')} {step} {t('of')} 4</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-brand-orange to-[#FF4D80]"
          />
        </div>
      </div>

      <div className="glass-card p-6 md:p-12 rounded-[2.5rem] border-white/5 shadow-2xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: isAr ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAr ? 20 : -20 }}
              className="space-y-8"
            >
              <div className="space-y-2 text-start">
                <h2 className="text-2xl md:text-3xl font-black text-white">{t('step1_title')}</h2>
                <p className="text-text-muted text-sm md:text-base">{t('step1_subtitle')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => {
                  const isSelected = formData.requestedServiceId === service.id
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceSelect(service.id)}
                      className={`p-6 rounded-2xl border text-start transition-all hover:bg-white/[0.02] flex flex-col justify-between h-44 ${
                        isSelected 
                          ? 'border-brand-orange bg-brand-orange/5 shadow-[0_0_15px_rgba(255,107,43,0.15)]' 
                          : 'border-white/5 bg-transparent'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        {getServiceIcon(service.slug)}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-white text-lg">
                          {locale === 'ar' ? service.nameAr : locale === 'fr' ? service.nameFr : service.nameEn}
                        </h4>
                        <p className="text-xs text-text-muted line-clamp-2">
                          {locale === 'ar' ? service.descAr : locale === 'fr' ? service.descFr : service.descEn}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: isAr ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAr ? 20 : -20 }}
              className="space-y-8"
            >
              <div className="space-y-2 text-start">
                <h2 className="text-2xl md:text-3xl font-black text-white">{t('step2_title')}</h2>
                <p className="text-text-muted text-sm md:text-base">{t('step2_subtitle')}</p>
              </div>

              <div className="space-y-6 text-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white font-bold">{t('business_label')} *</Label>
                    <Input
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder={t('business_placeholder')}
                      className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white font-bold">{t('industry_label')} *</Label>
                    <Input
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder={t('industry_placeholder')}
                      className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white font-bold">{t('city_label')} *</Label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder={t('city_placeholder')}
                      className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white font-bold">{t('website_label')}</Label>
                    <Input
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder={t('website_placeholder')}
                      className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-6 rounded-2xl border-white/10 hover:bg-white/5 text-white flex items-center gap-2"
                  >
                    <ArrowLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                    {t('prev')}
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 h-14 rounded-2xl gradient-brand text-white font-bold flex items-center justify-center gap-2"
                  >
                    {t('next')}
                    <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: isAr ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAr ? 20 : -20 }}
              className="space-y-8"
            >
              <div className="space-y-2 text-start">
                <h2 className="text-2xl md:text-3xl font-black text-white">{t('step3_title')}</h2>
                <p className="text-text-muted text-sm md:text-base">{t('step3_subtitle')}</p>
              </div>

              <div className="space-y-6 text-start">
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t('objective_label')} *</Label>
                  <Textarea
                    name="objective"
                    value={formData.objective}
                    onChange={handleChange}
                    placeholder={t('objective_placeholder')}
                    className="bg-brand-dark/50 border-white/10 min-h-[120px] rounded-2xl"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white font-bold">{t('budget_min')} *</Label>
                    <Input
                      name="budgetMin"
                      type="number"
                      value={formData.budgetMin}
                      onChange={handleChange}
                      placeholder="e.g. 5000"
                      className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white font-bold">{t('budget_max')} *</Label>
                    <Input
                      name="budgetMax"
                      type="number"
                      value={formData.budgetMax}
                      onChange={handleChange}
                      placeholder="e.g. 20000"
                      className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-6 rounded-2xl border-white/10 hover:bg-white/5 text-white flex items-center gap-2"
                  >
                    <ArrowLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                    {t('prev')}
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="flex-1 h-14 rounded-2xl gradient-brand text-white font-bold flex items-center justify-center gap-2"
                  >
                    {t('next')}
                    <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: isAr ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isAr ? 20 : -20 }}
              className="space-y-8"
            >
              <div className="space-y-2 text-start">
                <h2 className="text-2xl md:text-3xl font-black text-white">{t('step4_title')}</h2>
                <p className="text-text-muted text-sm md:text-base">{t('step4_subtitle')}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-start">
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t('name_label')} *</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('name_placeholder')}
                    className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white font-bold">{t('phone_label')} *</Label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('phone_placeholder')}
                      className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white font-bold">{t('whatsapp_label')} *</Label>
                    <Input
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder={t('whatsapp_placeholder')}
                      className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white font-bold">{t('email_label')}</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('email_placeholder')}
                    className="bg-brand-dark/50 border-white/10 h-14 rounded-2xl"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-6 rounded-2xl border-white/10 hover:bg-white/5 text-white flex items-center gap-2"
                  >
                    <ArrowLeft className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                    {t('prev')}
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-14 rounded-2xl gradient-brand text-white font-bold flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        {t('submit')}
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
