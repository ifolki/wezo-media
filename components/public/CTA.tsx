'use client'

import { motion } from 'framer-motion'
import { Rocket, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import RequestServiceModal from '@/components/shared/RequestServiceModal'

export default function FinalCTA() {
  const t = useTranslations('cta')

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] overflow-hidden gradient-brand p-16 md:p-32 text-center space-y-12 shadow-[0_0_120px_rgba(255,107,43,0.3)] group"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors duration-1000" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 space-y-10">
            <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-xl mx-auto flex items-center justify-center border border-white/20 shadow-2xl animate-float">
               <Rocket className="w-12 h-12 text-white" />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-5xl md:text-8xl font-black text-white leading-[1.1] tracking-tighter">
                {t('title')}
              </h2>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-bold leading-relaxed">
                {t('desc')}
              </p>
            </div>

            <div className="pt-8">
              <RequestServiceModal>
                <Button size="lg" className="h-24 px-16 bg-white text-brand-orange hover:bg-white/90 font-black text-3xl rounded-[2rem] gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:scale-110 active:scale-95 transition-all">
                  {t('button')}
                  <ArrowRight className="w-8 h-8 rtl:rotate-180" />
                </Button>
              </RequestServiceModal>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
