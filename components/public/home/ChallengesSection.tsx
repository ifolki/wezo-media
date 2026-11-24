import { EyeOff, AlertTriangle, UserX, ArrowRight, Check } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/navigation'

interface Props {
  locale: string
}

export default async function ChallengesSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'home_v2.challenges' })
  const isAr = locale === 'ar'

  const challenges = [
    {
      num: '01',
      icon: EyeOff,
      iconColor: 'text-amber-400',
      badgeBg: 'bg-amber-400/10 border-amber-400/20',
      title: t('c1_title'),
      problem: t('c1_problem'),
      solution: t('c1_solution'),
      href: '/services/brand-identity',
    },
    {
      num: '02',
      icon: AlertTriangle,
      iconColor: 'text-brand-orange',
      badgeBg: 'bg-brand-orange/10 border-brand-orange/20',
      title: t('c2_title'),
      problem: t('c2_problem'),
      solution: t('c2_solution'),
      href: '/services/marketing',
    },
    {
      num: '03',
      icon: UserX,
      iconColor: 'text-brand-red',
      badgeBg: 'bg-brand-red/10 border-brand-red/20',
      title: t('c3_title'),
      problem: t('c3_problem'),
      solution: t('c3_solution'),
      href: '/services/whatsapp-lead-automation',
    },
  ]

  return (
    <section
      aria-labelledby="challenges-heading"
      className="py-14 sm:py-16 lg:py-20 bg-[#121926] border-y border-white/[0.06] relative overflow-hidden text-start"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-secondary border border-white/10 text-brand-orange text-xs font-bold uppercase tracking-widest">
            <span>{t('badge')}</span>
          </div>

          <h2
            id="challenges-heading"
            className={
              isAr
                ? 'font-cairo font-extrabold text-2xl sm:text-3xl lg:text-[2.35rem] text-text-primary leading-[1.3]'
                : 'font-syne font-bold text-2xl sm:text-3xl lg:text-[2.35rem] text-text-primary leading-tight'
            }
          >
            {t('title')}
          </h2>

          <p className="text-sm sm:text-base text-text-muted max-w-2xl mx-auto leading-relaxed font-normal">
            {t('subtitle')}
          </p>
        </div>

        {/* 3 Minimalist Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {challenges.map((c) => {
            const Icon = c.icon
            return (
              <article
                key={c.num}
                className="group relative rounded-2xl p-6 sm:p-7 bg-[#161D2B]/90 border border-white/[0.08] hover:border-brand-orange/35 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1"
              >
                {/* Top Subtle Hover Accent */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-brand-orange via-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <div className="space-y-4">
                  {/* Top Bar: Icon + Number */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl ${c.badgeBg} border flex items-center justify-center shrink-0 ${c.iconColor} group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-white/30 tracking-wider">
                      {c.num}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3
                    className={
                      isAr
                        ? 'font-cairo font-bold text-lg text-text-primary group-hover:text-brand-orange transition-colors'
                        : 'font-syne font-bold text-lg text-text-primary group-hover:text-brand-orange transition-colors'
                    }
                  >
                    {c.title}
                  </h3>

                  {/* Single Sentence Problem Statement */}
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {c.problem}
                  </p>

                  {/* Minimal High-Impact Solution Line */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center shrink-0 text-brand-orange mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <p className="text-xs sm:text-[13px] font-semibold text-text-primary leading-snug">
                      {c.solution}
                    </p>
                  </div>
                </div>

                {/* Subtle Direct Action Link */}
                <div className="pt-4 mt-5 border-t border-white/[0.05]">
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-white transition-colors group/link"
                  >
                    <span>{isAr ? 'اكتشف الحل المناسب' : 'Découvrir la solution'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-1 rtl:rotate-180 rtl:group-hover/link:-translate-x-1" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
