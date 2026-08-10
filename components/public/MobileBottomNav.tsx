'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Home, Briefcase, Sparkles, PanelsTopLeft, CircleEllipsis } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/navigation'
import MobileBottomSheet from './MobileBottomSheet'

export default function MobileBottomNav() {
  const t = useTranslations('mobile_nav')
  const locale = useLocale()
  const rawPathname = usePathname()
  const isAr = locale === 'ar'

  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  
  const moreButtonRef = useRef<HTMLButtonElement | null>(null)

  // 1. Detect keyboard opening using VisualViewport API
  useEffect(() => {
    const visualViewport = window.visualViewport
    if (!visualViewport) return

    const handleResize = () => {
      // If visual viewport height is significantly less than window innerHeight, keyboard is visible
      const isKeyboardVisible = visualViewport.height < window.innerHeight * 0.8
      setIsKeyboardOpen(isKeyboardVisible)
    }

    visualViewport.addEventListener('resize', handleResize)
    return () => visualViewport.removeEventListener('resize', handleResize)
  }, [])

  // 2. Active Tab matching logic
  const isHomeActive = rawPathname === '/'
  const isServicesActive = rawPathname.includes('/services')
  const isQuoteActive = rawPathname.includes('/get-quote')
  const isPortfolioActive = rawPathname.includes('/portfolio') || rawPathname.includes('/case-studies')
  const isMoreActive = isSheetOpen

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#07070A]/90 backdrop-blur-2xl border-t border-white/5 shadow-[0_-12px_40px_rgba(0,0,0,0.6)] px-4 pb-[env(safe-area-inset-bottom)] h-[72px] flex items-center justify-between md:hidden transition-transform duration-300 ${
          isKeyboardOpen ? 'translate-y-full pointer-events-none' : 'translate-y-0'
        }`}
      >
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent shadow-[0_0_20px_rgba(255,107,43,0.3)]" />

        <div className="flex w-full items-center justify-between relative h-full">
          
          {/* Tab 1: Home */}
          <Link
            href="/"
            aria-current={isHomeActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all ${
              isHomeActive ? 'text-brand-orange' : 'text-text-muted hover:text-white'
            }`}
          >
            <div className="relative">
              <Home className="w-5.5 h-5.5" />
              {isHomeActive && (
                <motion.span
                  layoutId="mobileActiveIndicator"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider">{t('home')}</span>
          </Link>

          {/* Tab 2: Services */}
          <Link
            href="/services"
            aria-current={isServicesActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all ${
              isServicesActive ? 'text-brand-orange' : 'text-text-muted hover:text-white'
            }`}
          >
            <div className="relative">
              <Briefcase className="w-5.5 h-5.5" />
              {isServicesActive && (
                <motion.span
                  layoutId="mobileActiveIndicator"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider">{t('services')}</span>
          </Link>

          {/* Tab 3: Central CTA - Get Quote */}
          <div className="flex-1 flex justify-center relative -top-3.5 z-50">
            <Link href="/get-quote" className="flex flex-col items-center gap-1.5 group">
              <motion.button
                whileTap={{ scale: 0.92 }}
                aria-label={t('get_quote')}
                aria-current={isQuoteActive ? 'page' : undefined}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                  isQuoteActive
                    ? 'gradient-brand text-white shadow-brand-orange/40 ring-4 ring-brand-orange/20'
                    : 'gradient-brand text-white shadow-brand-orange/20 hover:scale-105'
                }`}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.button>
              <span className={`text-[10px] font-black uppercase tracking-wider text-center translate-y-1 ${
                isQuoteActive ? 'text-brand-orange' : 'text-text-muted'
              }`}>
                {t('get_quote')}
              </span>
            </Link>
          </div>

          {/* Tab 4: Portfolio */}
          <Link
            href="/portfolio"
            aria-current={isPortfolioActive ? 'page' : undefined}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all ${
              isPortfolioActive ? 'text-brand-orange' : 'text-text-muted hover:text-white'
            }`}
          >
            <div className="relative">
              <PanelsTopLeft className="w-5.5 h-5.5" />
              {isPortfolioActive && (
                <motion.span
                  layoutId="mobileActiveIndicator"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider">{t('portfolio')}</span>
          </Link>

          {/* Tab 5: More Drawer */}
          <button
            ref={moreButtonRef}
            onClick={() => setIsSheetOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isSheetOpen}
            className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all ${
              isMoreActive ? 'text-brand-orange' : 'text-text-muted hover:text-white'
            }`}
          >
            <div className="relative">
              <CircleEllipsis className="w-5.5 h-5.5" />
              {isMoreActive && (
                <motion.span
                  layoutId="mobileActiveIndicator"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider">{t('more')}</span>
          </button>

        </div>
      </nav>

      {/* Expanded Links Drawer Sheet */}
      <MobileBottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        triggerRef={moreButtonRef}
      />
    </>
  )
}
