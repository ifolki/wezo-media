import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, Calendar, Globe } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function HanaeKandriCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'تصميم الهوية التجارية والشعار (Brand Identity & Logo Design)',
    'إعداد صفحة الفيسبوك وتأهيلها بأسلوب احترافي (Facebook Page Setup & Branding)',
    'تصميم الغلاف والصورة الشخصية (Cover & Profile Design)',
    'إنتاج وصناعة المحتوى الرقمي (Content Creation)',
    'إدارة منصات التواصل الاجتماعي (Social Media Management)',
    'إطلاق وإدارة الحملات الإعلانية (Advertising Campaigns)',
    'صياغة الاستراتيجية البصرية (Visual Strategy)'
  ] : [
    'Brand Identity & Logo Design',
    'Facebook Page Setup & Branding',
    'Cover & Profile Design',
    'Content Creation',
    'Social Media Management',
    'Advertising Campaigns',
    'Visual Strategy'
  ]

  const deliverables = isAr ? [
    'شعار العيادة الخاصة (Logo Design)',
    'الهوية البصرية المتكاملة (Brand Identity)',
    'غلاف صفحة الفيسبوك (Facebook Cover)',
    'منشورات وسائل التواصل الاجتماعي (Social Media Posts)',
    'الفيديو الترويجي التعريفي (Promotional Video)'
  ] : [
    'Logo Design',
    'Brand Identity',
    'Facebook Cover',
    'Social Media Posts',
    'Promotional Video'
  ]

  const outcomes = isAr ? [
    'زيادة نسبة تفاعل المتابعين على الصفحة (Increased Page Engagement)',
    'تلقي المزيد من الرسائل والاستفسارات من العملاء (More Messages & Inquiries)',
    'تعزيز الثقة وتقديم صورة مهنية راقية للعيادة (Stronger Brand Trust)',
    'زيادة المواعيد المحجوزة في العيادة وعبر الإنترنت (More Appointments Booked)'
  ] : [
    'Increased Page Engagement',
    'More Messages & Inquiries',
    'Stronger Brand Trust',
    'More Appointments Booked'
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
              {isAr ? 'الصحة والعافية / أخصائي نفسي' : 'Health & Wellness / Psychologist'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              Psychologue Hanae Kandri
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'إعداد وتصميم صفحة الفيسبوك الرسمية والحضور الرقمي المتكامل للأخصائية النفسية هناء قندري.'
                : 'Facebook Page Design & Complete Digital Presence for Psychologue Hanae Kandri.'}
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
                  src="/assets/agency/hanae-kandri.jpg" 
                  alt="Psychologue Hanae Kandri Case Study Presentation" 
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
                <div className="space-y-4 text-sm text-text-muted">
                  <p>
                    {isAr 
                      ? 'أنشأنا حضوراً رقمياً متكاملاً للأخصائية النفسية هناء قندري (Psychologue Hanae Kandri) بمدينة فاس، بما في ذلك تصميم الشعار والهوية البصرية وبناء وتنسيق صفحة الفيسبوك، بالإضافة إلى صناعة المحتوى البصري وإطلاق حملات إعلانية احترافية لبناء الثقة مع المرضى، وزيادة ظهور العيادة وجذب المزيد من الاستفسارات وحجز المواعيد.'
                      : 'We created a complete digital presence for Psychologue Hanae Kandri in Fes, Morocco, including branding, logo design, Facebook page setup, visual content creation, and running targeted campaigns to build patient trust, boost clinic visibility, and drive appointment bookings.'}
                  </p>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-text-muted">{isAr ? 'العميل' : 'Client'}</div>
                      <div className="font-bold text-white">Psychologue Hanae Kandri</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">{isAr ? 'المجال' : 'Industry'}</div>
                      <div className="font-bold text-white">{isAr ? 'الصحة والعافية' : 'Health & Wellness'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">{isAr ? 'الموقع' : 'Location'}</div>
                      <div className="font-bold text-white">{isAr ? 'فاس، المغرب' : 'Fes, Morocco'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">{isAr ? 'السنة' : 'Year'}</div>
                      <div className="font-bold text-white">2024</div>
                    </div>
                  </div>
                </div>
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
