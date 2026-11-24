import { Search, Compass, Layers, TrendingUp } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

interface Props {
  locale: string
}

export default async function MethodSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home_v2.method' })
  const isAr = locale === 'ar'

  const steps = [
    {
      num: t('steps.step1.num'),
      title: t('steps.step1.title'),
      desc: t('steps.step1.desc'),
      icon: Search,
      color: 'text-brand-orange bg-brand-orange/15 border-brand-orange/30',
    },
    {
      num: t('steps.step2.num'),
      title: t('steps.step2.title'),
      desc: t('steps.step2.desc'),
      icon: Compass,
      color: 'text-brand-red bg-brand-red/15 border-brand-red/30',
    },
    {
      num: t('steps.step3.num'),
      title: t('steps.step3.title'),
      desc: t('steps.step3.desc'),
      icon: Layers,
      color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30',
    },
    {
      num: t('steps.step4.num'),
      title: t('steps.step4.title'),
      desc: t('steps.step4.desc'),
      icon: TrendingUp,
      color: 'text-blue-400 bg-blue-500/15 border-blue-500/30',
    },
  ]

  return (
    <section
      aria-labelledby="method-heading"
      className="py-16 lg:py-22 bg-[#141C2B] border-y border-white/[0.06] relative overflow-hidden text-start"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16 space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-secondary border border-white/10 text-brand-orange text-xs font-bold uppercase tracking-widest">
            <span>{t('badge')}</span>
          </div>

          <h2
            id="method-heading"
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

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 lg:gap-6 relative">
          {/* Subtle Desktop Connecting Line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[44px] inset-x-[12%] h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
          />

          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-brand-secondary/75 border border-white/[0.07] hover:border-brand-orange/35 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-[0_10px_28px_rgba(0,0,0,0.2)]"
              >
                <div className="space-y-4">
                  {/* Step Top: Icon Box + Large Number Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${step.color} border flex items-center justify-center shrink-0 shadow-sm`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono font-bold text-lg text-brand-orange/80 group-hover:text-brand-orange transition-colors">
                      {step.num}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3
                    className={
                      isAr
                        ? 'font-cairo font-bold text-base sm:text-lg text-text-primary group-hover:text-brand-orange transition-colors leading-snug'
                        : 'font-syne font-bold text-base sm:text-lg text-text-primary group-hover:text-brand-orange transition-colors leading-snug'
                    }
                  >
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.05]">
                  <span className="text-[10.5px] font-semibold text-text-muted/70 uppercase tracking-wider">
                    {isAr ? `المرحلة ${step.num}` : `Étape ${step.num}`}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
