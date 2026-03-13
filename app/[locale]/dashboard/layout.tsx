'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname } from '@/navigation'
import { 
  LayoutDashboard, 
  FolderKanban, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  PlusCircle,
  Bell
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import RequestServiceModal from '@/components/shared/RequestServiceModal'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    { href: '/dashboard', label: t('overview'), icon: LayoutDashboard },
    { href: '/dashboard/projects', label: t('my_projects'), icon: FolderKanban },
    { href: '/dashboard/messages', label: t('messages'), icon: MessageSquare },
    { href: '/dashboard/payments', label: t('payments'), icon: CreditCard },
    { href: '/dashboard/settings', label: t('settings'), icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header */}
      <header className="md:hidden h-20 bg-brand-card/50 backdrop-blur-xl border-b border-white/5 px-6 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center">
           <img src="/assets/logo/logo-normal.png" alt="Wezo Media" className="h-8 w-auto object-contain" />
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
           <Menu className="w-6 h-6 text-white" />
        </Button>
      </header>

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <AnimatePresence>
        {(isSidebarOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
          />
        )}
        
        <motion.aside
          initial={false}
          animate={{ 
            x: isSidebarOpen || (typeof window !== 'undefined' && window.innerWidth >= 768) ? 0 : -320 
          }}
          className={`fixed inset-y-0 left-0 z-[60] w-80 bg-brand-card/80 backdrop-blur-2xl border-r border-white/5 flex flex-col pt-12 pb-8 md:relative md:translate-x-0 rtl:left-auto rtl:right-0 rtl:border-r-0 rtl:border-l overflow-y-auto transition-transform md:transition-none`}
        >
          <div className="px-8 mb-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
           <img src="/assets/logo/logo-normal.png" alt="Wezo Media" className="h-10 w-auto object-contain" />
        </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
               <X className="w-6 h-6 text-white" />
            </Button>
          </div>

          <div className="px-8 mb-10 text-start">
             <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                   <Avatar className="w-12 h-12 rounded-xl border-2 border-brand-orange/20">
                      <AvatarImage src={session?.user?.image || ''} />
                      <AvatarFallback className="bg-gradient-brand text-white font-bold">{session?.user?.name?.[0] || 'U'}</AvatarFallback>
                   </Avatar>
                   <div className="overflow-hidden">
                      <p className="text-white font-bold truncate">{session?.user?.name}</p>
                      <p className="text-text-muted text-xs truncate">{session?.user?.email}</p>
                   </div>
                </div>
             </div>
          </div>

          <nav className="flex-grow px-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${isActive ? 'gradient-brand text-white shadow-lg shadow-brand-orange/20' : 'text-text-muted hover:bg-white/5 hover:text-white'}`}
                >
                  <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-text-muted group-hover:text-brand-orange'}`} />
                  <span className="font-bold text-lg">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="px-4 mt-auto pt-8 space-y-4">
            <RequestServiceModal>
               <Button className="w-full h-14 rounded-2xl bg-white/5 border border-brand-orange/30 text-brand-orange font-black text-lg hover:bg-brand-orange hover:text-white transition-all gap-2">
                  <PlusCircle className="w-5 h-5" />
                  {t('new_request')}
               </Button>
            </RequestServiceModal>
            
            <Button 
              variant="ghost" 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full h-14 rounded-2xl text-text-muted hover:text-red-400 hover:bg-red-400/5 font-bold text-lg gap-4"
            >
              <LogOut className="w-5 h-5" />
              <span>{isAr ? 'تسجيل الخروج' : 'Log Out'}</span>
            </Button>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
         {/* Top Header */}
         <header className="hidden md:flex h-24 border-b border-white/5 items-center justify-between px-12 bg-brand-dark/50 backdrop-blur-md sticky top-0 z-40">
            <h1 className="text-2xl font-black text-white capitalize">
               {navItems.find(item => item.href === pathname)?.label || 'Overview'}
            </h1>
            
            <div className="flex items-center gap-6">
               <button className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-text-muted hover:text-white hover:border-brand-orange/30 transition-all">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-3 right-3 w-2 h-2 bg-brand-pink rounded-full ring-4 ring-brand-dark"></span>
               </button>
               <div className="h-10 w-[1px] bg-white/5 mx-2" />
               <div className="flex items-center gap-4 text-start">
                  <div className="text-end hidden lg:block">
                     <p className="text-sm font-bold text-white">{session?.user?.name}</p>
                     <p className="text-xs text-brand-orange font-medium">{session?.user?.role}</p>
                  </div>
                  <Avatar className="w-12 h-12 rounded-xl border border-white/10 ring-4 ring-white/5">
                     <AvatarFallback className="bg-brand-secondary text-brand-orange font-black">
                        {session?.user?.name?.[0]}
                     </AvatarFallback>
                  </Avatar>
               </div>
            </div>
         </header>

         {/* Screen Content */}
         <div className="flex-grow overflow-x-hidden overflow-y-auto p-6 md:p-12 custom-scrollbar">
            {children}
         </div>
      </main>
    </div>
  )
}
