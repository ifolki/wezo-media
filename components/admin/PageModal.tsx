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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

interface PageModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  page?: any 
}

export default function PageModal({ isOpen, onClose, onSuccess, page }: PageModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    slug: '',
    titleAr: '',
    titleEn: '',
    titleFr: '',
    contentAr: '',
    contentEn: '',
    contentFr: '',
    isPublished: false
  })

  useEffect(() => {
    if (page) {
      setFormData({
        slug: page.slug || '',
        titleAr: page.titleAr || '',
        titleEn: page.titleEn || '',
        titleFr: page.titleFr || '',
        contentAr: page.contentAr || '',
        contentEn: page.contentEn || '',
        contentFr: page.contentFr || '',
        isPublished: page.isPublished || false
      })
    } else {
      setFormData({
        slug: '',
        titleAr: '',
        titleEn: '',
        titleFr: '',
        contentAr: '',
        contentEn: '',
        contentFr: '',
        isPublished: false
      })
    }
  }, [page, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = page ? `/api/admin/pages/${page.id}` : '/api/admin/pages'
      const method = page ? 'PATCH' : 'POST'

      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (resp.ok) {
        toast.success(page ? 'Page updated' : 'Page created')
        onSuccess()
        onClose()
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      toast.error('Failed to save page')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-brand-dark border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            {page ? 'Edit Static Page' : 'Create New Page'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Slug (URL Path)</Label>
              <Input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="bg-white/5" placeholder="e.g. about-us" required />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 h-fit mt-auto">
              <Label className="cursor-pointer">Publication Status</Label>
              <Switch checked={formData.isPublished} onCheckedChange={val => setFormData({...formData, isPublished: val})} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Title (Arabic)</Label>
              <Input dir="rtl" value={formData.titleAr} onChange={e => setFormData({...formData, titleAr: e.target.value})} className="bg-white/5" required />
            </div>
            <div className="space-y-2">
              <Label>Title (English)</Label>
              <Input value={formData.titleEn} onChange={e => setFormData({...formData, titleEn: e.target.value})} className="bg-white/5" required />
            </div>
            <div className="space-y-2">
              <Label>Title (French)</Label>
              <Input value={formData.titleFr} onChange={e => setFormData({...formData, titleFr: e.target.value})} className="bg-white/5" />
            </div>
          </div>

          <div className="space-y-4">
             <div className="space-y-2">
                <Label>Content (Arabic)</Label>
                <Textarea dir="rtl" rows={4} value={formData.contentAr} onChange={e => setFormData({...formData, contentAr: e.target.value})} className="bg-white/5" required />
             </div>
             <div className="space-y-2">
                <Label>Content (English)</Label>
                <Textarea rows={4} value={formData.contentEn} onChange={e => setFormData({...formData, contentEn: e.target.value})} className="bg-white/5" required />
             </div>
             <div className="space-y-2">
                <Label>Content (French)</Label>
                <Textarea rows={4} value={formData.contentFr} onChange={e => setFormData({...formData, contentFr: e.target.value})} className="bg-white/5" />
             </div>
          </div>

          <DialogFooter className="pt-6 border-t border-white/5">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button type="submit" className="gradient-brand min-w-[150px] h-12 rounded-xl font-bold" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (page ? 'Update Page' : 'Create Page')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
