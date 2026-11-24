'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Check, ArrowRight, ArrowLeft, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react'
import { Link } from '@/navigation'
import { trackRequestQuote } from '@/lib/analytics/gtag'

interface Props {
  locale: string
}

export default function AcquisitionPackages({ locale }: Props) {
  const t = useTranslations('meta_ads_service.packages')
  const isAr = locale === 'ar'
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight

  const packages = [
    {
      id: 'demarrage',
      name: t('pkg1_name'),
      desc: t('pkg1_desc'),
      cta: t('pkg1_cta'),
      features: [
        t('pkg1_features.0'),
        t('pkg1_features.1'),
        t('pkg1_features.2'),
        t('pkg1_features.3'),
        t('pkg1_features.4'),
      ],
      isPopular: false,
      tierBadge: isAr ? 'الباقة الأساسية' : 'Niveau 1'
    },
    {
      id: 'croissance',
      name: t('pkg2_name'),
      badge: t('pkg2_badge'),
      desc: t('pkg2_desc'),
      cta: t('pkg2_cta'),
      features: [
        t('pkg2_features.0'),
        t('pkg2_features.1'),
        t('pkg2_features.2'),
        t('pkg2_features.3'),
        t('pkg2_features.4'),
      ],
      isPopular: true,
      tierBadge: isAr ? 'الأكثر طلباً' : 'Recommandé'
    },
    {
      id: 'performance',
      name: t('pkg3_name'),
      desc: t('pkg3_desc'),
      cta: t('pkg3_cta'),
      features: [
        t('pkg3_features.0'),
        t('pkg3_features.1'),
        t('pkg3_features.2'),
        t('pkg3_features.3'),
        t('pkg3_features.4'),
      ],
      isPopular: false,
      tierBadge: isAr ? 'حلول متقدمة' : 'Niveau 3'
    }
  ]

  return (
    <section id="formules" className="py-12 md:py-16 bg-white border-t border-[#E7E5DF] text-[#111118]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>{t('badge')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-[#111118]">
            {t('title')}
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            {t('subtitle')}
          </p>
        </div>

        {/* Media Budget Clarification Alert Box */}
        <div className="max-w-3xl mx-auto mb-10 p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-950 flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1 min-w-0">
            <h3 className="text-xs sm:text-sm font-bold text-amber-950">
              {t('budget_notice_title')}
            </h3>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              {t('budget_notice_text')}
            </p>
          </div>
        </div>

        {/* 3 Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg, idx) => {
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                  pkg.isPopular
                    ? 'bg-neutral-900 text-white shadow-xl shadow-brand-orange/10 border-2 border-brand-orange ring-1 ring-brand-orange/40'
                    : 'bg-[#FBFBFA] text-[#111118] border border-[#E7E5DF] hover:border-neutral-300 shadow-xs'
                }`}
              >
                {/* Popular Pill */}
                {pkg.isPopular && (
                  <div className="absolute -top-3 start-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-orange text-white text-[11px] font-bold shadow-md uppercase tracking-wider">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  {/* Tier Subtitle */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${
                      pkg.isPopular ? 'text-brand-orange' : 'text-neutral-500'
                    }`}>
                      {pkg.tierBadge}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      pkg.isPopular 
                        ? 'border-white/20 text-neutral-300 bg-white/5' 
                        : 'border-neutral-200 text-neutral-600 bg-white'
                    }`}>
                      {isAr ? 'عرض أسعار مخصص' : 'Sur Devis'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-lg font-extrabold mb-2 ${
                    pkg.isPopular ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {pkg.name}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-4 ${
                    pkg.isPopular ? 'text-neutral-300' : 'text-neutral-600'
                  }`}>
                    {pkg.desc}
                  </p>

                  <div className={`pt-3 border-t mb-4 ${
                    pkg.isPopular ? 'border-neutral-800' : 'border-neutral-200'
                  }`} />

                  {/* Features list (Max 5 bullets) */}
                  <ul className="space-y-2.5 mb-6">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs">
                        <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          pkg.isPopular ? 'text-brand-orange' : 'text-emerald-600'
                        }`} />
                        <span className={pkg.isPopular ? 'text-neutral-200' : 'text-neutral-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/get-quote?service=meta-ads-management&formula=${pkg.id}`}
                  onClick={() => {
                    trackRequestQuote({
                      ctaLocation: `meta_ads_package_${pkg.id}`,
                      serviceName: 'meta-ads-management',
                      locale,
                    })
                  }}
                  className={`w-full py-3 inline-flex items-center justify-center font-bold rounded-xl text-xs sm:text-sm transition-all ${
                    pkg.isPopular
                      ? 'bg-brand-orange hover:bg-brand-orange/90 text-white shadow-md shadow-brand-orange/20'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  <span>{pkg.cta}</span>
                  <ArrowIcon className="w-3.5 h-3.5 ms-1.5" />
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Micro Reassurance */}
        <div className="mt-8 text-center text-xs text-neutral-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            {isAr 
              ? 'دراسة مشروعكم مجانية وبدون أي التزام • عرض أسعار مفصل تحت الطلب خلال 24 ساعة'
              : 'Étude de cadrage offerte • Devis détaillé sans engagement sous 24-48h'
            }
          </span>
        </div>

      </div>
    </section>
  )
}
