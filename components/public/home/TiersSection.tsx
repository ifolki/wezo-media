import { CheckCircle2, Sparkles, ArrowRight, ArrowLeft, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import { getTranslations } from 'next-intl/server'

interface Props {
  locale: string
}

export default async function TiersSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home_v2.tiers' })
  const isAr = locale === 'ar'
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight

  const tiers = [
    {
      key: 't1',
      name: t('t1.name'),
      tag: t('t1.tag'),
      desc: t('t1.desc'),
      isPopular: false,
      features: [
        t('t1.features.0'),
        t('t1.features.1'),
        t('t1.features.2'),
        t('t1.features.3'),
        t('t1.features.4'),
      ],
      quoteService: 'custom-project',
    },
    {
      key: 't2',
      name: t('t2.name'),
      tag: t('t2.tag'),
      desc: t('t2.desc'),
      isPopular: true,
      popularLabel: t('t2.popular'),
      features: [
        t('t2.features.0'),
        t('t2.features.1'),
        t('t2.features.2'),
        t('t2.features.3'),
        t('t2.features.4'),
      ],
      quoteService: 'marketing',
    },
    {
      key: 't3',
      name: t('t3.name'),
      tag: t('t3.tag'),
      desc: t('t3.desc'),
      isPopular: false,
      features: [
        t('t3.features.0'),
        t('t3.features.1'),
        t('t3.features.2'),
        t('t3.features.3'),
        t('t3.features.4'),
      ],
      quoteService: 'custom-project',
    },
  ]

  return (
    <section
      aria-labelledby="tiers-heading"
      className="py-18 lg:py-24 bg-[#121926] border-y border-white/[0.06] text-start relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-secondary border border-white/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2
            id="tiers-heading"
            className={
              isAr
                ? 'font-cairo font-extrabold text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-[1.3]'
                : 'font-syne font-bold text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-tight'
            }
          >
            {t('title')}
          </h2>

          <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* 3 Formats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-7 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className={`relative rounded-[1.75rem] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-[0_14px_38px_rgba(0,0,0,0.3)] ${
                tier.isPopular
                  ? 'bg-brand-secondary/95 border-2 border-brand-orange/50 shadow-[0_20px_50px_rgba(249,115,22,0.15)] -translate-y-1'
                  : 'bg-brand-secondary/80 border border-white/[0.08] hover:border-brand-orange/30'
              }`}
            >
              {/* Popular Badge */}
              {tier.isPopular && (
                <div className="absolute -top-3.5 start-8 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold text-white gradient-brand shadow-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{tier.popularLabel}</span>
                  </span>
                </div>
              )}

              <div className="space-y-6">
                {/* Header: Name + Tag */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-brand-orange">
                    {tier.tag}
                  </span>
                  <h3
                    className={
                      isAr
                        ? 'font-cairo font-bold text-xl sm:text-2xl text-text-primary leading-snug'
                        : 'font-syne font-bold text-xl sm:text-2xl text-text-primary leading-snug'
                    }
                  >
                    {tier.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {tier.desc}
                  </p>
                </div>

                {/* Features List */}
                <div className="pt-5 border-t border-white/[0.07] space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-text-primary/70">
                    {isAr ? 'عناصر نطاق العمل المقترح :' : 'Éléments indicatifs du format :'}
                  </div>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-text-muted">
                        <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-7 mt-7 border-t border-white/[0.07]">
                <Link href={`/get-quote?service=${tier.quoteService}`}>
                  <Button
                    className={`w-full h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-bold gap-2 transition-all ${
                      tier.isPopular
                        ? 'gradient-brand text-white shadow-[0_8px_20px_rgba(249,115,22,0.25)] hover:opacity-95'
                        : 'bg-white/10 hover:bg-brand-orange hover:text-white text-text-primary border border-white/10'
                    }`}
                  >
                    <span>{t('cta')}</span>
                    <ArrowIcon className="w-4 h-4 rtl:rotate-180" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Transparency Disclaimer */}
        <div className="mt-10 p-4 sm:p-5 rounded-2xl bg-brand-dark/80 border border-white/[0.06] flex items-start sm:items-center gap-3.5 text-xs text-text-muted max-w-4xl mx-auto">
          <Info className="w-4 h-4 text-brand-orange shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            {t('disclaimer')}
          </p>
        </div>
      </div>
    </section>
  )
}
