'use client'

import { motion } from 'framer-motion'
import { Play, Sparkles } from 'lucide-react'

interface VideoCardProps {
  video: any
  onClick: () => void
  locale: string
  index?: number
}

export default function VideoCard({ video, onClick, locale, index = 0 }: VideoCardProps) {
  const isAr = locale === 'ar'
  const isVertical = video.aspectRatio === 'VERTICAL_9_16'
  const categoryName = video.category ? (locale === 'ar' ? video.category.nameAr : (locale === 'en' ? video.category.nameEn : video.category.nameFr)) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col items-center select-none"
    >
      {/* Video Thumbnail Frame */}
      <div
        className={`relative w-full rounded-[1.85rem] sm:rounded-[2.25rem] overflow-hidden bg-[#0A0A0F] border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-brand-orange/50 group-hover:shadow-[0_15px_45px_rgba(249,115,22,0.18)] group-hover:-translate-y-2 ${
          isVertical ? 'aspect-[9/16]' : 'aspect-video'
        }`}
      >
        {/* Background Thumbnail */}
        <img
          src={video.thumbnailUrl || '/assets/showcase/video-placeholder.webp'}
          alt={video.clientName}
          loading="lazy"
          className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />

        {/* Ambient Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

        {/* Category Pill Tag (top-left) */}
        {categoryName && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-black uppercase tracking-wider text-white">
            {categoryName}
          </div>
        )}

        {/* Featured Star (top-right) */}
        {video.isFeatured && (
          <div className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-brand-orange/90 text-white shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </div>
        )}

        {/* Center Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="p-4 sm:p-5 rounded-full bg-brand-orange/90 text-white shadow-2xl backdrop-blur-sm transition-all duration-500 transform scale-90 group-hover:scale-110 group-hover:bg-brand-orange group-hover:shadow-[0_0_35px_rgba(249,115,22,0.7)]">
            <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
          </div>
        </div>

        {/* Bottom subtle progress line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-pink to-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>

      {/* Under-Card Caption matching reference design */}
      <div className="mt-4 flex items-center justify-center gap-2.5 text-center">
        <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-white group-hover:text-brand-orange transition-colors duration-300">
          {video.clientName}
        </h3>

        {/* Circular Orange Play Icon exactly as shown in reference */}
        <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
          <Play className="w-2.5 h-2.5 fill-current translate-x-[1px]" />
        </div>
      </div>
    </motion.div>
  )
}
