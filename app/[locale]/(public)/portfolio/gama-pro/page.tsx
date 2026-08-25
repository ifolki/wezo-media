import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, Calendar, Globe } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function GamaProCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'تصميم وتطوير الموقع الإلكتروني (Website Design)',
    'إدارة وتنسيق صفحة الفيسبوك (Facebook Page Management)',
    'إعداد وإدارة الحملات الإعلانية (Advertising Campaign Management)',
    'إعداد وتوثيق خرائط جوجل (Google Maps Setup)'
  ] : [
    'Website Design',
    'Facebook Page Management',
    'Advertising Campaign Management',
    'Google Maps Setup'
  ]

  const deliverables = isAr ? [
    'الموقع الإلكتروني (Website)',
    'صفحة الفيسبوك (Facebook Page)',
    'الغلاف والصورة الشخصية (Cover & Profile)',
    'التصاميم الإعلانية (Advertising Creative)',
    'ملف جوجل التجاري (Google Business Profile)'
  ] : [
    'Website',
    'Facebook Page',
    'Cover & Profile',
    'Advertising Creative',
    'Google Business Profile'
  ]

  const outcomes = isAr ? [
    'حضور رقمي قوي ومميز على الإنترنت (Stronger online presence)',
    'تقديم احترافي وموثوق للعلامة التجارية (Professional brand presentation)',
    'وضوح تام للخدمات عبر الويب وقنوات التواصل (Clear service visibility across web and social channels)'
  ] : [
    'Stronger online presence',
    'Professional brand presentation',
    'Clear service visibility across web and social channels'
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
              {isAr ? 'خدمات السيارات' : 'Automotive Services'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              GAMA PRO
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'التواجد الرقمي، الموقع الإلكتروني والإعلانات الاحترافية لتعزيز الهوية الرقمية لـ GAMA PRO.'
                : 'Digital Presence, Website & Advertising to strengthen the digital footprint of GAMA PRO.'}
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
                  src="/assets/agency/gama-pro.jpg" 
                  alt="GAMA PRO Case Study Presentation" 
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
                    ? 'دعمت ويزو ميديا (WEZO MEDIA) مشروع GAMA PRO من خلال بناء موقعهم الإلكتروني، إدارة تواجدهم على فيسبوك، إعداد المحتوى الإعلاني الترويجي، إدارة الحملات الإعلانية، وتأسيس تواجدهم على خرائط جوجل لتعزيز ظهورهم الرقمي وجذب العملاء الباحثين عن خدمات ميكانيك وصيانة وهيكل السيارات.'
                    : 'WEZO MEDIA supported GAMA PRO by building their website, managing their Facebook presence, preparing promotional advertising content, handling campaign management, and establishing their Google Maps presence to strengthen their digital visibility and attract clients looking for mechanics, bodywork, and car care services.'}
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
