'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles,
  Film,
  Music,
  Globe,
  Megaphone,
  Bot,
  Palette,
  HelpCircle,
  AlertCircle,
  Layers,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { siteConfig } from '@/lib/config/site'
import { trackFormStart, trackLeadSubmit, trackWhatsAppClick } from '@/lib/analytics/gtag'

export interface QuoteServiceItem {
  id: string
  slug: string
  nameAr: string
  nameEn: string
  nameFr: string
  descAr: string
  descEn: string
  descFr: string
  showInQuoteForm?: boolean
  parentServiceId?: string | null
  order?: number
}

interface QuoteFormProps {
  services: QuoteServiceItem[]
}

const SPECIAL_QUOTE_OPTIONS: QuoteServiceItem[] = [
  {
    id: 'custom-project',
    slug: 'custom-project',
    nameAr: 'نظام نمو متكامل / خدمة مخصصة',
    nameEn: 'Full Growth System / Custom Project',
    nameFr: 'Système de croissance complet / Projet sur-mesure',
    descAr: 'باقة شاملة تجمع أكثر من خدمة (مثل الإعلانات + صفحة هبوط + أتمتة واتساب وCRM).',
    descEn: 'Turnkey bundle combining multiple services (Paid Ads + Funnel + WhatsApp CRM).',
    descFr: 'Pack combinant plusieurs services (Publicité + Landing Page + Automatisation WhatsApp).',
    showInQuoteForm: true,
    order: 90,
  },
  {
    id: 'need-consultation',
    slug: 'need-consultation',
    nameAr: 'لست متأكداً — أحتاج استشارة لاختيار الحل المناسب',
    nameEn: 'Not sure yet — I need consultation',
    nameFr: 'Je ne suis pas sûr — Besoin de conseil',
    descAr: 'سيساعدك فريقنا في تشخيص احتياج مشروعك واقتراح الخطة الأنسب لميزانيتك.',
    descEn: 'Our team will diagnose your business needs and recommend the right execution plan.',
    descFr: 'Notre équipe vous aide à diagnostiquer votre besoin et choisir la solution idéale.',
    showInQuoteForm: true,
    order: 91,
  },
]

export default function QuoteForm({ services }: QuoteFormProps) {
  const t = useTranslations('quote')
  const locale = useLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [createdLead, setCreatedLead] = useState<any>(null)
  const [dbOffline, setDbOffline] = useState(false)

  const preselectedParam = searchParams ? searchParams.get('service') : null
  const hasTrackedStart = useRef(false)

  // All selectable services (all 26 DB services + 2 special consultation/custom options)
  const allKnownServices = useMemo(() => {
    return [...services, ...SPECIAL_QUOTE_OPTIONS]
  }, [services])

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
    requestedServiceId: '',
  })

  // Pre-select exact service (including specialized sub-services!) when arriving from ?service=slug
  useEffect(() => {
    if (preselectedParam && allKnownServices.length > 0) {
      const normalized = preselectedParam.toLowerCase().trim()
      const found = allKnownServices.find(
        (s) => s.id === preselectedParam || s.slug.toLowerCase() === normalized
      )
      if (found) {
        setFormData((prev) => ({ ...prev, requestedServiceId: found.id }))
        setStep(2)
      }
    }
  }, [preselectedParam, allKnownServices])

  // Build the 8 cards for Step 1 (+ any preselected specialized sub-service if user goes back to Step 1)
  const step1Options = useMemo(() => {
    const coreQuoteServices = services.filter((s) => s.showInQuoteForm)
    // Fallback if showInQuoteForm is not set on any item
    const basePillars =
      coreQuoteServices.length > 0 ? coreQuoteServices : services.slice(0, 6)

    const list: QuoteServiceItem[] = [...basePillars, ...SPECIAL_QUOTE_OPTIONS]

    // If the currently selected service is a specialized sub-service (showInQuoteForm: false),
    // include it at the top of Step 1 so the user sees their exact specialized service!
    if (formData.requestedServiceId) {
      const alreadyInList = list.some((item) => item.id === formData.requestedServiceId)
      if (!alreadyInList) {
        const specialized = services.find((s) => s.id === formData.requestedServiceId)
        if (specialized) {
          return [specialized, ...list]
        }
      }
    }

    return list
  }, [services, formData.requestedServiceId])

  const selectedServiceObj = useMemo(() => {
    return allKnownServices.find((s) => s.id === formData.requestedServiceId) || null
  }, [allKnownServices, formData.requestedServiceId])

  const getLocalizedName = (item: QuoteServiceItem | null) => {
    if (!item) return ''
    if (isAr) return item.nameAr || item.nameEn
    if (isFr) return item.nameFr || item.nameEn
    return item.nameEn || item.nameAr
  }

  const getLocalizedDesc = (item: QuoteServiceItem | null) => {
    if (!item) return ''
    if (isAr) return item.descAr || item.descEn
    if (isFr) return item.descFr || item.descEn
    return item.descEn || item.descAr
  }

  const triggerFormStart = () => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true
      trackFormStart({
        formId: 'quote_form',
        formName: 'Multi-Step Quote Form',
        pagePath: '/get-quote',
        locale,
      })
    }
  }

  // Get service icon
  const getServiceIcon = (slug: string) => {
    if (slug === 'custom-project') return <Sparkles className="w-7 h-7 text-brand-orange" />
    if (slug === 'need-consultation') return <HelpCircle className="w-7 h-7 text-amber-400" />
    if (slug === 'whatsapp-lead-automation' || slug.includes('crm') || slug.includes('ai-business')) {
      return <Bot className="w-7 h-7 text-emerald-400" />
    }
    if (slug.includes('video') || slug.includes('reels') || slug.includes('ugc') || slug.includes('motion')) {
      return <Film className="w-7 h-7 text-brand-orange" />
    }
    if (slug.includes('audio') || slug.includes('music') || slug.includes('artist')) {
      return <Music className="w-7 h-7 text-[#FF4D80]" />
    }
    if (slug.includes('web') || slug.includes('landing') || slug.includes('ecommerce')) {
      return <Globe className="w-7 h-7 text-blue-400" />
    }
    if (slug.includes('brand') || slug.includes('social') || slug.includes('design') || slug.includes('content')) {
      return <Palette className="w-7 h-7 text-purple-400" />
    }
    if (slug.includes('ads') || slug.includes('marketing') || slug.includes('audit')) {
      return <Megaphone className="w-7 h-7 text-brand-orange" />
    }
    return <Layers className="w-7 h-7 text-purple-400" />
  }

  // Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    triggerFormStart()
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle Service Selection
  const handleServiceSelect = (serviceId: string) => {
    triggerFormStart()
    setFormData((prev) => ({ ...prev, requestedServiceId: serviceId }))
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
      setStep((prev) => prev + 1)
    } else {
      toast.error(t('error_required'))
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
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
      const isSpecialChoice =
        formData.requestedServiceId === 'custom-project' ||
        formData.requestedServiceId === 'need-consultation'

      const serviceName = getLocalizedName(selectedServiceObj) || 'General'
      const enrichedObjective = isSpecialChoice
        ? `[${serviceName}] ${formData.objective}`
        : formData.objective

      const payload = {
        ...formData,
        objective: enrichedObjective,
        // Preserve exact DB service ID (including specialized sub-services!), or null for special choices
        requestedServiceId: isSpecialChoice ? null : formData.requestedServiceId,
        locale,
      }

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const data = await res.json()
        setCreatedLead(data.lead)
        setSubmitted(true)

        trackLeadSubmit({
          formId: 'quote_form',
          serviceInterest: serviceName,
          budgetTier: `${formData.budgetMin || 0}-${formData.budgetMax || 0}`,
          pagePath: '/get-quote',
          locale,
        })

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
    const serviceName = getLocalizedName(selectedServiceObj)

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
            onClick={() => {
              trackWhatsAppClick({
                ctaLocation: 'quote_form_db_offline',
                service: serviceName,
                pagePath: '/get-quote',
                locale,
              })
              window.open(whatsappUrl, '_blank')
            }}
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
    const serviceName = getLocalizedName(selectedServiceObj)
    const leadRef = createdLead?.id || 'WEZO-XXXX'

    let messageText = ''
    if (locale === 'ar') {
      messageText = `السلام عليكم WEZO MEDIA، أرسلت الآن طلب عرض سعر.\nرقم الطلب: ${leadRef}\nالمشروع: ${formData.businessName}\nالخدمة: ${serviceName}`
    } else if (locale === 'fr') {
      messageText = `Bonjour WEZO MEDIA, je viens d’envoyer une demande de devis.\nRéférence : ${leadRef}\nProjet : ${formData.businessName}\nService : ${serviceName}`
    } else {
      messageText = `Hello WEZO MEDIA, I have just sent a quote request.\nReference: ${leadRef}\nProject: ${formData.businessName}\nService: ${serviceName}`
    }

    const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(messageText)}`

    const whatsappButtonText =
      locale === 'ar'
        ? 'تواصل معنا عبر واتساب 💬'
        : locale === 'fr'
          ? 'Contactez-nous via WhatsApp 💬'
          : 'Contact us via WhatsApp 💬'

    const handleWhatsAppClick = () => {
      trackWhatsAppClick({
        ctaLocation: 'quote_form_success',
        service: serviceName,
        pagePath: '/get-quote',
        locale,
      })
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
      <div className="mb-8 space-y-4">
        <div className="flex justify-between items-center text-sm font-bold text-text-muted">
          <span>
            {t('step')} {step} {t('of')} 4
          </span>
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

      {/* Selected Service Banner on Steps 2-4 */}
      {step > 1 && selectedServiceObj && (
        <div className="mb-6 px-5 py-3.5 rounded-2xl bg-brand-orange/10 border border-brand-orange/25 flex items-center justify-between gap-4 text-start">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-orange/20 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-brand-orange" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-brand-orange uppercase tracking-wider">
                {isAr
                  ? 'الخدمة المختارة'
                  : isFr
                    ? 'Prestation sélectionnée'
                    : 'Selected Service'}
              </p>
              <p className="text-sm font-black text-white">{getLocalizedName(selectedServiceObj)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-xs font-bold text-white/75 hover:text-brand-orange underline underline-offset-4 shrink-0 transition-colors"
          >
            {isAr ? 'تغيير الخدمة' : isFr ? 'Modifier' : 'Change'}
          </button>
        </div>
      )}

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
                {step1Options.map((service) => {
                  const isSelected = formData.requestedServiceId === service.id
                  const isSpecial =
                    service.id === 'custom-project' || service.id === 'need-consultation'

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceSelect(service.id)}
                      className={`p-6 rounded-2xl border text-start transition-all hover:bg-white/[0.03] flex flex-col justify-between min-h-[11rem] ${
                        isSelected
                          ? 'border-brand-orange bg-brand-orange/10 shadow-[0_0_20px_rgba(255,107,43,0.18)]'
                          : isSpecial
                            ? 'border-dashed border-white/15 bg-white/[0.015] hover:border-brand-orange/40'
                            : 'border-white/10 bg-transparent hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                          {getServiceIcon(service.slug)}
                        </div>
                        {isSelected && (
                          <span className="px-2.5 py-1 rounded-full bg-brand-orange text-white text-[10px] font-black uppercase">
                            {isAr ? 'محدد' : isFr ? 'Sélectionné' : 'Selected'}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1.5 pt-4">
                        <h4 className="font-bold text-white text-base md:text-lg leading-snug">
                          {getLocalizedName(service)}
                        </h4>
                        <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                          {getLocalizedDesc(service)}
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
