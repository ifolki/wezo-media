import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, Globe, FileText, BarChart, ExternalLink, Calendar, Users, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  params: {
    locale: string
  }
}

export default function EcoleSennouniCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'التسويق الرقمي (Digital Marketing)',
    'إدارة منصات التواصل الاجتماعي (Social Media Management)',
    'إنتاج المحتوى الشهري (Monthly Content Creation)',
    'تحسين وإعداد صفحة الفيسبوك (Facebook Page Optimization)'
  ] : [
    'Digital Marketing',
    'Social Media Management',
    'Monthly Content Creation',
    'Facebook Page Optimization'
  ]

  const deliverables = isAr ? [
    'غلاف صفحة الفيسبوك (Facebook Cover)',
    'تصميم الصورة الشخصية (Profile Design)',
    'منشورات الهوية البصرية (Branded Posts)',
    'التصاميم الإعلانية (Advertising Creatives)',
    'جدول المحتوى المنظم (Content Calendar)'
  ] : [
    'Facebook Cover',
    'Profile Design',
    'Branded Posts',
    'Advertising Creatives',
    'Content Calendar'
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
              {isAr ? 'التعليم' : 'Education'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              {isAr ? 'مجموعة مدارس السنوني للعلوم' : 'Ecole Sennouni Science School'}
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'التسويق الرقمي وصناعة المحتوى الشهري المتكامل لبناء حضور رقمي قوي واحترافي.'
                : 'Digital Marketing & Monthly Content Creation for building a strong and professional social media presence.'}
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Details Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Visual Mockups */}
            <div className="lg:col-span-8 space-y-8">
              <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl glass-card">
                <img 
                  src="/assets/agency/ecole-sennouni-2.jpg" 
                  alt="Ecole Sennouni Case Study Presentation" 
                  className="w-full h-auto object-cover" 
                />
              </div>

              <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl glass-card">
                <img 
                  src="/assets/agency/ecole-sennouni.jpg" 
                  alt="Ecole Sennouni Branding Showcase" 
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
                    ? 'لقد تعاونا مع مجموعة مدارس السنوني للعلوم لتولي وإدارة حضورهم الرقمي بالكامل، وصناعة محتوى شهري متفاعل، بالإضافة إلى إطلاق حملات إعلانية مستهدفة لزيادة الوعي بالعلامة التجارية واستقطاب تسجيلات جديدة.'
                    : 'We partnered with Ecole Sennouni Science School to manage their digital presence, create engaging monthly content, and run targeted advertising campaigns to increase visibility and attract new enrollments.'}
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
                <p className="text-text-muted leading-relaxed text-sm">
                  {isAr 
                    ? 'الحضور الرقمي الثابت على قنوات التواصل الاجتماعي، وصناعة المحتوى الاحترافي، والحملات الإعلانية المحسنة ساهمت بشكل ملحوظ في تعزيز صورة المؤسسة والوصول بنجاح للفئات المستهدفة.'
                    : 'Consistent brand presence across social media, professional content, and optimized campaigns helped strengthen the school\'s image and reach the right audience.'}
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
