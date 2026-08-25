import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, Calendar, Globe } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function SalonJuudieyCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'إعداد وإطلاق صفحة الفيسبوك (Facebook Page Setup)',
    'التصميم الإبداعي والهوية البصرية (Creative Design)',
    'إعداد وإدارة الحملات الإعلانية (Advertising Campaigns)'
  ] : [
    'Facebook Page Setup',
    'Creative Design',
    'Advertising Campaigns'
  ]

  const deliverables = isAr ? [
    'صفحة الفيسبوك (Facebook Page)',
    'تصميم الغلاف (Cover Design)',
    'تصميم الصورة الشخصية (Profile Design)',
    'التصاميم الإعلانية الترويجية (Promotional Creative)',
    'إدارة الإعلانات (Ad Management)'
  ] : [
    'Facebook Page',
    'Cover Design',
    'Profile Design',
    'Promotional Creative',
    'Ad Management'
  ]

  const outcomes = isAr ? [
    'تقديم أقوى ومتميز للعلامة التجارية (Stronger brand presentation)',
    'حضور رقمي أكثر احترافية على الإنترنت (More professional online presence)',
    'تواصل واضح ومباشر للخدمات المقدمة (Clear service communication)'
  ] : [
    'Stronger brand presentation',
    'More professional online presence',
    'Clear service communication'
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
              {isAr ? 'صالون تجميل وسبا' : 'Beauty Salon & Spa'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              Salon Juudiey
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'الحضور الاجتماعي، التصميم الإبداعي والإعلانات الاحترافية لتعزيز الحضور الرقمي لـ Salon Juudiey.'
                : 'Social Presence, Creative Design & Ads to strengthen the digital visibility of Salon Juudiey.'}
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
                  src="/assets/agency/salon-juudiey.jpg" 
                  alt="Salon Juudiey Case Study Presentation" 
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
                    ? 'ساعدت ويزو ميديا (WEZO MEDIA) صالون جودي (Salon Juudiey) في بناء حضور متميز على فيسبوك من خلال تصميم صور الهوية البصرية للصفحة، إعداد التصاميم الإعلانية الترويجية، ودعم النشاط الإعلاني لتعزيز الظهور الرقمي للصالون واستقطاب فئات جديدة مهتمة بخدمات العناية والتجميل والسبا.'
                    : 'WEZO MEDIA helped Salon Juudiey build a polished Facebook presence by designing branded page visuals, preparing promotional creatives, and supporting advertising activity to strengthen the salon\'s digital visibility and reach new customers interested in beauty, spa, and self-care services.'}
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
