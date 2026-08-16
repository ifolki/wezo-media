import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Link } from "@/navigation"
import { CheckCircle2, AlertCircle, Sparkles, HelpCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  params: {
    locale: string
    slug: string
  }
}

// Fallback solutions data if database is offline
const fallbackSolutions: Record<string, any> = {
  "get-more-customers": {
    id: "sol-customers",
    slug: "get-more-customers",
    nameAr: "احصل على المزيد من العملاء",
    nameEn: "Get More Customers",
    nameFr: "Obtenir Plus de Clients",
    descriptionAr: "استراتيجيات تسويقية وقنوات نمو متطورة لزيادة مبيعاتك وأرباحك.",
    descriptionEn: "Advanced marketing strategies and growth channels to scale sales and revenue.",
    descriptionFr: "Stratégies de marketing avancées pour développer vos ventes.",
    services: [
      {
        id: "s1",
        isPrimary: true,
        service: {
          id: "marketing-id",
          slug: "marketing",
          nameAr: "التسويق الرقمي",
          nameEn: "Digital Marketing",
          nameFr: "Marketing Digital",
          descAr: "إدارة حملات إعلانية وتنشيط السوشيال ميديا.",
          descEn: "Ad campaign management and social media activation."
        }
      }
    ]
  },
  "launch-my-business": {
    id: "sol-launch",
    slug: "launch-my-business",
    nameAr: "أطلق مشروعي التجاري",
    nameEn: "Launch My Business",
    nameFr: "Lancer Mon Entreprise",
    descriptionAr: "الحزمة المتكاملة لتأسيس حضور رقمي قوي وإطلاق نشاطك التجاري بنجاح.",
    descriptionEn: "All-in-one package to establish a strong digital presence and launch your project.",
    descriptionFr: "Le package complet pour établir une présence digitale forte.",
    services: [
      {
        id: "s2",
        isPrimary: true,
        service: {
          id: "web-id",
          slug: "web",
          nameAr: "تطوير المواقع",
          nameEn: "Web Development",
          nameFr: "Développement Web",
          descAr: "بناء منصات ومواقع عصرية.",
          descEn: "Building modern platforms and websites."
        }
      }
    ]
  }
}

export default async function SolutionDetailsPage({ params: { locale, slug } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  let solution = null
  let dbOffline = false

  try {
    solution = await prisma.solution.findFirst({
      where: { slug: slug.toLowerCase().trim() },
      include: {
        services: {
          include: {
            service: true
          },
          orderBy: { order: 'asc' }
        }
      }
    })
  } catch (error) {
    console.error("Database query failed for solution details. Fallback active:", error)
    dbOffline = true
    solution = fallbackSolutions[slug.toLowerCase().trim()]
  }

  if (!solution) {
    return notFound()
  }

  const getLocalized = (ar: string, en: string, fr?: string) => {
    if (isAr) return ar || en || ar
    if (isFr) return fr || en || ar
    return en || ar
  }

  const solutionTitle = getLocalized(solution.nameAr, solution.nameEn, solution.nameFr)
  const solutionDesc = getLocalized(solution.descriptionAr, solution.descriptionEn, solution.descriptionFr)

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Header */}
      <section className="relative py-32 overflow-hidden bg-brand-secondary/30 text-start">
        {dbOffline && (
          <div className="absolute top-4 inset-x-0 max-w-md mx-auto z-50">
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm mx-4">
              <AlertCircle className="w-4 h-4" />
              <span>{isAr ? 'تصفح غير متصل بالخادم' : 'Viewing offline cached version'}</span>
            </div>
          </div>
        )}

        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-orange/10 blur-[120px] -z-10" />

        <div className="container mx-auto px-4 space-y-6">
          <div className="flex items-center gap-2 text-text-muted text-sm font-bold">
            <Link href="/solutions" className="hover:text-brand-orange transition-colors">
              {isAr ? 'الحلول الرقمية' : 'Solutions'}
            </Link>
            <span>/</span>
            <span className="text-brand-orange">{solutionTitle}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            {solutionTitle}
          </h1>
          <p className="text-xl text-text-muted max-w-3xl leading-relaxed">
            {solutionDesc}
          </p>
        </div>
      </section>

      {/* Services attached layout */}
      <section className="py-24 text-start">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-white mb-16 text-center">
            {isAr ? 'الخدمات المشمولة في هذا الحل' : 'Included Services in this Solution'}
          </h2>

          <div className="space-y-8 max-w-4xl mx-auto">
            {solution.services?.map((rel: any, idx: number) => {
              const service = rel.service
              if (!service) return null

              const sTitle = getLocalized(service.nameAr, service.nameEn, service.nameFr)
              const sDesc = getLocalized(service.descAr, service.descEn, service.descFr)

              return (
                <div key={rel.id} className={`glass-card p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden flex flex-col md:flex-row gap-8 items-start justify-between ${rel.isPrimary ? 'border-brand-orange/40 glow-orange' : ''}`}>
                  {rel.isPrimary && (
                    <span className="absolute top-0 right-10 bg-brand-orange text-white px-4 py-1 rounded-b-xl text-xs font-bold uppercase tracking-wide">
                      {isAr ? 'الخدمة الأساسية' : 'Primary Service'}
                    </span>
                  )}
                  
                  <div className="space-y-4 flex-grow">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center font-bold text-lg text-brand-orange">
                      {idx + 1}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-white hover:text-brand-orange transition-colors">
                        {sTitle}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed max-w-xl">
                        {sDesc}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pt-4 md:pt-0 self-end md:self-center">
                    <Link href={`/services/${service.slug}`}>
                      <Button className="h-12 px-6 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white gap-2">
                        <span>{isAr ? 'استكشف الخدمة بالتفصيل' : 'View Service Details'}</span>
                        <span>→</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
