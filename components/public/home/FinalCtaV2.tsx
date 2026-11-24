'use client'

import { ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/navigation'
import { siteConfig } from '@/lib/config/site'
import { trackRequestQuote, trackWhatsAppClick } from '@/lib/analytics/gtag'

export default function FinalCtaV2() {
  const t = useTranslations('home_v2.cta')
  const locale = useLocale()
  const isAr = locale === 'ar'

  const whatsappMessage = encodeURIComponent(
    isAr
      ? 'السلام عليكم WEZO MEDIA، أريد مناقشة مشروع جديد لشركتي والحصول على مقترح.'
      : locale === 'en'
      ? 'Hello WEZO MEDIA, I would like to discuss a new project for my business and get a proposal.'
      : 'Bonjour WEZO MEDIA, je souhaite échanger sur un projet pour mon entreprise et obtenir une proposition.'
  )

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${whatsappMessage}`

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="py-18 lg:py-24 bg-brand-dark relative overflow-hidden"
    >
      <div className="container-custom">
        <div className="relative rounded-[2.25rem] lg:rounded-[2.75rem] overflow-hidden gradient-brand p-8 sm:p-12 md:p-16 text-center space-y-7 shadow-[0_24px_70px_rgba(249,115,22,0.22)]">
          {/* Subtle Ambient Decorative Highlights */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-[420px] h-[420px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-black/25 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <h2
              id="final-cta-heading"
              className={
                isAr
                  ? 'font-cairo font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight'
                  : 'font-syne font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight'
              }
            >
              {t('title')}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed font-normal max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            {/* Conversion Actions */}
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <Link
                href="/get-quote"
                onClick={() => {
                  trackRequestQuote({
                    ctaLocation: 'final_cta_v2_primary',
                    locale,
                  })
                }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-13 px-8 bg-white text-brand-orange hover:bg-white/95 font-bold text-sm sm:text-base rounded-xl gap-2.5 shadow-[0_14px_30px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                >
                  <span>{t('btn_primary')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Button>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick({
                    ctaLocation: 'final_cta_v2_whatsapp',
                    locale,
                  })
                }}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-13 px-7 bg-black/25 border border-white/30 text-white hover:bg-black/40 font-bold text-sm sm:text-base rounded-xl gap-2.5 backdrop-blur-md hover:-translate-y-0.5 active:scale-[0.98] transition-all"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-300" />
                  <span>{t('btn_whatsapp')}</span>
                </Button>
              </a>
            </div>

            {/* Reassurance Label */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-white/80 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-white/90 shrink-0" />
              <span>{t('reassurance')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
