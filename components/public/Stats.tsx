'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Compass, Film, Layers, TrendingUp } from 'lucide-react'
import { useLocale } from 'next-intl'
import { createCardRevealVariant } from '@/lib/motion-tokens'

const valuePillars = [
  {
    id: 'strategy',
    icon: Compass,
    badge: '01',
    accentClass: 'text-brand-orange bg-brand-orange/12 border-brand-orange/25',
    lineClass: 'from-brand-orange/60 to-transparent',
    titleAr: 'الاستراتيجية والمواكبة',
    titleFr: 'Stratégie & accompagnement',
    titleEn: 'Strategy & Advisory',
    descAr:
      'تشخيص دقيق لحضورك الرقمي، تحديد الفرص، ورسم خارطة طريق واضحة ومواكبة مستمرة لنمو نشاطك التجاري.',
    descFr:
      'Audit approfondi, positionnement sur mesure et feuille de route claire pour structurer votre développement digital.',
    descEn:
      'In-depth digital audit, tailored positioning, and a clear strategic roadmap to guide your business growth.',
  },
  {
    id: 'creativity',
    icon: Film,
    badge: '02',
    accentClass: 'text-brand-red bg-brand-red/12 border-brand-red/25',
    lineClass: 'from-brand-red/60 to-transparent',
    titleAr: 'الإبداع والإنتاج المتكامل',
    titleFr: 'Créativité & production',
    titleEn: 'Creativity & Production',
    descAr:
      'هوية بصرية راقية، صناعة محتوى مؤثر، وإنتاج مرئي وصوتي احترافي داخل استوديوهاتنا لتعزيز مكانة علامتك.',
    descFr:
      'Identité de marque distinctive, création de contenu et production audiovisuelle en studio à fort impact.',
    descEn:
      'Distinctive brand identity, persuasive content creation, and in-house studio video and audio production.',
  },
  {
    id: 'solutions',
    icon: Layers,
    badge: '03',
    accentClass: 'text-brand-orange bg-brand-orange/12 border-brand-orange/25',
    lineClass: 'from-brand-orange/60 to-transparent',
    titleAr: 'حلول رقمية متكاملة',
    titleFr: 'Solutions digitales intégrées',
    titleEn: 'Integrated Digital Solutions',
    descAr:
      'تطوير مواقع إلكترونية ومتاجر سريعة، صفحات هبوط عالية التحويل، وأنظمة أتمتة ذكية عبر واتساب وCRM.',
    descFr:
      'Sites web performants, boutiques e-commerce, tunnels de conversion et automatisation intelligente WhatsApp & CRM.',
    descEn:
      'High-speed websites, e-commerce stores, conversion funnels, and intelligent WhatsApp & CRM automation.',
  },
  {
    id: 'optimization',
    icon: TrendingUp,
    badge: '04',
    accentClass: 'text-emerald-400 bg-emerald-500/12 border-emerald-500/25',
    lineClass: 'from-emerald-400/60 to-transparent',
    titleAr: 'الأداء والتحسين المستمر',
    titleFr: 'Optimisation & performance',
    titleEn: 'Optimization & Performance',
    descAr:
      'إدارة دقيقة للحملات الإعلانية الممولة، تتبع مؤشرات الأداء، وتحسين مستمر لمسارات اكتساب العملاء.',
    descFr:
      'Pilotage de campagnes publicitaires ciblées, suivi analytique précis et optimisation continue des conversions.',
    descEn:
      'Targeted paid acquisition campaigns, precision analytics tracking, and continuous conversion optimization.',
  },
]

export default function Stats() {
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'
  const prefersReducedMotion = Boolean(useReducedMotion())

  const getTitle = (item: (typeof valuePillars)[0]) =>
    isAr ? item.titleAr : isFr ? item.titleFr : item.titleEn

  const getDesc = (item: (typeof valuePillars)[0]) =>
    isAr ? item.descAr : isFr ? item.descFr : item.descEn

  return (
    <section
      aria-label={
        isAr
          ? 'ركائز القيمة والقدرات الرقمية'
          : isFr
            ? 'Nos piliers de valeur et expertises'
            : 'Core Capabilities & Value Proposition'
      }
      className="py-14 lg:py-16 relative border-y border-white/[0.06] bg-[#141C2B] overflow-hidden text-start"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {valuePillars.map((pillar, i) => {
            const Icon = pillar.icon
            const cardVariants = createCardRevealVariant(i, prefersReducedMotion)

            return (
              <motion.div
                key={pillar.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="group relative p-6 rounded-2xl bg-brand-secondary/85 border border-white/[0.07] hover:border-brand-orange/35 transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between gap-4 shadow-[0_10px_28px_rgba(0,0,0,0.2)] overflow-hidden"
              >
                {/* Subtle Top Accent Bar */}
                <div
                  aria-hidden="true"
                  className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${pillar.lineClass} opacity-65 group-hover:opacity-100 transition-opacity duration-300`}
                />

                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${pillar.accentClass}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-text-muted/70 font-syne tracking-[0.18em]">
                    {pillar.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <h2
                    className={
                      isAr
                        ? 'font-cairo font-bold text-lg text-text-primary group-hover:text-brand-orange transition-colors leading-snug'
                        : 'font-syne font-bold text-[1.08rem] text-text-primary group-hover:text-brand-orange transition-colors leading-snug'
                    }
                  >
                    {getTitle(pillar)}
                  </h2>
                  <p className="text-xs sm:text-[13.5px] text-text-muted leading-[1.68]">
                    {getDesc(pillar)}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
