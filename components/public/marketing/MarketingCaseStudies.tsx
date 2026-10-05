'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight, ArrowUpRight, FolderGit2, Sparkles, CheckCircle2 } from 'lucide-react'
import { Link } from '@/navigation'

interface Props {
  locale: string
}

export default function MarketingCaseStudies({ locale }: Props) {
  const t = useTranslations('marketing_service.cases')
  const isAr = locale === 'ar'

  const caseStudies = [
    {
      slug: 'decoafrica',
      img: '/assets/agency/decoafrica.jpg',
      client: t('c1_client'),
      type: t('c1_type'),
      problem: t('c1_problem'),
      strategy: t('c1_strategy'),
      execution: t('c1_execution'),
      result: t('c1_result'),
      tags: ['Digital Strategy', 'Meta Ads', 'E-Commerce']
    },
    {
      slug: 'creche-btissam',
      img: '/assets/agency/creche-btissam.jpg',
      client: t('c2_client'),
      type: t('c2_type'),
      problem: t('c2_problem'),
      strategy: t('c2_strategy'),
      execution: t('c2_execution'),
      result: t('c2_result'),
      tags: ['Branding', 'Local Ads', 'Content Video']
    },
    {
      slug: 'hanae-kandri',
      img: '/assets/agency/hanae-kandri.jpg',
      client: t('c3_client'),
      type: t('c3_type'),
      problem: t('c3_problem'),
      strategy: t('c3_strategy'),
      execution: t('c3_execution'),
      result: t('c3_result'),
      tags: ['Healthcare', 'Lead Generation', 'WhatsApp Journey']
    },
    {
      slug: 'horizon-travel',
      img: '/assets/agency/horizon-travel.jpg',
      client: t('c4_client'),
      type: t('c4_type'),
      problem: t('c4_problem'),
      strategy: t('c4_strategy'),
      execution: t('c4_execution'),
      result: t('c4_result'),
      tags: ['Tourism', 'Video Storytelling', 'International Leads']
    }
  ]

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-y border-[#EBE7DC] text-[#111118] relative">
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 text-brand-orange text-xs font-black uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-base sm:text-lg text-[#555562] leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* 4 Case Studies Grid (2x2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((cs, idx) => (
            <motion.div
              key={cs.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="rounded-3xl border border-[#E8E4DA] bg-[#FDFCF9] hover:bg-white hover:border-brand-orange/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header Image */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#16161F]">
                  <img
                    src={cs.img}
                    alt={cs.client}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Pill Over Image */}
                  <div className="absolute top-4 start-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                      {cs.type}
                    </span>
                  </div>

                  {/* Client Title Over Image */}
                  <div className="absolute bottom-4 start-4 end-4">
                    <h3 className="text-xl sm:text-2xl font-black text-white font-syne">
                      {cs.client}
                    </h3>
                  </div>
                </div>

                {/* Structured 4-Step Narrative: Problem -> Strategy -> Execution -> Result */}
                <div className="p-6 sm:p-8 space-y-4 text-start">
                  
                  {/* Problem */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#8A8A96] block">
                      {t('problem_label')}
                    </span>
                    <p className="text-xs sm:text-sm text-[#444452] leading-relaxed">
                      {cs.problem}
                    </p>
                  </div>

                  {/* Strategy */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#8A8A96] block">
                      {t('strategy_label')}
                    </span>
                    <p className="text-xs sm:text-sm text-[#444452] leading-relaxed">
                      {cs.strategy}
                    </p>
                  </div>

                  {/* Execution */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-black uppercase tracking-wider text-[#8A8A96] block">
                      {t('execution_label')}
                    </span>
                    <p className="text-xs sm:text-sm text-[#444452] leading-relaxed">
                      {cs.execution}
                    </p>
                  </div>

                  {/* Verified Result Box */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      {t('result_label')}
                    </span>
                    <p className="text-xs sm:text-sm font-black text-emerald-900 leading-relaxed">
                      {cs.result}
                    </p>
                  </div>

                </div>
              </div>

              {/* Bottom Action Card */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-[#EDE8DD] mt-4">
                <div className="flex flex-wrap gap-1.5">
                  {cs.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#EBE7DC] text-[#4E4E5C]">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/portfolio/${cs.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black text-brand-orange hover:underline shrink-0 group/btn"
                >
                  <span>{t('btn_view')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Portfolio CTA */}
        <div className="mt-14 text-center">
          <Link href="/portfolio">
            <button className="h-13 px-8 rounded-2xl border border-[#D5D0C2] bg-white hover:bg-[#F2EFE6] text-[#111118] font-black text-sm transition-all shadow-sm active:scale-95 inline-flex items-center gap-2">
              <span>{t('view_all')}</span>
              <ArrowUpRight className="w-4 h-4 text-brand-orange" />
            </button>
          </Link>
        </div>

      </div>
    </section>
  )
}
