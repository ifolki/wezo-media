import type { Metadata } from 'next'
import AgencyStudio from '@/components/public/AgencyStudio'
import WorkProcess from '@/components/public/WorkProcess'
import Team from '@/components/public/Team'
import Stats from '@/components/public/Stats'
import FinalCTA from '@/components/public/CTA'
import { Sparkles, Target, ShieldCheck, Zap } from 'lucide-react'

interface Props {
  params: {
    locale: string
  }
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const title = isAr
    ? 'من نحن | وكالة WEZO MEDIA للحلول الرقمية والإنتاج في المغرب'
    : isFr
    ? 'À Propos | Agence Digitale & Studio Créatif WEZO MEDIA au Maroc'
    : 'About Us | WEZO MEDIA Digital Agency & Creative Studio in Morocco'

  const description = isAr
    ? 'تعرف على وكالة WEZO MEDIA بالدار البيضاء: شريكك الاستراتيجي في التسويق الرقمي، تطوير المواقع، الهوية البصرية، الأتمتة والإنتاج الصوتي والمرئي.'
    : isFr
    ? 'Découvrez WEZO MEDIA à Casablanca : votre partenaire de croissance digitale alliant stratégie, développement web, publicité, automatisation IA et studio de production.'
    : 'Discover WEZO MEDIA in Casablanca: your digital growth partner combining strategy, web development, paid acquisition, AI automation, and an in-house production studio.'

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.wezomedia.ma/${locale}/about`,
    },
  }
}

export default function AboutPage({ params: { locale } }: Props) {
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const values = isAr
    ? [
        {
          icon: Target,
          title: 'التركيز على العائد التجاري',
          desc: 'كل تصميم، موقع أو حملة إعلانية نطلقها مرتبطة بأهداف تجارية قابلة للقياس وموجهة لتنمية مبيعات عملائنا.',
        },
        {
          icon: Zap,
          title: 'التكامل تحت سقف واحد',
          desc: 'نجمع بين الاستراتيجية، البرمجة، صناعة المحتوى، واستوديو الإنتاج الداخلي لتنفيذ مشاريعك بسرعة وتناغم تام.',
        },
        {
          icon: ShieldCheck,
          title: 'الشفافية والشراكة طويلة الأمد',
          desc: 'نرافق عملاءنا كشركاء نجاح بتقارير واضحة، تواصل مباشر ومستمر، وحلول مصممة لواقع السوق المغربي والدولي.',
        },
      ]
    : isFr
    ? [
        {
          icon: Target,
          title: 'Orientation Résultats & ROI',
          desc: 'Chaque création, site web ou campagne publicitaire est conçu autour d’objectifs commerciaux mesurables.',
        },
        {
          icon: Zap,
          title: 'Écosystème 100% Intégré',
          desc: 'Stratégie, développement web, média buying et studio de production réunis sous un même toit pour une exécution rapide.',
        },
        {
          icon: ShieldCheck,
          title: 'Transparence & Partenariat',
          desc: 'Un accompagnement de proximité avec un suivi clair, des données réelles et des solutions adaptées au marché marocain.',
        },
      ]
    : [
        {
          icon: Target,
          title: 'ROI & Performance Driven',
          desc: 'Every creative asset, website, and ad campaign we engineer is tied to measurable commercial growth.',
        },
        {
          icon: Zap,
          title: 'All-In-One Integrated Hub',
          desc: 'Strategy, web engineering, media buying, and an in-house production studio working seamlessly under one roof.',
        },
        {
          icon: ShieldCheck,
          title: 'Transparency & Long-Term Fit',
          desc: 'We operate as your accountable growth partner with clear reporting and solutions tailored to your market reality.',
        },
      ]

  return (
    <main className="min-h-screen bg-brand-dark text-start">
      <section className="py-24 bg-brand-secondary/30 border-b border-white/5">
        <div className="container-custom text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>{isAr ? 'عن وكالة WEZO MEDIA' : isFr ? 'À Propos de WEZO MEDIA' : 'About WEZO MEDIA'}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
            {isAr
              ? 'شريكك المتكامل للنمو الرقمي والإنتاج الإبداعي في المغرب'
              : isFr
              ? 'Votre Partenaire Intégré de Croissance Digitale et de Production au Maroc'
              : 'Your Integrated Digital Growth & Creative Production Partner in Morocco'}
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            {isAr
              ? 'تأسست WEZO MEDIA في الدار البيضاء لتربط بين الرؤية الاستراتيجية، التكنولوجيا المتطورة، والإنتاج الفني عالي الجودة، ومرافقة الشركات والطموحين من الفكرة إلى الصدارة الرقمية.'
              : isFr
              ? 'Basée à Casablanca, WEZO MEDIA réunit stratégie marketing, ingénierie web, automatisation IA et studio de production audiovisuelle pour propulser les entreprises ambitieuses.'
              : 'Based in Casablanca, WEZO MEDIA bridges strategic marketing, web engineering, AI automation, and studio production to scale ambitious brands.'}
          </p>
        </div>
      </section>

      <Stats />

      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => {
              const Icon = val.icon
              return (
                <div key={i} className="glass-card p-10 rounded-[2.5rem] border-white/5 space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h2 className="text-2xl font-black text-white">{val.title}</h2>
                  <p className="text-text-muted leading-relaxed">{val.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <AgencyStudio />
      <WorkProcess />
      <Team />
      <FinalCTA />
    </main>
  )
}
