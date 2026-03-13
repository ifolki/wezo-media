
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { 
  FileText, 
  Plus, 
  Edit,
  Trash2,
  Calendar,
  MessageSquare,
  Loader2,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function AdminBlogPage() {
  const t = useTranslations('dashboard')
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const isAr = t('welcome') === 'أهلاً بك'

  useEffect(() => {
    async function fetchPosts() {
      try {
        const resp = await fetch('/api/admin/blog')
        if (resp.ok) {
          const data = await resp.json()
          setPosts(data)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10 text-start">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white">{t('admin.blog')}</h1>
          <p className="text-text-muted mt-2">{isAr ? 'إدارة مقالات المدونة والأخبار.' : 'Manage blog articles and news.'}</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl gradient-brand font-black text-lg gap-2 shadow-lg">
          <Plus className="w-6 h-6" />
          {isAr ? 'مقال جديد' : 'New Article'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="glass-card border-white/5 overflow-hidden hover:border-brand-orange/20 transition-all group flex flex-col md:flex-row">
                <div className="w-full md:w-64 h-48 bg-white/5 relative overflow-hidden shrink-0">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                      <FileText className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge className={post.isPublished ? 'bg-green-500/80' : 'bg-orange-500/80'}>
                      {post.isPublished ? (isAr ? 'منشور' : 'Published') : (isAr ? 'مسودة' : 'Draft')}
                    </Badge>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center gap-1.5 text-text-muted text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1.5 text-text-muted text-xs">
                        <Globe className="w-3.5 h-3.5" />
                        {post.slug}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-brand-orange transition-colors">
                      {isAr ? post.titleAr : post.titleEn}
                    </h3>
                    <p className="text-text-muted text-sm line-clamp-2 italic">
                      {isAr ? post.excerpt : (post.excerptEn || post.excerpt)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                    <div className="flex gap-2">
                       {post.tags?.map((tag: string) => (
                         <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-text-muted font-bold">#{tag}</span>
                       ))}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 text-white hover:bg-white/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl bg-red-500/5 border border-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-white/[0.01] rounded-[3rem] border-2 border-dashed border-white/5">
            <p className="text-text-muted text-lg">{isAr ? 'لا توجد مقالات بعد.' : 'No blog posts yet.'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
