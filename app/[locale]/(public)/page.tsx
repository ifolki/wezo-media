import prisma from '@/lib/prisma'
import Hero from '@/components/public/Hero'
import Stats from '@/components/public/Stats'
import AgencyStudio from '@/components/public/AgencyStudio'
import ServicesGrid from '@/components/public/ServicesGrid'
import SolutionsGrid from '@/components/public/SolutionsGrid'
import WorkProcess from '@/components/public/WorkProcess'
import Portfolio from '@/components/public/Portfolio'
import Team from '@/components/public/Team'
import Testimonials from '@/components/public/Testimonials'
import FinalCTA from '@/components/public/CTA'
import { AlertCircle } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

const fallbackServices = [
  { id: 'meta-ads-id', slug: 'meta-ads-management', nameAr: 'إدارة إعلانات ميتا', nameEn: 'Meta Ads Management', nameFr: 'Gestion des publicités Meta', descAr: 'إدارة حملات فيسبوك وإنستغرام.' },
  { id: 'landing-page-id', slug: 'landing-page', nameAr: 'صفحة هبوط احترافية', nameEn: 'Conversion Landing Page', nameFr: 'Landing page professionnelle', descAr: 'صفحة ويب محسنة لرفع معدل التحويل.' },
  { id: 'ecommerce-store-id', slug: 'ecommerce-store', nameAr: 'متجر إلكتروني متكامل', nameEn: 'E-commerce Store', nameFr: 'Boutique e-commerce', descAr: 'إنشاء متجر متكامل لعرض منتجاتك.' }
]

const featuredSolutions = [
  {
    id: "sol-acq",
    slug: "scale-customer-acquisition",
    nameAr: "زيادة وتوسيع نطاق المبيعات والعملاء",
    nameEn: "Scale Customer Acquisition",
    nameFr: "Acquisition Client à Grande Échelle",
    descriptionAr: "استراتيجيات تسويقية وقنوات نمو متطورة لزيادة مبيعاتك وأرباحك.",
    descriptionEn: "Advanced marketing strategies and growth channels to scale sales and revenue.",
    descriptionFr: "Stratégies de marketing avancées pour développer vos ventes."
  },
  {
    id: "sol-launch",
    slug: "launch-business-brand",
    nameAr: "أطلق مشروعي وعلامتي التجارية",
    nameEn: "Launch My Business & Brand",
    nameFr: "Lancer Mon Entreprise & Marque",
    descriptionAr: "الحزمة المتكاملة لتأسيس حضور رقمي قوي وإطلاق نشاطك التجاري بنجاح.",
    descriptionEn: "All-in-one package to establish a strong digital presence and launch your brand.",
    descriptionFr: "Le package complet pour établir une présence digitale forte."
  },
  {
    id: "sol-auto",
    slug: "automate-crm-operations",
    nameAr: "أتمتة المبيعات والعملاء المحتملين",
    nameEn: "Automate CRM & Lead Flow",
    nameFr: "Automatisation CRM & Flux de Leads",
    descriptionAr: "تحسين خدمة العملاء والمبيعات التلقائية باستخدام أدوات الذكاء الاصطناعي والربط الآلي.",
    descriptionEn: "Enhance customer interactions and automate sales pipelines using custom WhatsApp integrations.",
    descriptionFr: "Optimisez vos relations clients grâce aux automations intelligentes."
  }
]

export default async function Home({ params: { locale } }: Props) {
  const isAr = locale === 'ar'
  
  let featuredServices = []
  let dbOffline = false

  try {
    featuredServices = await prisma.service.findMany({
      where: { isActive: true },
      take: 6,
      orderBy: { order: 'asc' }
    })
  } catch (err) {
    console.error("Database offline on homepage loading. Using fallback services:", err)
    dbOffline = true
    featuredServices = fallbackServices
  }

  return (
    <main className="flex flex-col w-full relative">
      {dbOffline && (
        <div className="absolute top-4 inset-x-0 max-w-md mx-auto z-50">
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm mx-4">
            <AlertCircle className="w-4 h-4" />
            <span>{isAr ? 'تصفح غير متصل بالخادم' : 'Viewing offline cached version'}</span>
          </div>
        </div>
      )}
      <Hero />
      <Stats />
      <AgencyStudio />
      
      {/* Featured Solutions (commercial targets) */}
      <SolutionsGrid solutions={featuredSolutions} locale={locale} />
      
      {/* Featured Services (specific services) */}
      <ServicesGrid services={featuredServices} locale={locale} />
      
      <WorkProcess />
      <Portfolio />
      <Team />
      <Testimonials />
      <FinalCTA />
    </main>
  )
}
