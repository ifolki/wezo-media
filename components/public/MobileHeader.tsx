'use client'

import { useState, useEffect } from 'react'
import { Link } from '@/navigation'
import LanguageSwitcher from '@/components/shared/LanguageSwitcher'
import { Phone } from 'lucide-react'

interface SettingsData {
  phone?: string | null
}

export default function MobileHeader() {
  const [phone, setPhone] = useState<string | null>(null)

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings')
        if (res.ok) {
          const data: SettingsData = await res.json()
          if (data.phone) {
            // Normalize phone number for wa.me link
            const cleanPhone = data.phone.replace(/[^0-9]/g, '')
            setPhone(cleanPhone)
          }
        }
      } catch (err) {
        console.error('Failed loading mobile header settings:', err)
      }
    }
    loadSettings()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#07070A]/85 backdrop-blur-xl border-b border-white/5 h-[60px] flex items-center justify-between px-6 md:hidden">
      {/* Brand Logo */}
      <Link href="/" className="flex items-center">
        <img 
          src="/assets/logo/logo-normal.png" 
          alt="Wezo Media Logo" 
          className="h-8 w-auto object-contain" 
        />
      </Link>

      {/* Action triggers */}
      <div className="flex items-center gap-4">
        {/* Dynamic WhatsApp Trigger */}
        {phone && (
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 active:scale-95 flex items-center justify-center transition-all border border-emerald-500/10"
          >
            {/* Custom high-converting SVG WhatsApp Path */}
            <svg 
              className="w-5 h-5 fill-current" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 2.028 14.07 1.001 11.99 1.001c-5.441 0-9.865 4.372-9.87 9.802a9.71 9.71 0 001.492 5.117L2.6 21.582l5.885-1.52c1.558.85 3.185 1.294 4.79 1.294h.01-.005h.01zM17.483 14c-.3-.15-1.78-.875-2.05-.976-.27-.1-.47-.15-.67.15-.2.3-.77.975-.94 1.174-.17.2-.35.225-.65.075-1.02-.5-1.79-.92-2.49-1.52-.3-.25-.45-.42-.075-.85.375-.425.65-.95.8-.15.15-.3.075-.525-.038-.75-.113-.225-.67-1.62-.919-2.222-.24-.582-.49-.5-.67-.51H9.9c-.2 0-.525.075-.8.375-.27.3-1.05 1.025-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.11 3.22 5.11 4.52.71.3 1.27.48 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.78-.725 2.03-1.42.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/>
            </svg>
          </a>
        )}

        {/* Localized Language Swapper */}
        <div className="scale-90 origin-right">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
