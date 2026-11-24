'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { ArrowRight, ArrowLeft, MessageCircle, Sparkles, ShieldCheck, Clock, CheckCircle } from 'lucide-react'
import { Link } from '@/navigation'
import { siteConfig } from '@/lib/config/site'
import { trackRequestQuote, trackWhatsAppClick } from '@/lib/analytics/gtag'

interface Props {
  locale: string
}

export default function AcquisitionCTA({ locale }: Props) {
  const t = useTranslations('meta_ads_service.cta')
  const isAr = locale === 'ar'
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight

  const whatsappMessage = encodeURIComponent(
    isAr
      ? 'السلام عليكم WEZO MEDIA، بغيت نتشاور معكم بخصوص حملات الإعلانات الممولة (Meta Ads) للمشروع ديالي.'
      : locale === 'en'
      ? 'Hello WEZO MEDIA, I would like to discuss Meta ad campaigns for my business.'
      : 'Bonjour WEZO MEDIA, je souhaite échanger avec vous concernant les campagnes Meta Ads pour mon entreprise.'
  )

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`

  return (
    <section className="py-12 md:py-16 bg-[#111118] text-white relative overflow-hidden">
      {/* Warm ambient background lights */}
      <div className="absolute top-0 end-0 w-[400px] h-[400px] bg-brand-orange/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 start-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-orange text-xs font-semibold mb-5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('badge')}</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white mb-4 max-w-2xl mx-auto"
        >
          {t('title')}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed max-w-xl mx-auto mb-8 font-normal"
        >
          {t('subtitle')}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-8"
        >
          <Link
            href="/get-quote?service=meta-ads-management"
            onClick={() => {
              trackRequestQuote({
                ctaLocation: 'meta_ads_bottom_cta_quote',
                serviceName: 'meta-ads-management',
                locale,
              })
            }}
            className="inline-flex items-center justify-center bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-7 py-3.5 text-sm sm:text-base rounded-xl shadow-lg shadow-brand-orange/20 transition-all hover:translate-y-[-1px]"
          >
            <span>{t('btn_quote')}</span>
            <ArrowIcon className="w-4 h-4 ms-2" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppClick({
                ctaLocation: 'meta_ads_bottom_cta_whatsapp',
                service: 'meta-ads-management',
                locale,
              })
            }}
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 text-sm sm:text-base rounded-xl backdrop-blur-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 me-2 text-emerald-400" />
            <span>{t('btn_whatsapp')}</span>
          </a>
        </motion.div>

        {/* Reassurance Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-5 border-t border-white/10 text-xs text-neutral-400"
        >
          <div className="flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>{t('reassurance_1')}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{t('reassurance_2')}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-brand-orange shrink-0" />
            <span>{t('reassurance_3')}</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
