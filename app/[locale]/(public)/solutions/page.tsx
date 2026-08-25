import { Link } from "@/navigation"
import { AlertCircle, Target, Sparkles, TrendingUp, Lightbulb, Rocket, Zap, Heart, Disc } from 'lucide-react'
import { staticSolutionsData } from '@/lib/config/solutions'

interface Props {
  params: {
    locale: string
  }
}

export default async function SolutionsPage({ params: { locale } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const solutions = Object.values(staticSolutionsData)

  const getLocalized = (ar: string, en: string, fr?: string) => {
    if (isAr) return ar || en
    if (isFr) return fr || en
    return en || ar
  }

  const getSolutionIcon = (slug: string) => {
    switch (slug) {
      case 'launch-business-brand':
        return <Rocket className="w-10 h-10 text-brand-orange" />
      case 'scale-customer-acquisition':
        return <TrendingUp className="w-10 h-10 text-emerald-500" />
      case 'automate-crm-operations':
        return <Zap className="w-10 h-10 text-yellow-400" />
      case 'modernize-web-ecommerce':
        return <Lightbulb className="w-10 h-10 text-blue-500" />
      case 'produce-video-content':
        return <Sparkles className="w-10 h-10 text-purple-500" />
      case 'setup-social-presence':
        return <Heart className="w-10 h-10 text-pink-500" />
      default:
        return <Target className="w-10 h-10 text-brand-pink" />
    }
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Header */}
      <section className="py-20 bg-brand-secondary/30 relative text-center">
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
              <Link key={sol.slug} href={`/solutions/${sol.slug}`}>
                <div className="glass-card p-12 rounded-[2.5rem] border-white/5 h-full space-y-6 hover:border-brand-orange/30 transition-all group relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-white/5 relative z-10">
                      {getSolutionIcon(sol.slug)}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-white group-hover:text-brand-orange transition-colors">
                        {getLocalized(sol.nameAr, sol.nameEn, sol.nameFr)}
                      </h3>
                      <p className="text-text-muted leading-relaxed text-sm">
                        {getLocalized(sol.descriptionAr, sol.descriptionEn, sol.descriptionFr)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-6 text-brand-orange font-bold">
                    <span>{isAr ? 'عرض التفاصيل والخدمات' : 'View Details & Services'}</span>
                    <span className="group-hover:translate-x-2 transition-transform rtl:rotate-180">➔</span>
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
