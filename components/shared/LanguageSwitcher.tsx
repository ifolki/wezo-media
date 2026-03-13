'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const toggleLocale = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar'
    // Extract the part of the pathname after the current locale
    const segments = pathname.split('/')
    segments[1] = nextLocale
    router.push(segments.join('/'))
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="text-text-primary hover:text-brand-orange transition-colors gap-2"
    >
      <Languages className="w-4 h-4" />
      <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
    </Button>
  )
}
