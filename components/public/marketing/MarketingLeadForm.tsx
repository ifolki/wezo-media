'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Send, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  Globe2, 
  Target, 
  TrendingUp, 
  Check, 
  MessageCircle,
  RotateCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/lib/config/site'
import { toast } from 'sonner'

interface Props {
  locale: string
}

export default function MarketingLeadForm({ locale }: Props) {
  const t = useTranslations('marketing_service.form')
  const isAr = locale === 'ar'

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    industry: '',
    city: '',
    website: '',
    instagram: '',
    facebook: '',
    otherLinks: '',
    need: 'strategy',
    challenge: '',
    runAds: 'yes_regular',
    goal: '',
    budget: 'tier2'
  })

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  const validateStep = (currentStep: number) => {
    const errs: Record<string, string> = {}
    if (currentStep === 1) {
      if (!formData.name.trim()) errs.name = t('validation_required')
      if (!formData.phone.trim()) errs.phone = t('validation_phone')
      if (!formData.company.trim()) errs.company = t('validation_required')
      if (!formData.industry.trim()) errs.industry = t('validation_required')
      if (!formData.city.trim()) errs.city = t('validation_required')
    } else if (currentStep === 4) {
      if (!formData.challenge.trim()) errs.challenge = t('validation_required')
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => Math.min(prev + 1, 5))
    }
  }

  const handlePrev = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(step)) return

    setLoading(true)

    // Map budget tier to approximate numeric values
    let budgetMin: number | null = null
    let budgetMax: number | null = null
    if (formData.budget === 'tier1') {
      budgetMax = 5000
    } else if (formData.budget === 'tier2') {
      budgetMin = 5000
      budgetMax = 15000
    } else if (formData.budget === 'tier3') {
      budgetMin = 15000
      budgetMax = 30000
    } else if (formData.budget === 'tier4') {
      budgetMin = 30000
    }

    const compiledMessage = `
[DEMANDE ÉTUDE MARKETING DIGITAL]
- Présence existante : Site: ${formData.website || 'N/A'} | Instagram: ${formData.instagram || 'N/A'} | FB: ${formData.facebook || 'N/A'} | Autres: ${formData.otherLinks || 'N/A'}
- Besoin majeur : ${formData.need}
- Défi actuel : ${formData.challenge}
- Historique pub : ${formData.runAds}
- Objectif visé : ${formData.goal || 'Non spécifié'}
- Tranche budgétaire : ${formData.budget}
    `.trim()

    const payload = {
      name: formData.name,
      phone: formData.phone,
      whatsapp: formData.phone,
      businessName: formData.company,
      industry: formData.industry,
      city: formData.city,
      websiteUrl: formData.website || formData.instagram || '',
      objective: `Marketing Service: ${formData.need}`,
      budgetMin,
      budgetMax,
      message: compiledMessage,
      locale,
      source: 'Marketing Service Page'
    }

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        setSubmitted(true)
        toast.success(isAr ? 'تم استلام طلبك بنجاح' : 'Demande reçue avec succès')
      } else {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to submit')
      }
    } catch (err: any) {
      console.error('Lead submission failed:', err)
      toast.error(isAr ? 'حدث خطأ. يرجى المحاولة أو التواصل مباشرة عبر واتساب.' : 'Une erreur est survenue. Veuillez réessayer ou contacter directement via WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const whatsappMessage = encodeURIComponent(
    isAr
      ? `السلام عليكم WEZO MEDIA، بغيت نناقش التسويق الرقمي ديال مشروعي (${formData.company || 'مشروعي'}).`
      : locale === 'en'
      ? `Hello WEZO MEDIA, I would like to discuss digital marketing for my project (${formData.company || 'my project'}).`
      : `Bonjour WEZO MEDIA, je souhaite discuter du marketing digital de mon projet (${formData.company || 'mon projet'}).`
  )

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`

  return (
    <section id="project-request" className="py-20 md:py-28 bg-[#FFFFFF] border-y border-[#EBE7DC] text-[#111118] relative">
      <div className="container-custom max-w-4xl">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-base sm:text-lg text-[#555562] leading-relaxed max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Form Container Card */}
        <div className="rounded-3xl border border-[#E5E0D2] bg-[#FDFCF9] shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 sm:p-10 md:p-12">
          
          {!submitted ? (
            <div>
              {/* Step Progress Bar */}
              <div className="mb-10 space-y-3">
                <div className="flex items-center justify-between text-xs font-black text-[#5C5C6A]">
                  <span>{t('step_indicator', { current: step, total: 5 })}</span>
                  <span className="text-brand-orange font-bold">
                    {step === 1 && t('step1_title')}
                    {step === 2 && t('step2_title')}
                    {step === 3 && t('step3_title')}
                    {step === 4 && t('step4_title')}
                    {step === 5 && t('step5_title')}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-[#EBE7DC] overflow-hidden">
                  <motion.div
                    className="h-full gradient-brand rounded-full"
                    initial={{ width: '20%' }}
                    animate={{ width: `${(step / 5) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  
                  {/* STEP 1: BUSINESS BASICS */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isAr ? -20 : 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 text-start"
                    >
                      <div className="border-b border-[#F0ECE1] pb-4">
                        <h3 className="text-xl font-black text-[#111118] flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-brand-orange" />
                          <span>{t('step1_title')}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6C6C7A] mt-1">
                          {t('step1_desc')}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-[#33333F]">
                            {t('name_label')}
                          </label>
                          <Input
                            value={formData.name}
                            onChange={e => updateField('name', e.target.value)}
                            placeholder={t('name_placeholder')}
                            className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl h-12 text-[#111118]"
                          />
                          {errors.name && <span className="text-[11px] text-red-500 font-bold">{errors.name}</span>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-[#33333F]">
                            {t('phone_label')}
                          </label>
                          <Input
                            value={formData.phone}
                            onChange={e => updateField('phone', e.target.value)}
                            placeholder={t('phone_placeholder')}
                            className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl h-12 text-[#111118]"
                            dir="ltr"
                          />
                          {errors.phone && <span className="text-[11px] text-red-500 font-bold">{errors.phone}</span>}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-[#33333F]">
                          {t('company_label')}
                        </label>
                        <Input
                          value={formData.company}
                          onChange={e => updateField('company', e.target.value)}
                          placeholder={t('company_placeholder')}
                          className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl h-12 text-[#111118]"
                        />
                        {errors.company && <span className="text-[11px] text-red-500 font-bold">{errors.company}</span>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-[#33333F]">
                            {t('industry_label')}
                          </label>
                          <Input
                            value={formData.industry}
                            onChange={e => updateField('industry', e.target.value)}
                            placeholder={t('industry_placeholder')}
                            className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl h-12 text-[#111118]"
                          />
                          {errors.industry && <span className="text-[11px] text-red-500 font-bold">{errors.industry}</span>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-[#33333F]">
                            {t('city_label')}
                          </label>
                          <Input
                            value={formData.city}
                            onChange={e => updateField('city', e.target.value)}
                            placeholder={t('city_placeholder')}
                            className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl h-12 text-[#111118]"
                          />
                          {errors.city && <span className="text-[11px] text-red-500 font-bold">{errors.city}</span>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: DIGITAL PRESENCE */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isAr ? -20 : 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 text-start"
                    >
                      <div className="border-b border-[#F0ECE1] pb-4">
                        <h3 className="text-xl font-black text-[#111118] flex items-center gap-2">
                          <Globe2 className="w-5 h-5 text-brand-orange" />
                          <span>{t('step2_title')}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6C6C7A] mt-1">
                          {t('step2_desc')}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-[#33333F]">
                            {t('website_label')}
                          </label>
                          <Input
                            value={formData.website}
                            onChange={e => updateField('website', e.target.value)}
                            placeholder={t('website_placeholder')}
                            className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl h-12 text-[#111118]"
                            dir="ltr"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-[#33333F]">
                            {t('instagram_label')}
                          </label>
                          <Input
                            value={formData.instagram}
                            onChange={e => updateField('instagram', e.target.value)}
                            placeholder={t('instagram_placeholder')}
                            className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl h-12 text-[#111118]"
                            dir="ltr"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-[#33333F]">
                            {t('facebook_label')}
                          </label>
                          <Input
                            value={formData.facebook}
                            onChange={e => updateField('facebook', e.target.value)}
                            placeholder={t('facebook_placeholder')}
                            className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl h-12 text-[#111118]"
                            dir="ltr"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-black text-[#33333F]">
                            {t('other_links_label')}
                          </label>
                          <Input
                            value={formData.otherLinks}
                            onChange={e => updateField('otherLinks', e.target.value)}
                            placeholder={t('other_links_placeholder')}
                            className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl h-12 text-[#111118]"
                            dir="ltr"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: CORE NEED */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isAr ? -20 : 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 text-start"
                    >
                      <div className="border-b border-[#F0ECE1] pb-4">
                        <h3 className="text-xl font-black text-[#111118] flex items-center gap-2">
                          <Target className="w-5 h-5 text-brand-orange" />
                          <span>{t('step3_title')}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6C6C7A] mt-1">
                          {t('step3_desc')}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-black text-[#33333F]">
                          {t('need_label')}
                        </label>

                        <div className="grid grid-cols-1 gap-3">
                          {[
                            'strategy',
                            'advertising',
                            'content',
                            'leads',
                            'website',
                            'full',
                            'not_sure'
                          ].map(optKey => {
                            const isSelected = formData.need === optKey
                            return (
                              <div
                                key={optKey}
                                onClick={() => updateField('need', optKey)}
                                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-brand-orange bg-brand-orange/5 shadow-sm'
                                    : 'border-[#DDD8CA] bg-white hover:border-[#CCC6B5]'
                                }`}
                              >
                                <span className={`text-sm font-bold ${isSelected ? 'text-brand-orange' : 'text-[#33333F]'}`}>
                                  {t(`need_options.${optKey}`)}
                                </span>
                                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                  isSelected ? 'border-brand-orange bg-brand-orange text-white' : 'border-[#CCC7B8]'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3" />}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: BUSINESS SITUATION */}
                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isAr ? -20 : 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 text-start"
                    >
                      <div className="border-b border-[#F0ECE1] pb-4">
                        <h3 className="text-xl font-black text-[#111118] flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-brand-orange" />
                          <span>{t('step4_title')}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6C6C7A] mt-1">
                          {t('step4_desc')}
                        </p>
                      </div>

                      {/* Main Challenge */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-[#33333F]">
                          {t('challenge_label')}
                        </label>
                        <Textarea
                          value={formData.challenge}
                          onChange={e => updateField('challenge', e.target.value)}
                          placeholder={t('challenge_placeholder')}
                          className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl min-h-[90px] text-[#111118]"
                        />
                        {errors.challenge && <span className="text-[11px] text-red-500 font-bold">{errors.challenge}</span>}
                      </div>

                      {/* Run Ads Before? */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-[#33333F]">
                          {t('run_ads_label')}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {['yes_regular', 'yes_occasional', 'never'].map(opt => {
                            const isSelected = formData.runAds === opt
                            return (
                              <div
                                key={opt}
                                onClick={() => updateField('runAds', opt)}
                                className={`p-3.5 rounded-xl border cursor-pointer text-center text-xs font-black transition-all ${
                                  isSelected
                                    ? 'border-brand-orange bg-brand-orange/5 text-brand-orange shadow-sm'
                                    : 'border-[#DDD8CA] bg-white text-[#444452] hover:border-[#CCC6B5]'
                                }`}
                              >
                                {t(`run_ads_options.${opt}`)}
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Goal */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-[#33333F]">
                          {t('goal_label')}
                        </label>
                        <Input
                          value={formData.goal}
                          onChange={e => updateField('goal', e.target.value)}
                          placeholder={t('goal_placeholder')}
                          className="bg-white border-[#DDD8CA] focus:border-brand-orange text-sm rounded-xl h-12 text-[#111118]"
                        />
                      </div>

                      {/* Budget Tier */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-[#33333F]">
                          {t('budget_label')}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {['tier1', 'tier2', 'tier3', 'tier4', 'undecided'].map(opt => {
                            const isSelected = formData.budget === opt
                            return (
                              <div
                                key={opt}
                                onClick={() => updateField('budget', opt)}
                                className={`p-3 rounded-xl border cursor-pointer text-xs font-bold transition-all flex items-center justify-between ${
                                  isSelected
                                    ? 'border-brand-orange bg-brand-orange/5 text-brand-orange'
                                    : 'border-[#DDD8CA] bg-white text-[#444452] hover:border-[#CCC6B5]'
                                }`}
                              >
                                <span>{t(`budget_options.${opt}`)}</span>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isSelected ? 'border-brand-orange bg-brand-orange text-white' : 'border-[#CCC7B8]'
                                }`}>
                                  {isSelected && <Check className="w-2.5 h-2.5" />}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: RECAP & CONFIRM */}
                  {step === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: isAr ? -20 : 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 text-start"
                    >
                      <div className="border-b border-[#F0ECE1] pb-4">
                        <h3 className="text-xl font-black text-[#111118] flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span>{t('step5_title')}</span>
                        </h3>
                        <p className="text-xs sm:text-sm text-[#6C6C7A] mt-1">
                          {t('step5_desc')}
                        </p>
                      </div>

                      {/* Recap Box */}
                      <div className="p-6 rounded-2xl bg-white border border-[#E0DCCE] space-y-3.5 text-xs sm:text-sm">
                        <div className="flex items-center justify-between py-1.5 border-b border-[#F4F1E8]">
                          <span className="font-bold text-[#777785]">{t('recap_name')}</span>
                          <span className="font-black text-[#111118]">{formData.name} ({formData.phone})</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5 border-b border-[#F4F1E8]">
                          <span className="font-bold text-[#777785]">{t('recap_company')}</span>
                          <span className="font-black text-[#111118]">{formData.company} ({formData.industry})</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5 border-b border-[#F4F1E8]">
                          <span className="font-bold text-[#777785]">{t('recap_city')}</span>
                          <span className="font-black text-[#111118]">{formData.city}</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5 border-b border-[#F4F1E8]">
                          <span className="font-bold text-[#777785]">{t('recap_need')}</span>
                          <span className="font-black text-brand-orange">{t(`need_options.${formData.need}`)}</span>
                        </div>
                        <div className="flex items-center justify-between py-1.5">
                          <span className="font-bold text-[#777785]">{t('recap_budget')}</span>
                          <span className="font-black text-[#111118]">{t(`budget_options.${formData.budget}`)}</span>
                        </div>
                      </div>

                      {/* Notice */}
                      <div className="p-4 rounded-xl bg-[#F4F1E8] border border-[#E5E0D2] text-xs text-[#555562] leading-relaxed">
                        {t('recap_notice')}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-[#F0ECE1]">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="h-12 px-6 rounded-xl border border-[#D5D0C2] bg-white hover:bg-[#F2EFE6] text-[#22222E] font-bold text-xs sm:text-sm transition-all active:scale-95 inline-flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                      <span>{t('btn_prev')}</span>
                    </button>
                  ) : <div />}

                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="h-12 px-7 rounded-xl gradient-brand text-white font-black text-xs sm:text-sm hover:opacity-95 shadow-md active:scale-95 transition-all inline-flex items-center gap-2"
                    >
                      <span>{t('btn_next')}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="h-13 px-8 rounded-xl gradient-brand text-white font-black text-sm hover:opacity-95 shadow-[0_10px_30px_rgba(255,107,43,0.35)] active:scale-95 transition-all inline-flex items-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{loading ? t('submitting') : t('btn_submit')}</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-12 px-4 text-center space-y-6 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-[#111118]">
                  {t('success_title')}
                </h3>
                <p className="text-sm sm:text-base text-[#4E4E5C] leading-relaxed">
                  {t('success_desc')}
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full sm:w-auto h-13 px-7 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md active:scale-95 transition-all gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{t('success_cta_whatsapp')}</span>
                  </Button>
                </a>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSubmitted(false)
                    setStep(1)
                  }}
                  className="w-full sm:w-auto h-13 px-6 rounded-xl border-[#D8D4C7] bg-white text-[#33333F] hover:bg-[#F2EFE6] font-bold text-xs active:scale-95 transition-all gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('success_cta_reset')}</span>
                </Button>
              </div>
            </motion.div>
          )}

        </div>

      </div>
    </section>
  )
}
