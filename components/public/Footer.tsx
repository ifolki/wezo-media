'use client'

import { Link } from '@/navigation'
import { Rocket, Instagram, Facebook, Youtube, Linkedin, Music2, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { siteConfig } from '@/lib/config/site'
import { trackPhoneClick, trackWhatsAppClick } from '@/lib/analytics/gtag'

export default function Footer() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const serviceLinks = [
    {
      slug: 'marketing',
      labelAr: 'التسويق الرقمي وإعلانات ميتا',
      labelFr: 'Marketing Digital & Meta Ads',
      labelEn: 'Digital Marketing & Meta Ads',
    },
    {
      slug: 'business-website',
      labelAr: 'تطوير المواقع والمتاجر',
      labelFr: 'Sites Web & E-commerce',
      labelEn: 'Websites & E-commerce',
    },
    {
      slug: 'brand-identity',
      labelAr: 'الهوية البصرية والعلامة التجارية',
      labelFr: 'Identité Visuelle & Branding',
      labelEn: 'Brand Identity & Design',
    },
    {
      slug: 'whatsapp-lead-automation',
      labelAr: 'الأتمتة والذكاء الاصطناعي',
      labelFr: 'Automatisation & IA',
      labelEn: 'AI & CRM Automation',
    },
    {
      slug: 'reels-social-video',
      labelAr: 'الإنتاج المرئي والفيديو',
      labelFr: 'Production Vidéo & Reels',
      labelEn: 'Video Production & Reels',
    },
    {
      slug: 'music-production',
      labelAr: 'الإنتاج الصوتي والموسيقي',
      labelFr: 'Production Audio & Musique',
      labelEn: 'Audio & Music Production',
    },
  ]

  const socialLinks = [
    { icon: Instagram, href: siteConfig.social.instagram, label: 'Instagram' },
    { icon: Facebook, href: siteConfig.social.facebook, label: 'Facebook' },
    { icon: Linkedin, href: siteConfig.social.linkedin, label: 'LinkedIn' },
    { icon: Music2, href: siteConfig.social.tiktok, label: 'TikTok' },
    { icon: Youtube, href: siteConfig.social.youtube, label: 'YouTube' },
  ].filter(s => s.href && s.href !== '#')

  const address = isAr ? siteConfig.addressAr : isFr ? siteConfig.addressFr : siteConfig.addressEn

  return (
    <footer className="bg-brand-dark pt-32 pb-12 border-t border-white/5 relative overflow-hidden text-start">
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
              {isAr
                ? 'وكالة رقمية رائدة متخصصة في الحلول الرقمية المتكاملة، التسويق الرقمي، تطوير المواقع، الأتمتة والإنتاج الفني. نحن نصنع المستقبل الرقمي.'
                : isFr
                ? 'Agence digitale leader spécialisée dans le marketing digital, le développement web, l’automatisation IA et la production créative au Maroc.'
                : 'Leading digital agency specializing in integrated digital marketing, web development, AI automation, and creative production in Morocco.'}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-text-primary hover:text-brand-orange hover:border-brand-orange/50 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services Links Column */}
          <div className="space-y-8">
            <h4 className="text-xl font-black text-white">{t('services')}</h4>
            <ul className="space-y-4">
              {serviceLinks.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="text-text-muted hover:text-brand-orange transition-colors text-lg"
                  >
                    {isAr ? item.labelAr : isFr ? item.labelFr : item.labelEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links Column */}
          <div className="space-y-8">
            <h4 className="text-xl font-black text-white">
              {isAr ? 'الشركة' : isFr ? 'L’Agence' : 'Company'}
            </h4>
            <ul className="space-y-4">
              {(['about', 'portfolio', 'services', 'artists', 'blog', 'contact', 'get_quote'] as const).map((item) => {
                const route = item === 'get_quote' ? '/get-quote' : `/${item}`
                return (
                  <li key={item}>
                    <Link href={route} className="text-text-muted hover:text-brand-orange transition-colors text-lg capitalize">
                      {t(item)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-8">
            <h4 className="text-xl font-black text-white">
              {isAr ? 'اتصل بنا' : isFr ? 'Contactez-nous' : 'Contact Us'}
            </h4>
            <ul className="space-y-6">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 text-text-muted hover:text-brand-orange transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center shrink-0 group-hover:text-brand-orange transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-mono" dir="ltr">{siteConfig.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phoneInternational}`}
                  onClick={() => trackPhoneClick({ ctaLocation: 'footer_phone', locale })}
                  className="flex items-center gap-4 text-text-muted hover:text-brand-orange transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center shrink-0 group-hover:text-brand-orange transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-mono" dir="ltr">{siteConfig.whatsappFormatted}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick({ ctaLocation: 'footer_whatsapp', locale })}
                  className="flex items-center gap-4 text-text-muted hover:text-emerald-400 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center shrink-0 group-hover:text-emerald-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <span className="text-lg">
                    {isAr ? 'تواصل مباشر عبر واتساب' : isFr ? 'Discussion directe WhatsApp' : 'Direct WhatsApp Chat'}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 text-text-muted group">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center shrink-0 group-hover:text-brand-orange transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-lg leading-snug">{address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-text-muted font-bold text-sm">
          <p suppressHydrationWarning>
            {isAr
              ? `© ${new Date().getFullYear()} WEZO MEDIA. جميع الحقوق محفوظة.`
              : isFr
              ? `© ${new Date().getFullYear()} WEZO MEDIA. Tous droits réservés.`
              : `© ${new Date().getFullYear()} WEZO MEDIA. All rights reserved.`}
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white transition-colors">
              {isAr ? 'سياسة الخصوصية' : isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              {isAr ? 'الشروط والأحكام' : isFr ? 'Conditions générales' : 'Terms & Conditions'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
