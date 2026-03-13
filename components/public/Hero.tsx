'use client'

import { motion } from 'framer-motion'
import { Rocket, Sparkles, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import RequestServiceModal from '@/components/shared/RequestServiceModal'
import { Link } from '@/navigation'

export default function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#0A0A0F]">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-orange/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-brand-pink/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.03]" />
      </div>

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          {/* Content */}
          <div className="flex-1 text-center lg:text-start space-y-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
            >
              <div className="flex h-2.5 w-2.5 rounded-full bg-brand-orange animate-ping" />
              <span className="text-sm font-black tracking-[0.2em] text-brand-orange uppercase flex items-center gap-2">
                 {t('badge')}
              </span>
            </motion.div>

            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.95] tracking-tight"
              >
                <span className="block mb-2">{t('titlePrefix')}</span>
                <span className="gradient-text block py-2">{t('titleGradient')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-bold"
              >
                {t('subtitle')}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-8"
            >
              <RequestServiceModal>
                <Button className="h-20 px-12 rounded-[2rem] text-2xl font-black gradient-brand hover:opacity-90 shadow-[0_20px_50px_rgba(255,107,43,0.3)] transition-all hover:scale-105 active:scale-95 gap-4">
                  <Rocket className="w-8 h-8" />
                  {t('ctaPrimary')}
                </Button>
              </RequestServiceModal>

              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="h-20 px-12 rounded-[2rem] text-2xl font-black border-white/10 hover:bg-white/5 transition-all gap-3 glass-card"
                >
                  <Play className="w-8 h-8 fill-brand-orange text-brand-orange" />
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Decorative Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="hidden lg:flex flex-1 items-center justify-center relative"
          >
            <div className="relative w-[500px] h-[500px]">
               {/* Orbital Rings */}
               <div className="absolute inset-0 border border-white/5 rounded-full animate-spin-slow" />
               <div className="absolute inset-8 border border-white/10 rounded-full animate-[spin_12s_linear_infinite_reverse]" />
               
               {/* Hero Card */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 glass-card rounded-[3rem] p-10 flex flex-col items-center justify-center gap-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                  <div className="w-24 h-24 rounded-3xl gradient-brand flex items-center justify-center shadow-2xl">
                    <Rocket className="w-12 h-12 text-white" />
                  </div>
                  <div className="w-full space-y-3">
                    <div className="h-2 w-full bg-white/10 rounded-full" />
                    <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl glass-card flex items-center justify-center shadow-xl">
                    <Sparkles className="w-8 h-8 text-brand-orange" />
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
