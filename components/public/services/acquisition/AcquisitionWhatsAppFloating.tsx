'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/config/site'
import { trackWhatsAppClick } from '@/lib/analytics/gtag'

interface Props {
  locale: string
}

export default function AcquisitionWhatsAppFloating({ locale }: Props) {
  const t = useTranslations('meta_ads_service.whatsapp')
  const isAr = locale === 'ar'

  const message = encodeURIComponent(
    isAr
      ? 'السلام عليكم WEZO MEDIA، بغيت نتشاور معكم بخصوص حملات الإعلانات الممولة (Meta Ads) للمشروع ديالي.'
      : locale === 'en'
      ? 'Hello WEZO MEDIA, I would like to discuss Meta ad campaigns for my business.'
      : 'Bonjour WEZO MEDIA, je souhaite échanger avec vous concernant les campagnes Meta Ads pour mon entreprise.'
  )

  const url = `https://wa.me/${siteConfig.whatsapp}?text=${message}`

  return (
    <aside 
      aria-label="WhatsApp Support"
      className="fixed bottom-4 end-4 z-30 sm:bottom-6 sm:end-6 pointer-events-auto"
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackWhatsAppClick({
            ctaLocation: 'meta_ads_floating_whatsapp',
            service: 'meta-ads-management',
            locale,
          })
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center justify-center p-3 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-950/20 border border-emerald-400/40 backdrop-blur-md transition-all"
        aria-label={t('button_text')}
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -end-1 w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
          <span className="absolute -top-1 -end-1 w-2 h-2 rounded-full bg-emerald-300" />
        </div>
        <span className="hidden sm:inline ms-2.5 text-xs font-bold tracking-wide">
          {t('button_text')}
        </span>
      </motion.a>
    </aside>
  )
}
