import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, Calendar, Globe } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function CabinetDentaireCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'إعداد وتأهيل صفحة الفيسبوك (Facebook Page Setup)',
    'تصميم غلاف الصفحة الاحترافي (Cover Design)',
    'تصميم الصورة الشخصية وهوية الحساب (Profile Design)',
    'التقديم البصري الاحترافي على منصات التواصل (Social Media Visual Presentation)'
  ] : [
    'Facebook Page Setup',
    'Cover Design',
    'Profile Design',
    'Social Media Visual Presentation'
  ]

  const deliverables = isAr ? [
    'صفحة الفيسبوك الرسمية (Facebook Page)',
    'تصميم غلاف الصفحة (Cover Design)',
    'الهوية الشخصية للملف الشخصي (Profile Identity)',
    'حضور رسمي ومميز على منصات التواصل (Branded Social Presence)'
  ] : [
    'Facebook Page',
    'Cover Design',
    'Profile Identity',
    'Branded Social Presence'
  ]

  const outcomes = isAr ? [
    'تقديم مهني واحترافي أقوى للعيادة (Stronger professional presentation)',
    'حضور رقمي أكثر موثوقية لتعزيز ثقة المرضى (More trustworthy digital presence)',
    'تواصل واضح ومباشر للخدمات الطبية المقدمة (Clear service communication)'
  ] : [
    'Stronger professional presentation',
    'More trustworthy digital presence',
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
              {isAr ? 'عيادة طب الأسنان / الرعاية الصحية' : 'Dental Clinic / Healthcare'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              Cabinet Dentaire Dr. Mohamed Larhmaid
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'الحضور البصري والتقديم الاحترافي لعيادة الدكتور محمد لحميد على منصات التواصل الاجتماعي.'
                : 'Social Presence, Cover Design & Branded Visual Identity for Dr. Mohamed Larhmaid Dental Clinic.'}
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
                  src="/assets/agency/cabinet-dentaire.jpg" 
                  alt="Cabinet Dentaire Dr. Mohamed Larhmaid Case Study Presentation" 
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
                    ? 'أنشأت ويزو ميديا (WEZO MEDIA) حضوراً احترافياً على فيسبوك لعيادة طب الأسنان الدكتور محمد لحميد (Cabinet dentaire Dr. Mohamed Larhmaid) من خلال تصميم وتطوير غلاف الصفحة، الهوية البصرية للحساب، وتنسيق التقديم العام للخدمات لتعزيز ثقة المرضى والمراجعين وتحسين الظهور الرقمي للعيادة محلياً.'
                    : 'WEZO MEDIA built a professional Facebook presence for Cabinet dentaire Dr. Mohamed Larhmaid by preparing the clinic\'s branded page visuals, cover design, and profile presentation to reinforce trust, reassure patients, and improve overall online visibility.'}
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
