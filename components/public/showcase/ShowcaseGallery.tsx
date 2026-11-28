'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Layers, 
  Tag, 
  ArrowDown, 
  MessageCircle, 
  Search, 
  Loader2, 
  Filter, 
  Check, 
  Video as VideoIcon 
} from 'lucide-react'
import VideoCard from './VideoCard'
import VideoLightbox from './VideoLightbox'
import { siteConfig } from '@/lib/config/site'
import { event } from '@/lib/analytics/gtag'

interface ShowcaseGalleryProps {
  initialVideos: any[]
  initialCategories: any[]
  initialSectors: any[]
  locale: string
}

export default function ShowcaseGallery({
  initialVideos,
  initialCategories,
  initialSectors,
  locale
}: ShowcaseGalleryProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isAr = locale === 'ar'

  // State
  const [videos, setVideos] = useState<any[]>(initialVideos)
  const [categories, setCategories] = useState<any[]>(initialCategories)
  const [sectors, setSectors] = useState<any[]>(initialSectors)
  const [loading, setLoading] = useState(false)

  // Filters from URL or state
  const currentCategorySlug = searchParams?.get('category') || 'all'
  const currentSectorSlug = searchParams?.get('sector') || 'all'
  const currentProjectSlug = searchParams?.get('project') || null
  const currentVideoSlug = searchParams?.get('video') || null

  const [activeCategory, setActiveCategory] = useState<string>(currentCategorySlug)
  const [activeSector, setActiveSector] = useState<string>(currentSectorSlug)
  const [activeVideo, setActiveVideo] = useState<any | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Sync with URL query parameters for deep linking
  useEffect(() => {
    if (currentVideoSlug && videos.length > 0) {
      const target = videos.find(v => v.slug === currentVideoSlug || v.id === currentVideoSlug)
      if (target) {
        setActiveVideo(target)
      }
    }
  }, [currentVideoSlug, videos])

  useEffect(() => {
    if (currentCategorySlug) setActiveCategory(currentCategorySlug)
    if (currentSectorSlug) setActiveSector(currentSectorSlug)
  }, [currentCategorySlug, currentSectorSlug])

  // Update URL without full refresh
  const updateQueryParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    const newQuery = params.toString() ? `?${params.toString()}` : ''
    router.replace(`${pathname}${newQuery}`, { scroll: false })
  }

  // Handle Category Filter Change
  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug)
    updateQueryParam('category', slug === 'all' ? null : slug)
  }

  // Handle Sector Filter Change
  const handleSectorChange = (slug: string) => {
    setActiveSector(slug)
    updateQueryParam('sector', slug === 'all' ? null : slug)
  }

  // Handle Open Video
  const handleOpenVideo = (video: any) => {
    setActiveVideo(video)
    updateQueryParam('video', video.slug)
  }

  // Handle Close Video
  const handleCloseVideo = () => {
    setActiveVideo(null)
    updateQueryParam('video', null)
  }

  // Filtered items
  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      if (activeCategory !== 'all') {
        if (!video.category || video.category.slug !== activeCategory) return false
      }
      if (activeSector !== 'all') {
        if (!video.sector || video.sector.slug !== activeSector) return false
      }
      if (currentProjectSlug) {
        if (video.projectSlug !== currentProjectSlug) return false
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase()
        const client = video.clientName?.toLowerCase().includes(q)
        const proj = video.projectName?.toLowerCase().includes(q)
        const title = video.titleFr?.toLowerCase().includes(q) || video.titleAr?.includes(q)
        if (!client && !proj && !title) return false
      }
      return true
    })
  }, [videos, activeCategory, activeSector, currentProjectSlug, searchTerm])

  // Next / Prev in Lightbox
  const currentIndex = activeVideo ? filteredVideos.findIndex(v => v.id === activeVideo.id) : -1
  const hasNext = currentIndex >= 0 && currentIndex < filteredVideos.length - 1
  const hasPrev = currentIndex > 0

  const handleNext = () => {
    if (hasNext) {
      const nextVid = filteredVideos[currentIndex + 1]
      handleOpenVideo(nextVid)
    }
  }

  const handlePrev = () => {
    if (hasPrev) {
      const prevVid = filteredVideos[currentIndex - 1]
      handleOpenVideo(prevVid)
    }
  }

  // Pre-configured WhatsApp CTA URL
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    isAr
      ? 'السلام عليكم WEZO MEDIA، اطلعت على معرض الفيديوهات WEZO SHOWCASE وأرغب في مناقشة طلب فيديو إعلاني لشركتي.'
      : 'Bonjour WEZO MEDIA, j’ai consulté votre WEZO SHOWCASE et je souhaite échanger pour commander une vidéo publicitaire pour mon entreprise.'
  )}`

  return (
    <div className="space-y-12 pb-24">
      {/* Category Pills (Types de production) */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none px-4 gap-2.5">
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all shrink-0 ${
            activeCategory === 'all'
              ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-105'
              : 'bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/5'
          }`}
        >
          {isAr ? 'جميع الأعمال' : 'Tous les projets'}
        </button>

        {categories.map(cat => {
          const label = isAr ? cat.nameAr : (locale === 'en' ? cat.nameEn : cat.nameFr)
          const isActive = activeCategory === cat.slug
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all shrink-0 ${
                isActive
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-text-muted hover:text-white border border-white/5'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Secondary Bar: Industry Sectors & Search */}
      <div className="container-custom max-w-5xl">
        <div className="glass-card p-3 sm:p-4 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Sector Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            <span className="text-xs font-black uppercase text-brand-orange flex items-center gap-1.5 shrink-0 pl-2">
              <Tag className="w-3.5 h-3.5" />
              {isAr ? 'القطاع :' : 'Secteur :'}
            </span>

            <button
              type="button"
              onClick={() => handleSectorChange('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeSector === 'all'
                  ? 'bg-white/20 text-white'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              {isAr ? 'الكل' : 'Tous'}
            </button>

            {sectors.map(sec => {
              const label = isAr ? sec.nameAr : (locale === 'en' ? sec.nameEn : sec.nameFr)
              const isActive = activeSector === sec.slug
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSectorChange(sec.slug)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-text-muted hover:text-white'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
            <input
              type="text"
              placeholder={isAr ? 'بحث بالاسم أو العميل...' : 'Recherche par nom ou client...'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-text-muted/50 focus:outline-none focus:border-brand-orange"
            />
          </div>
        </div>
      </div>

      {/* Grid of Videos matching reference design */}
      <div className="container-custom max-w-6xl">
        {filteredVideos.length === 0 ? (
          <div className="py-24 text-center space-y-4 glass-card rounded-[3rem] border-white/5">
            <VideoIcon className="w-12 h-12 text-brand-orange/60 mx-auto" />
            <h3 className="text-2xl font-black text-white">
              {isAr ? 'لا توجد فيديوهات مطابقة' : 'Aucune vidéo trouvée'}
            </h3>
            <p className="text-text-muted text-sm max-w-md mx-auto font-medium">
              {isAr
                ? 'جرب اختيار تصنيف آخر أو إعادة ضبط الفلاتر للاطلاع على باقي الأعمال.'
                : 'Essayez de sélectionner un autre type de production ou de réinitialiser vos filtres.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all')
                setActiveSector('all')
                setSearchTerm('')
                router.replace(pathname, { scroll: false })
              }}
              className="px-6 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider"
            >
              {isAr ? 'إعادة ضبط الفلاتر' : 'Réinitialiser les filtres'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-8 lg:gap-10">
            {filteredVideos.map((video, idx) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleOpenVideo(video)}
                locale={locale}
                index={idx}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA Block matching reference design */}
      <div className="container-custom max-w-3xl pt-8">
        <div className="relative rounded-[2.5rem] bg-[#0A0A0F] border border-white/10 p-8 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-brand-orange font-black text-xs uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> WEZO MEDIA AUDIENCE ACCELERATOR
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              {isAr ? 'جاهز لإنتاج فيديو إعلاني مميز لمشروعك؟' : 'Prêt à propulser votre entreprise avec une vidéo percutante ?'}
            </h2>
            <p className="text-text-muted text-sm max-w-xl mx-auto leading-relaxed">
              {isAr
                ? 'فريق WEZO MEDIA يرافقك من الفكرة والسيناريو والتصوير حتى الإعلانات الممولة وتحقيق أعلى عائد.'
                : 'De la conception du script jusqu’au tournage et à la diffusion publicitaire Meta & TikTok, nos experts créatifs maximisent votre rentabilité.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            {/* Primary Orange Button exactly as reference: Commander une vidéo publicitaire */}
            <a
              href={`/${locale}/get-quote?service=video-production`}
              onClick={() => {
                event('video_cta_click', {
                  cta_location: 'showcase_bottom_banner',
                  cta_target: 'quote_form',
                  locale,
                })
              }}
              className="btn-gradient-orange w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-white text-base sm:text-lg shadow-xl shadow-brand-orange/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              <span>{isAr ? 'طلب فيديو إعلاني' : 'Commander une vidéo publicitaire'}</span>
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
                <ArrowDown className="w-4 h-4" />
              </div>
            </a>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                event('video_cta_click', {
                  cta_location: 'showcase_bottom_banner',
                  cta_target: 'whatsapp',
                  locale,
                })
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>{isAr ? 'محادثة مباشرة عبر WhatsApp' : 'Discuter sur WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Video Lightbox Modal */}
      <VideoLightbox
        video={activeVideo}
        onClose={handleCloseVideo}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={hasNext}
        hasPrev={hasPrev}
        locale={locale}
      />
    </div>
  )
}
