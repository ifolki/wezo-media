import prisma from "@/lib/prisma"
import { Link } from "@/navigation"
import { AlertCircle, Target, Sparkles, TrendingUp, Lightbulb } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

// Fallback solutions data if database is offline
const fallbackSolutions = [
  {
    id: "sol-launch",
    slug: "launch-my-business",
    nameAr: "أطلق مشروعي التجاري",
    nameEn: "Launch My Business",
    nameFr: "Lancer Mon Entreprise",
    descriptionAr: "الحزمة المتكاملة لتأسيس حضور رقمي قوي وإطلاق نشاطك التجاري بنجاح.",
    descriptionEn: "All-in-one package to establish a strong digital presence and launch your project.",
    descriptionFr: "Le package complet pour établir une présence digitale forte."
  },
  {
    id: "sol-customers",
    slug: "get-more-customers",
    nameAr: "احصل على المزيد من العملاء",
    nameEn: "Get More Customers",
    nameFr: "Obtenir Plus de Clients",
    descriptionAr: "استراتيجيات تسويقية وقنوات نمو متطورة لزيادة مبيعاتك وأرباحك.",
    descriptionEn: "Advanced marketing strategies and growth channels to scale sales and revenue.",
    descriptionFr: "Stratégies de marketing avancées pour développer vos ventes."
  }
]

export default async function SolutionsPage({ params: { locale } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  let solutions = []
  let dbOffline = false

  try {
    solutions = await prisma.solution.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
  } catch (error) {
    console.error("Database query failed for solutions. Fallback active:", error)
    dbOffline = true
    solutions = fallbackSolutions
  }

  const getLocalized = (ar: string, en: string, fr?: string) => {
    if (isAr) return ar || en || ar
    if (isFr) return fr || en || ar
    return en || ar
  }

  const getSolutionIcon = (slug: string) => {
    switch (slug) {
      case 'launch-my-business':
        return <Lightbulb className="w-10 h-10 text-brand-orange" />
      case 'get-more-customers':
        return <TrendingUp className="w-10 h-10 text-emerald-500" />
      default:
        return <Target className="w-10 h-10 text-brand-pink" />
    }
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Header */}
      <section className="py-20 bg-brand-secondary/30 relative text-center">
        {dbOffline && (
          <div className="absolute top-4 inset-x-0 max-w-md mx-auto z-50">
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-sm mx-4">
              <AlertCircle className="w-4 h-4" />
              <span>{isAr ? 'تصفح غير متصل بالخادم' : 'Viewing offline cached version'}</span>
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 space-y-6">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            {isAr ? 'حلولنا الرقمية المتكاملة' : 'Our Integrated Digital Solutions'}
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'نساعدك على تحقيق أهدافك التجارية عبر تجميع وتنسيق باقة من خدماتنا المتكاملة التي تركز على النتائج.'
              : 'We help you achieve your business milestones by bundling target services centered around results.'}
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 text-start">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((sol) => (
              <Link key={sol.id} href={`/solutions/${sol.slug}`}>
                <div className="glass-card p-12 rounded-[2.5rem] border-white/5 h-full space-y-6 hover:border-brand-orange/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-4 right-4">
                    <Sparkles className="w-6 h-6 text-white/5 group-hover:text-brand-orange/10 transition-colors" />
                  </div>
                  <div className="space-y-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white/5 relative z-10">
                      {getSolutionIcon(sol.slug)}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-bold text-white group-hover:text-brand-orange transition-colors">
                        {getLocalized(sol.nameAr, sol.nameEn, sol.nameFr)}
                      </h3>
                      <p className="text-text-muted leading-relaxed text-sm">
                        {getLocalized(sol.descriptionAr, sol.descriptionEn, sol.descriptionFr)}
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 text-sm font-bold text-brand-orange flex items-center gap-2">
                    <span>{isAr ? 'استكشف الخدمات المشمولة' : 'Explore included services'}</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
