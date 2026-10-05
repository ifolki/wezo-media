'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Compass, 
  Film, 
  TrendingUp, 
  Layout, 
  BarChart3, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  Layers
} from 'lucide-react'
import { Link } from '@/navigation'

interface Props {
  locale: string
}

export default function MarketingPillars({ locale }: Props) {
  const t = useTranslations('marketing_service.pillars')
  const isAr = locale === 'ar'

  const pillars = [
    {
      num: '01',
      titleKey: 'p1_title',
      descKey: 'p1_desc',
      items: [
        t('p1_items.0'),
        t('p1_items.1'),
        t('p1_items.2'),
        t('p1_items.3'),
        t('p1_items.4')
      ],
      icon: Compass,
      tag: isAr ? 'الأساس والاتجاه' : 'Fondation Stratégique',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      num: '02',
      titleKey: 'p2_title',
      descKey: 'p2_desc',
      items: [
        t('p2_items.0'),
        t('p2_items.1'),
        t('p2_items.2'),
        t('p2_items.3')
      ],
      icon: Film,
      tag: isAr ? 'الهوية والانجذاب' : 'Production Créative',
      color: 'from-pink-500 to-rose-600'
    },
    {
      num: '03',
      titleKey: 'p3_title',
      descKey: 'p3_desc',
      items: [
        t('p3_items.0'),
        t('p3_items.1'),
        t('p3_items.2'),
        t('p3_items.3')
      ],
      icon: TrendingUp,
      tag: isAr ? 'استقطاب ومبيعات' : 'Acquisition & ROAS',
      color: 'from-brand-orange to-red-600',
      internalLink: {
        href: '/services/meta-ads-management',
        label: isAr ? 'تفاصيل إدارة إعلانات ميتا' : 'Détails Gestion Meta Ads'
      }
    },
    {
      num: '04',
      titleKey: 'p4_title',
      descKey: 'p4_desc',
      items: [
        t('p4_items.0'),
        t('p4_items.1'),
        t('p4_items.2'),
        t('p4_items.3')
      ],
      icon: Layout,
      tag: isAr ? 'مسارات التحويل' : 'Tunnels de Vente',
      color: 'from-purple-500 to-violet-600',
      internalLink: {
        href: '/services/landing-page',
        label: isAr ? 'تفاصيل صفحات الهبوط' : 'Détails Landing Pages'
      }
    },
    {
      num: '05',
      titleKey: 'p5_title',
      descKey: 'p5_desc',
      items: [
        t('p5_items.0'),
        t('p5_items.1'),
        t('p5_items.2'),
        t('p5_items.3')
      ],
      icon: BarChart3,
      tag: isAr ? 'الأرقام والعائد' : 'Analyse & Rentabilité',
      color: 'from-emerald-500 to-teal-600'
    }
  ]

  return (
    <section id="solutions" className="py-20 md:py-28 bg-[#F6F5F0] text-[#111118] relative">
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-xs font-black uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-base sm:text-lg text-[#555562] leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Disclaimer / Non-Forced Service Pill */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#EBE7DC] border border-[#DDD8CA] text-xs sm:text-sm font-bold text-[#444452]">
            <Sparkles className="w-4 h-4 text-brand-orange shrink-0" />
            <span>{t('disclaimer')}</span>
          </div>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {pillars.map((p, idx) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="rounded-3xl border border-[#E2DDD0] bg-white p-7 shadow-[0_12px_36px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-brand-orange/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black tracking-tighter text-[#CCC7B9] group-hover:text-brand-orange transition-colors">
                      {p.num}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-[#F6F5F0] border border-[#E5E0D2] group-hover:border-brand-orange/30 flex items-center justify-center text-[#2A2A35] group-hover:text-brand-orange transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 text-start">
                    <h3 className="text-lg sm:text-xl font-black text-[#111118]">
                      {t(p.titleKey)}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C5C6A] leading-relaxed">
                      {t(p.descKey)}
                    </p>
                  </div>

                  {/* Bullet Points with Checkmarks */}
                  <ul className="space-y-2.5 pt-2 text-start">
                    {p.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-xs text-[#33333F]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contextual Internal Link if available */}
                {p.internalLink && (
                  <div className="pt-6 mt-6 border-t border-[#F0ECE1]">
                    <Link
                      href={p.internalLink.href}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-brand-orange hover:underline group/link"
                    >
                      <span>{p.internalLink.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
