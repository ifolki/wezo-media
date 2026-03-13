'use client'

import { useState, useEffect } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Loader2, Image as ImageIcon, X } from 'lucide-react'

interface BlogPostModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  post?: any 
}

export default function BlogPostModal({ isOpen, onClose, onSuccess, post }: BlogPostModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    titleFr: '',
    contentAr: '',
    contentEn: '',
    contentFr: '',
    excerptAr: '',
    excerptEn: '',
    excerptFr: '',
    slug: '',
    coverImage: '',
    tags: [] as string[],
    isPublished: false
  })
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (post) {
      setFormData({
        titleAr: post.titleAr || '',
        titleEn: post.titleEn || '',
        titleFr: post.titleFr || '',
        contentAr: post.contentAr || '',
        contentEn: post.contentEn || '',
        contentFr: post.contentFr || '',
        excerptAr: post.excerptAr || '',
        excerptEn: post.excerptEn || '',
        excerptFr: post.excerptFr || '',
        slug: post.slug || '',
        coverImage: post.coverImage || '',
        tags: post.tags || [],
        isPublished: post.isPublished || false
      })
    } else {
      setFormData({
        titleAr: '',
        titleEn: '',
        titleFr: '',
        contentAr: '',
        contentEn: '',
        contentFr: '',
        excerptAr: '',
        excerptEn: '',
        excerptFr: '',
        slug: '',
        coverImage: '',
        tags: [],
        isPublished: false
      })
    }
  }, [post, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = post ? `/api/admin/blog/${post.id}` : '/api/admin/blog'
      const method = post ? 'PATCH' : 'POST'

      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          publishedAt: formData.isPublished ? (post?.publishedAt || new Date()) : null
        })
      })

      if (resp.ok) {
        toast.success(post ? 'Post updated' : 'Post created')
        onSuccess()
        onClose()
      } else {
        const err = await resp.json()
        toast.error(err.error || 'Something went wrong')
      }
    } catch (error) {
      toast.error('Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  const addTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({...formData, tags: [...formData.tags, tagInput]})
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData({...formData, tags: formData.tags.filter(t => t !== tag)})
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-brand-dark border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            {post ? 'Edit Blog Post' : 'Create New Blog Post'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Arabic */}
            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5">
              <h4 className="text-brand-orange font-bold uppercase text-xs tracking-widest flex items-center gap-2">
                Arabic (العربية)
              </h4>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input dir="rtl" value={formData.titleAr} onChange={e => setFormData({...formData, titleAr: e.target.value})} className="bg-white/5" required />
              </div>
              <div className="space-y-2">
                <Label>Excerpt (Short summary)</Label>
                <Textarea dir="rtl" value={formData.excerptAr} onChange={e => setFormData({...formData, excerptAr: e.target.value})} className="bg-white/5 min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label>Content (Full Article)</Label>
                <Textarea dir="rtl" value={formData.contentAr} onChange={e => setFormData({...formData, contentAr: e.target.value})} className="bg-white/5 min-h-[200px]" required />
              </div>
            </div>

            {/* English */}
            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5">
              <h4 className="text-brand-pink font-bold uppercase text-xs tracking-widest">English</h4>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="bg-white/5" required />
              </div>
              <div className="space-y-2">
                <Label>Excerpt</Label>
                <Textarea value={formData.excerptEn} onChange={e => setFormData({...formData, excerptEn: e.target.value})} className="bg-white/5 min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea value={formData.contentEn} onChange={e => setFormData({...formData, contentEn: e.target.value})} className="bg-white/5 min-h-[200px]" required />
              </div>
            </div>

            {/* French */}
            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5">
              <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest">French</h4>
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input value={formData.titleFr} onChange={e => setFormData({...formData, titleFr: e.target.value})} className="bg-white/5" required />
              </div>
              <div className="space-y-2">
                <Label>Extrait</Label>
                <Textarea value={formData.excerptFr} onChange={e => setFormData({...formData, excerptFr: e.target.value})} className="bg-white/5 min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label>Contenu</Label>
                <Textarea value={formData.contentFr} onChange={e => setFormData({...formData, contentFr: e.target.value})} className="bg-white/5 min-h-[200px]" required />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Slug (URL Identifier)</Label>
                <Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="my-awesome-post" className="bg-white/5" required />
              </div>
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <div className="flex gap-2">
                  <Input value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} placeholder="https://..." className="bg-white/5" />
                  <Button type="button" size="icon" variant="outline" className="shrink-0"><ImageIcon className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Tags</Label>
              <div className="flex gap-2">
                <Input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add a tag..." className="bg-white/5" />
                <Button type="button" onClick={addTag} variant="secondary">Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <Badge key={tag} className="bg-brand-orange/20 text-brand-orange border-brand-orange/30 py-1.5 pl-3 pr-2 gap-1 rounded-lg">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-white"><X className="w-3 h-3" /></button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Publication Status</Label>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <input 
                  type="checkbox" 
                  checked={formData.isPublished} 
                  onChange={e => setFormData({...formData, isPublished: e.target.checked})} 
                  className="w-6 h-6 rounded accent-brand-orange"
                />
                <div className="flex flex-col">
                  <span className="font-bold">{formData.isPublished ? 'Published' : 'Draft'}</span>
                  <span className="text-xs text-text-muted">
                    {formData.isPublished ? 'Visible on website' : 'Saved as draft, not visible'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" className="gradient-brand min-w-[150px] h-12 rounded-xl font-bold" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (post ? 'Update Article' : 'Publish Article')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
