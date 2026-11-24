'use client'

import { motion } from 'framer-motion'
import { Disc, Youtube, Music2, Share2, Mic2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/navigation'
import { useLocale } from 'next-intl'

export default function ArtistsClient() {
  const locale = useLocale()
  const isAr = locale === 'ar'
  const isFr = locale === 'fr'

  const heroH1Part1 = isAr ? 'صوتك يوصل ' : isFr ? 'Faites Résonner Votre Musique ' : 'Take Your Music '
  const heroH1Gradient = isAr ? 'للعالم' : isFr ? 'Dans le Monde' : 'to the World'

  const heroSubtitle = isAr
    ? 'من الإنتاج الموسيقي إلى التوزيع العالمي على جميع المنصات. نحن شريكك في رحلة النجاح والانتشار.'
    : isFr
    ? 'De la production musicale en studio à la distribution mondiale sur toutes les plateformes de streaming.'
    : 'From studio production to worldwide distribution across all major streaming platforms.'

  const ctaBtnText = isAr ? 'ابدأ رحلتك الآن' : isFr ? 'Démarrer Votre Projet' : 'Get Started Now'

  const distTitle = isAr
    ? 'وزع موسيقاك على أهم المنصات العالمية'
    : isFr
    ? 'Distribuez Votre Musique Sur les Plus Grandes Plateformes'
    : 'Distribute Your Music to Leading Global Platforms'

  const distSub = isAr
    ? 'نصل بأعمالك لأكثر من 150 منصة بث رقمي حول العالم'
    : isFr
    ? 'Diffusez vos titres sur plus de 150 plateformes de streaming dans le monde entier.'
    : 'Reach over 150 digital streaming platforms worldwide.'

  const mgmtTitle = isAr ? 'إدارة المحتوى الرقمي والحقوق' : isFr ? 'Gestion & Promotion Digitale' : 'Digital Content & Rights Management'
  const mgmtSub = isAr
    ? 'نحن لا نكتفي بالتوزيع فقط، بل نرافق هويتك الفنية وندير حقوقك لضمان أقصى عائد وانتشار.'
    : isFr
    ? 'Au-delà de la distribution, nous accompagnons votre image de marque et protégeons vos droits.'
    : 'Beyond distribution, we protect your royalties and amplify your digital reach.'

  const features = isAr
    ? [
        { title: 'التوزيع الرقمي الشامل', desc: 'نشر الأغاني والألبومات على Spotify، YouTube، Apple Music، وأنغامي بنقرة واحدة.' },
        { title: 'التسويق والترويج الموسيقي', desc: 'حملات إعلانية وتكتيكات Reels وTikTok لزيادة نسب الاستماع وجذب الجماهير.' },
        { title: 'إدارة الحقوق والتحصيل', desc: 'حماية الملكية الفكرية وضمان تحصيل عائدات البث الرقمي بكل شفافية.' },
      ]
    : isFr
    ? [
        { title: 'Distribution Digitale Globale', desc: 'Sortie de vos titres sur Spotify, Apple Music, YouTube Music, Anghami et Deezer.' },
        { title: 'Promotion & Marketing Musical', desc: 'Campagnes ciblées sur les réseaux pour développer vos streams et votre communauté.' },
        { title: 'Protection des Droits & Revenus', desc: 'Collecte des royalties et sécurisation de votre propriété intellectuelle.' },
      ]
    : [
        { title: 'Global Digital Distribution', desc: 'Release music on Spotify, Apple Music, YouTube, Anghami, and Deezer.' },
        { title: 'Music Marketing & Promotion', desc: 'Targeted ad campaigns engineered to build streams and expand your listener base.' },
        { title: 'Rights Management & Royalties', desc: 'Transparent royalty collection and global copyright protection.' },
      ]

  const trustStatLabel = isAr ? 'فنان ومبدع وثقوا بنا' : isFr ? 'Artistes et créateurs accompagnés' : 'Artists & creators partnered'

  return (
    <main className="min-h-screen text-start">
      {/* Hero */}
      <section className="relative py-28 sm:py-32 overflow-hidden text-center">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1514525253361-bee8718a342b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark to-brand-dark" />

        <div className="container mx-auto px-4 text-center space-y-6 sm:space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange mb-2"
          >
            <Disc className="w-10 h-10 sm:w-12 sm:h-12 animate-spin-slow" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={
              isAr
                ? 'font-cairo font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight'
                : 'font-syne font-bold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight'
            }
          >
            <span>{heroH1Part1}</span>
            <span className="bg-gradient-to-r from-brand-orange via-[#FF4D80] to-brand-red bg-clip-text text-transparent">
              {heroH1Gradient}
            </span>
          </motion.h1>

          <p className="text-base sm:text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>

          <div className="pt-4">
            <Link href="/get-quote?service=music-production">
              <Button size="lg" className="gradient-brand font-black px-10 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl rounded-2xl shadow-2xl hover:opacity-95 transition-opacity">
                {ctaBtnText}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Distribution Platforms */}
      <section className="py-20 bg-brand-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14 space-y-3">
            <h2 className={isAr ? 'font-cairo font-extrabold text-3xl sm:text-4xl text-white' : 'font-syne font-bold text-3xl sm:text-4xl text-white'}>
              {distTitle}
            </h2>
            <p className="text-text-muted text-sm sm:text-base">{distSub}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-card flex items-center justify-center">
                <Share2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-text-muted">Spotify</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-card flex items-center justify-center">
                <Music2 className="w-8 h-8 sm:w-10 sm:h-10 text-brand-orange" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-text-muted">Apple Music</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl glass-card flex items-center justify-center">
                <Youtube className="w-8 h-8 sm:w-10 sm:h-10 text-brand-red" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-text-muted">YouTube Music</span>
            </div>
          </div>
        </div>
      </section>

      {/* Artist Features */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8 sm:space-y-10">
              <div className="space-y-3">
                <h2 className={isAr ? 'font-cairo font-extrabold text-3xl sm:text-4xl text-white' : 'font-syne font-bold text-3xl sm:text-4xl text-white'}>
                  {mgmtTitle}
                </h2>
                <p className="text-text-muted text-base leading-relaxed">{mgmtSub}</p>
              </div>

              <div className="space-y-6">
                {features.map((item, i) => (
                  <div key={i} className="flex gap-4 sm:gap-5 group">
                    <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-brand-orange transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="glass-card p-4 rounded-[2.5rem] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600"
                  alt="Artist Studio Production"
                  className="rounded-[2rem] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -start-6 glass-card p-6 rounded-2xl border-brand-orange/20 shadow-xl">
                <div className="flex items-center gap-4">
                  <Mic2 className="w-8 h-8 text-brand-orange shrink-0" />
                  <div>
                    <div className="text-2xl font-black text-white">+50</div>
                    <div className="text-xs text-text-muted">{trustStatLabel}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
