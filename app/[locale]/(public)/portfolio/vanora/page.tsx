import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, Calendar, Globe } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function VanoraCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'تصميم وتأسيس الهوية التجارية (Brand Identity Design)',
    'تصميم الشعار والهوية البصرية (Logo & Visual Branding)',
    'إعداد صفحة الفيسبوك وتأهيلها (Facebook Page Setup)',
    'تصميم وتطوير متجر إلكتروني فاخر (Premium E-commerce Store Design)',
    'تصميم وعرض كتالوج المنتجات بشكل احترافي (Product Catalog Presentation)',
    'إعداد وتأهيل الحضور الرقمي الكامل (Digital Presence Setup)'
  ] : [
    'Brand Identity Design',
    'Logo & Visual Branding',
    'Facebook Page Setup',
    'Premium E-commerce Store Design',
    'Product Catalog Presentation',
    'Digital Presence Setup'
  ]

  const deliverables = isAr ? [
    'شعار العلامة التجارية الفاخر (Brand Logo)',
    'تصميم هوية المنتج والتغليف (Packaging / Product Branding)',
    'صفحة الفيسبوك الرسمية (Facebook Page)',
    'تصميم الغلاف والصورة الشخصية (Cover & Profile Design)',
    'متجر إلكتروني متكامل وفاخر (Online Store)',
    'تخطيطات مخصصة لعرض المنتجات (Product Display Layouts)'
  ] : [
    'Brand Logo',
    'Packaging / Product Branding',
    'Facebook Page',
    'Cover & Profile Design',
    'Online Store',
    'Product Display Layouts'
  ]

  const outcomes = isAr ? [
    'تقديم متميز وقوي للعلامة التجارية الفاخرة (Stronger luxury brand presentation)',
    'حضور احترافي متميز للمتجر الإلكتروني (Professional online store presence)',
    'هوية رقمية واضحة ومنسجمة على مختلف القنوات (Clear and cohesive digital identity)',
    'عرض أفضل للمنتجات وجذب العملاء المستهدفين (Better product showcase across channels)'
  ] : [
    'Stronger luxury brand presentation',
    'Professional online store presence',
    'Clear and cohesive digital identity',
    'Better product showcase across channels'
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
              {isAr ? 'علامة تجارية للعطور الفاخرة / التجارة الإلكترونية' : 'Luxury Perfume Brand / E-commerce'}
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight font-syne">
              VANORA
            </h1>
            <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
              {isAr 
                ? 'ابتكار العلامة التجارية، وتصميم المتجر الإلكتروني الفاخر مع تأسيس الحضور الرقمي المتكامل لـ VANORA.'
                : 'Brand Creation, Premium Store Design & Digital Presence Setup for VANORA.'}
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
                  src="/assets/agency/vanora.jpg" 
                  alt="VANORA Case Study Presentation" 
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
                    ? 'طورت ويزو ميديا (WEZO MEDIA) العلامة التجارية فانورا (VANORA) للعطور الفاخرة من الصفر، حيث صممنا شعاراً وهوية بصرية فخمة تعكس طابع الرقي والرفاهية، كما قمنا ببناء متجر إلكتروني فاخر ومميز يسهل عرض كتالوج المنتجات وتوفير تجربة شراء انسيابية، بالإضافة إلى تأسيس وتأهيل حضورهم على فيسبوك ومنصات التواصل الاجتماعي.'
                    : 'WEZO MEDIA developed the VANORA luxury perfume brand from the ground up, creating a premium visual identity and logo that reflects sophistication, building a high-end e-commerce store designed to showcase perfume products elegantly, and establishing a professional social media presence.'}
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
