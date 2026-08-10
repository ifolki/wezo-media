'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, Sparkles, User, 
  LayoutDashboard, LogOut, UserPlus, LogIn 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import RequestServiceModal from '@/components/shared/RequestServiceModal'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const { data: session } = useSession()
  const locale = useLocale()
  const t = useTranslations('nav')

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 hidden md:block',
        isScrolled
          ? 'bg-brand-dark/90 backdrop-blur-2xl py-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-b border-white/5'
          : 'bg-transparent py-8'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img 
            src="/assets/logo/logo-normal.png" 
            alt="Wezo Media" 
            className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
          />
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
        <div className="hidden lg:flex items-center gap-6">
          <div className="h-8 w-[1px] bg-white/10" />
          <LanguageSwitcher />
          
          {/* Account Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-white hover:text-brand-orange transition-all group overflow-hidden border border-white/5 active:scale-95">
              {session?.user?.image ? (
                <img src={session.user.image} alt={session.user.name || ''} className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-brand-dark/95 backdrop-blur-3xl border-white/10 text-white rounded-3xl p-3 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] z-50 mt-2">
              {session ? (
                <>
                  <DropdownMenuLabel className="px-4 py-3 font-syne text-text-muted uppercase text-[10px] tracking-[0.2em] font-black outline-none border-none">
                    {t('account')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5 mb-2" />
                  <DropdownMenuItem
                    render={
                      <Link href="/dashboard" className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all focus:bg-white/5 outline-none">
                        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                          <LayoutDashboard className="w-5 h-5 text-brand-orange" />
                        </div>
                        <span className="font-bold text-base">{t('dashboard')}</span>
                      </Link>
                    }
                  />
                  <DropdownMenuSeparator className="bg-white/5 my-2" />
                  <DropdownMenuItem 
                    onClick={() => signOut()} 
                    render={
                      <div className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-red-500/10 text-red-500 cursor-pointer transition-all focus:bg-red-500/10 outline-none group/logout">
                        <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center group-hover/logout:bg-red-500/20 transition-all">
                          <LogOut className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-base">{t('logout')}</span>
                      </div>
                    }
                  />
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    render={
                      <Link href="/login" className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all focus:bg-white/5 outline-none">
                        <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                          <LogIn className="w-5 h-5 text-brand-orange" />
                        </div>
                        <span className="font-bold text-base">{t('login')}</span>
                      </Link>
                    }
                  />
                  <DropdownMenuItem
                    render={
                      <Link href="/register" className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all focus:bg-white/5 outline-none text-brand-pink">
                        <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center">
                          <UserPlus className="w-5 h-5 text-brand-pink" />
                        </div>
                        <span className="font-bold text-base">{t('register')}</span>
                      </Link>
                    }
                  />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-8 w-[1px] bg-white/10" />

          <RequestServiceModal>
            <Button className="h-14 px-8 rounded-2xl gradient-brand border-none hover:opacity-90 font-black text-sm shadow-[0_10px_30px_rgba(255,107,43,0.3)] hover:scale-105 active:scale-95 transition-all gap-2">
              <Sparkles className="w-4 h-4" />
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
              
              <div className="mt-auto space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {session ? (
                    <>
                      <Link href="/dashboard" className="flex items-center gap-4 p-5 rounded-[2rem] glass-card text-white font-black text-xl active:scale-95 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                         <div className="w-12 h-12 rounded-2xl bg-brand-orange shadow-lg shadow-brand-orange/20 flex items-center justify-center">
                           <LayoutDashboard className="w-6 h-6 text-white" />
                         </div>
                         {t('dashboard')}
                      </Link>
                      <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="flex items-center gap-4 p-5 rounded-[2rem] bg-red-500/10 text-red-500 font-black text-xl text-start active:scale-95 transition-all">
                         <div className="w-12 h-12 rounded-2xl bg-red-500 shadow-lg shadow-red-500/20 flex items-center justify-center">
                           <LogOut className="w-6 h-6 text-white" />
                         </div>
                         {t('logout')}
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <Link href="/login" className="flex flex-col items-center justify-center gap-3 p-8 rounded-[2.5rem] glass-card text-white font-black uppercase tracking-widest text-xs active:scale-95 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                         <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center mb-1">
                           <LogIn className="w-6 h-6 text-white" />
                         </div>
                         {t('login')}
                      </Link>
                      <Link href="/register" className="flex flex-col items-center justify-center gap-3 p-8 rounded-[2.5rem] glass-card text-white font-black uppercase tracking-widest text-xs active:scale-95 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                         <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-1">
                           <UserPlus className="w-6 h-6 text-white" />
                         </div>
                         {t('register')}
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-5 rounded-[2rem] glass-card border border-white/5">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] px-2">{locale === 'ar' ? 'اللغة' : 'Language'}</span>
                  <LanguageSwitcher />
                </div>
                
                <RequestServiceModal>
                  <Button className="w-full h-20 rounded-[2.5rem] gradient-brand font-black text-2xl shadow-2xl active:scale-95 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
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
