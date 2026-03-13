'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from '@/navigation'
import { Calendar, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export default function BlogList() {
  const t = useTranslations('blog')
  const locale = useLocale()
  const isAr = locale === 'ar'
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const fetchPosts = async () => {
      try {
        const resp = await fetch('/api/blog')
        if (resp.ok) {
          const data = await resp.json()
          setPosts(data)
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  const getTitle = (post: any) => {
    if (locale === 'ar') return post.titleAr
    if (locale === 'fr') return post.titleFr || post.titleEn
    return post.titleEn
  }

  const getExcerpt = (post: any) => {
    if (locale === 'ar') return post.excerptAr
    if (locale === 'fr') return post.excerptFr || post.excerptEn
    return post.excerptEn
  }

  if (!mounted) return null
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
        <p className="text-text-muted font-bold">Loading articles...</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-20 glass-card rounded-[3rem] border-white/5">
        <p className="text-2xl font-bold text-text-muted">{t('no_posts')}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {posts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="group flex flex-col h-full glass-card rounded-[3rem] overflow-hidden border-white/5 hover:border-brand-orange/20 transition-all duration-500 hover:-translate-y-4 shadow-2xl"
        >
          <div className="h-72 overflow-hidden relative">
            <img 
              src={post.coverImage || 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=600'} 
              alt={getTitle(post)}
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent opacity-60" />
            {post.tags?.[0] && (
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-xl bg-brand-orange/90 text-white text-xs font-black uppercase tracking-widest backdrop-blur-md">
                {post.tags[0]}
              </div>
            )}
          </div>

          <div className="p-10 flex-grow flex flex-col space-y-6">
            <div className="flex items-center gap-6 text-sm text-text-muted font-bold text-start">
               <div className="flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-brand-orange" /> 
                 {new Date(post.publishedAt || post.createdAt).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
               </div>
            </div>

            <h3 className="text-3xl font-black text-white group-hover:text-brand-orange transition-colors duration-300 leading-tight text-start">
               {getTitle(post)}
            </h3>
            
            <p className="text-text-muted leading-relaxed flex-grow font-bold line-clamp-3 text-start">
               {getExcerpt(post)}
            </p>

            <Link 
              href={`/blog/${post.slug}`} 
              className="inline-flex items-center gap-3 text-brand-orange font-black text-lg uppercase tracking-widest pt-4 group/link"
            >
               <span>{t('read_more')}</span>
               {isAr ? (
                 <ArrowLeft className="w-6 h-6 transition-transform group-hover/link:-translate-x-3" />
               ) : (
                 <ArrowRight className="w-6 h-6 transition-transform group-hover/link:translate-x-3" />
               )}
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
