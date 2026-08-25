import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, Calendar, Globe } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function IfolkiCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'تصميم شعار العلامة التجارية (Logo Design)',
    'تأسيس الهوية البصرية المتكاملة (Brand Identity)',
    'إعداد صفحة الفيسبوك وتأهيلها (Facebook Page Setup)',
    'تصميم غلاف الصفحة والصورة الشخصية (Cover & Profile Design)',
    'إعداد وبرمجة المتجر الإلكتروني (E-commerce Store Setup)',
    'التصاميم الإعلانية الاحترافية للمنتجات (Product Advertising Creatives)',
    'التسويق الرقمي الموجه (Digital Marketing)'
  ] : [
    'Logo Design',
    'Brand Identity',
    'Facebook Page Setup',
    'Cover & Profile Design',
    'E-commerce Store Setup',
    'Product Advertising Creatives',
    'Digital Marketing'
  ]

  const deliverables = isAr ? [
    'شعار العلامة التجارية (Brand Logo)',
    'صفحة الفيسبوك الرسمية (Facebook Page)',
    'تصميم غلاف صفحة الفيسبوك (Facebook Cover)',
    'تصميم الصورة الشخصية للملف (Profile Design)',
    'الموقع الإلكتروني للتجارة الإلكترونية (E-commerce Website)',
    'كتالوج ودليل عرض المنتجات (Product Catalog)',
    'التصاميم الإعلانية للمنتجات (Ad Creatives)'
  ] : [
    'Brand Logo',
    'Facebook Page',
    'Facebook Cover',
    'Profile Design',
    'E-commerce Website',
    'Product Catalog',
    'Ad Creative'
  ]

  const outcomes = isAr ? [
    'تقديم متميز وقوي للعلامة التجارية (Stronger brand presentation)',
    'حضور متجر إلكتروني احترافي على الإنترنت (Professional online store presence)',
    'ظهور أفضل للمنتجات وزيادة المبيعات (Better product visibility)',
    'تواصل رقمي مستمر ومنسجم على جميع القنوات (Consistent digital communication)'
  ] : [
    'Stronger brand presentation',
    'Professional online store presence',
    'Better product visibility',
    'Consistent digital communication'
  ]

  return (
    <main className="min-h-screen pb-24 text-start">
      {/* Header Banner */}
      <section className="relative py-20 bg-brand-secondary/30 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 space-y-6">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors font-bold">
            <span className="rtl:rotate-180">➔</span> {isAr ? 'العودة لمعرض الأعمال' : 'Back to Portfolio'}
          </Link>
          <div className="space-y-4">
            <div className="inline-block bg-brand-orange/10 border border-brand-orange/20 text-brand-orange px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              {isAr ? 'التجارة الإلكترونية / التجزئة' : 'E-commerce / Retail'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              Ifolki.ma
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'الهوية البصرية، التجارة الإلكترونية والتسويق الرقمي لتأسيس الحضور الرقمي لـ ifolki.ma.'
                : 'Brand Identity, E-commerce Store & Digital Marketing for ifolki.ma.'}
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Details Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Visual Mockup */}
            <div className="lg:col-span-8 space-y-8">
              <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl glass-card">
                <img 
                  src="/assets/agency/ifolki.png" 
                  alt="Ifolki.ma Case Study Presentation" 
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>

            {/* Right Column: Project Details Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Project Overview Card */}
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <FileText className="w-6 h-6 text-brand-orange" />
                  {isAr ? 'نظرة عامة على المشروع' : 'Project Overview'}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  {isAr 
                    ? 'طورت ويزو ميديا (WEZO MEDIA) الهوية البصرية والحضور الرقمي لـ ifolki.ma، بما في ذلك تصميم الشعار، إعداد صفحة الفيسبوك، تصميم الهوية البصرية للحسابات، إنتاج التصاميم الإعلانية المتميزة للمنتجات، وبناء متجر إلكتروني متكامل لعرض وبيع السلع والمنتجات وتسهيل تجربة الشراء على العملاء.'
                    : 'WEZO MEDIA developed the brand identity and digital presence for ifolki.ma, including logo creation, Facebook page setup, visual branding, product advertising creatives, and building a custom e-commerce storefront designed to support product discovery and online sales.'}
                </p>
              </div>

              {/* Services & Deliverables Card */}
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <Award className="w-6 h-6 text-brand-orange" />
                  {isAr ? 'الخدمات المقدمة' : 'Services Delivered'}
                </h3>
                <ul className="space-y-3">
                  {services.map((srv, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-text-muted">
                      <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>

                <hr className="border-white/5" />

                <h3 className="text-lg font-black text-white">
                  {isAr ? 'المخرجات والتسليمات' : 'Deliverables'}
                </h3>
                <ul className="space-y-3">
                  {deliverables.map((del, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-text-muted">
                      <CheckCircle2 className="w-5 h-5 text-[#FF4D80] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome / Results Card */}
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <BarChart className="w-6 h-6 text-brand-orange" />
                  {isAr ? 'النتائج المحققة' : 'Outcomes & Results'}
                </h3>
                <ul className="space-y-3">
                  {outcomes.map((res, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-text-muted">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
