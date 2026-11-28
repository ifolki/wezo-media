'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Share2, MessageCircle, Maximize2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config/site'
import { event } from '@/lib/analytics/gtag'
import { toast } from 'sonner'

interface VideoLightboxProps {
  video: any | null
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
  hasNext?: boolean
  hasPrev?: boolean
  locale: string
}

export default function VideoLightbox({
  video,
  onClose,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  locale
}: VideoLightboxProps) {
  const isAr = locale === 'ar'

  // Keyboard navigation & ESC close
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowRight') {
      if (isAr) onPrev?.()
      else onNext?.()
    } else if (e.key === 'ArrowLeft') {
      if (isAr) onNext?.()
      else onPrev?.()
    }
  }, [onClose, onNext, onPrev, isAr])

  useEffect(() => {
    if (!video) return
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    // Fire GA4 Event: video_play_start
    event('video_play_start', {
      video_title: video.titleFr || video.clientName,
      video_provider: video.provider,
      client_name: video.clientName,
      aspect_ratio: video.aspectRatio,
      locale,
    })

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [video, handleKeyDown, locale])

  if (!video) return null

  const isVertical = video.aspectRatio === 'VERTICAL_9_16'
  const title = locale === 'ar' ? (video.titleAr || video.clientName) : (locale === 'en' ? (video.titleEn || video.titleFr || video.clientName) : (video.titleFr || video.clientName))
  const description = locale === 'ar' ? video.descAr : (locale === 'en' ? (video.descEn || video.descFr) : video.descFr)
  const categoryName = video.category ? (locale === 'ar' ? video.category.nameAr : (locale === 'en' ? video.category.nameEn : video.category.nameFr)) : null

  // WhatsApp share link
  const whatsappShareUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    isAr
      ? `السلام عليكم WEZO MEDIA، شاهدت فيديو "${video.clientName}" في المعرض وأريد طلب فيديو مماثل لمشروعي.`
      : `Bonjour WEZO MEDIA, j'ai vu la vidéo de "${video.clientName}" dans votre showcase et je souhaite commander une vidéo similaire.`
  )}`

  const handleShareClick = () => {
    const url = `${window.location.origin}/${locale}/portfolio/videos?video=${video.slug}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      toast.success(isAr ? 'تم نسخ الرابط بنجاح!' : 'Lien copié dans le presse-papier !')
    }
  }

  const handleWhatsAppCta = () => {
    event('video_cta_click', {
      video_title: video.titleFr || video.clientName,
      client_name: video.clientName,
      cta_target: 'whatsapp',
      locale,
    })
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto"
        onClick={onClose}
      >
        {/* Close Button top-right */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer"
          className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95 shadow-2xl"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Prev Button */}
        {hasPrev && (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation()
              onPrev?.()
            }}
            aria-label="Précédent"
            className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            type="button"
            onClick={e => {
              e.stopPropagation()
              onNext?.()
            }}
            aria-label="Suivant"
            className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        )}

        {/* Lightbox Content Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          className={`relative bg-[#0A0A0F] border border-white/15 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)] flex flex-col ${
            isVertical
              ? 'w-full max-w-sm sm:max-w-md h-[88vh] max-h-[820px]'
              : 'w-full max-w-4xl max-h-[90vh]'
          }`}
        >
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-white/[0.03] border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-pulse shrink-0" />
              <div className="min-w-0">
                <h3 className="text-white font-black text-sm sm:text-base truncate">
                  {video.clientName}
                </h3>
                {categoryName && (
                  <p className="text-[11px] text-brand-orange font-bold uppercase tracking-wider truncate">
                    {categoryName}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShareClick}
                title="Copier le lien direct"
                className="h-8 w-8 text-text-muted hover:text-white rounded-full hover:bg-white/10"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Player Wrapper */}
          <div className="relative flex-grow bg-black flex items-center justify-center overflow-hidden">
            {video.provider === 'YOUTUBE' ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : video.provider === 'GOOGLE_DRIVE' ? (
              <iframe
                src={`https://drive.google.com/file/d/${video.videoId}/preview`}
                title={title}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            ) : (
              <video
                src={video.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Bottom Info & CTAs */}
          <div className="p-4 sm:p-5 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/90 to-transparent border-t border-white/10 shrink-0 space-y-3">
            {description && (
              <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
              <a
                href={`/${locale}/get-quote?service=video-production`}
                onClick={() => {
                  event('video_cta_click', {
                    video_title: video.titleFr || video.clientName,
                    client_name: video.clientName,
                    cta_target: 'quote_form',
                    locale,
                  })
                }}
                className="btn-gradient-orange w-full sm:flex-1 py-3 px-4 rounded-xl font-black text-white text-xs sm:text-sm text-center shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isAr ? 'طلب فيديو إعلاني مماثل' : 'Commander une vidéo publicitaire'}
              </a>

              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppCta}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
