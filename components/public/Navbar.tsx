'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Rocket, LogIn, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import RequestServiceModal from '@/components/shared/RequestServiceModal'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = useTranslations('nav')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/services', label: t('services') },
    { href: '/artists', label: t('artists') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/blog', label: t('blog') },
    { href: '/contact', label: t('contact') },
  ]

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-brand-dark/90 backdrop-blur-2xl py-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-b border-white/5'
          : 'bg-transparent py-8'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500 rotate-6 group-hover:rotate-0">
            <Rocket className="text-white w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black gradient-text tracking-tighter leading-none italic uppercase">
              WEZO
            </span>
            <span className="text-[10px] font-black text-brand-orange tracking-[0.4em] leading-none mt-1 uppercase">
              Creative Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-black text-white/70 hover:text-white transition-all relative group uppercase tracking-widest"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 w-0 h-1 gradient-brand group-hover:w-full transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="h-8 w-[1px] bg-white/10" />
          <LanguageSwitcher />
          <RequestServiceModal>
            <Button className="h-14 px-10 rounded-2xl gradient-brand border-none hover:opacity-90 font-black text-base shadow-[0_10px_30px_rgba(255,107,43,0.3)] hover:scale-105 active:scale-95 transition-all gap-2">
              <Sparkles className="w-5 h-5" />
              {t('home') === 'الرئيسية' ? 'اطلب خدمة' : 'Let\'s Talk'}
            </Button>
          </RequestServiceModal>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="lg:hidden fixed inset-4 top-24 bg-brand-dark/95 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] z-[100]"
          >
            <div className="h-full overflow-y-auto p-12 flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-4xl font-black text-white hover:text-brand-orange transition-colors uppercase tracking-tight"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-auto space-y-8">
                <div className="flex items-center justify-between p-6 rounded-3xl glass-card">
                  <span className="text-sm font-black text-text-muted uppercase tracking-widest">Language / اللغة</span>
                  <LanguageSwitcher />
                </div>
                <RequestServiceModal>
                  <Button className="w-full h-20 rounded-[2rem] gradient-brand font-black text-2xl shadow-2xl" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('home') === 'الرئيسية' ? 'اطلب خدمة الآن' : 'Get Started'}
                  </Button>
                </RequestServiceModal>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
