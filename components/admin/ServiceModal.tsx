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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  service?: any // If provided, we are editing
}

export default function ServiceModal({ isOpen, onClose, onSuccess, service }: ServiceModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    nameFr: '',
    descAr: '',
    descEn: '',
    descFr: '',
    slug: '',
    category: 'AUDIO_PRODUCTION'
  })

  useEffect(() => {
    if (service) {
      setFormData({
        nameAr: service.nameAr || '',
        nameEn: service.nameEn || '',
        nameFr: service.nameFr || '',
        descAr: service.descAr || '',
        descEn: service.descEn || '',
        descFr: service.descFr || '',
        slug: service.slug || '',
        category: service.category || 'AUDIO_PRODUCTION'
      })
    } else {
      setFormData({
        nameAr: '',
        nameEn: '',
        nameFr: '',
        descAr: '',
        descEn: '',
        descFr: '',
        slug: '',
        category: 'AUDIO_PRODUCTION'
      })
    }
  }, [service, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = service ? `/api/admin/services/${service.id}` : '/api/admin/services'
      const method = service ? 'PATCH' : 'POST'

      const resp = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (resp.ok) {
        toast.success(service ? 'Service updated' : 'Service created')
        onSuccess()
        onClose()
      } else {
        const err = await resp.json()
        toast.error(err.error || 'Something went wrong')
      }
    } catch (error) {
      toast.error('Failed to save service')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-brand-dark border-white/10 text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">
            {service ? 'Edit Service' : 'Add New Service'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Translations Fields */}
            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5">
              <h4 className="text-brand-orange font-bold uppercase text-xs tracking-widest">Arabic Content (العربية)</h4>
              <div className="space-y-2">
                <Label>Service Name</Label>
                <Input 
                  dir="rtl"
                  value={formData.nameAr}
                  onChange={e => setFormData({...formData, nameAr: e.target.value})}
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  dir="rtl"
                  value={formData.descAr}
                  onChange={e => setFormData({...formData, descAr: e.target.value})}
                  className="bg-white/5 border-white/10 min-h-[100px]"
                  required
                />
              </div>
            </div>

            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5">
              <h4 className="text-brand-pink font-bold uppercase text-xs tracking-widest">English Content</h4>
              <div className="space-y-2">
                <Label>Service Name</Label>
                <Input 
                  value={formData.nameEn}
                  onChange={e => setFormData({...formData, nameEn: e.target.value})}
                  className="bg-white/5 border-white/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={formData.descEn}
                  onChange={e => setFormData({...formData, descEn: e.target.value})}
                  className="bg-white/5 border-white/10 min-h-[100px]"
                  required
                />
              </div>
            </div>

            <div className="space-y-4 border border-white/5 p-4 rounded-2xl bg-white/5 md:col-span-2">
              <h4 className="text-blue-400 font-bold uppercase text-xs tracking-widest">French Content (Français)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom du Service</Label>
                  <Input 
                    value={formData.nameFr}
                    onChange={e => setFormData({...formData, nameFr: e.target.value})}
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description (Fr)</Label>
                  <Textarea 
                    value={formData.descFr}
                    onChange={e => setFormData({...formData, descFr: e.target.value})}
                    className="bg-white/5 border-white/10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* common fields */}
            <div className="space-y-2">
              <Label>Slug (identifier in URL)</Label>
              <Input 
                value={formData.slug}
                onChange={e => setFormData({...formData, slug: e.target.value})}
                placeholder="audio-production"
                className="bg-white/5 border-white/10"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={formData.category || "AUDIO_PRODUCTION"}
                onValueChange={v => setFormData({...formData, category: v})}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-brand-card border-white/10 text-white">
                  <SelectItem value="AUDIO_PRODUCTION">Audio Production</SelectItem>
                  <SelectItem value="VIDEO_PRODUCTION">Video Production</SelectItem>
                  <SelectItem value="DIGITAL_MARKETING">Digital Marketing</SelectItem>
                  <SelectItem value="WEB_DEVELOPMENT">Web Development</SelectItem>
                  <SelectItem value="MUSIC_DISTRIBUTION">Music Distribution</SelectItem>
                  <SelectItem value="ARTIST_SERVICES">Artist Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-brand min-w-[120px]" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (service ? 'Update Service' : 'Create Service')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
