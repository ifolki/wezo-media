import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, Calendar } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function SSLavageCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'تصميم الهوية البصرية والشعار (Brand Identity & Logo Design)',
    'إنشاء وإعداد صفحة الفيسبوك (Facebook Page Creation)',
    'تصميم الغلاف والصورة الشخصية (Cover & Profile Design)',
    'إنتاج المحتوى الإعلاني والتفاعلي (Content Creation)',
    'إطلاق وإدارة الحملات الإعلانية (Advertising Campaigns)',
    'تصميم المنشورات الرقمية (Post Design)',
    'صياغة الاستراتيجية البصرية (Visual Strategy)'
  ] : [
    'Brand Identity & Logo Design',
    'Facebook Page Creation',
    'Cover & Profile Design',
    'Content Creation',
    'Advertising Campaigns',
    'Post Design',
    'Visual Strategy'
  ]

  const deliverables = isAr ? [
    'شعار احترافي (Logo Design)',
    'غلاف صفحة الفيسبوك (Facebook Cover)',
    'الصورة الشخصية للحساب (Profile Picture)',
    'تصاميم إعلانية ومنشورات سوشيال ميديا (Ad & Post Designs)'
  ] : [
    'Logo Design',
    'Facebook Cover',
    'Profile Picture',
    'Ad & Post Designs'
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
              {isAr ? 'غسيل السيارات' : 'Car Washing Services'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              SS Lavage
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'تصميم الهوية البصرية، إدارة صفحة الفيسبوك والحملات الإعلانية المستهدفة.'
                : 'Branding, Facebook Page Setup & Target Advertising Campaigns.'}
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
                  src="/assets/agency/ss-lavage.jpg" 
                  alt="SS Lavage Case Study Presentation" 
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
                    ? 'لقد أنشأنا هوية بصرية متكاملة لـ SS Lavage، تشمل تصميم الشعار، بناء العلامة البصرية، إعداد صفحة الفيسبوك، إنتاج المحتوى، وإطلاق حملات إعلانية احترافية لجذب المزيد من الزبائن المحليين وتأسيس حضور قوي على الإنترنت.'
                    : 'We created a complete brand identity for SS Lavage, including logo design, visual branding, Facebook page setup, content creation and advertising campaigns to attract more local clients and build a strong online presence.'}
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
                  {[
                    isAr ? 'بناء هوية بصرية قوية ومعروفة (Strong Brand Identity)' : 'Strong Brand Identity',
                    isAr ? 'زيادة التفاعل على الصفحة بشكل ملحوظ (Increased Page Engagement)' : 'Increased Page Engagement',
                    isAr ? 'رفع نسبة الرسائل والحجوزات لغسيل السيارات (More Messages & Bookings)' : 'More Messages & Bookings',
                    isAr ? 'ظهور محلي أقوى وأسرع فالمستهدفين (Better Local Visibility)' : 'Better Local Visibility'
                  ].map((res, idx) => (
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
