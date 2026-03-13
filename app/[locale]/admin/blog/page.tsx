
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
import { toast } from 'sonner'
import BlogPostModal from '@/components/admin/BlogPostModal'

export default function AdminBlogPage() {
  const t = useTranslations('dashboard')
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const isAr = t('welcome') === 'أهلاً بك'

  const fetchPosts = async () => {
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
  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this article?')) return
    try {
      const resp = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' })
      if (resp.ok) {
        toast.success('Post deleted')
        fetchPosts()
      }
    } catch (e) {
      toast.error('Failed to delete')
    }
  }

  const openEdit = (post: any) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const openNew = () => {
    setSelectedPost(null)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10 text-start">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white">{t('admin.blog')}</h1>
          <p className="text-text-muted font-medium">
            {isAr ? 'إدارة محتوى المدونة، الأخبار، والمقالات' : 'Manage blog content, news, and articles'}
          </p>
        </div>
        <Button 
          onClick={openNew}
          className="h-14 px-8 rounded-2xl gradient-brand font-black text-lg gap-2 shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Plus className="w-6 h-6" />
          {isAr ? 'مقال جديد' : 'New Article'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 px-2">        {posts.length > 0 ? (
          posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="glass-card border-white/5 overflow-hidden hover:border-brand-orange/20 transition-all group flex flex-col md:flex-row">
                <div className="w-full md:w-72 h-56 bg-white/5 relative overflow-hidden shrink-0">
                  {post.coverImage ? (
                    <img src={post.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/5 bg-gradient-to-br from-white/5 to-transparent">
                      <FileText className="w-16 h-16" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 rtl:auto rtl:right-4 flex gap-2">
                    <Badge className={`${post.isPublished ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'} backdrop-blur-md px-3 py-1 font-bold`}>
                      {post.isPublished ? (isAr ? 'منشور' : 'Published') : (isAr ? 'مسودة' : 'Draft')}
                    </Badge>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col justify-between text-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-text-muted text-xs font-bold bg-white/5 px-2.5 py-1.5 rounded-lg">
                        <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                        {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 text-text-muted text-xs font-bold bg-white/5 px-2.5 py-1.5 rounded-lg">
                        <Globe className="w-3.5 h-3.5 text-brand-pink" />
                        /{post.slug}
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-brand-orange transition-colors leading-tight line-clamp-2">
                      {isAr ? post.titleAr : post.titleEn}
                    </h3>
                    <p className="text-text-muted text-sm line-clamp-2 leading-relaxed font-bold">
                      {isAr ? post.excerptAr : post.excerptEn}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 pt-6 border-t border-white/5 gap-4">
                    <div className="flex flex-wrap gap-2">
                       {post.tags?.map((tag: string) => (
                         <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] uppercase tracking-widest text-text-muted font-black">#{tag}</span>
                       ))}
                    </div>
                      <div className="flex gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                        <Button 
                          onClick={() => openEdit(post)}
                          variant="ghost" 
                          size="icon" 
                          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:text-brand-orange transition-all"
                        >
                          <Edit className="w-5 h-5" />
                        </Button>
                        <Button 
                          onClick={() => handleDelete(post.id)}
                          variant="ghost" 
                          size="icon" 
                          className="w-12 h-12 rounded-xl bg-red-500/5 border border-red-500/10 text-red-500/50 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-40 glass-card rounded-[3.5rem] border-2 border-dashed border-white/5 flex flex-col items-center gap-6">
            <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 flex items-center justify-center">
              <FileText className="w-12 h-12 text-text-muted/30" />
            </div>
            <p className="text-xl font-bold text-text-muted">{isAr ? 'لا توجد مقالات بعد.' : 'No blog posts yet.'}</p>
          </div>
        )}
      </div>

      <BlogPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPosts}
        post={selectedPost}
      />
    </div>
  )
}
