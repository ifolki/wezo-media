'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { siteConfig } from '@/lib/config/site'
import { trackWhatsAppClick } from '@/lib/analytics/gtag'

interface Props {
  locale: string
}

export default function MarketingWhatsAppFloating({ locale }: Props) {
  const t = useTranslations('marketing_service.whatsapp')
  const isAr = locale === 'ar'

  const message = encodeURIComponent(
    isAr
      ? 'السلام عليكم WEZO MEDIA، بغيت نناقش التسويق الرقمي ديال مشروعي.'
      : locale === 'en'
      ? 'Hello WEZO MEDIA, I would like to discuss digital marketing for my project.'
      : 'Bonjour WEZO MEDIA, je souhaite discuter du marketing digital de mon projet.'
  )

  const url = `https://wa.me/${siteConfig.whatsapp}?text=${message}`

  return (
    <aside 
      aria-label="WhatsApp Support"
      className="fixed bottom-24 end-6 z-40 md:bottom-8 md:end-8"
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackWhatsAppClick({
            ctaLocation: 'marketing_floating_whatsapp',
            service: 'marketing',
            locale,
          })
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group flex items-center gap-3 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_10px_30px_rgba(16,185,129,0.35)] border border-emerald-400/40 backdrop-blur-md transition-all"
        aria-label={t('button_text')}
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
          <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-emerald-300" />
        </div>
        <span className="hidden sm:inline text-xs font-black tracking-wide">
          {t('button_text')}
        </span>
      </motion.a>
    </aside>
  )
}
