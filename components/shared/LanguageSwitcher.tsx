import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Languages } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (nextLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = nextLocale
    router.push(segments.join('/'))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-text-primary hover:text-brand-orange transition-colors gap-2 uppercase font-bold text-sm h-9 px-3 rounded-md flex items-center justify-center active:scale-95 transition-all">
        <Languages className="w-4 h-4" />
        <span>{locale.toUpperCase()}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-brand-card border-white/10 text-white min-w-[120px]">
        <DropdownMenuItem onClick={() => switchLocale('ar')} className="focus:bg-brand-orange/20 cursor-pointer text-sm font-bold">العربية</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale('en')} className="focus:bg-brand-orange/20 cursor-pointer text-sm font-bold">English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale('fr')} className="focus:bg-brand-orange/20 cursor-pointer text-sm font-bold">Français</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
