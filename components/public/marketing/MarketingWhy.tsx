'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  Network, 
  Puzzle, 
  Users2, 
  Workflow, 
  MessageSquareText, 
  LineChart, 
  ShieldCheck 
} from 'lucide-react'

interface Props {
  locale: string
}

export default function MarketingWhy({ locale }: Props) {
  const t = useTranslations('marketing_service.why')
  const isAr = locale === 'ar'

  const reasons = [
    {
      num: '01',
      title: t('item1_title'),
      desc: t('item1_desc'),
      icon: Network
    },
    {
      num: '02',
      title: t('item2_title'),
      desc: t('item2_desc'),
      icon: Puzzle
    },
    {
      num: '03',
      title: t('item3_title'),
      desc: t('item3_desc'),
      icon: Users2
    },
    {
      num: '04',
      title: t('item4_title'),
      desc: t('item4_desc'),
      icon: Workflow
    },
    {
      num: '05',
      title: t('item5_title'),
      desc: t('item5_desc'),
      icon: MessageSquareText
    },
    {
      num: '06',
      title: t('item6_title'),
      desc: t('item6_desc'),
      icon: LineChart
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-[#F6F5F0] text-[#111118] relative">
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-xs font-black uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-base sm:text-lg text-[#555562] leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* 6 Operating Model Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {reasons.map((r, idx) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="rounded-3xl border border-[#E2DDD0] bg-white p-7 sm:p-8 shadow-[0_12px_36px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-brand-orange/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4 text-start">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#F6F5F0] border border-[#E5E0D2] group-hover:border-brand-orange/30 flex items-center justify-center text-[#2A2A35] group-hover:text-brand-orange transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-[#EBE7DC] text-[#636373]">
                      Pillar {r.num}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-[#111118] group-hover:text-brand-orange transition-colors">
                    {r.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555562] leading-relaxed font-normal">
                    {r.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-[11px] font-bold text-[#8C8C9A]">
                  <span>{isAr ? 'ضمان التنسيق والجودة' : 'Coordination & Qualité'}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange/50" />
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
