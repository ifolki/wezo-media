'use client'

import { Link } from '@/navigation'
import { Rocket, Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('nav')

  return (
    <footer className="bg-brand-dark pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-pink/5 blur-[150px] -z-10" />

      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-brand rounded-2xl flex items-center justify-center shadow-2xl">
                <Rocket className="text-white w-7 h-7" />
              </div>
              <span className="text-3xl font-black gradient-text tracking-tighter">
                WEZO MEDIA
              </span>
            </Link>
            <p className="text-text-muted text-lg leading-relaxed">
              وكالة رقمية رائدة متخصصة في الإنتاج الفني، التسويق الرقمي، وحلول الويب المبتكرة. نحن نصنع المستقبل الرقمي.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-text-primary hover:text-brand-orange hover:border-brand-orange/50 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-8">
            <h4 className="text-xl font-black text-white">{t('services')}</h4>
            <ul className="space-y-4">
              {['audio', 'video', 'marketing', 'web'].map((item) => (
                <li key={item}>
                  <Link href={`/services/${item}`} className="text-text-muted hover:text-brand-orange transition-colors text-lg uppercase">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8 text-right">
            <h4 className="text-xl font-black text-white">الشركة</h4>
            <ul className="space-y-4">
              {['portfolio', 'blog', 'contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item}`} className="text-text-muted hover:text-brand-orange transition-colors text-lg capitalize">
                    {t(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className="text-xl font-black text-white">اتصل بنا</h4>
            <ul className="space-y-6">
              <li className="flex items-center gap-4 text-text-muted group">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center group-hover:text-brand-orange transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-lg">contact@wezomedia.com</span>
              </li>
              <li className="flex items-center gap-4 text-text-muted group">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center group-hover:text-brand-orange transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-lg" dir="ltr">+212 600-000000</span>
              </li>
              <li className="flex items-center gap-4 text-text-muted group">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center group-hover:text-brand-orange transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-lg">Casablanca, Morocco</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-text-muted font-bold text-sm">
          <p suppressHydrationWarning>© {new Date().getFullYear()} WEZO MEDIA. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
