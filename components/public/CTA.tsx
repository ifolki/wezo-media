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
    <section className="py-32 relative overflow-hidden">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] overflow-hidden gradient-brand p-12 md:p-28 text-center space-y-12 shadow-[0_0_120px_rgba(255,107,43,0.3)] group"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-1000" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 space-y-10">
            <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl mx-auto flex items-center justify-center border border-white/20 shadow-2xl animate-float">
               <Rocket className="w-12 h-12 text-white" />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                {t('title')}
              </h2>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-bold leading-relaxed">
                {t('desc')}
              </p>
            </div>

            <div className="pt-8 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="/get-quote"
                onClick={() => trackRequestQuote({ ctaLocation: 'homepage_final_cta', locale })}
              >
                <Button size="lg" className="h-20 px-12 bg-white text-brand-orange hover:bg-white/95 font-black text-xl md:text-2xl rounded-[2rem] gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all">
                  <span>{t('button')}</span>
                  <ArrowRight className="w-7 h-7 rtl:rotate-180" />
                </Button>
              </Link>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick({ ctaLocation: 'homepage_final_cta_whatsapp', locale })}
              >
                <Button size="lg" variant="outline" className="h-20 px-10 bg-black/20 border-2 border-white/30 text-white hover:bg-black/35 font-black text-xl md:text-2xl rounded-[2rem] gap-3 backdrop-blur-md hover:scale-105 active:scale-95 transition-all">
                  <MessageCircle className="w-7 h-7 text-emerald-300" />
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
