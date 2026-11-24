'use client'

import { MessageCircle } from 'lucide-react'
import { useLocale } from 'next-intl'
import { siteConfig } from '@/lib/config/site'
import { trackWhatsAppClick } from '@/lib/analytics/gtag'

export default function HomeWhatsAppFloating() {
  const locale = useLocale()
  const isAr = locale === 'ar'

  const message = encodeURIComponent(
    isAr
      ? 'السلام عليكم WEZO MEDIA، أريد الاستفسار عن خدمات الوكالة ومناقشة مشروعي.'
      : locale === 'en'
      ? 'Hello WEZO MEDIA, I would like to inquire about your services and discuss my project.'
      : 'Bonjour WEZO MEDIA, je souhaite me renseigner sur vos services et échanger sur mon projet.'
  )

  const url = `https://wa.me/${siteConfig.whatsapp}?text=${message}`

  const label = isAr ? 'تواصل عبر واتساب' : locale === 'en' ? 'Chat on WhatsApp' : 'Discuter sur WhatsApp'

  return (
    <aside
      aria-label={label}
      className="fixed bottom-24 end-5 md:bottom-8 md:end-8 z-40"
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          trackWhatsAppClick({
            ctaLocation: 'homepage_floating_whatsapp',
            locale,
          })
        }}
        aria-label={label}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_10px_28px_rgba(16,185,129,0.35)] border border-emerald-400/30 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-emerald-300 animate-ping" />
          <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-emerald-300" />
        </div>
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          {label}
        </span>
      </a>
    </aside>
  )
}
