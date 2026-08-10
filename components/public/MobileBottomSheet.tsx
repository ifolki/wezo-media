'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useSession, signOut } from 'next-auth/react'
import { 
  X, Info, BookOpen, Mail, TrendingUp, 
  LogIn, LayoutDashboard, LogOut, Shield, FileText 
} from 'lucide-react'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

export default function MobileBottomSheet({ isOpen, onClose, triggerRef }: BottomSheetProps) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const { data: session } = useSession()

  const sheetRef = useRef<HTMLDivElement>(null)

  // 1. Esc Key support and Background Scroll Freeze
  useEffect(() => {
    if (!isOpen) return

    // Freeze underlying scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  // 2. Focus trapping & Focus Restore on close
  useEffect(() => {
    if (isOpen) {
      // Find all focusable elements inside the bottom sheet
      const focusableElements = sheetRef.current?.querySelectorAll(
        'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      )
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        // Focus the first element initially
        firstElement.focus()

        const handleFocusTrap = (e: KeyboardEvent) => {
          if (e.key !== 'Tab') return

          if (e.shiftKey) {
            // Shift + Tab -> Wrap to last element
            if (document.activeElement === firstElement) {
              lastElement.focus()
              e.preventDefault()
            }
          } else {
            // Tab -> Wrap to first element
            if (document.activeElement === lastElement) {
              firstElement.focus()
              e.preventDefault()
            }
          }
        }

        window.addEventListener('keydown', handleFocusTrap)
        return () => window.removeEventListener('keydown', handleFocusTrap)
      }
    } else {
      // Restore focus to trigger when closing
      triggerRef.current?.focus()
    }
  }, [isOpen, triggerRef])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* Bottom Sheet Drawer */}
          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="More navigation options"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              // If dragged down by more than 100px, trigger close
              if (info.offset.y > 100) {
                onClose()
              }
            }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0F] border-t border-white/10 rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] pb-[calc(20px+env(safe-area-inset-bottom))] px-6 pt-4 flex flex-col gap-6 md:hidden max-h-[85vh] overflow-y-auto"
          >
            {/* Drag Handle Bar */}
            <div className="w-16 h-1.5 rounded-full bg-white/15 mx-auto shrink-0 cursor-grab active:cursor-grabbing mb-2" />

            {/* Header row */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h3 className="text-lg font-black text-white font-syne uppercase tracking-wider">
                {isAr ? 'المزيد من الروابط' : 'More Menu'}
              </h3>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 text-white/70 hover:text-white flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all"
                aria-label="Close menu drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Lists */}
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/about"
                onClick={onClose}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all font-bold text-sm text-start"
              >
                <Info className="w-5 h-5 text-brand-orange" />
                <span>{isAr ? 'من نحن' : 'About Us'}</span>
              </Link>

              <Link
                href="/blog"
                onClick={onClose}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all font-bold text-sm text-start"
              >
                <BookOpen className="w-5 h-5 text-[#FF4D80]" />
                <span>{t('blog')}</span>
              </Link>

              <Link
                href="/contact"
                onClick={onClose}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all font-bold text-sm text-start"
              >
                <Mail className="w-5 h-5 text-emerald-500" />
                <span>{t('contact')}</span>
              </Link>

              <Link
                href="/case-studies"
                onClick={onClose}
                className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all font-bold text-sm text-start"
              >
                <TrendingUp className="w-5 h-5 text-brand-orange" />
                <span>{isAr ? 'دراسات الحالة' : 'Case Studies'}</span>
              </Link>
            </div>

            <div className="border-t border-white/5 my-2" />

            {/* Auth section */}
            <div className="space-y-4">
              {session ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/dashboard"
                    onClick={onClose}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 text-brand-orange font-black text-sm active:scale-[0.98] transition-all"
                  >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>{t('dashboard')}</span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut()
                      onClose()
                    }}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-black text-sm text-start active:scale-[0.98] transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-brand-orange to-[#FF4D80] text-white font-black text-sm active:scale-[0.98] transition-all shadow-[0_8px_24px_rgba(255,107,43,0.2)]"
                >
                  <LogIn className="w-5 h-5" />
                  <span>{t('login')}</span>
                </Link>
              )}
            </div>

            {/* Language Selection Row */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.01] mt-1">
              <span className="text-xs font-black uppercase text-text-muted tracking-wider">
                {isAr ? 'لغة الموقع' : 'Site Language'}
              </span>
              <LanguageSwitcher />
            </div>

            {/* Legal Links Footer */}
            <div className="flex justify-center gap-6 text-[11px] text-text-muted font-bold pt-2">
              <Link href="/privacy" onClick={onClose} className="hover:text-white transition-colors flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                {isAr ? 'سياسة الخصوصية' : 'Privacy'}
              </Link>
              <span className="text-white/10">•</span>
              <Link href="/terms" onClick={onClose} className="hover:text-white transition-colors flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                {isAr ? 'الشروط والأحكام' : 'Terms'}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
