import { Link } from "@/navigation"
import { ArrowLeft, CheckCircle2, FileText, BarChart, Award, ShieldAlert, Cpu, ShoppingBag, Truck, LayoutDashboard, Layers, Share2, DollarSign } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export default function MangeoAppCaseStudy({ params: { locale } }: Props) {
  const isAr = locale === 'ar'

  const services = isAr ? [
    'استشارات وبناء نموذج العمل لمنصات الـ SaaS',
    'تصميم واجهة وتجربة المستخدم (UI/UX Design)',
    'تطوير البنية التقنية الكاملة (Full Stack SaaS Development)',
    'إعداد قواعد البيانات والـ Multi-Tenancy',
    'تطوير أدوات بناء الصفحات (Page Builder Engine)',
    'تصميم الهوية البصرية والتسويقية للمنصة'
  ] : [
    'SaaS Business Model Consultation & Architecture',
    'UI/UX User Experience Design',
    'Full Stack SaaS Development',
    'Database Setup & Multi-Tenancy Architecture',
    'Custom Page Builder Engine Development',
    'Visual Brand Identity & Platform Marketing'
  ]

  const deliverables = isAr ? [
    'لوحة التحكم الرئيسية للمنصة (Mangeo Platform)',
    'نظام بناء صفحات الهبوط والمنتجات (Landing Page Builder)',
    'نظام إدارة المخزون متعدد المواقع (Multi-Location Inventory)',
    'لوحة تحكم فرق التأكيد والموزعين (Confirmers & Couriers Portal)',
    'محرك التقارير المالية والأرباح الحقيقية (Financial Analytics Engine)',
    'الموقع التعريفي والصفحة الهبوط الرئيسية للمنصة'
  ] : [
    'Core Mangeo Platform Dashboard',
    'Landing Page & Product Builder Engine',
    'Multi-Location Inventory Management System',
    'Confirmers & Couriers Portals',
    'Financial Analytics & Profit Tracking Engine',
    'Mangeo Marketing Website & Landing Pages'
  ]

  const outcomes = isAr ? [
    'منصة SaaS متكاملة وجاهزة للتشغيل (Ready-to-launch Multi-tenant SaaS)',
    'بنية سحابية آمنة وقابلة للتوسع بشكل مرن (Scalable cloud infrastructure)',
    'توفير تجربة مستخدم احترافية وسهلة الاستخدام (Professional and seamless UI/UX)',
    'تكامل تام بين الطلبات والمخزون والمالية (Cohesive flow across orders, inventory, and finances)'
  ] : [
    'Ready-to-launch Multi-tenant SaaS',
    'Scalable and secure cloud infrastructure',
    'Professional and seamless UI/UX experience',
    'Cohesive flow across orders, inventory, and finances'
  ]

  const features = isAr ? [
    {
      title: 'إدارة مركزية للنشاط التجاري',
      desc: 'لوحة تحكم موحدة لإدارة عدة متاجر إلكترونية وفيزيائية، المنتجات، الطلبات، العملاء، المستودعات، شركات التوصيل، والمصاريف من مكان واحد بشكل مستقل تماماً.'
    },
    {
      title: 'دورة متكاملة لإدارة الطلبات (COD Workflow)',
      desc: 'مسار عمل منظم يبدأ من إنشاء الطلب، ثم التأكيد عبر موظفي خدمة العملاء، إسناده للموزعين أو شركات التوصيل، تسليمه، وتحديث المخزون والمالية تلقائياً.'
    },
    {
      title: 'إدارة الموزعين وشركات التوصيل',
      desc: 'حسابات خاصة للموزعين لمتابعة طلباتهم وتسليماتهم، مع نظام لتحديد عمولة التوصيل، ودعم كامل لشركات الشحن الخارجية بتسعيرات مخصصة لكل مدينة.'
    },
    {
      title: 'نظام متقدم لإدارة المخزون متعدد المستودعات',
      desc: 'تتبع كميات وأماكن وحركات المخزون بدقة سواء في المستودع الرئيسي، أو في عهدة الموزعين، أو لدى شركات التوصيل، لتقليل الضياع والأخطاء التشغيلية.'
    },
    {
      title: 'الإدارة المالية ومعرفة الربح الحقيقي',
      desc: 'تجميع دقيق لقيمة المبيعات مطروحاً منها تكلفة الشراء، مصاريف التوصيل، عمولات فريق التأكيد، الإعلانات والمصاريف التشغيلية لمعرفة صافي الربح بدقة.'
    },
    {
      title: 'باني المتاجر وصفحات الهبوط (Page Builder)',
      desc: 'نظام مرن يتيح للتاجر تصميم متجره بالكامل وتخصيص الألوان والخطوط، وبناء صفحات هبوط احترافية ومحسنة للتحويل بنظام السحب والإفلات والأقسام الجاهزة.'
    },
    {
      title: 'إدارة المتغيرات واستمارة طلب مهيأة لـ COD',
      desc: 'دعم المنتجات ذات الألوان والمقاسات المتعددة، مع استمارة طلب فائقة السرعة مهيأة خصيصاً للدفع عند الاستلام لرفع نسبة التحويل.'
    },
    {
      title: 'الأتمتة وتتبع الإعلانات والذكاء الاصطناعي',
      desc: 'تكامل مع WhatsApp وGoogle Sheets، وربط البيكسل لتتبع أداء الحملات الإعلانية ومصاريفها، بالإضافة لمساعد ذكي لكتابة محتوى المنتجات والصفحات.'
    }
  ] : [
    {
      title: 'Centralized Business Operations',
      desc: 'A unified control panel to manage multiple e-commerce & physical stores, products, orders, customers, Warehouses, couriers, and expenses independently from one dashboard.'
    },
    {
      title: 'Structured COD Order Workflow',
      desc: 'A complete workflow linking creation, phone confirmation by agents, assignment to couriers or shipping companies, delivery, and automated inventory/financial updates.'
    },
    {
      title: 'Distributor & Courier Management',
      desc: 'Dedicated portals for internal delivery agents to manage their tasks and commissions, alongside full support for external shipping companies with custom city rates.'
    },
    {
      title: 'Multi-Location Inventory Tracking',
      desc: 'Track stock quantity and movement in real time across the main warehouse, shipping agencies, couriers on the field, or physical retail stores with confirmation receipts.'
    },
    {
      title: 'Financial Engine & Real-Profit Calculator',
      desc: 'Aggregates sales revenue and deducts buying costs, shipping fees, agent/courier commissions, ad spend, and operation costs to calculate net profits.'
    },
    {
      title: 'No-Code Storefront & Landing Page Builder',
      desc: 'Allows users to customize their store branding and build high-converting landing pages using drag-and-drop sections pre-optimized for mobile layouts.'
    },
    {
      title: 'Product Variants & COD-optimized Form',
      desc: 'Full support for complex product variants (colors, sizes, pricing) mapped to a frictionless, fast check-out order form to maximize conversion.'
    },
    {
      title: 'Automation, Tracking & AI Engine',
      desc: 'Integrates WhatsApp notifications, Google Sheets, Meta Pixel, and UTM tracking alongside an AI assistant to generate marketing copies and page layouts.'
    }
  ]

  return (
    <main className="min-h-screen pb-24 text-start bg-gradient-to-b from-[#0A0A0F] to-[#111118]">
      {/* Header Banner */}
      <section className="relative py-24 bg-brand-secondary/30 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 space-y-6">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-brand-orange hover:text-white transition-colors font-bold">
            <span className="rtl:rotate-180">➔</span> {isAr ? 'العودة لمعرض الأعمال' : 'Back to Portfolio'}
          </Link>
          <div className="space-y-4">
            <div className="inline-block bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              SaaS Platform / E-commerce Infrastructure
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight font-syne">
              MANGEO APP
            </h1>
            <p className="text-xl md:text-2xl text-text-muted max-w-4xl leading-relaxed">
              {isAr 
                ? 'منصة متكاملة بنظام SaaS لإدارة وتشغيل وتتبع مشاريع التجارة الإلكترونية بنظام الدفع عند الاستلام (COD).'
                : 'A comprehensive multi-tenant SaaS platform built to manage, scale, and optimize Cash-on-Delivery (COD) e-commerce operations.'}
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Details Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Visual Mockup and detailed descriptions */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* Main Branding Board Showcase */}
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-white">{isAr ? 'الهوية البصرية والعلامة التجارية' : 'Visual Branding & Identity'}</h3>
                <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl glass-card">
                  <img 
                    src="/assets/agency/mangeo-mockup.jpg" 
                    alt="Mangeo App Visual Identity & Brand Essence" 
                    className="w-full h-auto object-cover" 
                  />
                </div>
              </div>

              {/* Comprehensive Description */}
              <div className="space-y-6 text-text-muted leading-relaxed">
                <h2 className="text-3xl font-black text-white">
                  {isAr ? 'عن المنصة ورؤيتها التشغيلية' : 'About Mangeo App & Platform Vision'}
                </h2>
                <p>
                  {isAr 
                    ? 'Mangeo App هي منصة برمجية متكاملة من نوع SaaS تم تطويرها خصيصاً لمساعدة التجار وأصحاب مشاريع التجارة الإلكترونية، خصوصاً العاملين بنظام الدفع عند الاستلام (Cash on Delivery – COD)، على إدارة مختلف العمليات التجارية والتشغيلية والمالية من خلال نظام مركزي واحد.'
                    : 'Mangeo App is a robust Software-as-a-Service (SaaS) platform built specifically to empower merchants and e-commerce companies working with the Cash on Delivery (COD) model, allowing them to manage all logistical, operational, and financial workflows in a single centralized space.'}
                </p>
                <p>
                  {isAr 
                    ? 'جاءت فكرة المنصة لحل المشاكل المتكررة التي يواجهها تجار الـ COD يومياً، مثل تشتت الطلبات، صعوبة التنسيق بين فريق تأكيد الطلبات والموزعين وشركات التوصيل، ضعف مراقبة المخزون الموزع، تتبع العمولات، وصعوبة معرفة الربحية وصافي الأرباح الحقيقي للنشاط بعد تجميع كل التكاليف التشغيلية والإعلانية.'
                    : 'The platform was conceived to solve the critical friction points in COD operations: scattered order sheets, miscommunication between call center confirmation teams and field couriers, lack of control over distributed inventory, loose commission tracking, and the extreme difficulty of knowing actual net profits after accounting for ads, buying costs, returns, and delivery fees.'}
                </p>
              </div>

              {/* Screenshots Gallery Section */}
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-white">{isAr ? 'معرض لقطات الشاشة لواجهة وتصميم المنصة' : 'Mangeo App Interface Showcase'}</h3>
                
                <div className="space-y-6">
                  <div className="rounded-2xl overflow-hidden border border-white/5 shadow-lg">
                    <img src="/assets/agency/mangeo-hero.png" alt="Mangeo Hero Section" className="w-full h-auto" />
                    <div className="p-4 bg-brand-secondary/40 text-xs text-text-muted text-center border-t border-white/5">
                      {isAr ? 'الصفحة الرئيسية للمنصة وهويتها البصرية المميزة باللون الأخضر والداكن' : 'Platform landing page hero layout, utilizing a dark modern theme with glowing emerald accents'}
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/5 shadow-lg">
                    <img src="/assets/agency/mangeo-features.png" alt="Mangeo Features" className="w-full h-auto" />
                    <div className="p-4 bg-brand-secondary/40 text-xs text-text-muted text-center border-t border-white/5">
                      {isAr ? 'عرض المميزات الأساسية: لوحة التحكم الذكية، فريق التأكيد، والمتجر الإلكتروني' : 'Core features section outlining analytics dashboard, call team confirmation, and online store storefront'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-2xl overflow-hidden border border-white/5 shadow-lg flex flex-col justify-between bg-brand-secondary/20">
                      <img src="/assets/agency/mangeo-store.png" alt="Mangeo Store Real-time" className="w-full h-auto object-cover" />
                      <div className="p-4 text-xs text-text-muted text-center border-t border-white/5 bg-brand-secondary/40">
                        {isAr ? 'مستعرض ومصمم المتجر الإلكتروني المتكامل في الوقت الفعلي' : 'Real-time storefront design customizer for mobile layouts'}
                      </div>
                    </div>
                    
                    <div className="rounded-2xl overflow-hidden border border-white/5 shadow-lg flex flex-col justify-between bg-brand-secondary/20">
                      <img src="/assets/agency/mangeo-pricing.png" alt="Mangeo Pricing Plans" className="w-full h-auto object-cover" />
                      <div className="p-4 text-xs text-text-muted text-center border-t border-white/5 bg-brand-secondary/40">
                        {isAr ? 'خطط أسعار الاشتراك الشهري للمنصة: Starter، القياسية، والاحترافية' : 'Flexible subscription tiers: Starter, Standard, and Professional plans'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Features Grid */}
              <div className="space-y-8 pt-4">
                <h3 className="text-3xl font-black text-white">
                  {isAr ? 'الخصائص والمميزات التفصيلية للمنصة' : 'Deep-dive Platform Features'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {features.map((feat, idx) => (
                    <div key={idx} className="glass-card p-6 rounded-2xl border-white/5 space-y-3">
                      <h4 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] shrink-0" />
                        {feat.title}
                      </h4>
                      <p className="text-text-muted text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Stack Architecture */}
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-[#10B981]" />
                  {isAr ? 'البنية البرمجية والتقنية' : 'Technical Stack & Architecture'}
                </h3>
                <div className="space-y-4 text-sm text-text-muted leading-relaxed">
                  <p>
                    {isAr 
                      ? 'تم تصميم وبناء Mangeo كمنصة Multi-Tenant SaaS قابلة للتوسع اللانهائي، تعتمد على عزل كامل وصارم لبيانات كل تاجر وقواعد بياناته لتأمين الخصوصية والسرية.'
                      : 'Mangeo is engineered as a secure, scalable multi-tenant SaaS. It features isolated database configurations to guarantee absolute data privacy and integrity for each vendor.'}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-center">
                    <div className="p-3 bg-brand-dark/50 rounded-xl border border-white/5">
                      <div className="font-bold text-white">Next.js 14</div>
                      <div className="text-xs text-text-muted">Frontend & API</div>
                    </div>
                    <div className="p-3 bg-brand-dark/50 rounded-xl border border-white/5">
                      <div className="font-bold text-white">PostgreSQL</div>
                      <div className="text-xs text-text-muted">Database Layer</div>
                    </div>
                    <div className="p-3 bg-brand-dark/50 rounded-xl border border-white/5">
                      <div className="font-bold text-white">Supabase</div>
                      <div className="text-xs text-text-muted">Auth & Cloud</div>
                    </div>
                    <div className="p-3 bg-brand-dark/50 rounded-xl border border-white/5">
                      <div className="font-bold text-white">Tailwind CSS</div>
                      <div className="text-xs text-text-muted">Responsive UI</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Future Vision */}
              <div className="border border-[#10B981]/20 bg-[#10B981]/5 p-8 rounded-[2rem] space-y-4">
                <h4 className="text-lg font-black text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#10B981]" />
                  {isAr ? 'الرؤية المستقبلية للمنصة: شبكة الموردين (Supplier Network)' : 'Future Roadmap: Supplier Network Integration'}
                </h4>
                <p className="text-sm text-text-muted leading-relaxed">
                  {isAr 
                    ? 'من بين أهم التوسعات المستقبلية المخطط لها إنشاء Supplier Network لربط أصحاب الجملة والموردين مباشرة مع التجار داخل المنصة، والاطلاع على كتالوج الموردين وشراء السلع بأسعار الجملة، مما يحول Mangeo مستقبلاً من مجرد برنامج للإدارة إلى نظام بيئي تجاري متكامل B2B.'
                    : 'The future roadmap expands Mangeo into a B2B commerce ecosystem by building a Supplier Network. This network will connect bulk wholesalers directly with merchants, allowing catalog sync and direct B2B transactions inside the same operating environment.'}
                </p>
              </div>

            </div>

            {/* Right Column: Project Details Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Project Overview Card */}
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <FileText className="w-6 h-6 text-[#10B981]" />
                  {isAr ? 'نظرة عامة على المشروع' : 'Project Overview'}
                </h3>
                <p className="text-text-muted leading-relaxed text-sm">
                  {isAr 
                    ? 'دعمت ويزو ميديا (WEZO MEDIA) منصة Mangeo App من خلال توفير استشارات شاملة لبناء البنية التقنية لـ SaaS وتصميم الهوية التجارية والواجهات وتجربة المستخدم، بالإضافة لتطوير البنية البرمجية للموقع التعريفي، متجر التجارة الإلكترونية، باني الصفحات، ومحرك تتبع المخزون والمالية.'
                    : 'WEZO MEDIA supported Mangeo App by providing SaaS business architecture consulting, UI/UX interface designs, development of the marketing landing pages, storefront, no-code product builder, and multi-location inventory & financial engines.'}
                </p>
              </div>

              {/* Services & Deliverables Card */}
              <div className="glass-card p-8 rounded-[2rem] border-white/5 space-y-6">
                <h3 className="text-2xl font-black text-white flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#10B981]" />
                  {isAr ? 'الخدمات المقدمة' : 'Services Delivered'}
                </h3>
                <ul className="space-y-3">
                  {services.map((srv, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm text-text-muted">
                      <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
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
                  <BarChart className="w-6 h-6 text-[#10B981]" />
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
