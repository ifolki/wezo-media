import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, Calendar, Globe } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function DecoafricaCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'تصميم الهوية التجارية والشعار (Brand Identity & Logo Design)',
    'إعداد صفحة الفيسبوك وتأهيلها بأسلوب احترافي (Facebook Page Setup & Branding)',
    'إنتاج وصناعة محتوى تفاعلي متميز (Content Creation)',
    'إطلاق وإدارة الحملات الإعلانية المستهدفة (Advertising Campaigns)',
    'إدارة وتنشيط المجتمع الرقمي والإجابة على الاستفسارات (Community Management)',
    'صياغة الاستراتيجية البصرية والترويجية (Visual Strategy)'
  ] : [
    'Brand Identity & Logo Design',
    'Facebook Page Setup & Branding',
    'Content Creation',
    'Advertising Campaigns',
    'Community Management',
    'Visual Strategy'
  ]

  const deliverables = isAr ? [
    'تصميم الشعار الرسمي (Logo Design)',
    'غلاف صفحة الفيسبوك الاحترافي (Facebook Cover)',
    'منشورات وتصاميم وسائل التواصل (Social Media Posts)',
    'الفيديو الترويجي للمنتجات (Promotional Video)'
  ] : [
    'Logo Design',
    'Facebook Cover',
    'Social Media Posts',
    'Promotional Video'
  ]

  const outcomes = isAr ? [
    'زيادة تفاعل المتابعين على الصفحة بنسبة +170% (Page Engagement)',
    'ارتفاع استفسارات ورسائل العملاء بنسبة +230% (Messages & Inquiries)',
    'توسيع نطاق الوصول وزوار الموقع بنسبة +150% (Website Traffic)',
    'زيادة المبيعات الفعلية بنسبة +90% (Sales Growth)',
    'تحسين العائد على الإنفاق الإعلاني بنسبة 300% (300% ROAS Improvement)'
  ] : [
    '+170% Page Engagement',
    '+230% Messages & Inquiries',
    '+150% Website Traffic',
    '+90% Sales Growth',
    '300% ROAS Improvement'
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
              {isAr ? 'ديكور المنزل / النباتات' : 'Home Decor / Plants'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              Decoafrica
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'إعداد الحضور الرقمي المتكامل وإطلاق الحملات الإعلانية المستهدفة لزيادة المبيعات وزوار موقع Decoafrica.'
                : 'Digital Presence Setup & Targeted Advertising Campaigns for Decoafrica.'}
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
                  src="/assets/agency/decoafrica.jpg" 
                  alt="Decoafrica Case Study Presentation" 
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
                      ? 'طورنا في ويزو ميديا الحضور الرقمي المتكامل لـ Decoafrica المتخصصة في النباتات الداخلية وديكور المنزل، وذلك من خلال تصميم الشعار والهوية البصرية وغلاف صفحة الفيسبوك، بالإضافة إلى صناعة محتوى تفاعلي متميز، وإدارة وتوجيه حملات إعلانية احترافية، مما ساهم في تحقيق نسب نمو قياسية وتحسين كبير في العائد على الإنفاق الإعلاني وزيادة المبيعات عبر الإنترنت.'
                      : 'We developed the complete digital presence for Decoafrica, specializing in indoor plants and home decor. Our team created the official branding, logo design, and custom Facebook page assets. We managed social content creation and targeted advertising campaigns to increase brand reach, drive website traffic, and boost online sales growth.'}
                  </p>
                  <hr className="border-white/5" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-text-muted">{isAr ? 'العميل' : 'Client'}</div>
                      <div className="font-bold text-white">Decoafrica</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">{isAr ? 'المجال' : 'Industry'}</div>
                      <div className="font-bold text-white">{isAr ? 'ديكور المنزل والنباتات' : 'Home Decor / Plants'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">{isAr ? 'الموقع' : 'Location'}</div>
                      <div className="font-bold text-white">{isAr ? 'الدار البيضاء، المغرب' : 'Casablanca, Morocco'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">{isAr ? 'السنة' : 'Year'}</div>
                      <div className="font-bold text-white">2024</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <BarChart className="w-6 h-6 text-brand-orange" />
                  {isAr ? 'إحصائيات الأداء والنتائج' : 'Performance Stats & Results'}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-dark/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-2xl font-black text-brand-orange">8.2K+</div>
                    <div className="text-xs text-text-muted">{isAr ? 'إعجابات الصفحة' : 'Page Likes'}</div>
                  </div>
                  <div className="bg-brand-dark/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-2xl font-black text-brand-orange">9.1K+</div>
                    <div className="text-xs text-text-muted">{isAr ? 'المتابعون' : 'Followers'}</div>
                  </div>
                  <div className="bg-brand-dark/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-2xl font-black text-[#FF4D80]">15+</div>
                    <div className="text-xs text-text-muted">{isAr ? 'الحملات الإعلانية' : 'Ad Campaigns'}</div>
                  </div>
                  <div className="bg-brand-dark/50 p-4 rounded-xl border border-white/5 text-center">
                    <div className="text-2xl font-black text-emerald-500">300%</div>
                    <div className="text-xs text-text-muted">{isAr ? 'تحسن ROAS' : 'ROAS Improvement'}</div>
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
