'use client'

import { useState, useEffect } from 'react'
import { Link, usePathname } from '@/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Sparkles,
  User,
  LayoutDashboard,
  LogOut,
  UserPlus,
  LogIn,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { cn } from '@/lib/utils'
import { trackRequestQuote } from '@/lib/analytics/gtag'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
  const { data: session } = useSession()
  const locale = useLocale()
  const isAr = locale === 'ar'
  const pathname = usePathname()
  const t = useTranslations('nav')

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
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

  const isLinkActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <nav
      aria-label="Primary Navigation"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block',
        isScrolled
          ? 'bg-brand-dark/90 backdrop-blur-2xl py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-b border-white/[0.08]'
          : 'bg-brand-dark/75 backdrop-blur-xl py-4 border-b border-white/[0.04]'
      )}
    >
      <div className="container-custom flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group shrink-0">
          <img
            src="/assets/logo/logo-normal.png"
            alt="WEZO MEDIA"
            className="h-9 lg:h-10 w-auto object-contain group-hover:opacity-90 transition-opacity duration-200"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-8">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative py-1.5 transition-colors duration-200 group',
                  isAr
                    ? 'font-cairo text-sm font-bold tracking-normal'
                    : 'text-[13px] font-semibold uppercase tracking-[0.12em]',
                  active
                    ? 'text-text-primary'
                    : 'text-text-primary/70 hover:text-text-primary'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute bottom-0 inset-x-0 h-[2px] rounded-full gradient-brand transition-transform duration-300 origin-center',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </Link>
            )
          })}
        </div>

        {/* Utility & Conversion Actions */}
        <div className="hidden lg:flex items-center gap-3.5 shrink-0">
          <LanguageSwitcher />

          <div className="h-5 w-px bg-white/10" />

          {/* Account Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger
              aria-label={t('account')}
              className="w-10 h-10 rounded-xl bg-brand-secondary/80 hover:bg-brand-secondary flex items-center justify-center text-text-primary/85 hover:text-brand-orange transition-all duration-200 border border-white/[0.08] hover:border-brand-orange/35 overflow-hidden active:scale-95"
            >
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || ''}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-brand-dark/95 backdrop-blur-2xl border-white/10 text-text-primary rounded-2xl p-2 shadow-[0_24px_48px_rgba(0,0,0,0.55)] z-50 mt-2"
            >
              {session ? (
                <>
                  <DropdownMenuLabel className="px-3 py-2 font-syne text-text-muted uppercase text-[10px] tracking-[0.18em] font-bold">
                    {t('account')}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/[0.06] mb-1.5" />
                  <DropdownMenuItem
                    render={
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] cursor-pointer transition-colors outline-none"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-orange/12 flex items-center justify-center">
                          <LayoutDashboard className="w-4 h-4 text-brand-orange" />
                        </div>
                        <span className="font-semibold text-sm">{t('dashboard')}</span>
                      </Link>
                    }
                  />
                  <DropdownMenuSeparator className="bg-white/[0.06] my-1.5" />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    render={
                      <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400 cursor-pointer transition-colors outline-none">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                          <LogOut className="w-4 h-4" />
                        </div>
                        <span className="font-semibold text-sm">{t('logout')}</span>
                      </div>
                    }
                  />
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    render={
                      <Link
                        href="/login"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] cursor-pointer transition-colors outline-none"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-orange/12 flex items-center justify-center">
                          <LogIn className="w-4 h-4 text-brand-orange" />
                        </div>
                        <span className="font-semibold text-sm">{t('login')}</span>
                      </Link>
                    }
                  />
                  <DropdownMenuItem
                    render={
                      <Link
                        href="/register"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.05] cursor-pointer transition-colors outline-none text-brand-orange"
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-orange/12 flex items-center justify-center">
                          <UserPlus className="w-4 h-4 text-brand-orange" />
                        </div>
                        <span className="font-semibold text-sm">{t('register')}</span>
                      </Link>
                    }
                  />
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Primary Talk / Quote CTA */}
          <Link href="/get-quote">
            <Button
              onClick={() =>
                trackRequestQuote({ ctaLocation: 'navbar_desktop_talk_button', locale })
              }
              className="h-10 px-5 rounded-xl gradient-brand border border-white/10 hover:opacity-95 font-bold text-xs sm:text-sm shadow-[0_8px_24px_rgba(249,115,22,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 gap-2 text-white"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('talk_button')}</span>
            </Button>
          </Link>
        </div>

        {/* Tablet Menu Toggle (md to lg) */}
        <div className="flex lg:hidden items-center gap-3">
          <LanguageSwitcher />
          <button
            aria-label="Toggle Menu"
            className="w-10 h-10 rounded-xl bg-brand-secondary/80 border border-white/10 flex items-center justify-center text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Tablet Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-4 top-20 bg-brand-dark/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.65)] z-[100]"
          >
            <div className="p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 rounded-xl text-lg font-bold text-text-primary hover:bg-white/[0.05] hover:text-brand-orange transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <Link
                  href="/get-quote"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button
                    className="w-full h-12 rounded-xl gradient-brand font-bold text-base text-white shadow-lg"
                    onClick={() => {
                      trackRequestQuote({
                        ctaLocation: 'navbar_mobile_menu_get_started',
                        locale,
                      })
                    }}
                  >
                    {t('get_started')}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
