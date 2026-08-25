// components/public/GrowthLanding.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { SectorGrowthConfig } from '@/lib/config/growth'
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Sparkles, 
  Film, 
  Music, 
  Globe, 
  Megaphone, 
  User, 
  AlertCircle, 
  TrendingUp, 
  Zap, 
  Clock, 
  Database,
  Lock,
  Eye,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Link } from '@/navigation'

interface Props {
  config: SectorGrowthConfig;
  locale: string;
}

export default function GrowthLanding({ config, locale }: Props) {
  const t = useTranslations('growth')
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'
  const searchParams = useSearchParams()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [leadScore, setLeadScore] = useState<'HOT' | 'WARM' | 'LOW'>('LOW')

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    whatsapp: '',
    city: '',
    industry: config.slug !== 'general' ? config.nameEn : '',
    website: '',
    offer: '',
    ticket: '',
    runAds: 'no',
    adSpend: '',
    goal: 'Leads',
    budget: '5000-10000',
    timeline: 'immediate'
  })

  // Get Localized values
  const getLocalized = (ar: string, en: string, fr?: string) => {
    if (isAr) return ar || en
    if (isFr) return fr || en
    return en || ar
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Multi-step validation
  const validateStep = () => {
    if (step === 1) {
      return formData.name.trim() !== '' && 
             formData.company.trim() !== '' && 
             formData.whatsapp.trim() !== '' && 
             formData.city.trim() !== ''
    }
    if (step === 2) {
      return formData.offer.trim() !== '' && formData.ticket.trim() !== ''
    }
    if (step === 3) {
      if (formData.runAds === 'yes') {
        return formData.adSpend.trim() !== ''
      }
      return true
    }
    return true
  }

  // Calculate Lead Score & Submit Form
  const handleSubmit = async () => {
    setLoading(true)
    
    // Scoring logic
    let score: 'HOT' | 'WARM' | 'LOW' = 'LOW'
    const budgetVal = formData.budget
    const timelineVal = formData.timeline
    
    if ((budgetVal === '10000-30000' || budgetVal === '30000+') && timelineVal === 'immediate') {
      score = 'HOT'
    } else if (budgetVal === '5000-10000' || budgetVal === '10000-30000') {
      score = 'WARM'
    }
    
    setLeadScore(score)

    // Compile message content
    const compiledMessage = `
[Growth System Lead Qualification]
- Sector: ${config.nameEn} (slug: ${config.slug})
- Main Offer: ${formData.offer}
- Ticket Size: ${formData.ticket} MAD
- Ran Ads Before: ${formData.runAds === 'yes' ? 'Yes' : 'No'}
- Ad Spend: ${formData.runAds === 'yes' ? formData.adSpend : 'N/A'} MAD
- Available Budget: ${formData.budget} MAD
- Target Timeline: ${formData.timeline}
- Computed Score: ${score}
    `.trim()

    // Grab UTM metrics from URL
    const utmSource = searchParams ? searchParams.get('utm_source') : null
    const utmMedium = searchParams ? searchParams.get('utm_medium') : null
    const utmCampaign = searchParams ? searchParams.get('utm_campaign') : null
    const utmContent = searchParams ? searchParams.get('utm_content') : null

    const payload = {
      name: formData.name,
      phone: formData.whatsapp, // use whatsapp as phone fallback
      whatsapp: formData.whatsapp,
      businessName: formData.company,
      industry: formData.industry || config.nameEn,
      city: formData.city,
      websiteUrl: formData.website || '',
      objective: `Goal: ${formData.goal} | Sector: ${config.slug}`,
      budgetMin: formData.budget === '2000' ? 0 : parseFloat(formData.budget.split('-')[0]) || 0,
      budgetMax: formData.budget === '30000+' ? 100000 : parseFloat(formData.budget.split('-')[1]) || 30000,
      message: compiledMessage,
      locale: locale,
      source: `Growth Landing - ${config.slug}`,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      referrer: typeof document !== 'undefined' ? document.referrer : null
    }

    try {
      const resp = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (resp.ok) {
        setSubmitted(true)
        toast.success(isAr ? 'تم إرسال طلبك بنجاح!' : 'Request sent successfully!')
      } else {
        const errorData = await resp.json()
        throw new Error(errorData.error || 'Failed to submit lead')
      }
    } catch (err: any) {
      console.error('Lead submission failed:', err)
      toast.error(isAr ? 'حدث خطأ أثناء إرسال البيانات. يرجى المحاولة لاحقاً.' : 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 text-center overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-orange/10 blur-[130px] -z-10" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-brand-pink/10 blur-[110px] -z-10" />
        
        <div className="container mx-auto px-4 max-w-4xl space-y-8 relative z-10">
          <div className="inline-block bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider">
            {t('audit_badge')}
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white leading-tight font-syne">
            {getLocalized(config.heroTitleAr, config.heroTitleEn, config.heroTitleFr)}
          </h1>
          
          <p className="text-xl text-text-muted leading-relaxed max-w-3xl mx-auto">
            {getLocalized(config.heroSubAr, config.heroSubEn, config.heroSubFr)}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
            <a href="#audit-form">
              <Button size="lg" className="gradient-brand font-black px-10 py-7 text-lg rounded-2xl shadow-xl hover:opacity-90 transition-opacity">
                {t('primary_cta')}
              </Button>
            </a>
            <a href="#solutions-flow">
              <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 font-bold px-10 py-7 text-lg rounded-2xl">
                {t('secondary_cta')}
              </Button>
            </a>
          </div>

          <p className="text-xs text-text-muted italic">
            {t('microcopy_hero')}
          </p>
        </div>
      </section>

      {/* Visual System Diagram Section */}
      <section id="solutions-flow" className="py-20 border-t border-white/5 bg-brand-secondary/10 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white font-syne">{t('flow_title')}</h2>
            <p className="text-text-muted text-lg">{t('flow_subtitle')}</p>
          </div>

          {/* Diagram Flow */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 max-w-6xl mx-auto items-center relative">
            
            {/* Step 1: Creative */}
            <div className="glass-card p-6 rounded-2xl border-white/5 space-y-3 relative">
              <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white mx-auto">
                <Film className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-sm">{isAr ? 'محتوى إعلاني جذاب' : 'Creative Ad'}</h4>
              <p className="text-xs text-text-muted">{isAr ? 'فيديوهات وصور مصممة خصيصاً للتحويل' : 'Videos/images made to convert'}</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center text-brand-orange font-black">➔</div>

            {/* Step 2: Paid Ads */}
            <div className="glass-card p-6 rounded-2xl border-white/5 space-y-3 relative">
              <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white mx-auto">
                <Megaphone className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-sm">{isAr ? 'إعلانات ممولة' : 'Meta Ads'}</h4>
              <p className="text-xs text-text-muted">{isAr ? 'حملات مدفوعة مستهدفة بدقة' : 'Hyper-targeted traffic acquisition'}</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center text-brand-orange font-black">➔</div>

            {/* Step 3: Funnel/Landing Page */}
            <div className="glass-card p-6 rounded-2xl border-white/5 space-y-3 relative">
              <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white mx-auto">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-sm">{isAr ? 'صفحة الهبوط والتصفية' : 'Lead Funnel'}</h4>
              <p className="text-xs text-text-muted">{isAr ? 'تأهيل وتصفية العملاء غير الجادين' : 'Landing pages to qualify leads'}</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex justify-center text-brand-orange font-black">➔</div>

            {/* Step 4: CRM/Notion Sync */}
            <div className="glass-card p-6 rounded-2xl border-white/5 space-y-3 relative">
              <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white mx-auto">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-sm">{isAr ? 'تتبع ومتابعة CRM' : 'CRM Conversion'}</h4>
              <p className="text-xs text-text-muted">{isAr ? 'مزامنة فورية وتأهيل فوري للاتصال' : 'Instant lead scoring and routing'}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 border-t border-white/5 text-start">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-white font-syne leading-tight">
                {t('problem_title')}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed">
                {t('problem_subtitle')}
              </p>
              <div className="h-1 w-20 bg-brand-orange rounded-full" />
              <p className="text-white font-bold text-lg italic">
                {t('problem_transition')}
              </p>
            </div>
            
            <div className="space-y-4">
              {config.problemsAr.map((prob, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 items-start">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-bold shrink-0">
                    ✕
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {getLocalized(prob, config.problemsEn[i], config.problemsFr?.[i])}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 border-t border-white/5 bg-brand-secondary/10 text-start">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white font-syne">
              {t('solutions_title')}
            </h2>
            <p className="text-text-muted text-lg">
              {t('solutions_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.solutionsAr.map((sol, idx) => (
              <div key={idx} className="glass-card p-10 rounded-[2rem] border-white/5 space-y-6 relative overflow-hidden h-full flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-4xl font-black text-white/5 absolute top-6 right-6">
                    0{idx + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {getLocalized(sol.titleAr, sol.titleEn, sol.titleFr)}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {getLocalized(sol.descAr, sol.descEn, sol.descFr)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Section (Who This Is For) */}
      <section className="py-24 border-t border-white/5 text-start">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white font-syne">
              {t('eligibility_title')}
            </h2>
            <p className="text-text-muted text-lg">
              {t('eligibility_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Suitable */}
            <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-8 bg-emerald-500/5 hover:border-emerald-500/20 transition-colors">
              <h3 className="text-2xl font-black text-white flex items-center gap-3">
                <Check className="w-6 h-6 text-emerald-500" />
                {t('suitable_title')}
              </h3>
              <ul className="space-y-4">
                {config.audienceAr.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm text-text-muted leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{getLocalized(item, config.audienceEn[idx], config.audienceFr?.[idx])}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Suitable */}
            <div className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-8 bg-red-500/5 hover:border-red-500/20 transition-colors">
              <h3 className="text-2xl font-black text-white flex items-center gap-3">
                <span className="text-red-500 font-bold">✕</span>
                {t('not_suitable_title')}
              </h3>
              <ul className="space-y-4">
                {config.notSuitableAr.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm text-text-muted leading-relaxed">
                    <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{getLocalized(item, config.notSuitableEn[idx], config.notSuitableFr?.[idx])}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 border-t border-white/5 bg-brand-secondary/10 text-start">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-white font-syne">
              {t('cases_title')}
            </h2>
            <p className="text-text-muted text-lg">
              {t('cases_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Show local real cases */}
            <Link href="/portfolio/ecole-sennouni">
              <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-brand-orange/30 transition-all duration-500 group">
                <div className="h-64 overflow-hidden relative">
                  <img src="/assets/agency/ecole-sennouni.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full">{isAr ? 'التعليم' : 'Education'}</div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors">Ecole Sennouni Science School</h3>
                  <p className="text-sm text-text-muted line-clamp-2">
                    {isAr 
                      ? 'إطلاق حملات إعلانية مستهدفة لبناء حضور قوي للمدرسة واكتساب تسجيلات ومقاعد دراسية جديدة.'
                      : 'Digital marketing and social media campaigns for increasing school enrollments.'}
                  </p>
                  <div className="flex items-center gap-2 text-brand-orange font-bold text-sm">
                    <span>{isAr ? 'عرض دراسة الحالة كاملة' : 'View Case Study Details'}</span>
                    <span>➔</span>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/portfolio/ss-lavage">
              <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-brand-orange/30 transition-all duration-500 group">
                <div className="h-64 overflow-hidden relative">
                  <img src="/assets/agency/ss-lavage.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full">{isAr ? 'غسيل السيارات' : 'Auto Services'}</div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-black text-white group-hover:text-brand-orange transition-colors">SS Lavage</h3>
                  <p className="text-sm text-text-muted line-clamp-2">
                    {isAr 
                      ? 'بناء الهوية البصرية وإطلاق إعلانات الاستحواذ المحلية لجذب المزيد من الزبائن.'
                      : 'Complete brand identity and target local ads setup for attracting client bookings.'}
                  </p>
                  <div className="flex items-center gap-2 text-brand-orange font-bold text-sm">
                    <span>{isAr ? 'عرض دراسة الحالة كاملة' : 'View Case Study Details'}</span>
                    <span>➔</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Qualification Form Section */}
      <section id="audit-form" className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div 
                key="form-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card p-10 md:p-12 rounded-[2.5rem] border-white/5 space-y-8 relative overflow-hidden"
              >
                
                {/* Stepper Header */}
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl md:text-5xl font-black text-white font-syne">
                    {t('audit_form_title')}
                  </h2>
                  <p className="text-text-muted text-sm md:text-base max-w-2xl mx-auto">
                    {t('audit_form_subtitle')}
                  </p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mt-6">
                    <div 
                      className="gradient-brand h-full transition-all duration-500"
                      style={{ width: `${(step / 4) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs font-bold text-brand-orange uppercase tracking-widest mt-2">
                    {isAr ? `الخطوة ${step} من 4` : `Step ${step} of 4`}
                  </div>
                </div>

                <hr className="border-white/5" />

                {/* Form fields step logic */}
                <div className="space-y-6 text-start">
                  
                  {/* Step 1: Personal & Business Info */}
                  {step === 1 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <Label className="text-white font-bold">{t('form_name')} <span className="text-brand-orange">*</span></Label>
                        <Input 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                          className="bg-brand-dark/50 border-white/5 text-white h-12 rounded-xl"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-white font-bold">{t('form_company')} <span className="text-brand-orange">*</span></Label>
                        <Input 
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={isAr ? 'أدخل اسم الشركة أو العيادة' : 'Enter your company or clinic name'}
                          className="bg-brand-dark/50 border-white/5 text-white h-12 rounded-xl"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-white font-bold">{t('form_whatsapp')} <span className="text-brand-orange">*</span></Label>
                          <Input 
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            placeholder="0600000000"
                            className="bg-brand-dark/50 border-white/5 text-white h-12 rounded-xl text-left"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-white font-bold">{t('form_city')} <span className="text-brand-orange">*</span></Label>
                          <Input 
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder={isAr ? 'المدينة' : 'City'}
                            className="bg-brand-dark/50 border-white/5 text-white h-12 rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white font-bold">{t('form_website')}</Label>
                        <Input 
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://instagram.com/..."
                          className="bg-brand-dark/50 border-white/5 text-white h-12 rounded-xl text-left"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Product & Value */}
                  {step === 2 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <Label className="text-white font-bold">{t('form_offer')} <span className="text-brand-orange">*</span></Label>
                        <Input 
                          name="offer"
                          value={formData.offer}
                          onChange={handleChange}
                          placeholder={isAr ? 'مثال: زراعة الأسنان، شقق سكنية متوسطة، خدمات استشارية...' : 'e.g., Dental implants, real estate properties, consultancy...'}
                          className="bg-brand-dark/50 border-white/5 text-white h-12 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white font-bold">{t('form_ticket')} <span className="text-brand-orange">*</span></Label>
                        <Input 
                          name="ticket"
                          value={formData.ticket}
                          onChange={handleChange}
                          placeholder={isAr ? 'مثال: 5,000 درهم' : 'e.g. 5,000 MAD'}
                          className="bg-brand-dark/50 border-white/5 text-white h-12 rounded-xl"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Advertising History */}
                  {step === 3 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="space-y-5"
                    >
                      <div className="space-y-4">
                        <Label className="text-white font-bold">{t('form_run_ads')}</Label>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input 
                              type="radio" 
                              name="runAds" 
                              value="yes"
                              checked={formData.runAds === 'yes'}
                              onChange={handleChange}
                              className="accent-brand-orange w-5 h-5"
                            />
                            <span>{t('form_yes')}</span>
                          </label>
                          <label className="flex items-center gap-2 text-white cursor-pointer">
                            <input 
                              type="radio" 
                              name="runAds" 
                              value="no"
                              checked={formData.runAds === 'no'}
                              onChange={handleChange}
                              className="accent-brand-orange w-5 h-5"
                            />
                            <span>{t('form_no')}</span>
                          </label>
                        </div>
                      </div>

                      {formData.runAds === 'yes' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-2"
                        >
                          <Label className="text-white font-bold">{t('form_ad_spend')} <span className="text-brand-orange">*</span></Label>
                          <Input 
                            name="adSpend"
                            value={formData.adSpend}
                            onChange={handleChange}
                            placeholder="مثال: 4,000 درهم"
                            className="bg-brand-dark/50 border-white/5 text-white h-12 rounded-xl"
                          />
                        </motion.div>
                      )}

                      <div className="space-y-2">
                        <Label className="text-white font-bold">{t('form_goal')}</Label>
                        <select 
                          name="goal"
                          value={formData.goal}
                          onChange={handleChange}
                          className="w-full bg-brand-dark/50 border border-white/5 text-white h-12 rounded-xl px-4 focus:outline-none focus:border-brand-orange"
                        >
                          <option value="Leads">{isAr ? 'الحصول على عملاء محتملين (Leads)' : 'Get Leads'}</option>
                          <option value="Bookings">{isAr ? 'حجز مواعيد واستشارات (Bookings)' : 'Book Appointments'}</option>
                          <option value="Sales">{isAr ? 'زيادة المبيعات والاشتراكات (Sales)' : 'Increase Sales'}</option>
                          <option value="FullFunnel">{isAr ? 'بناء Funnel متكامل للتأهيل والبيع' : 'Build Full Funnel'}</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 4: Budget & Timeline */}
                  {step === 4 && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="space-y-5"
                    >
                      <div className="space-y-2">
                        <Label className="text-white font-bold">{t('form_budget')}</Label>
                        <select 
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full bg-brand-dark/50 border border-border/5 text-white h-12 rounded-xl px-4 focus:outline-none focus:border-brand-orange"
                        >
                          <option value="0-2000">{isAr ? 'أقل من 2,000 درهم' : 'Less than 2,000 MAD'}</option>
                          <option value="2000-5000">2,000 - 5,000 درهم</option>
                          <option value="5000-10000">5,000 - 10,000 درهم</option>
                          <option value="10000-30000">10,000 - 30,000 درهم</option>
                          <option value="30000+">{isAr ? 'أكثر من 30,000 درهم' : 'More than 30,000 MAD'}</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white font-bold">{t('form_timeline')}</Label>
                        <select 
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full bg-brand-dark/50 border border-border/5 text-white h-12 rounded-xl px-4 focus:outline-none focus:border-brand-orange"
                        >
                          <option value="immediate">{isAr ? 'فوراً' : 'Immediately'}</option>
                          <option value="two-weeks">{isAr ? 'خلال أسبوعين' : 'Within 2 weeks'}</option>
                          <option value="month">{isAr ? 'خلال شهر' : 'Within a month'}</option>
                          <option value="research">{isAr ? 'أبحث حالياً فقط' : 'Just researching'}</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center pt-6">
                  {step > 1 ? (
                    <Button 
                      onClick={() => setStep(s => s - 1)}
                      variant="outline"
                      className="border-white/10 hover:bg-white/5 font-bold h-12 px-6 rounded-xl flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {isAr ? 'السابق' : 'Previous'}
                    </Button>
                  ) : <div />}

                  {step < 4 ? (
                    <Button 
                      onClick={() => setStep(s => s + 1)}
                      disabled={!validateStep()}
                      className="gradient-brand font-black h-12 px-8 rounded-xl flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
                    >
                      {isAr ? 'التالي' : 'Next'} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleSubmit}
                      disabled={loading || !validateStep()}
                      className="gradient-brand font-black h-12 px-10 rounded-xl flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{t('form_submit_loading')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('form_submit')}</span>
                          <Send className="w-4 h-4 rtl:rotate-180" />
                        </>
                      )}
                    </Button>
                  )}
                </div>

                <p className="text-xs text-text-muted italic text-center mt-6">
                  {t('form_microcopy')}
                </p>

              </motion.div>
            ) : (
              // Thank you State
              <motion.div 
                key="thank-you"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 rounded-[2.5rem] border-white/5 text-center space-y-8 relative overflow-hidden"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-black text-white font-syne">
                    {t('thank_you_title')}
                  </h2>
                  <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
                    {t('thank_you_desc')}
                  </p>
                </div>

                <hr className="border-white/5" />

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                  <a 
                    href="https://wa.me/212663094286" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-black px-10 py-7 text-lg rounded-2xl flex items-center gap-3">
                      <Zap className="w-6 h-6 fill-current" />
                      <span>{t('thank_you_whatsapp')}</span>
                    </Button>
                  </a>
                  <Link href="/">
                    <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 font-bold px-10 py-7 text-lg rounded-2xl">
                      {isAr ? 'العودة للرئيسية' : 'Back to Home'}
                    </Button>
                  </Link>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

    </div>
  )
}
