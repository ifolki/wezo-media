import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, Calendar, Globe } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function AfrichaOuedEddahabCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'إدارة منصات التواصل الاجتماعي (Social Media Management)',
    'صناعة وإنتاج المحتوى البصري (Content Creation)',
    'إعداد وإدارة الحملات الإعلانية (Advertising Campaigns)',
    'إدارة التواجد على منصات متعددة (Multi-Platform Presence Management)',
    'صياغة استراتيجية التسويق الرقمي (Digital Marketing Strategy)'
  ] : [
    'Social Media Management',
    'Content Creation',
    'Advertising Campaigns',
    'Multi-Platform Presence Management',
    'Digital Marketing Strategy'
  ]

  const deliverables = isAr ? [
    'إدارة صفحة الفيسبوك (Facebook Page Management)',
    'محتوى بصري يحمل الهوية الخاصة (Branded Visual Content)',
    'التصاميم الإعلانية الترويجية (Advertising Creatives)',
    'إعداد وتأهيل الحسابات على المنصات (Platform Presence Setup)',
    'دعم ومواكبة مستمرة لصناعة المحتوى (Ongoing Content Support)'
  ] : [
    'Facebook Page Management',
    'Branded Visual Content',
    'Advertising Creatives',
    'Platform Presence Setup',
    'Ongoing Content Support'
  ]

  const outcomes = isAr ? [
    'حضور قوي وفعال على منصات الإنترنت (Stronger online presence)',
    'تقديم احترافي ومميز لصورة العلامة التجارية (More professional brand presentation)',
    'تواصل منسجم ومستمر عبر القنوات الرقمية (Consistent communication across digital channels)',
    'ظهور وانتشار أفضل للخدمات المعروضة (Better visibility for services)'
  ] : [
    'Stronger online presence',
    'More professional brand presentation',
    'Consistent communication across digital channels',
    'Better visibility for services'
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
              {isAr ? 'تنجيد الأثاث والمفروشات المنزلية' : 'Upholstery & Home Furnishings'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              Africha Oued Eddahab
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'التواجد الرقمي، صناعة المحتوى والإعلانات الاحترافية لتعزيز الحضور الرقمي لأفرشة وادي الذهب.'
                : 'Digital Presence, Content & Advertising to strengthen the digital visibility of Africha Oued Eddahab.'}
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
                  src="/assets/agency/africha-oued-eddahab.jpg" 
                  alt="Africha Oued Eddahab Case Study Presentation" 
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
                    ? 'دعمت ويزو ميديا (WEZO MEDIA) مشروع أفرشة وادي الذهب (Africha Oued Eddahab) الرائدة في خياطة وتجديد الأفرشة والأثاث المنزلي بمراكش، من خلال إدارة حضورهم الرقمي وتصميم الهوية البصرية للحسابات، وصناعة المحتوى التفاعلي المتميز، وإدارة وتوجيه الحملات الإعلانية لتعزيز الظهور والوصول إلى الفئات المستهدفة.'
                    : 'WEZO MEDIA supported AFRICHA OUED EDDAHAB, a leading upholstery and home furnishings company in Marrakech, by managing their digital presence, designing branded visual assets, creating engaging content, and running targeted advertising campaigns to boost visibility and brand engagement.'}
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
