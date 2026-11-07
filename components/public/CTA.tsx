'use client'

import { motion } from 'framer-motion'
import { Rocket, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/navigation'
import { siteConfig } from '@/lib/config/site'
import { trackRequestQuote, trackWhatsAppClick } from '@/lib/analytics/gtag'

export default function FinalCTA() {
  const t = useTranslations('cta')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  return (
    <section className="py-20 lg:py-24 relative overflow-hidden">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden gradient-brand p-10 sm:p-14 md:p-20 text-center space-y-8 shadow-[0_24px_80px_rgba(249,115,22,0.25)] group"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-1000" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 space-y-10">
            <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl mx-auto flex items-center justify-center border border-white/20 shadow-2xl animate-float">
               <Rocket className="w-12 h-12 text-white" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight">
                {t('title')}
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
                {t('desc')}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/get-quote"
                onClick={() => trackRequestQuote({ ctaLocation: 'homepage_final_cta', locale })}
              >
                <Button size="lg" className="h-14 sm:h-16 px-8 sm:px-10 bg-white text-brand-orange hover:bg-white/95 font-bold text-base sm:text-lg rounded-2xl gap-3 shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all">
                  <span>{t('button')}</span>
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </Button>
              </Link>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({ ctaLocation: 'homepage_final_cta_whatsapp', locale })}
              >
                <Button size="lg" variant="outline" className="h-14 sm:h-16 px-8 sm:px-9 bg-black/20 border border-white/30 text-white hover:bg-black/35 font-bold text-base sm:text-lg rounded-2xl gap-2.5 backdrop-blur-md hover:-translate-y-0.5 active:scale-95 transition-all">
                  <MessageCircle className="w-5 h-5 text-emerald-300" />
                  <span>{isAr ? 'تواصل عبر واتساب' : isFr ? 'Discuter sur WhatsApp' : 'Chat on WhatsApp'}</span>
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
