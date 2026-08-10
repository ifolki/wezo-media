'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Sparkles, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import RequestServiceModal from '@/components/shared/RequestServiceModal'
import { Link } from '@/navigation'

// Premium mock showcase items for initial design fidelity
const MOCK_SHOWCASE = [
  {
    id: '1',
    title: 'Brand Commercial',
    category: 'AI Video Ads',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'E-commerce Reel',
    category: 'UGC Content',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '3',
    title: 'AI Creative Ads',
    category: 'Product Showcase',
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  }
]

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const prefersReducedMotion = useReducedMotion()

  const [activeIndex, setActiveIndex] = useState(1)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Rotate items every 5 seconds, unless hovered, focused, or playing video
  const rotateNext = useCallback(() => {
    if (prefersReducedMotion) return
    setActiveIndex((prev) => (prev + 1) % MOCK_SHOWCASE.length)
  }, [prefersReducedMotion])

  useEffect(() => {
    if (isHovered || isFocused || isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(rotateNext, 5000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isHovered, isFocused, isPlaying, rotateNext])

  // Key navigation for Video Modal Accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSelectedVideo(null)
      setIsPlaying(false)
    }
  }

  // Get index positions relative to active index
  const getCardPosition = (index: number) => {
    const total = MOCK_SHOWCASE.length
    const diff = (index - activeIndex + total) % total
    if (diff === 0) return 'center'
    if (diff === 1) return 'right'
    return 'left'
  }

  return (
    <section 
      onKeyDown={handleKeyDown}
      className="relative min-h-[calc(100vh-80px)] flex items-center pt-28 pb-16 overflow-hidden bg-[#07070A] text-white"
    >
      {/* Background Matrix Texture & Subtle Grids */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#111119_1px,transparent_1px),linear-gradient(to_bottom,#111119_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-35" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,107,43,0.03),transparent_60%)]" />
      
      {/* Glow behind the Video Section */}
      <div className="absolute right-[-10%] top-[20%] w-[600px] h-[600px] -z-10 bg-brand-orange/5 blur-[160px] rounded-full animate-pulse pointer-events-none" />

      <div className="container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] items-center gap-12 lg:gap-16">
          
          {/* 1. Left Content Area (55%) */}
          <div className="flex flex-col space-y-8 text-center lg:text-start relative z-10">
            {/* Premium Badge */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex self-center lg:self-start items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.03] backdrop-blur-xl shadow-2xl"
            >
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              <span className="text-[10px] md:text-xs font-black tracking-[0.2em] text-brand-orange uppercase">
                {t('badge')}
              </span>
            </motion.div>

            {/* Staggered Heading */}
            <div className="space-y-6">
              <motion.h1
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-[4.7rem] font-black leading-[1.05] tracking-tight"
              >
                <span>{t('title_1')}</span>
                <span className="text-brand-orange relative inline-block group">
                  {t('title_publicites')}
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-brand-orange rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
                <span>{t('title_2')}</span>
                <span className="block mt-2 bg-gradient-to-r from-brand-orange via-[#FF4D80] to-[#FF8FA3] bg-clip-text text-transparent pb-1">
                  {t('title_gradient')}
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base md:text-lg text-text-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-bold"
              >
                {t('subtitle')}
              </motion.p>
            </div>

            {/* CTAs with micro-interactions */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2"
            >
              <Link href="/get-quote" aria-label="Request a quote">
                <Button className="h-16 px-10 rounded-2xl text-lg font-black gradient-brand hover:opacity-90 shadow-[0_12px_40px_rgba(255,107,43,0.25)] hover:scale-[1.03] active:scale-95 transition-all gap-3">
                  <Sparkles className="w-5 h-5 text-white" />
                  {t('ctaPrimary')}
                </Button>
              </Link>

              <Link href="/portfolio" aria-label="View our case portfolio">
                <Button
                  variant="outline"
                  className="h-16 px-10 rounded-2xl text-lg font-black border-white/10 hover:bg-white/5 hover:border-white/20 hover:scale-[1.03] active:scale-95 transition-all gap-2 glass-card"
                >
                  <Play className="w-4 h-4 fill-brand-orange text-brand-orange" />
                  {t('ctaSecondary')}
                </Button>
              </Link>
            </motion.div>

            {/* Mini tagline description */}
            <motion.p
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] pt-4"
            >
              {t('tagline')}
            </motion.p>
          </div>

          {/* 2. Right Creative Video Showcase (45%) */}
          <div 
            className="relative flex items-center justify-center min-h-[380px] lg:min-h-[480px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {/* Outer perspective wrapper */}
            <div className="relative w-full max-w-[340px] md:max-w-[420px] aspect-[4/5] flex items-center justify-center">
              
              {/* Floating Pills */}
              <AnimatePresence>
                {!prefersReducedMotion && (
                  <>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
                      transition={{ delay: 0.6, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                      className="absolute -top-4 -left-4 z-30 px-4 py-2 rounded-full border border-white/5 bg-brand-dark/80 backdrop-blur-xl shadow-xl flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-white">AI Creative</span>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, y: [0, 8, 0] }}
                      transition={{ delay: 0.7, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
                      className="absolute top-[40%] -right-10 z-30 px-4 py-2 rounded-full border border-white/5 bg-brand-dark/80 backdrop-blur-xl shadow-xl flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D80]" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-white">Meta Ads</span>
                    </motion.div>

                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, y: [0, -8, 0] }}
                      transition={{ delay: 0.8, y: { repeat: Infinity, duration: 4.5, ease: "easeInOut" } }}
                      className="absolute -bottom-4 -left-8 z-30 px-4 py-2 rounded-full border border-white/5 bg-brand-dark/80 backdrop-blur-xl shadow-xl flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-wider text-white">Landing Pages</span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Three Vertical Cards Showcase */}
              <div className="absolute inset-0 flex items-center justify-center">
                {MOCK_SHOWCASE.map((item, index) => {
                  const pos = getCardPosition(index)
                  const isCenter = pos === 'center'
                  
                  return (
                    <motion.div
                      key={item.id}
                      style={{ originY: 0.8 }}
                      animate={{
                        scale: isCenter ? 1 : 0.82,
                        x: pos === 'left' ? (isAr ? 90 : -90) : pos === 'right' ? (isAr ? -90 : 90) : 0,
                        rotate: pos === 'left' ? -6 : pos === 'right' ? 6 : 0,
                        zIndex: isCenter ? 20 : 10,
                        opacity: isCenter ? 1 : 0.6
                      }}
                      transition={{ type: 'spring', damping: 22, stiffness: 120 }}
                      className="absolute w-[180px] md:w-[220px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 bg-brand-card shadow-[0_20px_50px_rgba(0,0,0,0.8)] group/card cursor-pointer"
                      onClick={() => {
                        if (isCenter) {
                          setSelectedVideo(item.videoUrl)
                          setIsPlaying(true)
                        } else {
                          setActiveIndex(index)
                        }
                      }}
                    >
                      {/* Image Thumbnail */}
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity" />

                      {/* Video metadata (visible at bottom) */}
                      <div className="absolute bottom-5 left-5 right-5 space-y-1 text-start z-10">
                        <p className="text-[10px] font-black uppercase text-brand-orange tracking-widest">{item.category}</p>
                        <p className="text-sm font-bold text-white truncate">{item.title}</p>
                      </div>

                      {/* Play Button Overlay (Active Center Only) */}
                      {isCenter && (
                        <div className="absolute inset-0 flex items-center justify-center z-15">
                          <motion.div
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-14 h-14 rounded-full bg-brand-orange flex items-center justify-center shadow-lg shadow-brand-orange/30 text-white"
                          >
                            <Play className="w-6 h-6 fill-white ml-1" />
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>

              {/* Navigation dots & controls */}
              <div className="absolute -bottom-12 left-0 right-0 flex items-center justify-center gap-4 z-30">
                <button
                  onClick={() => setActiveIndex((prev) => (prev - 1 + MOCK_SHOWCASE.length) % MOCK_SHOWCASE.length)}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center bg-white/5 text-white active:scale-90 transition-all"
                  aria-label="Previous showcase video"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2">
                  {MOCK_SHOWCASE.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeIndex ? 'bg-brand-orange w-6' : 'bg-white/20'}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % MOCK_SHOWCASE.length)}
                  className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center bg-white/5 text-white active:scale-90 transition-all"
                  aria-label="Next showcase video"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Accessible Dynamic Video Modal Player */}
      <AnimatePresence>
        {selectedVideo && isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => {
              setSelectedVideo(null)
              setIsPlaying(false)
            }}
          >
            {/* Close button inside modal */}
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-all text-xl font-bold uppercase tracking-widest"
              onClick={() => {
                setSelectedVideo(null)
                setIsPlaying(false)
              }}
            >
              [ Close ]
            </button>

            {/* Video Container (Strictly 9:16 vertical ratio) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0F]"
              onClick={(e) => e.stopPropagation()} // Stop propagation to prevent close
            >
              {/* Embed YouTube Player with Autoplay */}
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.split('v=')[1]}?autoplay=1&rel=0&modestbranding=1`}
                title="Portfolio Showcase Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
